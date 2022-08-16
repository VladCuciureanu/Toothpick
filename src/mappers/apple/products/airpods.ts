import { Device, RawDeviceData } from "src/types";

function populate(device: Device, deviceData: RawDeviceData) {
  const deviceName = Object.keys(deviceData)[0];
  const deviceProperties = deviceData[deviceName];
  const deviceConnected = deviceProperties["device_connected"] === "true";

  // Populate accessories
  if (deviceConnected) {
    const caseBatteryLevel = deviceProperties["device_batteryLevelCase"];
    const leftAirpodBatteryLevel = deviceProperties["device_batteryLevelLeft"];
    const rightAirpodBatteryLevel = deviceProperties["device_batteryLevelRight"];

    device.accessories = [
      caseBatteryLevel ? { text: caseBatteryLevel, icon: { source: "" } } : {},
      leftAirpodBatteryLevel ? { text: leftAirpodBatteryLevel, icon: { source: "" } } : {},
      rightAirpodBatteryLevel ? { text: rightAirpodBatteryLevel, icon: { source: "" } } : {},
    ];
  }

  // Populate icon and model
  switch (device.productId) {
    case Airpods.Models[1]:
    case Airpods.Models[2]:
      device.icon = { source: "icons/devices/airpods.svg" };
      break;
    case Airpods.Models[3]:
      device.icon = { source: "icons/devices/airpods.gen3.svg" };
      break;
    case Airpods.Models.Pro:
      device.icon = { source: "icons/devices/airpodspro.svg" };
      break;
    case Airpods.Models.Max:
      device.icon = { source: "icons/devices/airpodsmax.svg" };
      break;
  }
  return device;
}

const Airpods = {
  Models: {
    1: "0x2002",
    2: "0x200F",
    3: "0x2013",
    Pro: "0x200E",
    Max: "0x200A",
  },
  populate,
};

export default Airpods;
