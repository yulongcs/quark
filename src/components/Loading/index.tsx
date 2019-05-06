import * as React from 'react';
import styles from './index.module.scss';

interface IProps {
  style?: React.CSSProperties;
  color?: string;
}

export default ({ style = {}, color = '#f03d3e' }: IProps) => (
  <div className={styles.box} style={style}>
    <div>
      <div className={`${styles.line} ${styles.line1}`} style={{ backgroundColor: color }} />
      <div className={`${styles.line} ${styles.line2}`} style={{ backgroundColor: color }} />
      <div className={`${styles.line} ${styles.line3}`} style={{ backgroundColor: color }} />
      <div className={`${styles.line} ${styles.line4}`} style={{ backgroundColor: color }} />
    </div>
  </div>
);
