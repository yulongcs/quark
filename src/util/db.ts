import config from '../config';

const getDb = () => window.indexedDB.open(config.dbName, 1);

export const indexDbInit = () => {
  if (!window.indexedDB) {
    console.info('[indexDbInit] Browser does not support indexdb');
    return;
  }
  const request = getDb();
  request.addEventListener('upgradeneeded', (event) => {
    const db = (event.target as any).result;
    // log collection
    if (config.useLogRecord) {
      if (!db.objectStoreNames.contains(config.logCollectionName)) { // create log collection if not
        db.createObjectStore(config.logCollectionName, { autoIncrement: true });
      }
    } else if (db.objectStoreNames.contains(config.logCollectionName)) { // delete log collection
      db.deleteObjectStore(config.logCollectionName);
    }
    db.close();
  });
};

export const indexDbDml = ({
  collectionName, add, put, remove, get, wa = 'readwrite', clear,
}: {
  collectionName: string;
  wa?: 'readwrite' | 'readonly';
  add?: Record<string, any>;
  put?: Record<string, any>;
  remove?: string | number;
  clear?: boolean;
  get?: {
    range: IDBKeyRange | number | string | null;
    direction?: IDBCursorDirection;
    limit?: number;
    cb?: (e: any) => void;
  };
}) => {
  const request = getDb();
  request.addEventListener('success', (event) => {
    const db = (event.target as any).result;
    if (!db.objectStoreNames.contains(collectionName)) {
      return;
    }
    const store = db.transaction(collectionName, wa)
      .objectStore(collectionName);
    if (add) {
      store.add(add);
    } else if (typeof remove !== 'undefined') {
      store.delete(remove);
    } else if (put) {
      store.put(put);
    } else if (get) {
      const g = store.openCursor(get.range, get.direction || 'next');
      let len = 0;
      const resData: any[] = [];
      g.addEventListener('success', (e: any) => {
        const cursor = e.target.result;
        if (cursor) {
          if (typeof get.limit === 'number' && len >= get.limit) {
            if (get.cb) {
              get.cb(resData);
            }
            return;
          }
          len += 1;
          resData.push({ ...cursor.value, key: cursor.key });
          cursor.continue();
        } else if (get.cb) {
          get.cb(resData);
        }
      });
    } else if (clear) {
      store.clear();
    }
    db.close();
  });
};

export const addToLogCollection = (obj: Record<string, any>) => {
  indexDbDml({
    collectionName: config.logCollectionName,
    add: obj,
  });
};

export const getFromLogCollection = async ({ range, limit = 20 }: {
  range: IDBKeyRange | number | string | null;
  limit?: number;
}) => {
  let resData: any = [];
  await new Promise((resolve) => {
    indexDbDml({
      collectionName: config.logCollectionName,
      wa: 'readonly',
      get: {
        range, // IDBKeyRange.lowerBound(38, true)
        direction: 'prevunique',
        limit,
        cb: (data: any) => {
          resData = data;
          resolve(true);
        },
      },
    });
  });
  return resData;
};

export const clearLogCollection = () => {
  indexDbDml({
    collectionName: config.logCollectionName,
    clear: true,
  });
};
