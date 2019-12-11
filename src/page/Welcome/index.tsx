import React, {
  useState, useRef, useEffect, useCallback, FC,
} from 'react';
import { getRandomRound } from '@vdfor/util';
import styled from 'styled-components/macro';
import { StyledCenter } from 'src/components';
import { goPage } from 'src/utils';
import { PRIMARY_COLOR } from 'src/constants';
import { TAGS } from './constants';

const getTagText = (): string => TAGS[getRandomRound(0, TAGS.length - 1)];

const WrapperView = styled(StyledCenter)`
  min-height: 100vh;
  flex-direction: column;
`;

const TagView = styled(StyledCenter)`
  font-size: 45px;
  color: #000000;
  font-weight: 500;
`;

const LinkView = styled(StyledCenter)`
  margin-top: 164px;
  font-size: 24px;
  font-weight: 400;
  cursor: pointer;
  color: #121314;
  /* padding: 8px; */
  position: relative;

  ::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 60%;
    left: -0.1em;
    right: -0.1em;
    bottom: 0;
    transition: top 200ms cubic-bezier(0, .8, .13, 1);
    background: ${PRIMARY_COLOR};
  }

  :hover {
    ::after {
      top: 0;
    }
  }
`;

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
    <WrapperView>
      <TagView>{tagText}</TagView>
      <LinkView onClick={goIndexPage}>ENTER</LinkView>
    </WrapperView>
  );
};

export default Welcome;
