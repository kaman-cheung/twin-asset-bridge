
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download } from "lucide-react";
import { Zone } from "@/lib/models";
import { getSensorsByZone } from "@/lib/sample-data";

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
  const handleDownload = () => {
    console.log("Downloading zones data as Excel");
    // In a real app, this would generate and download an Excel file
    alert("Downloading zones data...");
  };

  // Calculate totals for lettable area and capacity
  const totalLettableArea = zones.reduce((sum, zone) => {
    return sum + (zone.lettable_area || 0);
  }, 0);
  
  const totalCapacity = zones.reduce((sum, zone) => {
    return sum + (zone.capacity || 0);
  }, 0);

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
                <tr 
                  key={zone.id} 
                  className="border-t hover:bg-muted/30 cursor-pointer"
                  onClick={() => onSelectZone(zone.id)}
                >
                  <td className="p-2" onClick={(e) => e.stopPropagation()}>
                    <Checkbox 
                      checked={selectedRows.includes(zone.id)}
                      onCheckedChange={() => onSelectRow(zone.id)}
                    />
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
    </div>
  );
}
