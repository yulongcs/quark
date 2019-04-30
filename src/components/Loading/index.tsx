import * as React from 'react';
import styles from './index.module.scss';

interface IProps {
  style?: React.CSSProperties;
}

export default ({ style = {} }: IProps) => (
  <div className={styles.box} style={style}>
    <div>
      <div className={`${styles.line} ${styles.line1}`} />
      <div className={`${styles.line} ${styles.line2}`} />
      <div className={`${styles.line} ${styles.line3}`} />
      <div className={`${styles.line} ${styles.line4}`} />
    </div>
  </div>
);
