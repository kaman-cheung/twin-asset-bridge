
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Server, Cpu, List } from "lucide-react";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { assets, zones, devices, sensors, getPropertiesByEntity } from "@/lib/sample-data";

// Tab-specific entity tables with status filter
const AssetsTable = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const filteredAssets = statusFilter === "all" 
    ? assets 
    : assets.filter(asset => 
        statusFilter === "active" 
          ? asset.status === "active"
          : statusFilter === "inactive"
            ? asset.status === "inactive"
            : asset.status === "maintenance"
      );
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="maintenance">Archive/Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Zones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAssets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">No assets found</TableCell>
            </TableRow>
          ) : (
            filteredAssets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.type}</TableCell>
                <TableCell>{asset.location}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    asset.status === 'active' ? 'bg-green-100 text-green-800' : 
                    asset.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {asset.status}
                  </span>
                </TableCell>
                <TableCell>{asset.zones.length}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const ZonesTable = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // For zones, we'll filter by type since they don't have a status field
  const filteredZones = statusFilter === "all" 
    ? zones 
    : zones.filter(zone => 
        zone.type === (statusFilter === "active" ? "office" : 
                      statusFilter === "inactive" ? "meeting-room" : "common-area")
      );
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="active">Office</SelectItem>
            <SelectItem value="inactive">Meeting Room</SelectItem>
            <SelectItem value="archive">Common Area</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Display Name</TableHead>
            <TableHead>Internal Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Devices</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredZones.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">No zones found</TableCell>
            </TableRow>
          ) : (
            filteredZones.map((zone) => {
              // Find the parent asset name
              const parentAsset = assets.find(a => a.id === zone.assetId);
              
              return (
                <TableRow key={zone.id}>
                  <TableCell>{zone.displayName}</TableCell>
                  <TableCell>{zone.internalName}</TableCell>
                  <TableCell>{zone.type}</TableCell>
                  <TableCell>{parentAsset ? parentAsset.name : "-"}</TableCell>
                  <TableCell>{zone.startDate}</TableCell>
                  <TableCell>{zone.endDate}</TableCell>
                  <TableCell>{zone.devices.length}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const DevicesTable = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const filteredDevices = statusFilter === "all" 
    ? devices 
    : devices.filter(device => 
        statusFilter === "active" 
          ? device.status === "online"
          : statusFilter === "inactive"
            ? device.status === "offline"
            : device.status === "error"
      );
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Online</SelectItem>
            <SelectItem value="inactive">Offline</SelectItem>
            <SelectItem value="archive">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sensors</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDevices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">No devices found</TableCell>
            </TableRow>
          ) : (
            filteredDevices.map((device) => {
              // Find the parent zone name
              const parentZone = zones.find(z => z.id === device.zoneId);
              
              return (
                <TableRow key={device.id}>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>{device.type}</TableCell>
                  <TableCell>{device.model}</TableCell>
                  <TableCell>{parentZone ? parentZone.displayName : "-"}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      device.status === 'online' ? 'bg-green-100 text-green-800' : 
                      device.status === 'error' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {device.status}
                    </span>
                  </TableCell>
                  <TableCell>{device.sensors.length}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const SensorsTable = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const filteredSensors = statusFilter === "all" 
    ? sensors 
    : sensors.filter(sensor => 
        statusFilter === "active" 
          ? sensor.status === "active"
          : statusFilter === "inactive"
            ? sensor.status === "inactive"
            : sensor.status === "error"
      );
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="archive">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSensors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">No sensors found</TableCell>
            </TableRow>
          ) : (
            filteredSensors.map((sensor) => {
              // Find the parent device name
              const parentDevice = devices.find(d => d.id === sensor.deviceId);
              
              return (
                <TableRow key={sensor.id}>
                  <TableCell>{sensor.name}</TableCell>
                  <TableCell>{sensor.type}</TableCell>
                  <TableCell>{sensor.unit}</TableCell>
                  <TableCell>{parentDevice ? parentDevice.name : "-"}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      sensor.status === 'active' ? 'bg-green-100 text-green-800' : 
                      sensor.status === 'error' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {sensor.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {sensor.lastReading ? 
                      `${sensor.lastReading.value} ${sensor.unit}` : 
                      "-"}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const PropertiesTable = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // For properties, we'll filter by entity type
  const filteredProperties = statusFilter === "all" 
    ? getPropertiesByEntity("asset", 1).concat(
        getPropertiesByEntity("zone", 1),
        getPropertiesByEntity("device", 1),
        getPropertiesByEntity("sensor", 1)
      )
    : statusFilter === "active" 
        ? getPropertiesByEntity("asset", 1)
        : statusFilter === "inactive"
          ? getPropertiesByEntity("zone", 1).concat(getPropertiesByEntity("device", 1))
          : getPropertiesByEntity("sensor", 1);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by entity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Entities</SelectItem>
            <SelectItem value="active">Assets</SelectItem>
            <SelectItem value="inactive">Zones & Devices</SelectItem>
            <SelectItem value="archive">Sensors</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Entity Type</TableHead>
            <TableHead>Entity Name</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProperties.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">No properties found</TableCell>
            </TableRow>
          ) : (
            filteredProperties.map((property) => {
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
                <TableRow key={property.id}>
                  <TableCell>{property.name}</TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>{property.entityType}</TableCell>
                  <TableCell>{entityName}</TableCell>
                  <TableCell>{property.value}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export function MetadataTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Metadata</CardTitle>
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
