import * as React from 'react';
import PageState from '../PageState';
import { notFoundImg, backToHomeClick } from '../../resources';
import styles from './index.module.scss';
import { goPage } from '../../utils';

interface IProps {
  style?: React.CSSProperties;
}

const goHome = () => goPage('/');

export default ({ style = {} }: IProps) => (
  <div className={styles.box} style={style}>
    <PageState style={{ height: 'auto' }} image={notFoundImg} tipText="Sorry, Page Not Found" />
    <div className={styles.backHome} onClick={goHome}>
      <div className={styles.backHomeIcon} style={{ backgroundImage: `url(${backToHomeClick})` }} />
      <span>Back to home</span>
    </div>
  </div>
);
