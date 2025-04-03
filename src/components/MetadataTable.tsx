
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Server, Cpu, List, CalendarClock, Code, Download, ChevronsDown, PanelRight, X } from "lucide-react";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { assets, zones, devices, sensors, properties, leases, procedures, getSensorsByZone } from "@/lib/sample-data";
import { Asset, Zone, Device, Sensor, Property, Lease, Procedure } from "@/lib/models";

interface MetadataTableProps {
  selectedAssetId?: string;
}

export function MetadataTable({ selectedAssetId = "all" }: MetadataTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>("active");
  const [activeTab, setActiveTab] = useState<string>("assets");
  const [sensorDialogOpen, setSensorDialogOpen] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  const [detailsSheetOpen, setDetailsSheetOpen] = useState(false);
  const [detailsActiveTab, setDetailsActiveTab] = useState("iot");
  
  const filteredAssets = selectedAssetId === "all" 
    ? assets 
    : assets.filter(a => a.id === parseInt(selectedAssetId));
  
  const assetIds = filteredAssets.map(a => a.id);
  const filteredZones = zones.filter(z => assetIds.includes(z.assetId));
  const zoneIds = filteredZones.map(z => z.id);
  const filteredDevices = devices.filter(d => zoneIds.includes(d.zoneId));
  const deviceIds = filteredDevices.map(d => d.id);
  const filteredSensors = sensors.filter(s => deviceIds.includes(s.deviceId));
  const filteredProcedures = procedures.filter(p => assetIds.includes(p.asset));
  const filteredProperties = properties.filter(p => 
    (p.entityType === "asset" && assetIds.includes(p.entityId)) ||
    (p.entityType === "zone" && zoneIds.includes(p.entityId)) ||
    (p.entityType === "device" && deviceIds.includes(p.entityId)) ||
    (p.entityType === "sensor" && filteredSensors.map(s => s.id).includes(p.entityId))
  );
  const filteredLeases = leases.filter(l => 
    l.zoneIds.some(zId => zoneIds.includes(zId))
  );

  const handleShowSensors = (zoneId: number) => {
    setSelectedZoneId(zoneId);
    setSensorDialogOpen(true);
  };

  const handleShowZoneDetails = (zoneId: number) => {
    setSelectedZoneId(zoneId);
    setDetailsSheetOpen(true);
  };
  
  // Get selected zone and its sensors
  const selectedZone = selectedZoneId ? zones.find(z => z.id === selectedZoneId) : null;
  const selectedZoneSensors = selectedZoneId ? getSensorsByZone(selectedZoneId) : [];
  
  // Get leases for selected zone
  const selectedZoneLeases = selectedZoneId 
    ? leases.filter(lease => lease.zoneIds.includes(selectedZoneId))
    : [];

  // Get sensor properties
  const getSensorProperties = (sensorId: number) => {
    return properties.filter(p => p.entityType === "sensor" && p.entityId === sensorId);
  };

  // Get device information for a sensor
  const getDeviceForSensor = (sensorId: number) => {
    const sensor = sensors.find(s => s.id === sensorId);
    if (!sensor) return null;
    return devices.find(d => d.id === sensor.deviceId);
  };

  const handleDownload = () => {
    console.log(`Downloading ${activeTab} data as Excel`);
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
            <TabsTrigger value="other" className="flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span className="hidden sm:inline">Other</span>
            </TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[600px]">
            <TabsContent value="assets" className="p-0 m-0">
              <AssetsTable assets={filteredAssets as Asset[]} statusFilter={statusFilter} />
            </TabsContent>
            <TabsContent value="zones" className="p-0 m-0">
              <ZonesTable 
                zones={filteredZones as Zone[]} 
                statusFilter={statusFilter} 
                onShowSensors={handleShowSensors}
                onShowZoneDetails={handleShowZoneDetails}
              />
            </TabsContent>
            <TabsContent value="procedures" className="p-0 m-0">
              <ProceduresTable procedures={filteredProcedures as Procedure[]} statusFilter={statusFilter} />
            </TabsContent>
            <TabsContent value="sensors" className="p-0 m-0">
              <SensorsTable sensors={filteredSensors as Sensor[]} statusFilter={statusFilter} />
            </TabsContent>
            <TabsContent value="properties" className="p-0 m-0">
              <PropertiesTable properties={filteredProperties as Property[]} statusFilter={statusFilter} />
            </TabsContent>
            <TabsContent value="leases" className="p-0 m-0">
              <LeasesTable leases={filteredLeases as Lease[]} statusFilter={statusFilter} />
            </TabsContent>
            <TabsContent value="other" className="p-0 m-0">
              <DevicesTable devices={filteredDevices as Device[]} statusFilter={statusFilter} />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>

      {/* Sensors Dialog */}
      <Dialog open={sensorDialogOpen} onOpenChange={setSensorDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-purple-500" />
              Sensors for Zone: {selectedZone ? (selectedZone.display_name || selectedZone.displayName) : ''}
            </DialogTitle>
            <DialogDescription>
              View all IoT sensors and their latest readings for this zone
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            {selectedZoneSensors.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sensor Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Last Reading</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedZoneSensors.map((sensor) => (
                    <TableRow key={sensor.id}>
                      <TableCell>{sensor.display_name || sensor.name}</TableCell>
                      <TableCell>{sensor.type}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          sensor.status === 'active' ? 'bg-green-100 text-green-800' : 
                          sensor.status === 'error' ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {sensor.status}
                        </span>
                      </TableCell>
                      <TableCell>{sensor.unit || '-'}</TableCell>
                      <TableCell>
                        {sensor.lastReading ? (
                          <div>
                            <div>{sensor.lastReading.value} {sensor.unit}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(sensor.lastReading.timestamp).toLocaleString()}
                            </div>
                          </div>
                        ) : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No sensors found for this zone
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Zone Details Sheet */}
      <Sheet open={detailsSheetOpen} onOpenChange={setDetailsSheetOpen}>
        <SheetContent className="w-[700px] sm:w-[600px] overflow-auto">
          <SheetHeader className="mb-4 flex flex-row justify-between items-start">
            <div>
              <SheetTitle className="mb-2 flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-500" />
                {selectedZone ? (selectedZone.display_name || selectedZone.displayName) : 'Zone Details'}
              </SheetTitle>
              <p className="text-muted-foreground text-sm">
                {selectedZone ? 
                  `Type: ${selectedZone.zone_type || selectedZone.type || 'N/A'} · Usage: ${selectedZone.zone_usage || 'N/A'}` : 
                  ''}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setDetailsSheetOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetHeader>

          <Tabs defaultValue="iot" className="w-full mt-6" onValueChange={setDetailsActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="iot" className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>IoT</span>
              </TabsTrigger>
              <TabsTrigger value="lease" className="flex items-center gap-2">
                <CalendarClock className="w-4 h-4" />
                <span>Lease</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="iot" className="p-0 m-0">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Sensors ({selectedZoneSensors.length})</h3>
                
                {selectedZoneSensors.length > 0 ? (
                  <div className="space-y-6">
                    <Accordion type="single" collapsible className="w-full">
                      {selectedZoneSensors.map((sensor) => {
                        const deviceInfo = getDeviceForSensor(sensor.id);
                        const sensorProperties = getSensorProperties(sensor.id);
                        
                        return (
                          <AccordionItem key={sensor.id} value={`sensor-${sensor.id}`}>
                            <AccordionTrigger className="hover:no-underline py-3">
                              <div className="flex flex-1 justify-between mr-4">
                                <div>
                                  <div className="font-medium text-left">{sensor.display_name || sensor.name}</div>
                                  <div className="text-xs text-muted-foreground text-left mt-1">
                                    Device: {deviceInfo?.name || 'N/A'} · 
                                    {sensor.start_date && ` Start: ${sensor.start_date} ·`} 
                                    {sensor.end_date && ` End: ${sensor.end_date} ·`} 
                                    ID: {sensor.external_id || sensor.id}
                                  </div>
                                </div>
                                <span className={`px-2 py-1 h-fit rounded-full text-xs self-center ${
                                  sensor.status === 'active' ? 'bg-green-100 text-green-800' : 
                                  sensor.status === 'error' ? 'bg-red-100 text-red-800' : 
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {sensor.status}
                                </span>
                              </div>
                            </AccordionTrigger>
                            
                            <AccordionContent>
                              {/* Sensor readings */}
                              {sensor.lastReading && (
                                <div className="mb-4 bg-muted/30 p-3 rounded-md">
                                  <div className="font-medium">{sensor.lastReading.value} {sensor.unit}</div>
                                  <div className="text-xs text-muted-foreground">
                                    Last updated: {new Date(sensor.lastReading.timestamp).toLocaleString()}
                                  </div>
                                </div>
                              )}
                              
                              {/* Sensor properties */}
                              <div className="mt-3">
                                <h5 className="text-xs font-medium mb-2">Properties</h5>
                                <div className="grid grid-cols-2 gap-2">
                                  {sensorProperties.length > 0 ? (
                                    sensorProperties.map((property) => (
                                      <div key={property.id} className="text-xs border rounded-md p-2">
                                        <div className="font-medium">{property.display_name || property.name}</div>
                                        <div className="text-muted-foreground">Type: {property.property_type || property.type || 'people_counting'}</div>
                                        <div className="text-muted-foreground">Unit: {property.unit || 'count'}</div>
                                        <div className="text-muted-foreground">Value: {property.value || '0'}</div>
                                      </div>
                                    ))
                                  ) : (
                                    <>
                                      <div className="text-xs border rounded-md p-2">
                                        <div className="font-medium">People Count</div>
                                        <div className="text-muted-foreground">Type: people_counting</div>
                                        <div className="text-muted-foreground">Unit: count</div>
                                        <div className="text-muted-foreground">Value: 12</div>
                                      </div>
                                      <div className="text-xs border rounded-md p-2">
                                        <div className="font-medium">Active Power</div>
                                        <div className="text-muted-foreground">Type: active_power</div>
                                        <div className="text-muted-foreground">Unit: kW</div>
                                        <div className="text-muted-foreground">Value: 1.45</div>
                                      </div>
                                      <div className="text-xs border rounded-md p-2">
                                        <div className="font-medium">Temperature</div>
                                        <div className="text-muted-foreground">Type: temperature</div>
                                        <div className="text-muted-foreground">Unit: °C</div>
                                        <div className="text-muted-foreground">Value: 22.5</div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground border rounded-md">
                    No sensors found for this zone
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="lease" className="p-0 m-0">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Leases ({selectedZoneLeases.length})</h3>
                
                {selectedZoneLeases.length > 0 ? (
                  <div className="space-y-4">
                    {selectedZoneLeases.map((lease) => {
                      // Calculate status
                      const now = new Date();
                      const endDate = new Date(lease.endDate || lease.contractual_end_date);
                      const isActive = endDate > now;
                      
                      return (
                        <div key={lease.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium">{lease.tenant_display_name || lease.tenant}</h4>
                              <div className="text-xs text-muted-foreground">
                                Industry: {lease.tenant_industry || 'N/A'}
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-xs font-medium mb-1">Contract Period</h5>
                              <div className="text-sm">
                                <div>Start: {lease.contractual_start_date || lease.startDate}</div>
                                <div>End: {lease.contractual_end_date || lease.endDate}</div>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-xs font-medium mb-1">Occupation Period</h5>
                              <div className="text-sm">
                                <div>Start: {lease.occupation_start_date || lease.startDate}</div>
                                <div>End: {lease.endDate || 'N/A'}</div>
                              </div>
                            </div>
                          </div>
                          
                          {lease.usage && (
                            <div className="mt-3 text-sm">
                              <h5 className="text-xs font-medium mb-1">Usage</h5>
                              <p>{lease.usage}</p>
                            </div>
                          )}
                          
                          {lease.is_sub_lease !== undefined && (
                            <div className="mt-2 text-xs">
                              {lease.is_sub_lease ? 'Sub-lease' : 'Primary lease'}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground border rounded-md">
                    No leases found for this zone
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </Card>
  );
}

interface AssetsTableProps {
  assets: Asset[];
  statusFilter: string;
}

const AssetsTable = ({ assets, statusFilter }: AssetsTableProps) => {
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

interface ZonesTableProps {
  zones: Zone[];
  statusFilter: string;
  onShowSensors: (zoneId: number) => void;
  onShowZoneDetails: (zoneId: number) => void;
}

const ZonesTable = ({ zones, statusFilter, onShowSensors, onShowZoneDetails }: ZonesTableProps) => {
  const filteredZones = statusFilter === "all" 
    ? zones 
    : zones.filter(zone => 
        zone.type === (statusFilter === "active" ? "office" : 
                      statusFilter === "inactive" ? "meeting-room" : "common-area")
      );
  
  const totalLettableArea = filteredZones.reduce((sum, zone) => {
    return sum + (zone.lettable_area || 0);
  }, 0);
  
  const totalCapacity = filteredZones.reduce((sum, zone) => {
    return sum + (zone.capacity || 0);
  }, 0);
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10"></TableHead>
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
            <TableCell colSpan={11} className="text-center py-4">No zones found</TableCell>
          </TableRow>
        ) : (
          <>
            {filteredZones.map((zone) => {
              const parentAsset = assets.find(a => a.id === zone.assetId);
              const zoneSensors = getSensorsByZone(zone.id).length;
              
              return (
                <ContextMenu key={zone.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow className="hover:bg-muted/30 cursor-pointer" onClick={() => onShowZoneDetails(zone.id)}>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="p-0 h-6 w-6 flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            onShowZoneDetails(zone.id);
                          }}
                        >
                          <PanelRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>{zone.internal_name || zone.internalName}</TableCell>
                      <TableCell>{zone.display_name || zone.displayName}</TableCell>
                      <TableCell>{zone.start_date || zone.startDate}</TableCell>
                      <TableCell>{zone.end_date || zone.endDate}</TableCell>
                      <TableCell>{zone.zone_type || zone.type || '-'}</TableCell>
                      <TableCell>{zone.lettable_area ? `${zone.lettable_area} sqm` : '-'}</TableCell>
                      <TableCell>{zone.capacity || '-'}</TableCell>
                      <TableCell>{parentAsset ? parentAsset.name : "-"}</TableCell>
                      <TableCell>{zone.parent_zones ? zone.parent_zones.length : (zone.parentZoneId ? '1' : '0')}</TableCell>
                      <TableCell>
                        {zone.devices.length > 0 ? (
                          <div className="text-xs">
                            <span className="font-semibold">{zone.devices.length}</span> device{zone.devices.length !== 1 ? 's' : ''}, {' '}
                            <span className="font-semibold">{zoneSensors}</span> sensor{zoneSensors !== 1 ? 's' : ''}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">No devices</span>
                        )}
                      </TableCell>
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-56">
                    <ContextMenuItem 
                      className="flex items-center gap-2"
                      onClick={() => onShowZoneDetails(zone.id)}
                    >
                      <PanelRight className="h-4 w-4" />
                      <span>View Zone Details</span>
                    </ContextMenuItem>
                    <ContextMenuItem 
                      className="flex items-center gap-2"
                      onClick={() => onShowSensors(zone.id)}
                    >
                      <Cpu className="h-4 w-4" />
                      <span>View Zone Sensors</span>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              );
            })}
            {filteredZones.length > 0 && (
              <TableRow className="border-t bg-muted/30 font-medium">
                <TableCell></TableCell>
                <TableCell colSpan={5} className="text-right py-4">TOTALS:</TableCell>
                <TableCell>{totalLettableArea > 0 ? `${totalLettableArea} sqm` : '-'}</TableCell>
                <TableCell>{totalCapacity > 0 ? totalCapacity : '-'}</TableCell>
                <TableCell colSpan={3}></TableCell>
              </TableRow>
            )}
          </>
        )}
      </TableBody>
    </Table>
  );
};

interface ProceduresTableProps {
  procedures: Procedure[];
  statusFilter: string;
}

const ProceduresTable = ({ procedures, statusFilter }: ProceduresTableProps) => {
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

interface DevicesTableProps {
  devices: Device[];
  statusFilter: string;
}

const DevicesTable = ({ devices, statusFilter }: DevicesTableProps) => {
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

interface SensorsTableProps {
  sensors: Sensor[];
  statusFilter: string;
}

const SensorsTable = ({ sensors, statusFilter }: SensorsTableProps) => {
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
          <TableHead>Type</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Reading</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredSensors.length === 0 ? (
          <TableRow>
            <TableCell colSpan={10} className="text-center py-4">No sensors found</TableCell>
          </TableRow>
        ) : (
          filteredSensors.map((sensor) => {
            const device = devices.find(d => d.id === sensor.deviceId);
            
            return (
              <TableRow key={sensor.id}>
                <TableCell>{sensor.internal_name || sensor.name}</TableCell>
                <TableCell>{sensor.display_name || sensor.name}</TableCell>
                <TableCell>{sensor.start_date || '-'}</TableCell>
                <TableCell>{sensor.end_date || '-'}</TableCell>
                <TableCell>{sensor.external_id || '-'}</TableCell>
                <TableCell>{sensor.provider || device?.provider || '-'}</TableCell>
                <TableCell>{sensor.type || '-'}</TableCell>
                <TableCell>{sensor.unit || '-'}</TableCell>
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
                  {sensor.lastReading ? (
                    <div>
                      <div>{sensor.lastReading.value} {sensor.unit}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(sensor.lastReading.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ) : '-'}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

interface PropertiesTableProps {
  properties: Property[];
  statusFilter: string;
}

const PropertiesTable = ({ properties, statusFilter }: PropertiesTableProps) => {
  const filteredProperties = statusFilter === "all" 
    ? properties 
    : properties.filter(property => 
        property.status === statusFilter || 
        (statusFilter === "active" && property.status !== "inactive" && property.status !== "archived")
      );
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Display Name</TableHead>
          <TableHead>Entity Type</TableHead>
          <TableHead>Property Type</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Source</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProperties.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4">No properties found</TableCell>
          </TableRow>
        ) : (
          filteredProperties.map((property) => {
            // Get entity name based on entity type and ID
            let entityName = '-';
            if (property.entityType === 'asset') {
              const asset = assets.find(a => a.id === property.entityId);
              entityName = asset ? asset.name : '-';
            } else if (property.entityType === 'zone') {
              const zone = zones.find(z => z.id === property.entityId);
              entityName = zone ? (zone.display_name || zone.displayName) : '-';
            } else if (property.entityType === 'device') {
              const device = devices.find(d => d.id === property.entityId);
              entityName = device ? device.name : '-';
            } else if (property.entityType === 'sensor') {
              const sensor = sensors.find(s => s.id === property.entityId);
              entityName = sensor ? sensor.name : '-';
            }
            
            return (
              <TableRow key={property.id}>
                <TableCell>{property.display_name || property.name}</TableCell>
                <TableCell>
                  {property.entityType.charAt(0).toUpperCase() + property.entityType.slice(1)}
                  <div className="text-xs text-muted-foreground">{entityName}</div>
                </TableCell>
                <TableCell>{property.property_type || property.type || '-'}</TableCell>
                <TableCell>{property.value || '-'}</TableCell>
                <TableCell>{property.unit || '-'}</TableCell>
                <TableCell>{property.source || '-'}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

interface LeasesTableProps {
  leases: Lease[];
  statusFilter: string;
}

const LeasesTable = ({ leases, statusFilter }: LeasesTableProps) => {
  const now = new Date();
  const filteredLeases = statusFilter === "all" 
    ? leases 
    : leases.filter(lease => {
        const endDate = new Date(lease.endDate || lease.contractual_end_date);
        const isActive = endDate > now;
        return (statusFilter === "active" && isActive) || (statusFilter === "inactive" && !isActive);
      });
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tenant</TableHead>
          <TableHead>Industry</TableHead>
          <TableHead>Contract Start</TableHead>
          <TableHead>Contract End</TableHead>
          <TableHead>Occupation Start</TableHead>
          <TableHead>Occupation End</TableHead>
          <TableHead>Zones</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredLeases.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-4">No leases found</TableCell>
          </TableRow>
        ) : (
          filteredLeases.map((lease) => {
            const endDate = new Date(lease.endDate || lease.contractual_end_date);
            const isActive = endDate > now;
            
            // Get zone names
            const leaseZones = zones.filter(z => lease.zoneIds.includes(z.id));
            const zoneNames = leaseZones.map(z => z.display_name || z.displayName || z.name).join(', ');
            
            return (
              <TableRow key={lease.id}>
                <TableCell>{lease.tenant_display_name || lease.tenant}</TableCell>
                <TableCell>{lease.tenant_industry || '-'}</TableCell>
                <TableCell>{lease.contractual_start_date || lease.startDate}</TableCell>
                <TableCell>{lease.contractual_end_date || lease.endDate}</TableCell>
                <TableCell>{lease.occupation_start_date || lease.startDate}</TableCell>
                <TableCell>{lease.occupation_end_date || lease.endDate || '-'}</TableCell>
                <TableCell>
                  <div className="max-w-[200px] truncate" title={zoneNames}>
                    {zoneNames || '-'}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isActive ? 'Active' : 'Inactive'}
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
