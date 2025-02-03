import { getPreferenceValues } from "@raycast/api";
import { getDevicesService } from "src/core/devices/devices.service";

export default async function () {
  const { bluetoothBackend } = getPreferenceValues<ExtensionPreferences>();
  const devicesService = getDevicesService(bluetoothBackend);

  if (!devicesService) {
    throw new Error("Could not find 'blueutil'!");
  }

  const devices = devicesService.getDevices();

  // Note(Vlad): Classes mess this up a bit so I had to do the serializing/deserializing thingy
  return JSON.parse(JSON.stringify(devices));
}
