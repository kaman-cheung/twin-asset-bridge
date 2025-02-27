
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter, Home, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

// Sample data for zones
const zoneData = [
  {
    id: 1,
    displayName: "DTStest3 F000 zone01-01",
    internalName: "dtstest3.DTStest3.F000.zone01-01",
    startDate: "15/08/2024",
    endDate: "16/03/2025"
  },
  {
    id: 2,
    displayName: "DTStest3 F000 zone01-02",
    internalName: "dtstest3.DTStest3.F000.zone01-02",
    startDate: "16/08/2024",
    endDate: "-"
  },
  {
    id: 3,
    displayName: "DTS test3 F000",
    internalName: "dtstest3.DTStest3.F000",
    startDate: "16/08/2024",
    endDate: "-"
  },
  {
    id: 4,
    displayName: "Floor_batchtest",
    internalName: "dtstest_edit.Building_batchtest.Floor_batchtest",
    startDate: "28/08/2024",
    endDate: "-"
  },
  {
    id: 5,
    displayName: "Space_batchtest",
    internalName: "dtstest_edit.Building_batchtest.Floor_batchtest.Space_batchtest",
    startDate: "28/08/2024",
    endDate: "-"
  },
  {
    id: 6,
    displayName: "DTS test building A",
    internalName: "dtstest.buildingA",
    startDate: "22/08/2024",
    endDate: "22/10/2025"
  },
  {
    id: 7,
    displayName: "DTStest3 building",
    internalName: "dtstest3.DTStest3",
    startDate: "14/08/2024",
    endDate: "-"
  },
  {
    id: 8,
    displayName: "Building1 F001 zone01",
    internalName: "DTStest.Building1.F001.zone01",
    startDate: "08/08/2024",
    endDate: "-"
  },
  {
    id: 9,
    displayName: "DTStest F000 zon01",
    internalName: "DTStest.DTStest.F000.zon01",
    startDate: "08/08/2024",
    endDate: "-"
  }
];

const Zones = () => {
  const [searchTerm, setSearchTerm] = useState("DTStest");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
  const handleSelectAll = () => {
    if (selectedRows.length === zoneData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(zoneData.map(zone => zone.id));
    }
  };
  
  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fadeIn">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <span>/</span>
          <span className="font-medium text-foreground">Zones</span>
        </div>
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Zones</h1>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <span>record count: {zoneData.length}</span>
            </div>
            <p className="text-muted-foreground mt-1">List of zones.</p>
          </div>
          <Button>
            <Plus className="mr-1 h-4 w-4" />
            Add
          </Button>
        </div>
        
        {/* Search & Filter */}
        <div className="flex justify-between space-x-4">
          <div className="flex-1 max-w-md relative">
            <Input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              placeholder="Search..."
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="mr-1 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="mr-1 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
        
        {/* Data Table */}
        <div className="border rounded-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="w-10 p-2 text-left">
                    <Checkbox 
                      checked={selectedRows.length === zoneData.length && zoneData.length > 0}
                      onCheckedChange={handleSelectAll}
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
                </tr>
              </thead>
              <tbody>
                {zoneData.map((zone) => (
                  <tr key={zone.id} className="border-t hover:bg-muted/30">
                    <td className="p-2">
                      <Checkbox 
                        checked={selectedRows.includes(zone.id)}
                        onCheckedChange={() => handleSelectRow(zone.id)}
                      />
                    </td>
                    <td className="p-2">{zone.displayName}</td>
                    <td className="p-2">{zone.internalName}</td>
                    <td className="p-2">{zone.startDate}</td>
                    <td className="p-2">{zone.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Zones;
