import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Server, Cpu, List, CalendarClock, Code, Download } from "lucide-react";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { assets, zones, devices, sensors, properties, leases, procedures } from "@/lib/sample-data";

export function MetadataTable() {
  const [statusFilter, setStatusFilter] = useState<string>("active");
  const [activeTab, setActiveTab] = useState<string>("assets");

  const handleDownload = () => {
    console.log(`Downloading ${activeTab} data as Excel`);
    // In a real app, this would generate and download an Excel file
    alert(`Downloading ${activeTab} data...`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Metadata</CardTitle>
        <div className="flex space-x-2">
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
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            className="flex items-center gap-1"
          >
            <Download className="h-3 w-3" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="assets" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7 mb-4">
            <TabsTrigger value="assets" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">Assets</span>
            </TabsTrigger>
            <TabsTrigger value="zones" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">Zones</span>
            </TabsTrigger>
            <TabsTrigger value="procedures" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Procedures</span>
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
            <TabsContent value="procedures" className="p-0 m-0">
              <ProceduresTable statusFilter={statusFilter} />
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
          <TableHead>Display Name</TableHead>
          <TableHead>Usage</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Is Active</TableHead>
          <TableHead>Is CBD</TableHead>
          <TableHead>External ID</TableHead>
          <TableHead>Timezone</TableHead>
          <TableHead>Zones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredAssets.length === 0 ? (
          <TableRow>
            <TableCell colSpan={10} className="text-center py-4">No assets found</TableCell>
          </TableRow>
        ) : (
          filteredAssets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.display_name || asset.name}</TableCell>
              <TableCell>{asset.usage || '-'}</TableCell>
              <TableCell>{asset.address || '-'}</TableCell>
              <TableCell>{asset.city || '-'}</TableCell>
              <TableCell>{asset.country || '-'}</TableCell>
              <TableCell>{asset.is_active !== undefined ? (asset.is_active ? 'Yes' : 'No') : '-'}</TableCell>
              <TableCell>{asset.is_cbd !== undefined ? (asset.is_cbd ? 'Yes' : 'No') : '-'}</TableCell>
              <TableCell>{asset.external_id || '-'}</TableCell>
              <TableCell>{asset.timezone || '-'}</TableCell>
              <TableCell>{asset.zones.length}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

const ZonesTable = ({ statusFilter }: { statusFilter: string }) => {
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
          <TableHead>Internal Name</TableHead>
          <TableHead>Display Name</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Zone Type</TableHead>
          <TableHead>Lettable Area</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Parent Zones</TableHead>
          <TableHead>Devices</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredZones.length === 0 ? (
          <TableRow>
            <TableCell colSpan={10} className="text-center py-4">No zones found</TableCell>
          </TableRow>
        ) : (
          filteredZones.map((zone) => {
            const parentAsset = assets.find(a => a.id === zone.assetId);
            
            return (
              <TableRow key={zone.id}>
                <TableCell>{zone.internal_name || zone.internalName}</TableCell>
                <TableCell>{zone.display_name || zone.displayName}</TableCell>
                <TableCell>{zone.start_date || zone.startDate}</TableCell>
                <TableCell>{zone.end_date || zone.endDate}</TableCell>
                <TableCell>{zone.zone_type || zone.type || '-'}</TableCell>
                <TableCell>{zone.lettable_area ? `${zone.lettable_area} sqm` : '-'}</TableCell>
                <TableCell>{zone.capacity || '-'}</TableCell>
                <TableCell>{parentAsset ? parentAsset.name : "-"}</TableCell>
                <TableCell>{zone.parent_zones ? zone.parent_zones.length : (zone.parent_zones ? '1' : '0')}</TableCell>
                <TableCell>{zone.devices.length}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

const ProceduresTable = ({ statusFilter }: { statusFilter: string }) => {
  const proceduresData = procedures || [];
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Application Name</TableHead>
          <TableHead>Input Systems</TableHead>
          <TableHead>Output System</TableHead>
          <TableHead>Config</TableHead>
          <TableHead>Asset</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proceduresData.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">No procedures found</TableCell>
          </TableRow>
        ) : (
          proceduresData.map((procedure) => {
            const parentAsset = assets.find(a => a.id === procedure.asset);
            
            return (
              <TableRow key={procedure.id}>
                <TableCell>{procedure.application_name}</TableCell>
                <TableCell>{Array.isArray(procedure.input_systems) ? procedure.input_systems.join(', ') : '-'}</TableCell>
                <TableCell>{procedure.output_system}</TableCell>
                <TableCell>{procedure.config}</TableCell>
                <TableCell>{parentAsset ? parentAsset.name : "-"}</TableCell>
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
          <TableHead>Internal Name</TableHead>
          <TableHead>Display Name</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Gateway</TableHead>
          <TableHead>Physical Device ID</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Sensors</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredDevices.length === 0 ? (
          <TableRow>
            <TableCell colSpan={10} className="text-center py-4">No devices found</TableCell>
          </TableRow>
        ) : (
          filteredDevices.map((device) => {
            const parentZone = zones.find(z => z.id === device.zoneId);
            const parentAsset = assets.find(a => a.id === device.asset);
            
            return (
              <TableRow key={device.id}>
                <TableCell>{device.internal_name || device.name}</TableCell>
                <TableCell>{device.display_name || device.name}</TableCell>
                <TableCell>{device.start_date || '-'}</TableCell>
                <TableCell>{device.end_date || '-'}</TableCell>
                <TableCell>{device.provider || '-'}</TableCell>
                <TableCell>{device.gateway || '-'}</TableCell>
                <TableCell>{device.physical_device_id || '-'}</TableCell>
                <TableCell>{parentAsset ? parentAsset.name : "-"}</TableCell>
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
          <TableHead>Internal Name</TableHead>
          <TableHead>Display Name</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>External ID</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Zone</TableHead>
          <TableHead>Parent Sensors</TableHead>
          <TableHead>Identifier</TableHead>
          <TableHead>Device</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredSensors.length === 0 ? (
          <TableRow>
            <TableCell colSpan={11} className="text-center py-4">No sensors found</TableCell>
          </TableRow>
        ) : (
          filteredSensors.map((sensor) => {
            const parentDevice = devices.find(d => d.id === sensor.deviceId);
            const parentZone = zones.find(z => z.id === sensor.zone);
            
            return (
              <TableRow key={sensor.id}>
                <TableCell>{sensor.internal_name || sensor.name}</TableCell>
                <TableCell>{sensor.display_name || sensor.name}</TableCell>
                <TableCell>{sensor.start_date || '-'}</TableCell>
                <TableCell>{sensor.end_date || '-'}</TableCell>
                <TableCell>{sensor.external_id || '-'}</TableCell>
                <TableCell>{sensor.provider || '-'}</TableCell>
                <TableCell>{parentZone ? parentZone.displayName : "-"}</TableCell>
                <TableCell>{sensor.parent_sensors ? sensor.parent_sensors.length : '0'}</TableCell>
                <TableCell>{sensor.identifier || '-'}</TableCell>
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
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

const PropertiesTable = ({ statusFilter }: { statusFilter: string }) => {
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
          <TableHead>Internal Name</TableHead>
          <TableHead>Display Name</TableHead>
          <TableHead>External ID</TableHead>
          <TableHead>Property Type</TableHead>
          <TableHead>Usage</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Is Cumulative</TableHead>
          <TableHead>Direction</TableHead>
          <TableHead>Sensor</TableHead>
          <TableHead>Entity Type</TableHead>
          <TableHead>Entity Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProperties.length === 0 ? (
          <TableRow>
            <TableCell colSpan={11} className="text-center py-4">No properties found</TableCell>
          </TableRow>
        ) : (
          filteredProperties.map((property) => {
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

            const parentSensor = sensors.find(s => s.id === property.sensor);
            
            return (
              <TableRow key={property.id}>
                <TableCell>{property.internal_name || property.name}</TableCell>
                <TableCell>{property.display_name || property.name}</TableCell>
                <TableCell>{property.external_id || '-'}</TableCell>
                <TableCell>{property.property_type || property.type}</TableCell>
                <TableCell>{property.usage || '-'}</TableCell>
                <TableCell>{property.unit || '-'}</TableCell>
                <TableCell>{property.is_cumulative !== undefined ? (property.is_cumulative ? 'Yes' : 'No') : '-'}</TableCell>
                <TableCell>{property.direction || '-'}</TableCell>
                <TableCell>{parentSensor ? parentSensor.name : "-"}</TableCell>
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
          <TableHead>Internal Name</TableHead>
          <TableHead>Display Name</TableHead>
          <TableHead>Lease External ID</TableHead>
          <TableHead>Is Sub Lease</TableHead>
          <TableHead>Usage</TableHead>
          <TableHead>Tenant Identifier</TableHead>
          <TableHead>Tenant Display Name</TableHead>
          <TableHead>Tenant Industry</TableHead>
          <TableHead>Contractual Start Date</TableHead>
          <TableHead>Contractual End Date</TableHead>
          <TableHead>Occupation Start Date</TableHead>
          <TableHead>Zones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredLeases.length === 0 ? (
          <TableRow>
            <TableCell colSpan={12} className="text-center py-4">No leases found</TableCell>
          </TableRow>
        ) : (
          filteredLeases.map((lease) => {
            const leaseZones = zones.filter(z => lease.zoneIds.includes(z.id));
            const zoneNames = leaseZones.map(z => z.displayName).join(", ");
            
            return (
              <TableRow key={lease.id}>
                <TableCell>{lease.internal_name || lease.tenant}</TableCell>
                <TableCell>{lease.display_name || lease.tenant}</TableCell>
                <TableCell>{lease.lease_external_id || '-'}</TableCell>
                <TableCell>{lease.is_sub_lease !== undefined ? (lease.is_sub_lease ? 'Yes' : 'No') : '-'}</TableCell>
                <TableCell>{lease.usage || '-'}</TableCell>
                <TableCell>{lease.tenant_identifier || '-'}</TableCell>
                <TableCell>{lease.tenant_display_name || lease.tenant}</TableCell>
                <TableCell>{lease.tenant_industry || '-'}</TableCell>
                <TableCell>{lease.contractual_start_date || lease.startDate}</TableCell>
                <TableCell>{lease.contractual_end_date || lease.endDate}</TableCell>
                <TableCell>{lease.occupation_start_date || '-'}</TableCell>
                <TableCell>{zoneNames}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};
