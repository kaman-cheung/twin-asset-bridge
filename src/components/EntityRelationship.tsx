
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Asset, Zone, Device, Sensor, 
  getDevicesByZone, getSensorsByDevice,
  getZoneById, getDeviceById, getSensorById,
  getPropertiesByEntity
} from "@/lib/models";
import { 
  Building2, 
  Map, 
  Cpu, 
  Activity, 
  AlertCircle,
  CheckCircle2
} from "lucide-react";

interface EntityRelationshipProps {
  entity: Asset | Zone | Device | Sensor;
  entityType: "asset" | "zone" | "device" | "sensor";
}

export function EntityRelationship({ entity, entityType }: EntityRelationshipProps) {
  const [expanded, setExpanded] = useState<{[key: string]: boolean}>({});

  const toggleExpanded = (id: string) => {
    setExpanded(prev => ({...prev, [id]: !prev[id]}));
  };

  const getStatusIcon = (status: string) => {
    if (status === "active" || status === "online") return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (status === "error") return <AlertCircle className="h-4 w-4 text-red-500" />;
    return <AlertCircle className="h-4 w-4 text-yellow-500" />;
  };

  const renderProperties = () => {
    const properties = getPropertiesByEntity(entityType, entity.id);
    
    if (properties.length === 0) {
      return <p className="text-muted-foreground">No properties found.</p>;
    }
    
    return (
      <div className="space-y-2">
        {properties.map(prop => (
          <div key={prop.id} className="flex justify-between p-2 border rounded-md">
            <span className="font-medium">{prop.name}</span>
            <span>{prop.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderChildren = () => {
    if (entityType === "asset") {
      const asset = entity as Asset;
      return (
        <div className="space-y-2 pt-2">
          <h4 className="font-medium text-sm">Zones</h4>
          {asset.zones.length > 0 ? (
            asset.zones.map(zoneId => {
              const zone = getZoneById(zoneId);
              if (!zone) return null;
              return (
                <div key={zone.id} className="p-2 border rounded-md hover:bg-accent">
                  <div className="flex items-center gap-2">
                    <Map className="h-4 w-4" />
                    <span>{zone.displayName}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-muted-foreground">No zones found.</p>
          )}
        </div>
      );
    }
    
    if (entityType === "zone") {
      const zone = entity as Zone;
      const devices = getDevicesByZone(zone.id);
      
      return (
        <div className="space-y-2 pt-2">
          <h4 className="font-medium text-sm">Devices</h4>
          {devices.length > 0 ? (
            devices.map(device => {
              const isExpanded = expanded[`device-${device.id}`];
              const sensors = getSensorsByDevice(device.id);
              
              return (
                <div key={device.id} className="border rounded-md overflow-hidden">
                  <div 
                    className="p-2 flex items-center justify-between cursor-pointer hover:bg-accent"
                    onClick={() => toggleExpanded(`device-${device.id}`)}
                  >
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4" />
                      <span>{device.name}</span>
                      <Badge variant={device.status === "online" ? "default" : "destructive"}>
                        {device.status}
                      </Badge>
                    </div>
                    <span>{isExpanded ? "−" : "+"}</span>
                  </div>
                  
                  {isExpanded && (
                    <div className="p-2 bg-muted/30 border-t">
                      <h5 className="font-medium text-xs mb-2">Sensors</h5>
                      <div className="space-y-1">
                        {sensors.length > 0 ? (
                          sensors.map(sensor => (
                            <div key={sensor.id} className="p-1 flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Activity className="h-3 w-3" />
                                <span>{sensor.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(sensor.status)}
                                {sensor.lastReading && (
                                  <span>
                                    {sensor.lastReading.value} {sensor.unit}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-sm">No sensors found.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-muted-foreground">No devices found.</p>
          )}
        </div>
      );
    }
    
    if (entityType === "device") {
      const device = entity as Device;
      const sensors = getSensorsByDevice(device.id);
      
      return (
        <div className="space-y-2 pt-2">
          <h4 className="font-medium text-sm">Sensors</h4>
          {sensors.length > 0 ? (
            sensors.map(sensor => (
              <div key={sensor.id} className="p-2 border rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    <span>{sensor.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(sensor.status)}
                    {sensor.lastReading && (
                      <span>
                        {sensor.lastReading.value} {sensor.unit}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No sensors found.</p>
          )}
        </div>
      );
    }
    
    // For sensor, no children to render
    return null;
  };

  const getEntityIcon = () => {
    switch (entityType) {
      case "asset": return <Building2 className="h-5 w-5" />;
      case "zone": return <Map className="h-5 w-5" />;
      case "device": return <Cpu className="h-5 w-5" />;
      case "sensor": return <Activity className="h-5 w-5" />;
    }
  };

  const getEntityTitle = () => {
    switch (entityType) {
      case "asset": return (entity as Asset).name;
      case "zone": return (entity as Zone).displayName;
      case "device": return (entity as Device).name;
      case "sensor": return (entity as Sensor).name;
    }
  };

  const getEntityDescription = () => {
    switch (entityType) {
      case "asset": return `Type: ${(entity as Asset).type}`;
      case "zone": return `Internal Name: ${(entity as Zone).internalName}`;
      case "device": return `Type: ${(entity as Device).type}, Model: ${(entity as Device).model}`;
      case "sensor": return `Type: ${(entity as Sensor).type}, Unit: ${(entity as Sensor).unit}`;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {getEntityIcon()}
          <div>
            <CardTitle className="text-lg">{getEntityTitle()}</CardTitle>
            <CardDescription>{getEntityDescription()}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="relationships">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="relationships">Relationships</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>
          <TabsContent value="relationships" className="pt-4">
            <ScrollArea className="h-[300px]">
              {renderChildren()}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="properties" className="pt-4">
            <ScrollArea className="h-[300px]">
              {renderProperties()}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
