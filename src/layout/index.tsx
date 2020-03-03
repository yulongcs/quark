import React, { PropsWithChildren } from 'react';
import styles from './index.css';

const BasicLayout: React.FC = ({ children }: PropsWithChildren<any>) => (
  <div className={styles.normal}>
    <h1 className={styles.title}>Yay! Welcome to umi!</h1>
    {children}
  </div>
);

export default BasicLayout;
