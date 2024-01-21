import {
  getStorageCity,
  removeStorageCity,
  saveStorageCity,
} from "@libs/asyncStorage/cityStorage";
import { CityProps } from "@services/getCityByNameService";

const newCity: CityProps = {
  id: "1",
  latitude: 123,
  longitude: 456,
  name: "São Paulo",
};

describe("Storage: CityStorage", () => {
  it("should be return null when don't have city stored", async () => {
    const response = await getStorageCity();
    expect(response).toBeNull();
  });

  it("should be return city stored", async () => {
    await saveStorageCity(newCity);
    const response = await getStorageCity();

    expect(response).toEqual(newCity);
  });

  it("should be remove city storage", async () => {
    await saveStorageCity(newCity);
    await removeStorageCity();

    const response = await getStorageCity();
    expect(response).toBeNull();
  });
});
