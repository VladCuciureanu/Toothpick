import { Action, Color, showToast, Toast } from "@raycast/api";
import { closeConnection, openConnection } from "src/services/devices";
import { Device, RawDeviceData } from "../../types";

export default function mapGenericDevice(deviceData: RawDeviceData): Device {
  // Extract useful data
  const deviceName = Object.keys(deviceData)[0];
  const deviceProperties = deviceData[deviceName];
  const deviceModel = deviceProperties["device_minorType"];
  const deviceMacAddress = deviceProperties["device_address"];
  const deviceVendorId = deviceProperties["device_vendorID"];
  const deviceProductId = deviceProperties["device_productID"];
  const deviceConnected = deviceProperties["device_connected"] === "true";

  // Get device icon path
  let deviceIconPath = undefined;
  switch (deviceModel) {
    case "Keyboard":
      deviceIconPath = "icons/devices/keyboard.svg";
      break;
    case "Mouse":
      deviceIconPath = "icons/devices/mouse.svg";
      break;
    case "Headphones":
      deviceIconPath = "icons/devices/headphones.svg";
      break;
    case "Speaker":
      deviceIconPath = "icons/devices/speaker.svg";
      break;
    default:
      deviceIconPath = "icons/devices/bluetooth.svg";
      break;
  }

  return {
    name: deviceName,
    icon: { source: deviceIconPath },
    model: deviceModel,
    accessories: [],
    macAddress: deviceMacAddress,
    connected: deviceConnected,
    productId: deviceProductId,
    vendorId: deviceVendorId,
    actions: [
      deviceConnected ? (
        <Action
          title="Disconnect"
          key="disconnect-action"
          onAction={() => disconnect(deviceMacAddress)}
          icon={{ source: "icons/disconnect.svg", tintColor: Color.PrimaryText }}
        />
      ) : (
        <Action
          title="Connect"
          key="connect-action"
          onAction={() => connect(deviceMacAddress)}
          icon={{ source: "icons/connect.svg", tintColor: Color.PrimaryText }}
        />
      ),
    ],
  };
}

const connect = (deviceMacAddress: string) => {
  showToast({ style: Toast.Style.Animated, title: "Connecting..." });
  try {
    openConnection(deviceMacAddress);
  } catch (error) {
    showToast({ style: Toast.Style.Failure, title: "Failed to connect." });
    return;
  }
  showToast({ style: Toast.Style.Success, title: "Device connected successfully." });
};

const disconnect = (deviceMacAddress: string) => {
  showToast({ style: Toast.Style.Animated, title: "Disconnecting..." });
  try {
    closeConnection(deviceMacAddress);
  } catch {
    showToast({ style: Toast.Style.Failure, title: "Failed to disconnect." });
    return;
  }
  showToast({ style: Toast.Style.Success, title: "Device disconnected." });
};
