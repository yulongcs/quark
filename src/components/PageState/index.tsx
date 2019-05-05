import * as React from 'react';
import styles from './index.module.scss';

interface IProps {
  style?: React.CSSProperties;
  state?: 'empty' | 'error';
  image?: string;
}

const states = {
  empty: {
    imgClassName: 'imgEmpty',
    tipText: 'No Data'
  },
  error: {
    imgClassName: 'imgError',
    tipText: 'Sorry, Page Error'
  }
};

export default ({ style = {}, state = 'empty', image }: IProps) => {
  const matchState = states[state] || {};
  return (
    <div className={styles.box} style={{ ...style, ...(image ? { backgroundImage: `url(${image})` } : {}) }}>
      <div className={`${styles.img} ${matchState.imgClassName}`} />
      <p className={styles.tip}>{matchState.tipText}</p>
    </div>
  );
};
