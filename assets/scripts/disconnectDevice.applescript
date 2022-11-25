property IOBluetoothDevice : class "IOBluetoothDevice"
property disconnectionNotifObj : missing value

on disconnectDevice(device)
	set disconnectionNotifObj to (device's registerForDisconnectNotification:me selector:"didDisconnectNotif:forDevice:")
	if (device's isConnected as boolean) then
		set result to device's closeConnection()
	else
		return -1
	end if
end disconnectDevice

on didDisconnectNotif:notif forDevice:dev
	try
		disconnectionNotifObj's unregister()
	end try
	set disconnectionNotifObj to missing value
	return result
end didDisconnectNotif:forDevice: