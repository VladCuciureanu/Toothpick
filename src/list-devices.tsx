import { List } from "@raycast/api";
import DeviceListItem from "./components/device-list-item";
import getDevices from "./services/bluetooth/getDevices";
import { useState } from "react";

export default function ViewDevices() {
  const devices = getDevices();
  const [forceUpdateFlag, forceUpdate] = useState(false);

  const updateList = () => {
    forceUpdate(!forceUpdateFlag);
  };

  return (
    <List>
      {devices.map((device, index) => (
        <DeviceListItem key={index} device={device} refreshCallback={updateList} />
      ))}
    </List>
  );
}
