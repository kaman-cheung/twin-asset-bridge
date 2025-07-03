
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Property, Asset, Zone, Device, Sensor } from "@/lib/models";

interface PropertiesTableProps {
  properties: Property[];
  assets: Asset[];
  zones: Zone[];
  devices: Device[];
  sensors: Sensor[];
  statusFilter: string;
}

export function PropertiesTable({ 
  properties, 
  assets, 
  zones, 
  devices, 
  sensors, 
  statusFilter 
}: PropertiesTableProps) {
  const filteredProperties = statusFilter === "all" 
    ? properties 
    : properties.filter(property => 
        statusFilter === "active" 
          ? property.entityType === "asset" || property.entityType === "zone"
          : statusFilter === "inactive"
            ? property.entityType === "device" 
            : property.entityType === "sensor"
      );
  
  const getEntityName = (property: Property): string => {
    if (property.entityType === 'asset') {
      const asset = assets.find(a => a.id === property.entityId);
      return asset ? asset.name : '-';
    } else if (property.entityType === 'zone') {
      const zone = zones.find(z => z.id === property.entityId);
      return zone ? (zone.display_name || zone.displayName) : '-';
    } else if (property.entityType === 'device') {
      const device = devices.find(d => d.id === property.entityId);
      return device ? device.name : '-';
    } else if (property.entityType === 'sensor') {
      const sensor = sensors.find(s => s.id === property.entityId);
      return sensor ? sensor.name : '-';
    }
    return '-';
  };

  const formatDateList = (dates?: string[]): string => {
    if (!dates || dates.length === 0) return '-';
    return dates.join(', ');
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Display Name</TableHead>
          <TableHead>Entity Type</TableHead>
          <TableHead>Property Type</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Hidden Start Date</TableHead>
          <TableHead>Hidden End Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProperties.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-4">No properties found</TableCell>
          </TableRow>
        ) : (
          filteredProperties.map((property) => {
            const entityName = getEntityName(property);
            
            return (
              <TableRow key={property.id}>
                <TableCell>{property.display_name || property.name}</TableCell>
                <TableCell>
                  {property.entityType.charAt(0).toUpperCase() + property.entityType.slice(1)}
                  <div className="text-xs text-muted-foreground">{entityName}</div>
                </TableCell>
                <TableCell>{property.property_type || property.type || '-'}</TableCell>
                <TableCell>{property.value || '-'}</TableCell>
                <TableCell>{property.unit || '-'}</TableCell>
                <TableCell>{property.source_system || '-'}</TableCell>
                <TableCell>{formatDateList(property.hidden_start_date)}</TableCell>
                <TableCell>{formatDateList(property.hidden_end_date)}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
