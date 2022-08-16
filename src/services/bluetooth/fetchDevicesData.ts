import { RawDeviceData } from "./types";
import { readFileSync } from "fs";
import { runAppleScriptSync } from "run-applescript";
import { resolve } from "path";

export default function fetchDevicesData(): RawDeviceData[] {
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
  untypedConnectedDevices.forEach((device) => injectConnectionStatus(device, true));
  untypedDisconnectedDevices.forEach((device) => injectConnectionStatus(device, false));

  // Merge all devices into one array
  return [...untypedConnectedDevices, ...untypedDisconnectedDevices];
}

function injectConnectionStatus(device: RawDeviceData, isConnected: boolean) {
  const deviceName = Object.keys(device)[0];
  device[deviceName]["device_connected"] = isConnected ? "true" : "false";
}
