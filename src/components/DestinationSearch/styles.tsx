import styled from "styled-components";

export const InputContent = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const Container = styled.div`
  padding: 20px;
  h1 {
    text-align: center;
    color: #5f3e9a;
  }
`;

export const Error = styled.div`
  color: #dc3545;
  font-size: 16px;
  padding: 10px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f1f1f1;
  }
`;
