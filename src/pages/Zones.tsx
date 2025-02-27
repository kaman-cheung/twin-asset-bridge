
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter, Home, Plus, ChevronRight, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { EntityRelationship } from "@/components/EntityRelationship";
import { 
  zones,
  getZoneById,
  getSensorsByZone,
  Zone
} from "@/lib/sample-data";

const Zones = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const handleSelectAll = () => {
    if (selectedRows.length === zones.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(zones.map(zone => zone.id));
    }
  };
  
  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectZone = (zoneId: number) => {
    const zone = getZoneById(zoneId);
    if (zone) {
      setSelectedZone(zone);
      setShowDetails(true);
    }
  };

  // Filter zones based on search term
  const filteredZones = searchTerm
    ? zones.filter(zone => 
        zone.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        zone.internalName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : zones;

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
              <span>record count: {filteredZones.length}</span>
            </div>
            <p className="text-muted-foreground mt-1">List of zones with their associated devices and sensors.</p>
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
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="border rounded-md">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="w-10 p-2 text-left">
                        <Checkbox 
                          checked={selectedRows.length === filteredZones.length && filteredZones.length > 0}
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
                      <th className="p-2 text-left font-medium">DEVICES</th>
                      <th className="p-2 text-left font-medium">DETAILS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredZones.map((zone) => {
                      const zoneDevices = zone.devices.length;
                      const zoneSensors = getSensorsByZone(zone.id).length;
                      
                      return (
                        <tr 
                          key={zone.id} 
                          className="border-t hover:bg-muted/30 cursor-pointer"
                          onClick={() => handleSelectZone(zone.id)}
                        >
                          <td className="p-2" onClick={(e) => e.stopPropagation()}>
                            <Checkbox 
                              checked={selectedRows.includes(zone.id)}
                              onCheckedChange={() => handleSelectRow(zone.id)}
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
                                handleSelectZone(zone.id);
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
          </div>
          
          <div className={`md:col-span-1 ${!showDetails ? 'hidden md:block' : ''}`}>
            {selectedZone ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between md:hidden">
                  <h3 className="font-semibold">Zone Details</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowDetails(false)}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <EntityRelationship entity={selectedZone} entityType="zone" />
              </div>
            ) : (
              <div className="border rounded-md p-8 text-center bg-muted/20">
                <p className="text-muted-foreground">Select a zone to view its details and relationships</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Zones;
