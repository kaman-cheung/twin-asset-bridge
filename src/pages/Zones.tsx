
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { ZonesHeader } from "@/components/zones/ZonesHeader";
import { ZonesSearch } from "@/components/zones/ZonesSearch";
import { ZonesTable } from "@/components/zones/ZonesTable";
import { ZoneDetails } from "@/components/zones/ZoneDetails";
import { zones, getZoneById } from "@/lib/sample-data";
import { Zone } from "@/lib/models";

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
        <ZonesHeader count={filteredZones.length} />
        
        <ZonesSearch 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <ZonesTable 
              zones={filteredZones}
              selectedRows={selectedRows}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              onSelectZone={handleSelectZone}
            />
          </div>
          
          <div className={`md:col-span-1 ${!showDetails ? 'hidden md:block' : ''}`}>
            <ZoneDetails 
              zone={selectedZone} 
              show={showDetails}
              onClose={() => setShowDetails(false)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Zones;
