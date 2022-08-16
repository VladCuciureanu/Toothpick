import { Device, RawDeviceData } from "../../types";

export default function mapGenericDevice(deviceData: RawDeviceData): Device {
  // Extract useful data
  const deviceName = Object.keys(deviceData)[0];
  const deviceProperties = deviceData[deviceName];
  const deviceModel = deviceProperties["device_minorType"];
  const deviceConnected = deviceProperties["device_connected"] === "true";

  // Get device icon path
  let deviceIconPath = undefined;
  switch (deviceModel) {
    case "Keyboard":
      deviceIconPath = "icons/devices/keyboard.svg";
      break;
    case "Mouse":
      deviceIconPath = "icons/devices/mouse.svg";
      break;
    case "Headphones":
      deviceIconPath = "icons/devices/headphones.svg";
      break;
    case "Speaker":
      deviceIconPath = "icons/devices/speaker.svg";
      break;
    default:
      deviceIconPath = "icons/devices/bluetooth.svg";
      break;
  }

  return {
    name: deviceName,
    icon: { source: deviceIconPath },
    model: deviceModel,
    accessories: [],
    macAddress: deviceProperties["device_address"],
    connected: deviceConnected,
    productId: deviceProperties["device_productID"],
    actions: [],
  };
}
