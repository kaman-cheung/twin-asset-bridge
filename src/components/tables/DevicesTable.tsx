
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Device, Zone, Asset } from "@/lib/models";

interface DevicesTableProps {
  devices: Device[];
  zones: Zone[];
  assets: Asset[];
  statusFilter: string;
}

export function DevicesTable({ devices, zones, assets, statusFilter }: DevicesTableProps) {
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
}
