import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React, { act } from "react";
import DestinationDetails from "./DestinationDetails";
import { fetchNearbyDestinations } from "../../api/fake-api";
import { Destination } from "../../types/destination";

jest.mock("../../api/fake-api", () => ({
  fetchNearbyDestinations: jest.fn(),
}));

const mockDestination: Destination = {
  id: 1,
  name: "Paris, France",
  description:
    "The City of Light, known for its iconic Eiffel Tower and world-class cuisine.",
  country: "France",
  climate: "Mild",
  currency: "Euro",
  latitude: 48.8566,
  longitude: 2.3522,
};

const mockNearbyDestinations: Destination[] = [
  {
    id: 3,
    name: "Barcelona, Spain",
    description:
      "A vibrant city famous for its unique architecture, including the Sagrada Familia.",
    country: "Spain",
    climate: "Mediterranean",
    currency: "Euro",
    latitude: 41.3851,
    longitude: 2.1734,
  },
  {
    id: 4,
    name: "Amsterdam, Netherlands",
    description:
      "Known for its picturesque canals, historic houses, and vibrant art scene.",
    country: "Netherlands",
    climate: "Maritime",
    currency: "Euro",
    latitude: 52.3702,
    longitude: 4.8952,
  },
];

describe("DestinationDetails Component", () => {
  beforeEach(() => {
    (fetchNearbyDestinations as jest.Mock).mockResolvedValue(
      mockNearbyDestinations
    );
  });

  it("renders destination details correctly", async () => {
    await act(async () => {
      render(
        <DestinationDetails
          destination={mockDestination}
          onSelectDestination={() => {}}
        />
      );
    });

    expect(screen.getByText(mockDestination.name)).toBeInTheDocument();

    expect(screen.getByText("Country:")).toBeInTheDocument();
    expect(screen.getByText(mockDestination.country)).toBeInTheDocument();

    expect(screen.getByText("Climate:")).toBeInTheDocument();
    expect(screen.getByText(mockDestination.climate)).toBeInTheDocument();

    expect(screen.getByText("Currency:")).toBeInTheDocument();
    expect(screen.getByText(mockDestination.currency)).toBeInTheDocument();

    expect(screen.getByText(mockDestination.description)).toBeInTheDocument();
  });

  it("handles destination selection", async () => {
    const onSelectDestination = jest.fn();

    render(
      <DestinationDetails
        destination={mockDestination}
        onSelectDestination={onSelectDestination}
      />
    );

    await waitFor(() => {
      expect(
        screen.getByText(mockNearbyDestinations[0].name)
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockNearbyDestinations[1].name)
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(mockNearbyDestinations[0].name));

    expect(onSelectDestination).toHaveBeenCalledWith(mockNearbyDestinations[0]);
    expect(onSelectDestination).toHaveBeenCalledTimes(1);
  });

  it("displays error message when fetching nearby destinations fails", async () => {
    (fetchNearbyDestinations as jest.Mock).mockRejectedValueOnce(
      new Error("Error fetching destinations")
    );

    await act(async () => {
      render(
        <DestinationDetails
          destination={mockDestination}
          onSelectDestination={() => {}}
        />
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch nearby destinations.")
      ).toBeInTheDocument();
    });
  });
});
