import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DestinationSearch from "./DestinationSearch";
import { fetchDestinations } from "../../api/fake-api";
import { Destination } from "../../types/destination";

jest.mock("../../api/fake-api");

const mockDestinations: Destination[] = [
  {
    id: 1,
    name: "Paris, France",
    description: "The City of Light, known for its iconic Eiffel Tower.",
    country: "France",
    climate: "Mild",
    currency: "Euro",
    latitude: 48.8566,
    longitude: 2.3522,
  },
  {
    id: 2,
    name: "Rome, Italy",
    description:
      "The Eternal City, home to ancient ruins like the Colosseum and Roman Forum.",
    country: "Italy",
    climate: "Mediterranean",
    currency: "Euro",
    latitude: 41.9028,
    longitude: 12.4964,
  },
];

describe("DestinationSearch Component", () => {
  const onSelectDestination = jest.fn();
  const onQueryChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <DestinationSearch
        onSelectDestination={onSelectDestination}
        onQueryChange={onQueryChange}
        showResults={false}
      />
    );

    expect(
      screen.getByPlaceholderText("Search for destinations")
    ).toBeInTheDocument();
    expect(screen.getByText("Trip Destination Finder")).toBeInTheDocument();
  });

  it("calls onQueryChange with the correct query", async () => {
    render(
      <DestinationSearch
        onSelectDestination={onSelectDestination}
        onQueryChange={onQueryChange}
        showResults={false}
      />
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Search for destinations"), {
        target: { value: "Paris" },
      });
    });

    expect(onQueryChange).toHaveBeenCalledWith("Paris");
  });

  it("displays fetched destinations", async () => {
    (fetchDestinations as jest.Mock).mockResolvedValueOnce(mockDestinations);

    render(
      <DestinationSearch
        onSelectDestination={onSelectDestination}
        onQueryChange={onQueryChange}
        showResults={true}
      />
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Search for destinations"), {
        target: { value: "Paris" },
      });
    });

    await waitFor(() => {
      expect(screen.getByText("Paris, France")).toBeInTheDocument();
    });
  });

  it("displays error message when fetch fails", async () => {
    (fetchDestinations as jest.Mock).mockRejectedValueOnce(
      new Error("Error fetching destinations.")
    );

    render(
      <DestinationSearch
        onSelectDestination={onSelectDestination}
        onQueryChange={onQueryChange}
        showResults={true}
      />
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Search for destinations"), {
        target: { value: "fail" },
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText("Error fetching destinations.")
      ).toBeInTheDocument();
    });
  });

  it("calls onSelectDestination with the correct destination when a result is clicked", async () => {
    (fetchDestinations as jest.Mock).mockResolvedValueOnce(mockDestinations);

    render(
      <DestinationSearch
        onSelectDestination={onSelectDestination}
        onQueryChange={onQueryChange}
        showResults={true}
      />
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Search for destinations"), {
        target: { value: "Paris" },
      });
    });

    await waitFor(() => {
      const parisElement = screen.getByText(
        (content, element) => element?.textContent === "Paris, France"
      );
      expect(parisElement).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Paris, France"));
    });

    expect(onSelectDestination).toHaveBeenCalledWith(mockDestinations[0]);
  });
});
