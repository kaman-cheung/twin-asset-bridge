
import { Layout } from "@/components/Layout";
import { useState, useEffect } from "react";
import { ZonesHeader } from "@/components/zones/ZonesHeader";
import { ZonesSearch } from "@/components/zones/ZonesSearch";
import { ZonesTable } from "@/components/zones/ZonesTable";
import { ZoneDetails } from "@/components/zones/ZoneDetails";
import { zones, getZoneById, leases } from "@/lib/sample-data";
import { Zone } from "@/lib/models";
import { useLocation } from "react-router-dom";

const Zones = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const location = useLocation();
  
  // Handle filters from quick actions
  const [filteredZones, setFilteredZones] = useState<typeof zones>(zones);
  
  useEffect(() => {
    const filter = location.state?.filter;
    const today = new Date();
    
    if (filter) {
      switch (filter) {
        case "no-lease":
          // Find zones without active leases
          const zonesWithLeases = new Set<number>();
          leases.forEach(lease => {
            if (new Date(lease.endDate) > today) {
              lease.zoneIds.forEach(zoneId => zonesWithLeases.add(zoneId));
            }
          });
          setFilteredZones(zones.filter(zone => !zonesWithLeases.has(zone.id)));
          break;
        
        case "no-usage":
          // Find zones without usage
          // Check both the legacy and new property names safely
          setFilteredZones(zones.filter(zone => {
            // Check if the zone has any usage property
            const hasUsage = !!(
              (zone as any).usage || 
              (zone as any).zone_usage
            );
            return !hasUsage;
          }));
          break;
          
        default:
          setFilteredZones(zones);
      }
    } else {
      setFilteredZones(zones);
    }
  }, [location.state]);
  
  const handleSelectAll = () => {
    if (selectedRows.length === filteredZones.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredZones.map(zone => zone.id));
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
      // Ensure the zone object conforms to the Zone interface
      setSelectedZone(zone as Zone);
      setShowDetails(true);
    }
  };

  // Apply search filter
  const displayedZones = searchTerm
    ? filteredZones.filter(zone => 
        (zone.displayName || zone.display_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (zone.internalName || zone.internal_name || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredZones;

  return (
    <Layout>
      <div className="space-y-6 animate-fadeIn">
        <ZonesHeader count={displayedZones.length} />
        
        <ZonesSearch 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <ZonesTable 
              zones={displayedZones as Zone[]}
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
