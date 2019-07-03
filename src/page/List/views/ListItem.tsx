import React from 'react';
import dayjs from 'dayjs';
import styles from './list-item.module.scss';
import { IListData } from '../type';

export default React.memo(({ title, desc, time }: IListData) => (
  <div className={styles.box}>
    <div className={styles.header}>{title}</div>
    <div className={styles.desc}>{desc}</div>
    <div className={styles.footer}>
      <div className={styles.time}>{dayjs(time).format('YYYY-MM-DD HH:mm')}</div>
    </div>
  </div>
));
