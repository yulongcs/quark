import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DATA_QUARK_SELECTOR_ID } from '../../constants';
import styles from './index.module.scss';

interface IToastProps {
  status: 'fail' | 'success';
  content: string | React.ReactElement;
  duration: number;
}

const DATA_QUARK_TOAST_ID = 'data-quark-toast';

const iconClassNames = {
  fail: 'iconFail'
};

const Toast = ({ content, status }: IToastProps) => (
  <div className={`${styles.box} ${styles.boxMask}`}>
    <div className={styles.main}>
      <div className={`${styles.icon} ${iconClassNames[status] ? styles[iconClassNames[status]] : ''}`} />
      <div className={styles.content}>{content}</div>
    </div>
  </div>
);

let durationTimer: any = null;

const hide = () => {
  if (durationTimer) {
    clearTimeout(durationTimer);
  }
  const toastEle = document.querySelector(`[${DATA_QUARK_SELECTOR_ID}=${DATA_QUARK_TOAST_ID}]`);
  if (toastEle) {
    toastEle.remove();
  }
};

const show = (props: IToastProps) => {
  hide();
  const div = document.createElement('div');
  div.setAttribute(DATA_QUARK_SELECTOR_ID, DATA_QUARK_TOAST_ID);
  document.body.appendChild(div);
  ReactDOM.render(<Toast {...props} />, div);
  if (props.duration > 0) {
    durationTimer = setTimeout(() => {
      hide();
    }, props.duration * 1000);
  }
};

export default {
  fail: (content: string = '', duration: number = 2) => show({ content, duration, status: 'fail' }),
  destroy: hide
};
