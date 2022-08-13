import { Device, RawDeviceData } from "../../../types";

function populate(device: Device, deviceData: RawDeviceData) {
  const deviceName = Object.keys(deviceData)[0];
  const deviceProperties = deviceData[deviceName];
  const deviceConnected = deviceProperties["device_connected"] === "true";

  // Populate accessories
  if (deviceConnected) {
    const mainBatteryLevel = deviceProperties["device_batteryLevelMain"];
    device.accessories = [mainBatteryLevel ? { text: mainBatteryLevel, icon: { source: "" } } : {}];
  }

  // Populate icon and model
  switch (device.productId) {
    case MagicKeyboard.Models.Standard:
    case MagicKeyboard.Models.Numpad:
    case MagicKeyboard.Models.Fingerprint:
      device.icon = { source: "icons/devices/keyboard.svg" };
      break;
  }
  return device;
}

const MagicKeyboard = {
  Models: {
    Standard: "0x029C",
    Numpad: "0x029F",
    Fingerprint: "0x029A",
  },
  populate,
};

export default MagicKeyboard;
