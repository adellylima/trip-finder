import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NearbyItemProps {
  isSelected: boolean;
}

export const NearbyItem = styled.div<NearbyItemProps>`
  padding: 6px 12px;
  background-color: ${(props) => (props.isSelected ? "#e0e0e0" : "#9d7ed5")};
  color: #fff;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;

  &:hover {
    background-color: #b39ddb;
  }
`;
export const DetailsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const DestinationTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 32px;
  color: #5f3e9a;
`;

export const DestinationInfo = styled.p`
  margin-bottom: 8px;
  font-size: 18px;
  color: #555;
`;

export const NearbyDestinationsContainer = styled.div`
  margin-top: 32px;
`;

export const NearbyTitle = styled.h3`
  margin-bottom: 16px;
  font-size: 24px;
  color: #5f3e9a;
`;

export const NearbyList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ErrorMessage = styled.p`
  color: #ff1744;
  margin-top: 16px;
`;

export const Icon = styled(FontAwesomeIcon)<{ color?: string }>`
  margin-right: 8px;
  color: ${(props) => (props.color ? props.color : "gray")};
`;
