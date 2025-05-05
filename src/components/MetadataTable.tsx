import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Server, Cpu, List, CalendarClock, Code, Download, PanelRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { assets, zones, devices, sensors, properties, leases, procedures, getSensorsByZone } from "@/lib/sample-data";
import { Asset, Zone, Device, Sensor, Property, Lease, Procedure } from "@/lib/models";

// Import the refactored table components
import { AssetsTable } from "./tables/AssetsTable";
import { ZonesTable } from "./tables/ZonesTable";
import { ProceduresTable } from "./tables/ProceduresTable";
import { DevicesTable } from "./tables/DevicesTable";
import { SensorsTable } from "./tables/SensorsTable";
import { PropertiesTable } from "./tables/PropertiesTable";
import { LeasesTable } from "./tables/LeasesTable";

interface MetadataTableProps {
  selectedAssetId?: string;
}

export function MetadataTable({ selectedAssetId = "all" }: MetadataTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("assets");
  const [sensorDialogOpen, setSensorDialogOpen] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  const [detailsSheetOpen, setDetailsSheetOpen] = useState(false);
  const [detailsActiveTab, setDetailsActiveTab] = useState("iot");
  const [expandedZones, setExpandedZones] = useState<number[]>([]);
  
  // Filter data based on selected asset
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
  
  // Get child zones for the selected zone
  const getChildZones = (parentId: number) => {
    return zones.filter(z => 
      (z.parent_zones && z.parent_zones.includes(parentId)) ||
      (z.parentZoneId === parentId)
    );
  };
  
  const childZones = selectedZoneId ? getChildZones(selectedZoneId) : [];
  
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
          <Select onValueChange={setStatusFilter} defaultValue={activeTab === "zones" ? "all" : "active"}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {activeTab === "zones" ? (
                <>
                  <SelectItem value="building">Buildings</SelectItem>
                  <SelectItem value="floor">Floors</SelectItem>
                  <SelectItem value="space">Spaces</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="archive">Archived</SelectItem>
                </>
              )}
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
                assets={assets as Asset[]}
                statusFilter={statusFilter} 
                onShowSensors={handleShowSensors}
                onShowZoneDetails={handleShowZoneDetails}
              />
            </TabsContent>
            <TabsContent value="procedures" className="p-0 m-0">
              <ProceduresTable 
                procedures={filteredProcedures as Procedure[]} 
                assets={assets as Asset[]}
                statusFilter={statusFilter} 
              />
            </TabsContent>
            <TabsContent value="sensors" className="p-0 m-0">
              <SensorsTable 
                sensors={filteredSensors as Sensor[]} 
                devices={devices as Device[]}
                statusFilter={statusFilter} 
              />
            </TabsContent>
            <TabsContent value="properties" className="p-0 m-0">
              <PropertiesTable 
                properties={filteredProperties as Property[]} 
                assets={assets as Asset[]}
                zones={zones as Zone[]}
                devices={devices as Device[]}
                sensors={sensors as Sensor[]}
                statusFilter={statusFilter} 
              />
            </TabsContent>
            <TabsContent value="leases" className="p-0 m-0">
              <LeasesTable 
                leases={filteredLeases as Lease[]} 
                zones={zones as Zone[]}
                statusFilter={statusFilter} 
              />
            </TabsContent>
            <TabsContent value="other" className="p-0 m-0">
              <DevicesTable 
                devices={filteredDevices as Device[]} 
                zones={zones as Zone[]}
                assets={assets as Asset[]}
                statusFilter={statusFilter} 
              />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>

      {/* Sensors Dialog */}
      <Dialog open={sensorDialogOpen} onOpenChange={setSensorDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedZone?.zone_type === "building" || selectedZone?.type === "building" ? (
                <Building className="h-5 w-5 text-blue-500" />
              ) : (
                <Cpu className="h-5 w-5 text-purple-500" />
              )}
              {selectedZone?.zone_type === "building" || selectedZone?.type === "building" ? 
                "Building Details" : (
                selectedZone?.zone_type === "floor" || selectedZone?.type === "floor" ?
                "Floor Details" : "Space Details"
              )}: {selectedZone ? (selectedZone.display_name || selectedZone.displayName) : ''}
            </DialogTitle>
            <DialogDescription>
              {childZones.length > 0 ? 
                `View child zones and sensors for this ${selectedZone?.zone_type || selectedZone?.type || 'zone'}` :
                `View all IoT sensors for this ${selectedZone?.zone_type || selectedZone?.type || 'zone'}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            {/* Show hierarchy if there are child zones */}
            {childZones.length > 0 && (
              <div className="mb-6 border rounded-md p-4">
                <h3 className="text-sm font-medium mb-2">Child Zones</h3>
                <div className="space-y-3">
                  {childZones.map(childZone => {
                    const childSensors = getSensorsByZone(childZone.id).length;
                    const grandchildZones = getChildZones(childZone.id);
                    
                    return (
                      <div key={childZone.id} className="pl-4 border-l-2 border-muted">
                        <div className="flex items-center justify-between py-1">
                          <div>
                            <div className="font-medium">{childZone.display_name || childZone.displayName}</div>
                            <div className="text-xs text-muted-foreground">
                              Type: {childZone.zone_type || childZone.type || 'N/A'} • 
                              {childZone.devices.length > 0 ? `${childZone.devices.length} devices, ${childSensors} sensors` : 'No devices'}
                              {grandchildZones.length > 0 ? ` • ${grandchildZones.length} child zones` : ''}
                            </div>
                          </div>
                          {(childSensors > 0 || grandchildZones.length > 0) && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSensorDialogOpen(false);
                                setTimeout(() => {
                                  setSelectedZoneId(childZone.id);
                                  setSensorDialogOpen(true);
                                }, 100);
                              }}
                            >
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Show sensors for this zone */}
            <h3 className="text-sm font-medium mb-2">Sensors in this {selectedZone?.zone_type || selectedZone?.type || 'zone'}</h3>
            {selectedZoneSensors.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-medium p-2">Sensor Name</th>
                    <th className="text-left font-medium p-2">Type</th>
                    <th className="text-left font-medium p-2">Status</th>
                    <th className="text-left font-medium p-2">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedZoneSensors.map((sensor) => (
                    <tr key={sensor.id} className="border-t">
                      <td className="p-2">{sensor.display_name || sensor.name}</td>
                      <td className="p-2">{sensor.type}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          sensor.status === 'active' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {sensor.status}
                        </span>
                      </td>
                      <td className="p-2">{sensor.unit || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No sensors found directly in this {selectedZone?.zone_type || selectedZone?.type || 'zone'}
                {childZones.length > 0 && " (check child zones)"}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Zone Details Sheet */}
      <Sheet open={detailsSheetOpen} onOpenChange={setDetailsSheetOpen}>
        <SheetContent className="w-full md:w-1/2 overflow-auto">
          <SheetHeader className="mb-4 flex flex-row justify-between items-start">
            <div>
              <SheetTitle className="mb-2 flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-500" />
                {selectedZone ? (selectedZone.display_name || selectedZone.displayName) : 'Zone Details'}
              </SheetTitle>
              <p className="text-muted-foreground text-sm">
                {selectedZone ? 
                  `Type: ${selectedZone.zone_type || selectedZone.type || 'N/A'}` : 
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
                                <span className={`px-2 py-1 rounded-full text-xs self-center ${
                                  sensor.status === 'active' ? 'bg-green-100 text-green-800' : 
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {sensor.status}
                                </span>
                              </div>
                            </AccordionTrigger>
                            
                            <AccordionContent>
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
                                        <div className="text-muted-foreground">Value: -</div>
                                      </div>
                                      <div className="text-xs border rounded-md p-2">
                                        <div className="font-medium">Active Power</div>
                                        <div className="text-muted-foreground">Type: active_power</div>
                                        <div className="text-muted-foreground">Unit: kW</div>
                                        <div className="text-muted-foreground">Value: -</div>
                                      </div>
                                      <div className="text-xs border rounded-md p-2">
                                        <div className="font-medium">Temperature</div>
                                        <div className="text-muted-foreground">Type: temperature</div>
                                        <div className="text-muted-foreground">Unit: °C</div>
                                        <div className="text-muted-foreground">Value: -</div>
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
