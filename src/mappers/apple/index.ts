import { Device, RawDeviceData } from "../../types";
import mapGenericDevice from "../generic";
import Airpods from "./products/airpods";
import MagicKeyboard from "./products/magic-keyboard";
import MagicMouse from "./products/magic-mouse";

export default function mapAppleDevice(deviceData: RawDeviceData): Device {
  // Extract useful data
  const deviceName = Object.keys(deviceData)[0];
  const deviceProperties = deviceData[deviceName];
  const deviceProductId = deviceProperties["device_productID"];
  const deviceConnected = deviceProperties["device_connected"] === "true";

  // Build base device object
  let device: Device = {
    name: deviceName,
    macAddress: deviceProperties["device_address"],
    connected: deviceConnected,
    icon: { source: "icons/devices/bluetooth.svg" },
    productId: deviceProductId,
    model: undefined,
    accessories: [],
    actions: [],
  };

  // Map object to corresponding populate method
  if (Object.values(Airpods.Models).includes(deviceProductId)) {
    device = Airpods.populate(device, deviceData);
  } else if (Object.values(MagicKeyboard.Models).includes(deviceProductId)) {
    device = MagicKeyboard.populate(device, deviceData);
  } else if (Object.values(MagicMouse.Models).includes(deviceProductId)) {
    device = MagicMouse.populate(device, deviceData);
  } else {
    return mapGenericDevice(deviceData);
  }

  return device;
}
