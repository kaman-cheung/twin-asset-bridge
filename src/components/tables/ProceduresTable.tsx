
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Procedure, Asset } from "@/lib/models";

interface ProceduresTableProps {
  procedures: Procedure[];
  assets: Asset[];
  statusFilter: string;
}

export function ProceduresTable({ procedures, assets, statusFilter }: ProceduresTableProps) {
  const proceduresData = procedures || [];
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Application Name</TableHead>
          <TableHead>Input Systems</TableHead>
          <TableHead>Output System</TableHead>
          <TableHead>Config</TableHead>
          <TableHead>Asset</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proceduresData.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">No procedures found</TableCell>
          </TableRow>
        ) : (
          proceduresData.map((procedure) => {
            const parentAsset = assets.find(a => a.id === procedure.asset);
            
            return (
              <TableRow key={procedure.id}>
                <TableCell>{procedure.application_name}</TableCell>
                <TableCell>{Array.isArray(procedure.input_systems) ? procedure.input_systems.join(', ') : '-'}</TableCell>
                <TableCell>{procedure.output_system}</TableCell>
                <TableCell>{procedure.config}</TableCell>
                <TableCell>{parentAsset ? parentAsset.name : "-"}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
