import React, { useEffect, useState } from "react";
import { Destination } from "../../types/destination";
import { fetchNearbyDestinations } from "../../api/fake-api";
import LoadingSpinner from "../LoadingSpinner";
import {
  faGlobe,
  faThermometerFull,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import {
  DestinationInfo,
  DestinationTitle,
  DetailsContainer,
  ErrorMessage,
  Icon,
  NearbyDestinationsContainer,
  NearbyList,
  NearbyTitle,
  NearbyItem,
} from "./styles";

import styled from "styled-components";

interface DestinationDetailsProps {
  destination: Destination;
  onSelectDestination: (destination: Destination) => void;
}

const DestinationDetails: React.FC<DestinationDetailsProps> = ({
  destination,
  onSelectDestination,
}) => {
  const [nearbyDestinations, setNearbyDestinations] = useState<Destination[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  useEffect(() => {
    const fetchNearby = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await fetchNearbyDestinations(
          destination.latitude,
          destination.longitude
        );
        setNearbyDestinations(results);
      } catch (err) {
        setError("Failed to fetch nearby destinations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNearby();
  }, [destination]);

  useEffect(() => {
    setSelectedDestination(null);
  }, [destination]);

  const handleSelect = (destination: Destination) => {
    setSelectedDestination(destination);
    onSelectDestination(destination);
  };

  return (
    <DetailsContainer>
      <DestinationTitle>{destination.name}</DestinationTitle>
      <DestinationInfo>
        <Icon icon={faGlobe} />
        <strong>Country:</strong> {destination.country}
      </DestinationInfo>
      <DestinationInfo>
        <Icon icon={faThermometerFull} />
        <strong>Climate:</strong> {destination.climate}
      </DestinationInfo>
      <DestinationInfo>
        <Icon icon={faDollarSign} />
        <strong>Currency:</strong> {destination.currency}
      </DestinationInfo>
      <DestinationInfo>{destination.description}</DestinationInfo>

      <NearbyDestinationsContainer>
        <NearbyTitle>Nearby Destinations</NearbyTitle>
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!isLoading && !error && (
          <NearbyList>
            {nearbyDestinations.map((nearby) => (
              <NearbyItem
                key={nearby.id}
                isSelected={selectedDestination?.id === nearby.id}
                onClick={() => handleSelect(nearby)}
              >
                {nearby.name}
              </NearbyItem>
            ))}
          </NearbyList>
        )}
      </NearbyDestinationsContainer>
    </DetailsContainer>
  );
};

export default DestinationDetails
