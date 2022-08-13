import { execSync } from "child_process";
import BluetoothDependencies from "src/utils/dependencies";
import { RawDeviceData } from "./types";

export default function fetchDevicesData(): RawDeviceData[] {
  // Fetch bluetooth data
  const fetchedData = execSync("system_profiler SPBluetoothDataType -json", {
    env: { PATH: BluetoothDependencies.systemProfilerPath },
  }).toString();

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
