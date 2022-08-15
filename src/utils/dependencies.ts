function getBluetoothDependencies() {
  const blueutilPath = "/opt/homebrew/bin/";
  const systemProfilerPath = "/usr/sbin/";
  return { blueutilPath, systemProfilerPath };
}

const BluetoothDependencies = getBluetoothDependencies();
export default BluetoothDependencies;
