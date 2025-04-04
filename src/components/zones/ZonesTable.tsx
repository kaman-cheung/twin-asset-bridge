
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronRight, Download, ChevronsDown, Cpu, PanelRight } from "lucide-react";
import { Zone } from "@/lib/models";
import { getSensorsByZone } from "@/lib/sample-data";
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
                      <td className="p-2">{zone.zone_type || zone.type || '-'}</td>
                      <td className="p-2">{zone.lettable_area ? `${zone.lettable_area} sqm` : '-'}</td>
                      <td className="p-2">{zone.capacity || '-'}</td>
                      <td className="p-2">{zone.asset || zone.assetId || '-'}</td>
                      <td className="p-2">{zone.parent_zones ? zone.parent_zones.length : (zone.parentZoneId ? '1' : '0')}</td>
                      <td className="p-2">
                        {zoneDevices > 0 ? (
                          <div className="text-xs">
                            <span className="font-semibold">{zoneDevices}</span> device{zoneDevices !== 1 ? 's' : ''}, {' '}
                            <span className="font-semibold">{zoneSensors}</span> sensor{zoneSensors !== 1 ? 's' : ''}
                          </div>
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
              <Cpu className="h-5 w-5 text-purple-500" />
              Sensors for Zone: {selectedZone ? (selectedZone.display_name || selectedZone.displayName) : ''}
            </DialogTitle>
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
                No sensors found for this zone
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
