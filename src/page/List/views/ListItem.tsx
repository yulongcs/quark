import React from 'react';
import styles from './list-item.module.scss';
import { IListData } from '../type';

export default ({ title, desc }: IListData) => (
  <div className={styles.box}>
    <div className={styles.header}>{title}</div>
    <div className={styles.desc}>{desc}</div>
  </div>
);
