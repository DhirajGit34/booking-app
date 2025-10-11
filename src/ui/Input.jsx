import styled from "styled-components";

const Input = styled.input`
  font-size: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 5px;
  box-sizing: border-box;
  width: 100%;
  max-width: 36rem;
  justify-self: start;
  &::placeholder {
    color: #aaa;
  }
  &:hover {
    border-color: #007bff;
  }
`;

export default Input;
