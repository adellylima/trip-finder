import React, { useEffect, useState } from "react";
import { Destination } from "../../types/destination";
import { fetchDestinations } from "../../api/fake-api";
import LoadingSpinner from "../LoadingSpinner";
import FormControl from 'react-bootstrap/FormControl';
import { Container, InputContent, List, ListItem, Error } from "./styles";
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { Icon } from "../DestinationDetails/styles";

interface Props {
  onSelectDestination: (destination: Destination) => void;
  onQueryChange: (query: string) => void;
  showResults: boolean;
}

const DestinationSearch: React.FC<Props> = ({
  onSelectDestination,
  onQueryChange,
  showResults,
}) => {
  const [query, setQuery] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    onQueryChange(query);
    const searchDestinations = async () => {
      if (query.length >= 1) {
        setLoading(true);
        setError("");
        try {
          const result = await fetchDestinations(query);
          setDestinations(result);
        } catch (err) {
          setError("Error fetching destinations.");
        } finally {
          setLoading(false);
        }
      } else {
        setDestinations([]);
      }
    };

    searchDestinations();
  }, [query, onQueryChange]);

  return (
    <Container>
      <h1>Trip Destination Finder</h1>
      <InputContent>
        <FormControl
          type="text"
          value={query}
          onChange={(e: any) => setQuery(e.target.value)}
          placeholder="Search for destinations"
          aria-label="Search destinations"
        />
        {loading && <LoadingSpinner />}
        {error && <Error><Icon color={"red"} icon={faWarning} />{error}</Error>}
      </InputContent>
      {showResults && destinations.length > 0 && (
        <List>
          {destinations.map((destination) => (
            <ListItem
              key={destination.id}
              onClick={() => onSelectDestination(destination)}
            >
              {destination.name}
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};


export default DestinationSearch;
