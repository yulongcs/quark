export const setRequestTaskToGlobalData = (key: string, val: any) => {
  if (!window) {
    return;
  }
  const tasks = (window as any).requestTasks;
  if (!tasks) {
    (window as any).requestTasks = {
      [key]: val
    };
    return;
  }
  (window as any).requestTasks[key] = val;
};

export const getRequestTaskFromGlobalData = (key: string) => {
  if (!window) {
    return undefined;
  }
  const tasks = (window as any).requestTasks || {};
  return tasks[key];
};

export const removeRequestTaskFromGlobalData = (key: string) => {
  if (!window) {
    return;
  }
  const tasks = (window as any).requestTasks || {};
  delete tasks[key];
};

export const requestAbort = (taskName: string) => {
  const controller = getRequestTaskFromGlobalData(taskName);
  if (controller) {
    controller.abort();
  }
};
