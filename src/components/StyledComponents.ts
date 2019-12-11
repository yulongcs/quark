import styled, { createGlobalStyle } from 'styled-components/macro';

export const StyledGlobal = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 4.266666666666667vw; /* 100 / 375 * 16 */
  }

  body, p {
    margin: 0;
    padding: 0;
  }

  @media screen and (min-width: 768px) {
    html {
      font-size: 16px;
    }
  }
`;

export const StyledCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
