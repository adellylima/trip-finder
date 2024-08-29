import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #ddd;
  border-top-color: #5f3e9a;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

const LoadingSpinner: React.FC = () => {
  return <Spinner data-testid="loading-spinner" />;
};

export default LoadingSpinner;
