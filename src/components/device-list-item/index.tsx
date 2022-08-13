import { Action, ActionPanel, List } from "@raycast/api";
import { connectDevice, disconnectDevice } from "src/services/bluetooth/handleDeviceConnection";
import { Device } from "src/services/bluetooth/types";

type DeviceItemListProps = {
  device: Device;
  refreshCallback: () => void;
};

export default function DeviceListItem(props: DeviceItemListProps) {
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
              onAction={() => {
                disconnectDevice(props.device.macAddress);
                props.refreshCallback();
              }}
              icon={{ source: "icons/disconnect.svg" }}
            />
          ) : (
            <Action
              title="Connect"
              onAction={() => {
                connectDevice(props.device.macAddress);
                props.refreshCallback();
              }}
              icon={{ source: "icons/connect.svg" }}
            />
          )}
          {props.device.actions}
        </ActionPanel>
      }
    />
  );
}
