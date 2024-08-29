import {
  fetchDestinations,
  fetchDestinationById,
  fetchNearbyDestinations,
} from "./fake-api";

describe("Destination Service", () => {
  beforeEach(() => {
    jest.spyOn(global, "setTimeout").mockImplementation((cb: any) => cb());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("fetchDestinations should return filtered destinations", async () => {
    const query = "Paris";
    const result = await fetchDestinations(query);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Paris, France");
  });

  test("fetchDestinations should throw error on fail query", async () => {
    await expect(fetchDestinations("fail")).rejects.toThrow(
      "Failed to fetch destinations"
    );
  });

  test("fetchDestinationById should return null for non-existing id", async () => {
    const result = await fetchDestinationById(999);
    expect(result).toBeNull();
  });

  test("fetchNearbyDestinations should return nearby destinations sorted by distance", async () => {
    const result = await fetchNearbyDestinations(48.8566, 2.3522);
    expect(result).toHaveLength(5);
    expect(result[0].name).toBe("Amsterdam, Netherlands"); 
  });
});
