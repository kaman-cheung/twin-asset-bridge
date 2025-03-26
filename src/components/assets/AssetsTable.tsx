
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download } from "lucide-react";
import { Asset } from "@/lib/models";

interface AssetsTableProps {
  assets: Asset[];
  selectedRows: number[];
  onSelectAll: () => void;
  onSelectRow: (id: number) => void;
  onSelectAsset: (id: number) => void;
}

export function AssetsTable({ 
  assets, 
  selectedRows, 
  onSelectAll, 
  onSelectRow, 
  onSelectAsset 
}: AssetsTableProps) {
  const handleDownload = () => {
    console.log("Downloading assets data as Excel");
    // In a real app, this would generate and download an Excel file
    alert("Downloading assets data...");
  };

  return (
    <div className="border rounded-md">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="w-10 p-2 text-left">
                <Checkbox 
                  checked={selectedRows.length === assets.length && assets.length > 0}
                  onCheckedChange={onSelectAll}
                />
              </th>
              <th className="p-2 text-left font-medium">DISPLAY NAME</th>
              <th className="p-2 text-left font-medium">USAGE</th>
              <th className="p-2 text-left font-medium">ADDRESS</th>
              <th className="p-2 text-left font-medium">CITY</th>
              <th className="p-2 text-left font-medium">COUNTRY</th>
              <th className="p-2 text-left font-medium">IS ACTIVE</th>
              <th className="p-2 text-left font-medium">IS CBD</th>
              <th className="p-2 text-left font-medium">EXTERNAL ID</th>
              <th className="p-2 text-left font-medium">TIMEZONE</th>
              <th className="p-2 text-left font-medium">ZONES</th>
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
            {assets.map((asset) => (
              <tr 
                key={asset.id} 
                className="border-t hover:bg-muted/30 cursor-pointer"
                onClick={() => onSelectAsset(asset.id)}
              >
                <td className="p-2" onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedRows.includes(asset.id)}
                    onCheckedChange={() => onSelectRow(asset.id)}
                  />
                </td>
                <td className="p-2">{asset.display_name || asset.name}</td>
                <td className="p-2">{asset.usage || '-'}</td>
                <td className="p-2">{asset.address || '-'}</td>
                <td className="p-2">{asset.city || '-'}</td>
                <td className="p-2">{asset.country || '-'}</td>
                <td className="p-2">{asset.is_active !== undefined ? (asset.is_active ? 'Yes' : 'No') : '-'}</td>
                <td className="p-2">{asset.is_cbd !== undefined ? (asset.is_cbd ? 'Yes' : 'No') : '-'}</td>
                <td className="p-2">{asset.external_id || '-'}</td>
                <td className="p-2">{asset.timezone || '-'}</td>
                <td className="p-2">{asset.zones.length}</td>
                <td className="p-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAsset(asset.id);
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
