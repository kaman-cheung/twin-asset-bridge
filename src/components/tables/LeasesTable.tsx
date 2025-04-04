
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lease, Zone } from "@/lib/models";

interface LeasesTableProps {
  leases: Lease[];
  zones: Zone[];
  statusFilter: string;
}

export function LeasesTable({ leases, zones, statusFilter }: LeasesTableProps) {
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
            
            const leaseZones = zones.filter(z => lease.zoneIds.includes(z.id));
            const zoneNames = leaseZones.map(z => z.display_name || z.displayName || z.internal_name || z.internalName).join(', ');
            
            return (
              <TableRow key={lease.id}>
                <TableCell>{lease.tenant_display_name || lease.tenant}</TableCell>
                <TableCell>{lease.tenant_industry || '-'}</TableCell>
                <TableCell>{lease.contractual_start_date || lease.startDate}</TableCell>
                <TableCell>{lease.contractual_end_date || lease.endDate}</TableCell>
                <TableCell>{lease.occupation_start_date || lease.startDate}</TableCell>
                <TableCell>{lease.endDate || '-'}</TableCell>
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
}
