import * as React from 'react';
import styles from './index.module.scss';

interface IProps {
  style?: React.CSSProperties;
}

export default ({ style = {} }: IProps) => (
  <div className={styles.box} style={style}>
    <div className={styles.img} />
    <p className={styles.tip}>Sorry, Page Error</p>
  </div>
);
