import { execSync } from "child_process";

function getBluetoothDependencies() {
  let blueutilPath = execSync("which blueutil").toString();
  let systemProfilerPath = execSync("which system_profiler").toString();
  blueutilPath = blueutilPath.slice(0, blueutilPath.lastIndexOf("/"));
  systemProfilerPath = systemProfilerPath.slice(0, systemProfilerPath.lastIndexOf("/"));
  return { blueutilPath, systemProfilerPath };
}

const BluetoothDependencies = getBluetoothDependencies();

export default BluetoothDependencies;
