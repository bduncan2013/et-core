#Script to Install ZTE AC8700 Modem in Mac. Tested on Leopard 10.5.2
#Written by veagles. Visit www.bsnlevdoclub.com for help.

#sudo -s

echo "Patching Apple WWAN Driver.."
cd /System/Library/Extensions/IOSerialFamily.kext/Contents/PlugIns/AppleWWANSupport1.kext/Contents
sed "s/8464/24576/g" Info.plist > new.plist
rm Info.plist
cp new.plist Info.plist
rm new.plist
sed "s/5136/1478/g" Info.plist > new.plist
rm Info.plist
cp new.plist Info.plist
rm new.plist

cd /System/Library/Extensions/IOSerialFamily.kext/Contents/PlugIns/AppleWWANSupport.kext/Contents
sed "s/8464/24576/g" Info.plist > new.plist
rm Info.plist
cp new.plist Info.plist
rm new.plist
sed "s/5136/1478/g" Info.plist > new.plist
rm Info.plist
cp new.plist Info.plist
rm new.plist

echo "Successfully Added the device ID's.."

echo "Repairing Permissions.."

chown -R root:wheel /System/Library/Extensions
touch /System/Library/Extensions



echo "Done..!!"

echo "Plug the Modem Now.."
echo "Open Network Prefereces and Add the device using '+' at the bottom left pane.."
echo "Have Fun.. Veagles, www.bsnlevdoclub.com"
