import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
 
html {
    font-size: 62.5%;
}

body {
    font-size: 1.6rem;
    line-height: 1.6;
    font-family: "Poppins", sans-serif;
    background-color: #F0F8FF;
    color: #333;

}

`;

export default GlobalStyle;
