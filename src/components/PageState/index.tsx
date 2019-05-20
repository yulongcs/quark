import * as React from 'react';
import { errorImg, emptyImg } from './constant';
import styles from './index.module.scss';

interface IProps {
  style?: React.CSSProperties;
  state?: 'empty' | 'error';
  image?: string;
  tipText?: string | React.ReactElement;
}

const states = {
  empty: {
    image: emptyImg,
    tipText: 'No Data'
  },
  error: {
    image: errorImg,
    tipText: 'Sorry, Page Error'
  }
};

export default ({
  style = {}, state = 'empty', image, tipText
}: IProps) => {
  const matchState = states[state] || {};
  return (
    <div className={styles.box} style={style}>
      <div className={styles.imgWrap}>
        <img alt="pic" className={styles.image} src={image || matchState.image} />
      </div>
      <div className={styles.tip}>{tipText || matchState.tipText}</div>
    </div>
  );
};
