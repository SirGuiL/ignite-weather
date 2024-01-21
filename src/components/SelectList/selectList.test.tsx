import { render, screen, fireEvent } from "@testing-library/react-native";

import { SelectList } from "@components/SelectList";
import { CityProps } from "@services/getCityByNameService";

describe("Component: SelectList", () => {
  it("should be return city details selected", () => {
    const data = [
      {
        id: "1",
        name: "São Paulo",
        latitude: 10,
        longitude: 10,
      },
      {
        id: "2",
        name: "Guarulhos",
        latitude: 10,
        longitude: 10,
      },
    ] as CityProps[];

    const onPress = jest.fn();

    render(<SelectList data={data} onChange={() => {}} onPress={onPress} />);

    const selectedCity = screen.getByText(/guarulhos/i);
    fireEvent.press(selectedCity);

    expect(onPress).toBeCalledWith(data[1]);
  });

  it("not should be show options when data props is empty", () => {
    render(<SelectList data={[]} onChange={() => {}} onPress={() => {}} />);

    const options = screen.getByTestId("options");
    expect(options.children).toHaveLength(0);
  });
});
