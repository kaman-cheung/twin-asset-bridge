
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Asset } from "@/lib/models";

interface AssetsTableProps {
  assets: Asset[];
  statusFilter: string;
}

export function AssetsTable({ assets, statusFilter }: AssetsTableProps) {
  const filteredAssets = statusFilter === "all" 
    ? assets 
    : assets.filter(asset => 
        statusFilter === "active" 
          ? asset.status === "active"
          : statusFilter === "inactive"
            ? asset.status === "inactive"
            : asset.status === "maintenance"
      );
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Display Name</TableHead>
          <TableHead>Usage</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Is Active</TableHead>
          <TableHead>Is CBD</TableHead>
          <TableHead>External ID</TableHead>
          <TableHead>Timezone</TableHead>
          <TableHead>Zones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredAssets.length === 0 ? (
          <TableRow>
            <TableCell colSpan={10} className="text-center py-4">No assets found</TableCell>
          </TableRow>
        ) : (
          filteredAssets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.display_name || asset.name}</TableCell>
              <TableCell>{asset.usage || '-'}</TableCell>
              <TableCell>{asset.address || '-'}</TableCell>
              <TableCell>{asset.city || '-'}</TableCell>
              <TableCell>{asset.country || '-'}</TableCell>
              <TableCell>{asset.is_active !== undefined ? (asset.is_active ? 'Yes' : 'No') : '-'}</TableCell>
              <TableCell>{asset.is_cbd !== undefined ? (asset.is_cbd ? 'Yes' : 'No') : '-'}</TableCell>
              <TableCell>{asset.external_id || '-'}</TableCell>
              <TableCell>{asset.timezone || '-'}</TableCell>
              <TableCell>{asset.zones.length}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
