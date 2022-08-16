import { Action, ActionPanel, Color, List, showToast, Toast } from "@raycast/api";
import { getDevices, openConnection, closeConnection } from "./services/devices";
import { useState, useEffect } from "react";
import { Device } from "./types";

export default function ManageDevicesView() {
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);

  const refreshDataLoop = () => {
    setDevices(getDevices());
    setTimeout(() => refreshDataLoop(), 300);
  };

  useEffect(() => {
    setDevices(getDevices());
    setLoading(false);
    refreshDataLoop();
  }, []);

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

  return (
    <List isLoading={loading}>
      {devices.map((device) => (
        <List.Item
          icon={device.icon}
          title={device.name}
          key={device.macAddress}
          accessories={device.accessories}
          subtitle={device.model}
          actions={
            <ActionPanel title={`Actions for ${device.name}`}>
              {device.connected ? (
                <Action
                  title="Disconnect"
                  onAction={() => disconnect(device.macAddress)}
                  icon={{ source: "icons/disconnect.svg", tintColor: Color.PrimaryText }}
                />
              ) : (
                <Action
                  title="Connect"
                  onAction={() => connect(device.macAddress)}
                  icon={{ source: "icons/connect.svg", tintColor: Color.PrimaryText }}
                />
              )}
              {device.actions}
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
