import styled from "styled-components";

export const boxStyles = {
  width: "80%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1em 0.1em",
};

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  .inputs {
    width: 100%;
    gap: 1em;
    display: flex;
    flex-direction: column;
}

  input[type="submit"] {
    width: 10em;
    align-self: center;
    height: 2.5em;
    color: #fff;
    background-color: blueviolet;
    font-size: 1.1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        opacity: 0.9;
    }

    &:active{
        opacity: 1.1;
    }
  }
`;
