import mapAppleDevice from "../mappers/apple";
import mapGenericDevice from "../mappers/generic";
import { readFileSync } from "fs";
import { runAppleScriptSync } from "run-applescript";
import { Device, RawDeviceData } from "../types";
import { resolve } from "path";

export function getDevices(): Device[] {
  const devicesData = _fetchRawDevicesData();
  const mappedDevices = devicesData.map((deviceData) => _mapDevice(deviceData));
  return mappedDevices;
}

export function openConnection(deviceMacAddress: string) {
  const formattedMacAddress = deviceMacAddress.toUpperCase().replaceAll(":", "-");
  const script = readFileSync(resolve(__dirname, "assets/scripts/connectDevice.applescript")).toString();
  const result = runAppleScriptSync(
    `${script}\n\nreturn connectDevice(getFirstMatchingDevice("${formattedMacAddress}"))`
  );
  if (result !== "0") throw "Failed to connect device.";
}

export function closeConnection(deviceMacAddress: string) {
  const formattedMacAddress = deviceMacAddress.toUpperCase().replaceAll(":", "-");
  const script = readFileSync(resolve(__dirname, "assets/scripts/disconnectDevice.applescript")).toString();
  const result = runAppleScriptSync(
    `${script}\n\nreturn disconnectDevice(getFirstMatchingDevice("${formattedMacAddress}"))`
  );
  if (result !== "0") throw "Failed to disconnect device.";
}

function _fetchRawDevicesData(): RawDeviceData[] {
  // Fetch bluetooth data
  const script = readFileSync(resolve(__dirname, "assets/scripts/getAllDevices.applescript")).toString();
  const fetchedData = runAppleScriptSync(`${script}`);

  // Parse fetched data
  const rawData: Array<Record<string, RawDeviceData[]>> = JSON.parse(fetchedData)["SPBluetoothDataType"];

  // Extract useful data for further processing
  const untypedConnectedDevices: RawDeviceData[] = rawData.flatMap((controller) => controller["device_connected"]);
  const untypedDisconnectedDevices: RawDeviceData[] = rawData.flatMap(
    (controller) => controller["device_not_connected"]
  );

  // Inject connection status
  untypedConnectedDevices.forEach((device) => _injectConnectionStatus(device, true));
  untypedDisconnectedDevices.forEach((device) => _injectConnectionStatus(device, false));

  // Merge all devices into one array
  return [...untypedConnectedDevices, ...untypedDisconnectedDevices];
}

function _injectConnectionStatus(device: RawDeviceData, isConnected: boolean) {
  const deviceName = Object.keys(device)[0];
  device[deviceName]["device_connected"] = isConnected ? "true" : "false";
}

function _mapDevice(deviceData: RawDeviceData): Device {
  let device = undefined;

  // Extract useful properties
  const deviceName = Object.keys(deviceData)[0];
  const deviceProperties = deviceData[deviceName];
  const deviceVendorId = deviceProperties["device_vendorID"];
  const deviceConnected = deviceProperties["device_connected"] === "true";

  // Map device by vendor
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
