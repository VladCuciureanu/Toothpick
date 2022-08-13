import fetchDevicesData from "./fetchDevicesData";
import mapAppleDevice from "./mappers/apple";
import mapGenericDevice from "./mappers/generic";
import { Device, RawDeviceData } from "./types";

export default function getDevices(): Device[] {
  const devicesData = fetchDevicesData();
  const mappedDevices = devicesData.map((deviceData) => mapDevice(deviceData));
  return mappedDevices;
}

function mapDevice(deviceData: RawDeviceData): Device {
  let device = undefined;

  // Extract useful data
  const deviceName = Object.keys(deviceData)[0];
  const deviceProperties = deviceData[deviceName];
  const deviceVendorId = deviceProperties["device_vendorID"];
  const deviceConnected = deviceProperties["device_connected"] === "true";

  // Map devices by vendor
  switch (deviceVendorId) {
    case "0x004C": // Apple
      device = mapAppleDevice(deviceData);
      break;
    default:
      device = mapGenericDevice(deviceData);
      break;
  }

  // Modify icon path to reflect connection state
  if (deviceConnected) {
    device.icon.source = device.icon.source.toString().replace("icons/devices/", "icons/devices/connected/");
  }

  return device;
}
