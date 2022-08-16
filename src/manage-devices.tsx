import { List } from "@raycast/api";
import getDevices from "./services/bluetooth/getDevices";
import { useState, useEffect } from "react";
import { Device } from "./services/bluetooth/types";
import DeviceListItem from "./components/device-list-item";

export default function ManageDevices() {
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    setDevices(getDevices());
    setLoading(false);
  }, []);

  const refreshDevices = () => {
    setLoading(true);
    setDevices(getDevices());
    setLoading(false);
  };

  return (
    <List isLoading={loading}>
      {devices.map((device, index) => (
        <DeviceListItem key={index} device={device} refreshCallBack={() => refreshDevices()} />
      ))}
    </List>
  );
}
