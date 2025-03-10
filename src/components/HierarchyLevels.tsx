
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Building, Server, Cpu, List } from "lucide-react";
import { assets, zones, devices, sensors, getPropertiesByEntity } from "@/lib/sample-data";

// Tab-specific entity tables
const AssetsTable = () => (
  <div className="rounded-md border">
    <table className="w-full">
      <thead>
        <tr className="bg-muted/50">
          <th className="p-2 text-left font-medium">Name</th>
          <th className="p-2 text-left font-medium">Type</th>
          <th className="p-2 text-left font-medium">Location</th>
          <th className="p-2 text-left font-medium">Status</th>
          <th className="p-2 text-left font-medium">Zones</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => (
          <tr key={asset.id} className="border-t hover:bg-muted/30">
            <td className="p-2">{asset.name}</td>
            <td className="p-2">{asset.type}</td>
            <td className="p-2">{asset.location}</td>
            <td className="p-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                asset.status === 'active' ? 'bg-green-100 text-green-800' : 
                asset.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {asset.status}
              </span>
            </td>
            <td className="p-2">{asset.zones.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ZonesTable = () => (
  <div className="rounded-md border">
    <table className="w-full">
      <thead>
        <tr className="bg-muted/50">
          <th className="p-2 text-left font-medium">Display Name</th>
          <th className="p-2 text-left font-medium">Internal Name</th>
          <th className="p-2 text-left font-medium">Asset</th>
          <th className="p-2 text-left font-medium">Start Date</th>
          <th className="p-2 text-left font-medium">End Date</th>
          <th className="p-2 text-left font-medium">Devices</th>
        </tr>
      </thead>
      <tbody>
        {zones.map((zone) => {
          // Find the parent asset name
          const parentAsset = assets.find(a => a.id === zone.assetId);
          
          return (
            <tr key={zone.id} className="border-t hover:bg-muted/30">
              <td className="p-2">{zone.displayName}</td>
              <td className="p-2">{zone.internalName}</td>
              <td className="p-2">{parentAsset ? parentAsset.name : "-"}</td>
              <td className="p-2">{zone.startDate}</td>
              <td className="p-2">{zone.endDate}</td>
              <td className="p-2">{zone.devices.length}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const DevicesTable = () => (
  <div className="rounded-md border">
    <table className="w-full">
      <thead>
        <tr className="bg-muted/50">
          <th className="p-2 text-left font-medium">Name</th>
          <th className="p-2 text-left font-medium">Type</th>
          <th className="p-2 text-left font-medium">Model</th>
          <th className="p-2 text-left font-medium">Zone</th>
          <th className="p-2 text-left font-medium">Status</th>
          <th className="p-2 text-left font-medium">Sensors</th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => {
          // Find the parent zone name
          const parentZone = zones.find(z => z.id === device.zoneId);
          
          return (
            <tr key={device.id} className="border-t hover:bg-muted/30">
              <td className="p-2">{device.name}</td>
              <td className="p-2">{device.type}</td>
              <td className="p-2">{device.model}</td>
              <td className="p-2">{parentZone ? parentZone.displayName : "-"}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  device.status === 'online' ? 'bg-green-100 text-green-800' : 
                  device.status === 'error' ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {device.status}
                </span>
              </td>
              <td className="p-2">{device.sensors.length}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const SensorsTable = () => (
  <div className="rounded-md border">
    <table className="w-full">
      <thead>
        <tr className="bg-muted/50">
          <th className="p-2 text-left font-medium">Name</th>
          <th className="p-2 text-left font-medium">Type</th>
          <th className="p-2 text-left font-medium">Unit</th>
          <th className="p-2 text-left font-medium">Device</th>
          <th className="p-2 text-left font-medium">Status</th>
          <th className="p-2 text-left font-medium">Last Value</th>
        </tr>
      </thead>
      <tbody>
        {sensors.map((sensor) => {
          // Find the parent device name
          const parentDevice = devices.find(d => d.id === sensor.deviceId);
          
          return (
            <tr key={sensor.id} className="border-t hover:bg-muted/30">
              <td className="p-2">{sensor.name}</td>
              <td className="p-2">{sensor.type}</td>
              <td className="p-2">{sensor.unit}</td>
              <td className="p-2">{parentDevice ? parentDevice.name : "-"}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  sensor.status === 'active' ? 'bg-green-100 text-green-800' : 
                  sensor.status === 'error' ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {sensor.status}
                </span>
              </td>
              <td className="p-2">
                {sensor.lastReading ? 
                  `${sensor.lastReading.value} ${sensor.unit}` : 
                  "-"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const PropertiesTable = () => {
  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50">
            <th className="p-2 text-left font-medium">Name</th>
            <th className="p-2 text-left font-medium">Type</th>
            <th className="p-2 text-left font-medium">Entity Type</th>
            <th className="p-2 text-left font-medium">Entity Name</th>
            <th className="p-2 text-left font-medium">Value</th>
          </tr>
        </thead>
        <tbody>
          {getPropertiesByEntity("asset", 1).concat(
            getPropertiesByEntity("zone", 1),
            getPropertiesByEntity("device", 1),
            getPropertiesByEntity("sensor", 1)
          ).map((property) => {
            // Find the entity this property belongs to
            let entityName = "-";
            if (property.entityType === "asset") {
              const entity = assets.find(a => a.id === property.entityId);
              if (entity) entityName = entity.name;
            } else if (property.entityType === "zone") {
              const entity = zones.find(z => z.id === property.entityId);
              if (entity) entityName = entity.displayName;
            } else if (property.entityType === "device") {
              const entity = devices.find(d => d.id === property.entityId);
              if (entity) entityName = entity.name;
            } else if (property.entityType === "sensor") {
              const entity = sensors.find(s => s.id === property.entityId);
              if (entity) entityName = entity.name;
            }
            
            return (
              <tr key={property.id} className="border-t hover:bg-muted/30">
                <td className="p-2">{property.name}</td>
                <td className="p-2">{property.type}</td>
                <td className="p-2">{property.entityType}</td>
                <td className="p-2">{entityName}</td>
                <td className="p-2">{property.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export function HierarchyLevels() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hierarchy Levels</CardTitle>
        <CardDescription>
          Asset → Zone → Device → Sensor → Property hierarchy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="assets" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="assets" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">Assets</span>
            </TabsTrigger>
            <TabsTrigger value="zones" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">Zones</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span className="hidden sm:inline">Devices</span>
            </TabsTrigger>
            <TabsTrigger value="sensors" className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span className="hidden sm:inline">Sensors</span>
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Properties</span>
            </TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[600px]">
            <TabsContent value="assets" className="p-0 m-0">
              <AssetsTable />
            </TabsContent>
            <TabsContent value="zones" className="p-0 m-0">
              <ZonesTable />
            </TabsContent>
            <TabsContent value="devices" className="p-0 m-0">
              <DevicesTable />
            </TabsContent>
            <TabsContent value="sensors" className="p-0 m-0">
              <SensorsTable />
            </TabsContent>
            <TabsContent value="properties" className="p-0 m-0">
              <PropertiesTable />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
}
