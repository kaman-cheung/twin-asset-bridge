
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Device } from "@/lib/models";
import { getSensorsByDevice } from "@/lib/sample-data";

interface DevicesTableProps {
  devices: Device[];
  selectedRows: number[];
  onSelectAll: () => void;
  onSelectRow: (id: number) => void;
  onSelectDevice: (id: number) => void;
}

export function DevicesTable({ 
  devices, 
  selectedRows, 
  onSelectAll, 
  onSelectRow, 
  onSelectDevice 
}: DevicesTableProps) {
  return (
    <div className="border rounded-md">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="w-10 p-2 text-left">
                <Checkbox 
                  checked={selectedRows.length === devices.length && devices.length > 0}
                  onCheckedChange={onSelectAll}
                />
              </th>
              <th className="p-2 text-left font-medium">
                <div className="flex items-center">
                  NAME
                  <button className="ml-1">↕</button>
                </div>
              </th>
              <th className="p-2 text-left font-medium">
                <div className="flex items-center">
                  MODEL
                  <button className="ml-1">↕</button>
                </div>
              </th>
              <th className="p-2 text-left font-medium">SENSORS</th>
              <th className="p-2 text-left font-medium">DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => {
              const deviceSensors = getSensorsByDevice(device.id).length;
              
              return (
                <tr 
                  key={device.id} 
                  className="border-t hover:bg-muted/30 cursor-pointer"
                  onClick={() => onSelectDevice(device.id)}
                >
                  <td className="p-2" onClick={(e) => e.stopPropagation()}>
                    <Checkbox 
                      checked={selectedRows.includes(device.id)}
                      onCheckedChange={() => onSelectRow(device.id)}
                    />
                  </td>
                  <td className="p-2">{device.name}</td>
                  <td className="p-2">{device.model}</td>
                  <td className="p-2">
                    {deviceSensors > 0 ? (
                      <div className="text-xs">
                        <span className="font-semibold">{deviceSensors}</span> sensor{deviceSensors !== 1 ? 's' : ''}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">No sensors</span>
                    )}
                  </td>
                  <td className="p-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDevice(device.id);
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
