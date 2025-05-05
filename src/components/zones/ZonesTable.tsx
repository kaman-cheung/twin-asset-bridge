
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight, Download, ChevronsDown, Cpu, PanelRight, Building, X } from "lucide-react";
import { Zone } from "@/lib/models";
import { getSensorsByZone, zones as allZones, devices, sensors, properties, leases } from "@/lib/sample-data";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ZonesTableProps {
  zones: Zone[];
  selectedRows: number[];
  onSelectAll: () => void;
  onSelectRow: (id: number) => void;
  onSelectZone: (id: number) => void;
}

export function ZonesTable({ 
  zones, 
  selectedRows, 
  onSelectAll, 
  onSelectRow, 
  onSelectZone 
}: ZonesTableProps) {
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  const [detailsSheetOpen, setDetailsSheetOpen] = useState(false);
  const [detailsActiveTab, setDetailsActiveTab] = useState("iot");
  
  const handleDownload = () => {
    console.log("Downloading zones data as Excel");
    // In a real app, this would generate and download an Excel file
    alert("Downloading zones data...");
  };

  const handleShowZoneDetails = (zoneId: number) => {
    setSelectedZoneId(zoneId);
    setDetailsSheetOpen(true);
  };

  // Calculate totals for lettable area and capacity
  const totalLettableArea = zones.reduce((sum, zone) => {
    return sum + (zone.lettable_area || 0);
  }, 0);
  
  const totalCapacity = zones.reduce((sum, zone) => {
    return sum + (zone.capacity || 0);
  }, 0);

  // Get selected zone and its sensors
  const selectedZone = selectedZoneId ? zones.find(z => z.id === selectedZoneId) : null;
  const selectedZoneSensors = selectedZoneId ? getSensorsByZone(selectedZoneId) : [];

  // Get child zones for the selected zone
  const getChildZones = (parentId: number) => {
    return allZones.filter(z => {
      // Check both parent_zones array and parentZoneId (if they exist)
      const hasParentZones = z.parent_zones && z.parent_zones.includes(parentId);
      const hasLegacyParentZone = z.parentZoneId === parentId;
      return hasParentZones || hasLegacyParentZone;
    });
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

  // Function to get zone type display text
  const getZoneTypeDisplay = (zone: Zone): string => {
    const zoneType = zone.zone_type || zone.type || '';
    switch (zoneType.toLowerCase()) {
      case 'building': return 'Building';
      case 'floor': return 'Floor';
      case 'space': return 'Space';
      default: return zoneType || '-';
    }
  };

  return (
    <div className="border rounded-md">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="w-10 p-2 text-left">
                <Checkbox 
                  checked={selectedRows.length === zones.length && zones.length > 0}
                  onCheckedChange={onSelectAll}
                />
              </th>
              <th className="p-2 text-left font-medium">
                <div className="flex items-center">
                  INTERNAL NAME
                  <button className="ml-1">↕</button>
                </div>
              </th>
              <th className="p-2 text-left font-medium">
                <div className="flex items-center">
                  DISPLAY NAME
                  <button className="ml-1">↕</button>
                </div>
              </th>
              <th className="p-2 text-left font-medium">
                <div className="flex items-center">
                  START DATE
                  <button className="ml-1">↕</button>
                </div>
              </th>
              <th className="p-2 text-left font-medium">
                <div className="flex items-center">
                  END DATE
                  <button className="ml-1">↕</button>
                </div>
              </th>
              <th className="p-2 text-left font-medium">ZONE TYPE</th>
              <th className="p-2 text-left font-medium">LETTABLE AREA</th>
              <th className="p-2 text-left font-medium">CAPACITY</th>
              <th className="p-2 text-left font-medium">ASSET</th>
              <th className="p-2 text-left font-medium">PARENT ZONES</th>
              <th className="p-2 text-left font-medium">DEVICES</th>
              <th className="p-2 text-left font-medium">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDownload}
                  className="flex items-center gap-1"
                >
                  <Download className="h-3 w-3" />
                  Download
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {zones.map((zone) => {
              const zoneDevices = zone.devices.length;
              const zoneSensors = getSensorsByZone(zone.id).length;
              const zoneChildZones = getChildZones(zone.id);
              const hasHierarchy = zoneChildZones.length > 0;
              
              return (
                <ContextMenu key={zone.id}>
                  <ContextMenuTrigger asChild>
                    <tr 
                      className="border-t hover:bg-muted/30 cursor-pointer"
                      onClick={() => onSelectZone(zone.id)}
                    >
                      <td className="p-2" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            checked={selectedRows.includes(zone.id)}
                            onCheckedChange={() => onSelectRow(zone.id)}
                          />
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="p-0 h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShowZoneDetails(zone.id);
                            }}
                          >
                            <ChevronsDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="p-2">{zone.internal_name || zone.internalName}</td>
                      <td className="p-2">{zone.display_name || zone.displayName}</td>
                      <td className="p-2">{zone.start_date}</td>
                      <td className="p-2">{zone.end_date}</td>
                      <td className="p-2">{getZoneTypeDisplay(zone)}</td>
                      <td className="p-2">{zone.lettable_area ? `${zone.lettable_area} sqm` : '-'}</td>
                      <td className="p-2">{zone.capacity || '-'}</td>
                      <td className="p-2">{zone.asset || zone.assetId || '-'}</td>
                      <td className="p-2">{zone.parent_zones ? zone.parent_zones.length : (zone.parentZoneId ? '1' : '0')}</td>
                      <td className="p-2">
                        {zoneDevices > 0 || zoneSensors > 0 ? (
                          <div className="text-xs">
                            <span className="font-semibold">{zoneDevices}</span> device{zoneDevices !== 1 ? 's' : ''}, {' '}
                            <span className="font-semibold">{zoneSensors}</span> sensor{zoneSensors !== 1 ? 's' : ''}
                            {hasHierarchy && (
                              <span className="ml-1 text-muted-foreground">
                                (+ {zoneChildZones.length} child zone{zoneChildZones.length !== 1 ? 's' : ''})
                              </span>
                            )}
                          </div>
                        ) : hasHierarchy ? (
                          <span className="text-xs">
                            <span className="font-semibold">{zoneChildZones.length}</span> child zone{zoneChildZones.length !== 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">No devices</span>
                        )}
                      </td>
                      <td className="p-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectZone(zone.id);
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-56">
                    <ContextMenuItem 
                      className="flex items-center gap-2"
                      onClick={() => handleShowZoneDetails(zone.id)}
                    >
                      <Building className="h-4 w-4" />
                      <span>View zone details</span>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              );
            })}
            {/* Totals row */}
            {zones.length > 0 && (
              <tr className="border-t bg-muted/30 font-medium">
                <td colSpan={6} className="p-2 text-right">TOTALS:</td>
                <td className="p-2">{totalLettableArea > 0 ? `${totalLettableArea} sqm` : '-'}</td>
                <td className="p-2">{totalCapacity > 0 ? totalCapacity : '-'}</td>
                <td colSpan={4}></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Zone Details Sheet - Combined view */}
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
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="hierarchy" className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                <span>Hierarchy</span>
              </TabsTrigger>
              <TabsTrigger value="iot" className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>IoT</span>
              </TabsTrigger>
              <TabsTrigger value="lease" className="flex items-center gap-2">
                <PanelRight className="w-4 h-4" />
                <span>Lease</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Hierarchy Tab - Shows zone relationships */}
            <TabsContent value="hierarchy" className="p-0 m-0">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Zone Relationship</h3>
                <div className="border rounded-md p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Asset</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedZone && (selectedZone.assetId || selectedZone.asset) ? 
                            `Asset ID: ${selectedZone.assetId || selectedZone.asset}` : 
                            'Not assigned to an asset'}
                        </div>
                      </div>
                    </div>
                    
                    {selectedZone?.parent_zones && selectedZone.parent_zones.length > 0 && (
                      <div className="mt-4">
                        <div className="font-medium mb-2">Parent Zones</div>
                        <div className="space-y-2 pl-4 border-l-2 border-muted">
                          {selectedZone.parent_zones.map(parentId => {
                            const parentZone = allZones.find(z => z.id === parentId);
                            return parentZone ? (
                              <div key={parentId} className="text-sm">
                                {parentZone.display_name || parentZone.displayName} ({parentZone.zone_type || parentZone.type})
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                    
                    {childZones.length > 0 && (
                      <div className="mt-4">
                        <div className="font-medium mb-2">Child Zones ({childZones.length})</div>
                        <div className="space-y-2 pl-4 border-l-2 border-muted">
                          {childZones.map(childZone => (
                            <div key={childZone.id} className="text-sm flex justify-between items-center">
                              <span>
                                {childZone.display_name || childZone.displayName} ({childZone.zone_type || childZone.type})
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setDetailsSheetOpen(false);
                                  setTimeout(() => {
                                    setSelectedZoneId(childZone.id);
                                    setDetailsSheetOpen(true);
                                  }, 100);
                                }}
                              >
                                View
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* IoT Tab - Shows sensors */}
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
                    {childZones.length > 0 && " (check child zones)"}
                  </div>
                )}
                
                {/* Child zones with sensors info */}
                {childZones.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Child Zones with Sensors</h3>
                    <div className="space-y-3">
                      {childZones.map(childZone => {
                        const childSensors = getSensorsByZone(childZone.id).length;
                        if (childSensors === 0) return null;
                        
                        return (
                          <div key={childZone.id} className="pl-4 border-l-2 border-muted">
                            <div className="flex items-center justify-between py-1">
                              <div>
                                <div className="font-medium">{childZone.display_name || childZone.displayName}</div>
                                <div className="text-xs text-muted-foreground">
                                  Type: {childZone.zone_type || childZone.type || 'N/A'} • 
                                  {childZone.devices.length > 0 ? `${childZone.devices.length} devices, ${childSensors} sensors` : 'No devices'}
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setDetailsSheetOpen(false);
                                  setTimeout(() => {
                                    setSelectedZoneId(childZone.id);
                                    setDetailsSheetOpen(true);
                                  }, 100);
                                }}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
    </div>
  );
}
