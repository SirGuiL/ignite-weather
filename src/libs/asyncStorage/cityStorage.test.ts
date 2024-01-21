import { getStorageCity } from "@libs/asyncStorage/cityStorage";

describe("Storage: CityStorage", () => {
  it("Should be return null when don't have city stored", async () => {
    const response = await getStorageCity();
    expect(response).toBeNull();
  });
});
