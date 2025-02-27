
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
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
                  DISPLAY NAME
                  <button className="ml-1">↕</button>
                </div>
              </th>
              <th className="p-2 text-left font-medium">
                <div className="flex items-center">
                  INTERNAL NAME
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
              <th className="p-2 text-left font-medium">DEVICES</th>
              <th className="p-2 text-left font-medium">DETAILS</th>
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
                  <td className="p-2">{zone.displayName}</td>
                  <td className="p-2">{zone.internalName}</td>
                  <td className="p-2">{zone.startDate}</td>
                  <td className="p-2">{zone.endDate}</td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
