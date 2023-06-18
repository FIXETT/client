import { createGlobalStyle } from 'styled-components';

const globalStyle = createGlobalStyle`
@font-face {
  font-family: 'Pretendard';
  src: url('../assets/fonts/Pretendard-Regular.ttf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family: 'Pretendard';
  src: url('../assets/fonts/Pretendard-Medium.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family: 'Pretendard';
  src: url('../assets/fonts/Pretendard-Light.ttf') format('truetype');
  font-weight: 500;
}
@font-face {
  font-family: 'Pretendard';
  src: url('../assets/fonts/Pretendard-Bold.ttf') format('truetype');
  font-weight: 700;
}
@font-face {
  font-family: 'Pretendard';
  src: url('../assets/font/Pretendard-Black.ttf') format('truetype');
  font-weight: 900;
}

  html, body {
    padding: 0;
    margin: 0;
    line-height: 1;
    font-family: 'Pretendard', sans-serif;
  }

  * {
    box-sizing: border-box;
    list-style: none;
    padding: 0;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
  }

  a, span {
    text-decoration: none;
    color: inherit;
    font-size: inherit;
  }

  button{
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }

  input {
    outline: none;
    border: inherit;
  }
  :root{
    --primary:#066AFF;
    --green:#14AE5C;
    --gray: #999;
    --heading1: 48px;
    --heading2: 32px;
    --heading3: 20px;
    --heading4: 16px;
    --heading5: 18px;
    --heading6: 14px;
    --box-shadow: 0px 0px 21px 0px rgba(89, 102, 122, 0.1);
  }
`;

export default globalStyle;
