import { createGlobalStyle } from 'styled-components';

const globalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    line-height: 1;
  }

  * {
    box-sizing: border-box;
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  button{
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }
  input {
    border: 0;
    outline: none;
  }
  :root{
    --primary:#5A3092;
    --sub:#E4CCFF;
    --black: #363630;
    --gray: #F2F2F2;
    --gray2: #8f97b2;
    --heading1: 48px;
    --heading2: 24px;
    --heading3: 20px;
    --heading4: 16px;
    --heading5: 12px;
    --heading6: 10px;
    --box-shadow: 0px 0px 21px 0px rgba(89, 102, 122, 0.1);
  }
`;

export default globalStyle;
