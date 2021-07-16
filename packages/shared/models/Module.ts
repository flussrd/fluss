import Location from "./Location";
import Wqi from "./Wqi";

import ModuleState from "./ModuleState";

type Module = {
  id: string;
  alias: string;
  watershedId: string;
  state: ModuleState;
  phoneNumber: string;
  serial: string;
  creationDate: Date;
  updateDate: Date;
  location: Location;
  wqi: Wqi; // Water Quality Index.
  batteryLevel: number;
};

export function mockModules(): Module[] {
  return [
    {
      id: "MD-1",
      alias: "Estación sureste",
      location: {
        latitude: 17.738521,
        longitude: -71.364997,
      },
      updateDate: new Date(2021, 6, 11),
      creationDate: new Date(2021, 6, 11),
      serial: "ABCD230492",
      watershedId: "WS-1",
      phoneNumber: "8093453921",
      state: "active",
      wqi: { value: 80, rating: "good" },
      batteryLevel: 80,
    },
    {
      id: "MD-2",
      alias: "Hispaniola",
      location: {
        latitude: 19.827039,
        longitude: -71.679716,
      },
      updateDate: new Date(2021, 6, 11),
      creationDate: new Date(2021, 6, 11),
      serial: "ABCD230493",
      watershedId: "WS-2",
      phoneNumber: "8493421921",
      state: "active",
      wqi: { rating: "moderate", value: 23 },
      batteryLevel: 30,
    },
  ];
}
export default Module;

