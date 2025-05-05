
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronRight, Download, ChevronsDown, Cpu, PanelRight, Building } from "lucide-react";
import { Zone } from "@/lib/models";
import { getSensorsByZone, zones as allZones } from "@/lib/sample-data";
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
  const [sensorDialogOpen, setSensorDialogOpen] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  
  const handleDownload = () => {
    console.log("Downloading zones data as Excel");
    // In a real app, this would generate and download an Excel file
    alert("Downloading zones data...");
  };

  const handleShowSensors = (zoneId: number) => {
    setSelectedZoneId(zoneId);
    setSensorDialogOpen(true);
  };

  // Calculate totals for lettable area and capacity
  const totalLettableArea = zones.reduce((sum, zone) => {
    return sum + (zone.lettable_area || 0);
  }, 0);
  
  const totalCapacity = zones.reduce((sum, zone) => {
    return sum + (zone.capacity || 0);
  }, 0);

  // Get sensors for the selected zone
  const selectedZoneSensors = selectedZoneId ? getSensorsByZone(selectedZoneId) : [];
  const selectedZone = selectedZoneId ? zones.find(z => z.id === selectedZoneId) : null;

  // Get child zones for the selected zone
  const getChildZones = (parentId: number) => {
    return allZones.filter(z => 
      (z.parentZoneId === parentId) || 
      (z.parent_zones && z.parent_zones.includes(parentId))
    );
  };
  
  const childZones = selectedZoneId ? getChildZones(selectedZoneId) : [];

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
                              handleShowSensors(zone.id);
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
                      onClick={() => onSelectZone(zone.id)}
                    >
                      <PanelRight className="h-4 w-4" />
                      <span>View relationship</span>
                    </ContextMenuItem>
                    <ContextMenuItem 
                      className="flex items-center gap-2"
                      onClick={() => handleShowSensors(zone.id)}
                    >
                      {hasHierarchy ? (
                        <>
                          <Building className="h-4 w-4" />
                          <span>View hierarchy</span>
                        </>
                      ) : (
                        <>
                          <Cpu className="h-4 w-4" />
                          <span>View sensors</span>
                        </>
                      )}
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sensor Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Unit</TableHead>
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
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {sensor.status}
                        </span>
                      </TableCell>
                      <TableCell>{sensor.unit || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No sensors found directly in this {selectedZone?.zone_type || selectedZone?.type || 'zone'}
                {childZones.length > 0 && " (check child zones)"}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
