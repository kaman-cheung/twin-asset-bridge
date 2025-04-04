
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sensor, Device } from "@/lib/models";

interface SensorsTableProps {
  sensors: Sensor[];
  devices: Device[];
  statusFilter: string;
}

export function SensorsTable({ sensors, devices, statusFilter }: SensorsTableProps) {
  const filteredSensors = statusFilter === "all" 
    ? sensors 
    : sensors.filter(sensor => 
        statusFilter === "active" 
          ? sensor.status === "active"
          : statusFilter === "inactive"
            ? sensor.status === "inactive"
            : false
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredSensors.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-4">No sensors found</TableCell>
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
}
