import AppleDevices from "./apple";
import BoseDevices from "./bose";
import GoogleDevices from "./google";
import SamsungDevices from "./samsung";
import SonyDevices from "./sony";
import UgreenDevices from "./ugreen";
import JabraDevices from "./jabra";
import { DeviceDefinition } from "src/types/device";

export const DevicesMap: Record<string, Record<string, DeviceDefinition>> = {
  "0x004C": AppleDevices,
  "0x009E": BoseDevices,
  "0x00E0": GoogleDevices,
  "0x0075": SamsungDevices,
  "0x054C": SonyDevices,
  "0x005D": UgreenDevices,
  "0x0067": JabraDevices,
};
