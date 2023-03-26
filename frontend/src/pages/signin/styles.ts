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
`;

export const Form = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  width: 26em;
  padding: 1em;
  gap: 1.5em;
`;
