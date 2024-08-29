import React, { useState } from "react";
import DestinationSearch from "./components/DestinationSearch";
import DestinationDetails from "./components/DestinationDetails";
import { Destination } from "./types/destination";

const App: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [query, setQuery] = useState<string>("");

  const handleSelectDestination = (destination: Destination) => {
    setSelectedDestination(destination);
    setQuery("");
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    if (newQuery.length === 0) {
      setSelectedDestination(null);
    }
  };

  return (
    <div className="container">
      <DestinationSearch
        onSelectDestination={handleSelectDestination}
        onQueryChange={handleQueryChange}
        showResults={query.length > 0 && !selectedDestination} 
      />
      {selectedDestination && (
        <DestinationDetails
          destination={selectedDestination}
          onSelectDestination={handleSelectDestination}
        />
      )}
    </div>
  );
};

export default App;
