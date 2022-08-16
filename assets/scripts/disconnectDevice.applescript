use framework "IOBluetooth"
use scripting additions

on getFirstMatchingDevice(deviceMacAddress)
	repeat with device in (current application's IOBluetoothDevice's pairedDevices() as list)
		if (device's addressString as string) contains deviceMacAddress then return device
	end repeat
end getFirstMatchingDevice

on disconnectDevice(device)
	if (device's isConnected as boolean) then
		set result to device's closeConnection()
		return result
	else
		return -1
	end if
end toggleDevice