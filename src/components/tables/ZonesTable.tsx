
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PanelRight, Cpu, ChevronDown, Building } from "lucide-react";
import { Zone, Asset } from "@/lib/models";
import { getSensorsByZone } from "@/lib/sample-data";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface ZonesTableProps {
  zones: Zone[];
  assets: Asset[];
  statusFilter: string;
  onShowZoneDetails: (zoneId: number) => void;
}

export function ZonesTable({ 
  zones, 
  assets, 
  statusFilter, 
  onShowZoneDetails 
}: ZonesTableProps) {
  const filteredZones = statusFilter === "all" 
    ? zones 
    : zones.filter(zone => 
        (zone.type === statusFilter || zone.zone_type === statusFilter)
      );
  
  const totalLettableArea = filteredZones.reduce((sum, zone) => {
    return sum + (zone.lettable_area || 0);
  }, 0);
  
  const totalCapacity = filteredZones.reduce((sum, zone) => {
    return sum + (zone.capacity || 0);
  }, 0);

  // Function to get zone type display text
  const getZoneTypeDisplay = (zone: Zone): string => {
    const zoneType = zone.zone_type || zone.type || '';
    switch (zoneType.toLowerCase()) {
      case 'building': return 'Building';
      case 'floor': return 'Floor';
      case 'space': return 'Space';
      default: return zoneType || '-';
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10"></TableHead>
          <TableHead>Internal Name</TableHead>
          <TableHead>Display Name</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Zone Type</TableHead>
          <TableHead>Lettable Area</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Parent Zones</TableHead>
          <TableHead>Devices</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredZones.length === 0 ? (
          <TableRow>
            <TableCell colSpan={11} className="text-center py-4">No zones found</TableCell>
          </TableRow>
        ) : (
          <>
            {filteredZones.map((zone) => {
              const parentAsset = assets.find(a => a.id === zone.assetId);
              const zoneSensors = getSensorsByZone(zone.id).length;
              const hasChildZones = zone.childZones && zone.childZones.length > 0;
              
              return (
                <ContextMenu key={zone.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow className="hover:bg-muted/30 cursor-pointer" onClick={() => onShowZoneDetails(zone.id)}>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="p-0 h-6 w-6 flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              onShowZoneDetails(zone.id);
                            }}
                          >
                            <PanelRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{zone.internal_name || zone.internalName}</TableCell>
                      <TableCell>{zone.display_name || zone.displayName}</TableCell>
                      <TableCell>{zone.start_date || zone.startDate}</TableCell>
                      <TableCell>{zone.end_date || zone.endDate}</TableCell>
                      <TableCell>{getZoneTypeDisplay(zone)}</TableCell>
                      <TableCell>{zone.lettable_area ? `${zone.lettable_area} sqm` : '-'}</TableCell>
                      <TableCell>{zone.capacity || '-'}</TableCell>
                      <TableCell>{parentAsset ? parentAsset.name : "-"}</TableCell>
                      <TableCell>{zone.parent_zones ? zone.parent_zones.length : (zone.parentZoneId ? '1' : '0')}</TableCell>
                      <TableCell>
                        {zone.devices.length > 0 ? (
                          <div className="text-xs">
                            <span className="font-semibold">{zone.devices.length}</span> device{zone.devices.length !== 1 ? 's' : ''}, {' '}
                            <span className="font-semibold">{zoneSensors}</span> sensor{zoneSensors !== 1 ? 's' : ''}
                            {hasChildZones && (
                              <span className="ml-1 text-muted-foreground">
                                (+ child zones)
                              </span>
                            )}
                          </div>
                        ) : hasChildZones ? (
                          <span className="text-xs">Has child zones</span>
                        ) : (
                          <span className="text-xs text-muted-foreground">No devices</span>
                        )}
                      </TableCell>
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-56">
                    <ContextMenuItem 
                      className="flex items-center gap-2"
                      onClick={() => onShowZoneDetails(zone.id)}
                    >
                      <Building className="h-4 w-4" />
                      <span>View zone details</span>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              );
            })}
            {filteredZones.length > 0 && (
              <TableRow className="border-t bg-muted/30 font-medium">
                <TableCell></TableCell>
                <TableCell colSpan={5} className="text-right py-4">TOTALS:</TableCell>
                <TableCell>{totalLettableArea > 0 ? `${totalLettableArea} sqm` : '-'}</TableCell>
                <TableCell>{totalCapacity > 0 ? totalCapacity : '-'}</TableCell>
                <TableCell colSpan={3}></TableCell>
              </TableRow>
            )}
          </>
        )}
      </TableBody>
    </Table>
  );
}
