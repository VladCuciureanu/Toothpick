import { showToast, Toast, getPreferenceValues, closeMainWindow } from "@raycast/api";
import { openConnection, closeConnection } from "src/services/devices";

export function connectDevice(deviceMacAddress: string) {
  showToast({ style: Toast.Style.Animated, title: "Connecting..." });
  try {
    openConnection(deviceMacAddress);
  } catch (error) {
    showToast({ style: Toast.Style.Failure, title: "Failed to connect." });
    return;
  }
  showToast({ style: Toast.Style.Success, title: "Device connected successfully." });
  const { closeOnSuccessfulConnection } = getPreferenceValues();
  if (closeOnSuccessfulConnection) {
    closeMainWindow();
  }
}

export function disconnectDevice(deviceMacAddress: string) {
  showToast({ style: Toast.Style.Animated, title: "Disconnecting..." });
  try {
    closeConnection(deviceMacAddress);
  } catch {
    showToast({ style: Toast.Style.Failure, title: "Failed to disconnect." });
    return;
  }
  showToast({ style: Toast.Style.Success, title: "Device disconnected successfully." });
}
