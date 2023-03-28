import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  padding: 1em 3em;
  background-color: #c2c2c2;

  ul {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.5em;

    a {
        font-size: 1.2em;
    }
  }

  svg{
    cursor: pointer;
  }
`;
