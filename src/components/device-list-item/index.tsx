import { Action, ActionPanel, Color, List, showToast, Toast } from "@raycast/api";
import { connectDevice, disconnectDevice } from "src/services/bluetooth/handleDeviceConnection";
import { Device } from "src/services/bluetooth/types";
import { useState } from "react";

type DeviceItemListProps = {
  device: Device;
  refreshCallBack: () => void;
};

export default function DeviceListItem(props: DeviceItemListProps) {
  const connect = (macAddress: string) => {
    showToast({ style: Toast.Style.Animated, title: "Connecting..." });
    try {
      connectDevice(macAddress);
    } catch {
      showToast({ style: Toast.Style.Failure, title: "Failed to connect." });
      return;
    }
    showToast({ style: Toast.Style.Success, title: "Device connected successfully." });
    props.refreshCallBack();
  };

  const disconnect = (macAddress: string) => {
    showToast({ style: Toast.Style.Animated, title: "Disconnecting..." });
    try {
      disconnectDevice(macAddress);
    } catch {
      showToast({ style: Toast.Style.Failure, title: "Failed to disconnect." });
    }
    showToast({ style: Toast.Style.Success, title: "Device disconnected." });
    props.refreshCallBack();
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
