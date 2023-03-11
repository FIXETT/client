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
  
`;

export default globalStyle;
