import { List } from "@raycast/api";
import { DevicesMap } from "./constants/devices";

export default function SupportedDevicesView() {
  const devices = Object.entries(DevicesMap).flatMap(([k, v]) => Object.entries(v));
  return (
    <List>
      {devices.map(([id, metadata]) => (
        <List.Item
          key={id}
          icon={metadata.main ? { source: metadata.main } : undefined}
          title={metadata.name ?? "Missing name"}
        />
      ))}
    </List>
  );
}
