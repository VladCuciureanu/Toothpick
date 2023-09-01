import { existsSync } from "fs";
import { execSync } from "child_process";
import { Device } from "./devices.model";
import ApplescriptDevicesService from "./devices.service.applescript";

const brewPaths = ["/opt/homebrew/bin", "/usr/local/bin", "/usr/bin", "/bin"];

export default class BlueutilDevicesService extends ApplescriptDevicesService {
  envVars = process.env;

  constructor() {
    super();

    let blueutilDiscovered = false;
    brewPaths.forEach((path) => {
      if (blueutilDiscovered) return;

      blueutilDiscovered = blueutilDiscovered || existsSync(`${path}/blueutil`);
      this.envVars = { ...process.env, PATH: `${process.env.PATH}:${path}:` };
    });

    if (blueutilDiscovered) {
      console.info("Discovered blueutil!");
    } else {
      throw new Error("Could not find 'blueutil'!");
    }
  }

  getDevices(): Device[] {
    return super.getDevices();
  }

  connectDevice(mac: string): boolean {
    try {
      execSync(`blueutil --connect ${mac} --wait-connect ${mac} 5`, {
        env: this.envVars,
      });
      return true;
    } catch {
      return false;
    }
  }

  disconnectDevice(mac: string): boolean {
    try {
      execSync(`blueutil --disconnect ${mac} --wait-disconnect ${mac} 5`, {
        env: this.envVars,
      });
      return true;
    } catch {
      return false;
    }
  }
}
