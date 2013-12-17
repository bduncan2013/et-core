#Restores the WWAN Drivers.
#Visit www.bsnlevdoclub.com for help.

#sudo -s
#rm -r /System/Library/Extensions/IOSerialFamily.kext/Contents/PlugIns/AppleVerizonSupport.kext
#rm -r /System/Library/Extensions/IOSerialFamily.kext/Contents/PlugIns/AppleVerizonSupportKicker.kext
rm -r /System/Library/Extensions/IOSerialFamily.kext/Contents/PlugIns/AppleWWANSupport.kext
rm -r /System/Library/Extensions/IOSerialFamily.kext/Contents/PlugIns/AppleWWANSupport1.kext
#rm -r /System/Library/Extensions/IOSerialFamily.kext/Contents/PlugIns/AppleWWANSupport2.kext

#mv /Install/AppleVerizonSupport.kext /System/Library/Extensions/IOSerialFamily.kext/Contents/PlugIns/
#mv /Install/AppleVerizonSupportKicker.kext /System/Library/Extensions/IOSerialFamily.kext/Contents/PlugIns/
mv /Install/kext/AppleWWANSupport.kext /System/Library/Extensions/IOSerialFamily.kext/Contents/PlugIns/
mv /Install/kext/AppleWWANSupport1.kext /System/Library/Extensions/IOSerialFamily.kext/Contents/PlugIns/
#mv /Install/AppleWWANSupport2.kext /System/Library/Extensions/IOSerialFamily.kext/Contents/PlugIns/

chown -R root:wheel /System/Library/Extensions
touch /System/Library/Extensions

echo "Done..!!"

