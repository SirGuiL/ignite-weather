import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@__tests__/utils/customRender";

import { mockWeatherAPIResponse } from "@__tests__/mocks/api/mockWeatherAPIResponse";
import { Dashboard } from "@screens/Dashboard";
import { api } from "@services/api";
import { CityProps } from "@services/getCityByNameService";
import { saveStorageCity } from "@libs/asyncStorage/cityStorage";
import { mockCityAPIResponse } from "@__tests__/mocks/api/mockCityAPIResponse";

const city: CityProps = {
  id: "1",
  latitude: 123,
  longitude: 456,
  name: "Rio do Sul, BR",
};

describe("Screen: Dashboard", () => {
  it("should be show city weather", async () => {
    jest.spyOn(api, "get").mockResolvedValue({ data: mockWeatherAPIResponse });

    await saveStorageCity(city);

    render(<Dashboard />);

    const cityName = await waitFor(() => screen.findByText(/rio do sul/i));
    expect(cityName).toBeTruthy();
  });

  it("should be show another selected weather city", async () => {
    await saveStorageCity(city);

    jest
      .spyOn(api, "get")
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse })
      .mockResolvedValueOnce({ data: mockCityAPIResponse })
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse });

    render(<Dashboard />);

    waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

    const cityName = "São Paulo";
    await waitFor(() =>
      act(() => {
        const search = screen.getByTestId("search-input");
        fireEvent.changeText(search, cityName);
      })
    );

    await waitFor(() =>
      act(() => {
        fireEvent.press(screen.getByText(cityName, { exact: false }));
      })
    );

    expect(screen.getByText(cityName, { exact: false })).toBeTruthy();
  });
});
