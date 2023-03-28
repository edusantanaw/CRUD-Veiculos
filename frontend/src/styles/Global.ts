import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        padding:0;
        margin: 0;
        box-sizing: border-box;
        font-family: "Roboto",sans-serif;
    }
    li {
        list-style: none;
    }

    a{
        text-decoration: none;
        color: #000;
    }
`;

export const Container = styled.section`
  width: 100%;
  height: 100%;
  padding: 1em 3em;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const boxStyles = {
  width: "80%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1em 0.1em",
};
