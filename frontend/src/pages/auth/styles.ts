import { FormGroup } from "@mui/material";
import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.1em;

  svg {
    font-size: 4em;
  }

  h2 {
    font-size: 2em;
    font-weight: 400;
  }

  a {
    text-decoration: underline;
    color: blueviolet;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 26em;
  padding: 1em;
  gap: 1em;

  input[type="submit"] {
    align-self: center;
    height: 3.5em;
    width: 100%;
    background-color: #9c27b0;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
    &:active {
      background-color: #9c27b7;
    }
  }
`;
