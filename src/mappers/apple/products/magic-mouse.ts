import { Color } from "@raycast/api";
import { Device, RawDeviceData } from "../../../types";

function populate(device: Device, deviceData: RawDeviceData) {
  const deviceName = Object.keys(deviceData)[0];
  const deviceProperties = deviceData[deviceName];
  const deviceConnected = deviceProperties["device_connected"] === "true";

  // Populate accessories
  if (deviceConnected) {
    const mainBatteryLevel = deviceProperties["device_batteryLevelMain"];
    device.accessories = [
      mainBatteryLevel
        ? { text: mainBatteryLevel, icon: { source: "icons/bolt.svg", tintColor: Color.PrimaryText } }
        : {},
    ];
  }

  // Populate icon and model
  switch (device.productId) {
    case MagicMouse.Models[1]:
    case MagicMouse.Models[2]:
      device.icon = { source: "icons/devices/magic-mouse.svg" };
      break;
  }
  return device;
}

const MagicMouse = {
  Models: {
    1: "0x030D",
    2: "0x0269",
  },
  populate,
};

export default MagicMouse;
