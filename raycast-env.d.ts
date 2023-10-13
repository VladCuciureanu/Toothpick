/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Device Name Fuzzy Ratio - Minimum difference ratio for matching a device name. */
  "fuzzyRatio": string,
  /** Favorite Device #1 - Display name of the device you want to bind to 'Connect to Favorite Device #1' command */
  "favoriteDevice1"?: string,
  /** Favorite Device #2 - Display name of the device you want to bind to 'Connect to Favorite Device #2' command */
  "favoriteDevice2"?: string,
  /** Favorite Device #3 - Display name of the device you want to bind to 'Connect to Favorite Device #3' command */
  "favoriteDevice3"?: string,
  /** Options - If checked, Raycast will close after successfully connecting to a device. */
  "closeOnSuccessfulConnection": boolean,
  /** Bluetooth Backend - What tool Toothpick will use for Bluetooth related actions. */
  "bluetoothBackend": "applescript" | "blueutil",
  /** Override Blueutil Directory - Set a custom 'blueutil' location for Toothpick to use. */
  "blueutilDirectory"?: string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `manage-bluetooth-connections` command */
  export type ManageBluetoothConnections = ExtensionPreferences & {}
  /** Preferences accessible in the `connect-device` command */
  export type ConnectDevice = ExtensionPreferences & {}
  /** Preferences accessible in the `disconnect-device` command */
  export type DisconnectDevice = ExtensionPreferences & {}
  /** Preferences accessible in the `connect-favorite-device-1` command */
  export type ConnectFavoriteDevice1 = ExtensionPreferences & {}
  /** Preferences accessible in the `connect-favorite-device-2` command */
  export type ConnectFavoriteDevice2 = ExtensionPreferences & {}
  /** Preferences accessible in the `connect-favorite-device-3` command */
  export type ConnectFavoriteDevice3 = ExtensionPreferences & {}
  /** Preferences accessible in the `view-mapped-devices` command */
  export type ViewMappedDevices = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `manage-bluetooth-connections` command */
  export type ManageBluetoothConnections = {}
  /** Arguments passed to the `connect-device` command */
  export type ConnectDevice = {
  /** Name or Mac Address */
  "nameOrMacAddress": string
}
  /** Arguments passed to the `disconnect-device` command */
  export type DisconnectDevice = {
  /** Name or Mac Address */
  "nameOrMacAddress": string
}
  /** Arguments passed to the `connect-favorite-device-1` command */
  export type ConnectFavoriteDevice1 = {}
  /** Arguments passed to the `connect-favorite-device-2` command */
  export type ConnectFavoriteDevice2 = {}
  /** Arguments passed to the `connect-favorite-device-3` command */
  export type ConnectFavoriteDevice3 = {}
  /** Arguments passed to the `view-mapped-devices` command */
  export type ViewMappedDevices = {}
}


declare module "swift:*" {
  function run<T = unknown, U = any>(command: string, input?: U): Promise<T>;
  export default run;
	export class SwiftError extends Error {
    stderr: string;
    stdout: string;
  }
}
