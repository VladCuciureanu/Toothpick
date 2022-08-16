import { Action, ActionPanel, Color, List, showToast, Toast } from "@raycast/api";
import { connectDevice, disconnectDevice } from "src/services/bluetooth/handleDeviceConnection";
import { Device } from "src/services/bluetooth/types";

type DeviceItemListProps = {
  device: Device;
  refreshCallBack: () => void;
};

export default function DeviceListItem(props: DeviceItemListProps) {
  const connect = (deviceMacAddress: string) => {
    showToast({ style: Toast.Style.Animated, title: "Connecting..." });
    try {
      connectDevice(deviceMacAddress);
    } catch (error) {
      console.log(error);
      showToast({ style: Toast.Style.Failure, title: "Failed to connect." });
      return;
    }
    showToast({ style: Toast.Style.Success, title: "Device connected successfully." });
    props.refreshCallBack();
  };

  const disconnect = async (deviceMacAddress: string) => {
    showToast({ style: Toast.Style.Animated, title: "Disconnecting..." });
    try {
      disconnectDevice(deviceMacAddress);
    } catch {
      showToast({ style: Toast.Style.Failure, title: "Failed to disconnect." });
    }
    props.refreshCallBack();
    showToast({ style: Toast.Style.Success, title: "Device disconnected." });
  };

  return (
    <List.Item
      icon={props.device.icon}
      title={props.device.name}
      key={props.device.macAddress}
      accessories={props.device.accessories}
      subtitle={props.device.model}
      actions={
        <ActionPanel title={`Actions for ${props.device.name}`}>
          {props.device.connected ? (
            <Action
              title="Disconnect"
              onAction={() => disconnect(props.device.macAddress)}
              icon={{ source: "icons/disconnect.svg", tintColor: Color.PrimaryText }}
            />
          ) : (
            <Action
              title="Connect"
              onAction={() => connect(props.device.macAddress)}
              icon={{ source: "icons/connect.svg", tintColor: Color.PrimaryText }}
            />
          )}
          {props.device.actions}
        </ActionPanel>
      }
    />
  );
}
