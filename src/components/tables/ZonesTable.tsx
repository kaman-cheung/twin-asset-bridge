
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PanelRight, Cpu } from "lucide-react";
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
  onShowSensors: (zoneId: number) => void;
  onShowZoneDetails: (zoneId: number) => void;
}

export function ZonesTable({ 
  zones, 
  assets, 
  statusFilter, 
  onShowSensors, 
  onShowZoneDetails 
}: ZonesTableProps) {
  const filteredZones = statusFilter === "all" 
    ? zones 
    : zones.filter(zone => 
        zone.type === (statusFilter === "active" ? "office" : 
                      statusFilter === "inactive" ? "meeting-room" : "common-area")
      );
  
  const totalLettableArea = filteredZones.reduce((sum, zone) => {
    return sum + (zone.lettable_area || 0);
  }, 0);
  
  const totalCapacity = filteredZones.reduce((sum, zone) => {
    return sum + (zone.capacity || 0);
  }, 0);
  
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
              
              return (
                <ContextMenu key={zone.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow className="hover:bg-muted/30 cursor-pointer" onClick={() => onShowZoneDetails(zone.id)}>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>{zone.internal_name || zone.internalName}</TableCell>
                      <TableCell>{zone.display_name || zone.displayName}</TableCell>
                      <TableCell>{zone.start_date || zone.startDate}</TableCell>
                      <TableCell>{zone.end_date || zone.endDate}</TableCell>
                      <TableCell>{zone.zone_type || zone.type || '-'}</TableCell>
                      <TableCell>{zone.lettable_area ? `${zone.lettable_area} sqm` : '-'}</TableCell>
                      <TableCell>{zone.capacity || '-'}</TableCell>
                      <TableCell>{parentAsset ? parentAsset.name : "-"}</TableCell>
                      <TableCell>{zone.parent_zones ? zone.parent_zones.length : (zone.parentZoneId ? '1' : '0')}</TableCell>
                      <TableCell>
                        {zone.devices.length > 0 ? (
                          <div className="text-xs">
                            <span className="font-semibold">{zone.devices.length}</span> device{zone.devices.length !== 1 ? 's' : ''}, {' '}
                            <span className="font-semibold">{zoneSensors}</span> sensor{zoneSensors !== 1 ? 's' : ''}
                          </div>
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
                      <PanelRight className="h-4 w-4" />
                      <span>View relationship</span>
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
