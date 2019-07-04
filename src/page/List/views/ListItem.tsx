import React from 'react';
import dayjs from 'dayjs';
import styles from './list-item.module.scss';
import { IListData } from '../type';
import { goPage } from '../../../utils';

export default React.memo(({
  id, title, desc, time
}: IListData) => (
  <div className={styles.box} onClick={() => goPage(`/list-detail/${id}`)}>
    <div className={styles.header}>{title}</div>
    <div className={styles.desc}>{desc}</div>
    <div className={styles.footer}>
      <div className={styles.time}>{dayjs(time).format('YYYY-MM-DD HH:mm')}</div>
    </div>
  </div>
));
