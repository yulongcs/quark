import styled, { createGlobalStyle } from 'styled-components/macro';
import { BREAK_POINT_768 } from '../constants';
import { pxToRem } from '../utils';

export const StyledGlobal = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 3.7333333333333334vw; /* 100 / 375 * 14 */
  }

  body {
    font-size: ${pxToRem(28)} !important;
  }

  @media screen and (min-width: ${BREAK_POINT_768}) {
    html {
      font-size: 21.6pX;
    }

    body {
      width: ${BREAK_POINT_768};
      margin: 0 auto !important;
    }
  }
`;

export const StyledCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
