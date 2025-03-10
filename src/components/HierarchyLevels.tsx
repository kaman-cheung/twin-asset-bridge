
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Map, Cpu, Activity, ListTree } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { assets, zones, devices, sensors, getPropertiesByEntity } from "@/lib/sample-data";

export function HierarchyLevels() {
  // Get the first asset to display (for demo purposes)
  const firstAsset = assets[0];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hierarchy Levels</CardTitle>
        <CardDescription>Hierarchical representation of the digital twin metadata</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {/* Level 1: Asset */}
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <div className="flex items-center gap-2 font-semibold mb-2">
                <Building2 className="h-5 w-5 text-blue-500" />
                <span className="text-base">Asset: {firstAsset.name}</span>
                <Badge variant="outline" className="ml-2">Level 1</Badge>
              </div>
              
              {/* Level 2: Zones */}
              <div className="space-y-3 ml-4 mt-3">
                {firstAsset.zones.slice(0, 3).map(zoneId => {
                  const zone = zones.find(z => z.id === zoneId);
                  if (!zone) return null;
                  
                  return (
                    <div key={zone.id} className="border-l-4 border-green-500 pl-4 py-1">
                      <div className="flex items-center gap-2 font-medium mb-2">
                        <Map className="h-5 w-5 text-green-500" />
                        <span>{zone.displayName}</span>
                        <Badge variant="outline" className="ml-2">Level 2</Badge>
                      </div>
                      
                      {/* Level 3: Devices */}
                      <div className="space-y-3 ml-4 mt-3">
                        {zone.devices.slice(0, 2).map(deviceId => {
                          const device = devices.find(d => d.id === deviceId);
                          if (!device) return null;
                          
                          return (
                            <div key={device.id} className="border-l-4 border-orange-500 pl-4 py-1">
                              <div className="flex items-center gap-2 text-sm mb-2">
                                <Cpu className="h-4 w-4 text-orange-500" />
                                <span>{device.name}</span>
                                <Badge variant={device.status === "online" ? "default" : "destructive"} className="text-xs">
                                  {device.status}
                                </Badge>
                                <Badge variant="outline" className="ml-2">Level 3</Badge>
                              </div>
                              
                              {/* Level 4: Sensors */}
                              <div className="space-y-2 ml-4 mt-2">
                                {device.sensors.slice(0, 2).map(sensorId => {
                                  const sensor = sensors.find(s => s.id === sensorId);
                                  if (!sensor) return null;
                                  
                                  // Get properties for this sensor
                                  const properties = getPropertiesByEntity("sensor", sensor.id);
                                  
                                  return (
                                    <div key={sensor.id} className="border-l-4 border-purple-500 pl-4 py-1">
                                      <div className="flex items-center gap-2 text-sm">
                                        <Activity className="h-4 w-4 text-purple-500" />
                                        <span>{sensor.name}</span>
                                        {sensor.lastReading && (
                                          <span className="text-xs font-medium">
                                            {sensor.lastReading.value} {sensor.unit}
                                          </span>
                                        )}
                                        <Badge variant="outline" className="ml-2">Level 4</Badge>
                                      </div>
                                      
                                      {/* Level 5: Properties */}
                                      {properties.length > 0 && (
                                        <div className="space-y-1 ml-4 mt-2">
                                          {properties.slice(0, 2).map(property => (
                                            <div key={property.id} className="border-l-4 border-gray-400 pl-4 py-1">
                                              <div className="flex items-center gap-2 text-xs">
                                                <ListTree className="h-3 w-3 text-gray-500" />
                                                <span className="font-medium">{property.name}:</span>
                                                <span>{property.value}</span>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground mt-2 italic">
              Showing a sample of the hierarchy. Each level contains entities that belong to their parent.
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
