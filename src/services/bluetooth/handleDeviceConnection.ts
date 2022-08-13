import { execSync } from "child_process";
import BluetoothDependencies from "src/utils/dependencies";

export function connectDevice(deviceMacAddress: string) {
  execSync(`blueutil --connect ${deviceMacAddress} --wait-connect ${deviceMacAddress} 15`, {
    env: { PATH: BluetoothDependencies.blueutilPath },
  });
}

export function disconnectDevice(deviceMacAddress: string) {
  execSync(`blueutil --disconnect ${deviceMacAddress} --wait-disconnect ${deviceMacAddress} 15`, {
    env: { PATH: BluetoothDependencies.blueutilPath },
  });
}
