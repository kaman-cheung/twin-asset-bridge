
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Server, Cpu, List, CalendarClock } from "lucide-react";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { assets, zones, devices, sensors, properties, leases } from "@/lib/sample-data";

export function MetadataTable() {
  const [statusFilter, setStatusFilter] = useState<string>("active");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Metadata</CardTitle>
        <Select onValueChange={setStatusFilter} defaultValue="active">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="archive">Archived</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="assets" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-4">
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
            <TabsTrigger value="leases" className="flex items-center gap-2">
              <CalendarClock className="w-4 h-4" />
              <span className="hidden sm:inline">Leases</span>
            </TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[600px]">
            <TabsContent value="assets" className="p-0 m-0">
              <AssetsTable statusFilter={statusFilter} />
            </TabsContent>
            <TabsContent value="zones" className="p-0 m-0">
              <ZonesTable statusFilter={statusFilter} />
            </TabsContent>
            <TabsContent value="devices" className="p-0 m-0">
              <DevicesTable statusFilter={statusFilter} />
            </TabsContent>
            <TabsContent value="sensors" className="p-0 m-0">
              <SensorsTable statusFilter={statusFilter} />
            </TabsContent>
            <TabsContent value="properties" className="p-0 m-0">
              <PropertiesTable statusFilter={statusFilter} />
            </TabsContent>
            <TabsContent value="leases" className="p-0 m-0">
              <LeasesTable statusFilter={statusFilter} />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Tab-specific entity tables with status filter
const AssetsTable = ({ statusFilter }: { statusFilter: string }) => {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Zones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredAssets.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center py-4">No assets found</TableCell>
          </TableRow>
        ) : (
          filteredAssets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.location}</TableCell>
              <TableCell>{asset.zones.length}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

const ZonesTable = ({ statusFilter }: { statusFilter: string }) => {
  // For zones, we'll filter by type since they don't have a status field
  const filteredZones = statusFilter === "all" 
    ? zones 
    : zones.filter(zone => 
        zone.type === (statusFilter === "active" ? "office" : 
                      statusFilter === "inactive" ? "meeting-room" : "common-area")
      );
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Display Name</TableHead>
          <TableHead>Internal Name</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Devices</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredZones.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4">No zones found</TableCell>
          </TableRow>
        ) : (
          filteredZones.map((zone) => {
            // Find the parent asset name
            const parentAsset = assets.find(a => a.id === zone.assetId);
            
            return (
              <TableRow key={zone.id}>
                <TableCell>{zone.displayName}</TableCell>
                <TableCell>{zone.internalName}</TableCell>
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
  );
};

const DevicesTable = ({ statusFilter }: { statusFilter: string }) => {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Zone</TableHead>
          <TableHead>Sensors</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredDevices.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4">No devices found</TableCell>
          </TableRow>
        ) : (
          filteredDevices.map((device) => {
            // Find the parent zone name
            const parentZone = zones.find(z => z.id === device.zoneId);
            
            return (
              <TableRow key={device.id}>
                <TableCell>{device.name}</TableCell>
                <TableCell>{device.model}</TableCell>
                <TableCell>{parentZone ? parentZone.displayName : "-"}</TableCell>
                <TableCell>{device.sensors.length}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

const SensorsTable = ({ statusFilter }: { statusFilter: string }) => {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Device</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredSensors.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center py-4">No sensors found</TableCell>
          </TableRow>
        ) : (
          filteredSensors.map((sensor) => {
            // Find the parent device name
            const parentDevice = devices.find(d => d.id === sensor.deviceId);
            
            return (
              <TableRow key={sensor.id}>
                <TableCell>{sensor.name}</TableCell>
                <TableCell>{sensor.unit}</TableCell>
                <TableCell>{parentDevice ? parentDevice.name : "-"}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

const PropertiesTable = ({ statusFilter }: { statusFilter: string }) => {
  // For properties, we'll filter by entity type
  const filteredProperties = statusFilter === "all" 
    ? properties 
    : statusFilter === "active" 
        ? properties.filter(p => p.entityType === "asset" || p.entityType === "zone")
        : statusFilter === "inactive"
          ? properties.filter(p => p.entityType === "device")
          : properties.filter(p => p.entityType === "sensor");
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Entity Type</TableHead>
          <TableHead>Entity Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProperties.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center py-4">No properties found</TableCell>
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
                <TableCell>{property.entityType}</TableCell>
                <TableCell>{entityName}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

const LeasesTable = ({ statusFilter }: { statusFilter: string }) => {
  const today = new Date();
  
  const filteredLeases = statusFilter === "all" 
    ? leases 
    : statusFilter === "active" 
        ? leases.filter(lease => new Date(lease.endDate) > today)
        : statusFilter === "inactive"
          ? leases.filter(lease => new Date(lease.endDate) <= today)
          : []; // No archived status for leases
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tenant</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Zones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredLeases.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4">No leases found</TableCell>
          </TableRow>
        ) : (
          filteredLeases.map((lease) => {
            // Get zone names
            const leaseZones = zones.filter(z => lease.zoneIds.includes(z.id));
            const zoneNames = leaseZones.map(z => z.displayName).join(", ");
            
            return (
              <TableRow key={lease.id}>
                <TableCell>{lease.tenant}</TableCell>
                <TableCell>{lease.startDate}</TableCell>
                <TableCell>{lease.endDate}</TableCell>
                <TableCell>{zoneNames}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};
