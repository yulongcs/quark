import React, {
  useState, useRef, useEffect, useCallback, FC,
} from 'react';
import { getRandomRound } from '@vdfor/util';
import { goPage } from '@/utils';
import { TAGS } from './constants';
import styles from './index.scss';

const getTagText = (): string => TAGS[getRandomRound(0, TAGS.length - 1)];

const goIndexPage = () => goPage('/index');

const Welcome: FC = () => {
  const timer: any = useRef(null);
  const [tagText, setTagText] = useState(getTagText());

  const clearTimer = () => {
    if (timer && timer.current) {
      clearTimeout(timer.current);
    }
  };

  const animate = useCallback(() => {
    clearTimer();
    timer.current = setTimeout(() => {
      setTagText(getTagText());
      animate();
    }, Math.random() * 300 + 200);
  }, []);

  useEffect(() => {
    animate();
    return () => {
      clearTimer();
    };
  }, [animate]);

  return (
    <div className={`v-styled-center ${styles.wrapper}`}>
      <div className={`v-styled-center ${styles.tag}`}>{tagText}</div>
      <div className={`v-styled-center ${styles.link}`} onClick={goIndexPage}>ENTER</div>
    </div>
  );
};

export default Welcome;
