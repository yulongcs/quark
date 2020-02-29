import React, { CSSProperties, memo } from 'react';
import styled from 'styled-components/macro';
import { errorStateImg, emptyStateImg } from '@/assets';
import { pxTransform } from '@/utils';
import { StyledCenter } from './StyledComponents';

interface ISectionStateProps {
  style?: CSSProperties;
  type: 'empty' | 'error';
  imgUrl?: string;
  text?: string;
  onTextClick?: () => void;
}

const defaultValues = {
  empty: {
    text: '空空如也~',
    imgUrl: emptyStateImg,
  },
  error: {
    text: '页面出错了~',
    imgUrl: errorStateImg,
  },
};

const WrapperView = styled(StyledCenter)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ImgWrapView = styled(StyledCenter)`
  max-width: ${pxTransform(240)};
`;

const ImageView = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const TextView = styled.p`
  color: #9b9b9b;
  font-size: ${pxTransform(28)};
  margin-top: ${pxTransform(16)};
`;

export default memo(({
  style = {}, imgUrl = '', text = '', type, onTextClick,
}: ISectionStateProps) => {
  const { text: defaultText = '', imgUrl: defaultImgUrl = '' } = defaultValues[type] || {};
  const selfOnTextClick = () => {
    if (onTextClick) {
      onTextClick();
    }
  };
  return (
    <WrapperView style={style}>
      <ImgWrapView>
        <ImageView src={imgUrl || defaultImgUrl} />
      </ImgWrapView>
      <TextView onClick={selfOnTextClick}>{text || defaultText}</TextView>
    </WrapperView>
  );
});
