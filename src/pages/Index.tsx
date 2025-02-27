
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Building2, Home, Cpu, Activity, ArrowRight, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { assets, zones, devices, sensors, getDevicesByZone, getSensorsByDevice } from "@/lib/sample-data";

// Get counts for each entity type with status breakdown
const getCounts = () => {
  const assetCount = assets.length;
  const zoneCount = zones.length;
  
  const deviceCount = {
    total: devices.length,
    online: devices.filter(d => d.status === "online").length,
    offline: devices.filter(d => d.status === "offline").length,
    error: devices.filter(d => d.status === "error").length
  };
  
  const sensorCount = {
    total: sensors.length,
    active: sensors.filter(s => s.status === "active").length,
    inactive: sensors.filter(s => s.status === "inactive").length,
    error: sensors.filter(s => s.status === "error").length
  };

  return { assetCount, zoneCount, deviceCount, sensorCount };
};

// Get total number of relationships
const getRelationshipCounts = () => {
  // Count zone-device relationships
  const zoneDeviceRelationships = zones.reduce((acc, zone) => acc + zone.devices.length, 0);
  
  // Count device-sensor relationships
  const deviceSensorRelationships = devices.reduce((acc, device) => acc + device.sensors.length, 0);
  
  return {
    zoneDeviceRelationships,
    deviceSensorRelationships,
    total: zoneDeviceRelationships + deviceSensorRelationships
  };
};

const Index = () => {
  const navigate = useNavigate();
  const counts = getCounts();
  const relationshipCounts = getRelationshipCounts();

  // Find zones with most devices
  const topZonesByDevices = [...zones]
    .sort((a, b) => b.devices.length - a.devices.length)
    .slice(0, 3);

  // Find devices with most sensors
  const topDevicesBySensors = [...devices]
    .sort((a, b) => b.sensors.length - a.sensors.length)
    .slice(0, 3);

  return (
    <Layout>
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Home className="h-4 w-4" />
          <span>Home</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Digital Twin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of your digital twin system entities and their relationships
          </p>
        </div>

        {/* Entity Count Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-500" />
                Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{counts.assetCount}</div>
              <p className="text-sm text-muted-foreground mt-1">Buildings, facilities</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" className="p-0 h-auto" onClick={() => navigate('/assets')}>
                <span className="text-sm">View Assets</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Map className="h-5 w-5 text-green-500" />
                Zones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{counts.zoneCount}</div>
              <p className="text-sm text-muted-foreground mt-1">Floors, rooms, areas</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" className="p-0 h-auto" onClick={() => navigate('/zones')}>
                <span className="text-sm">View Zones</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Cpu className="h-5 w-5 text-orange-500" />
                Devices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold">{counts.deviceCount.total}</div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Online</span>
                    <span className="text-green-500 font-medium">{counts.deviceCount.online}</span>
                  </div>
                  <Progress value={(counts.deviceCount.online / counts.deviceCount.total) * 100} className="h-1 bg-muted" />
                  
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span>Offline/Error</span>
                    <span className="text-red-500 font-medium">
                      {counts.deviceCount.offline + counts.deviceCount.error}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" className="p-0 h-auto" onClick={() => navigate('/devices')}>
                <span className="text-sm">View Devices</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-500" />
                Sensors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold">{counts.sensorCount.total}</div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Active</span>
                    <span className="text-green-500 font-medium">{counts.sensorCount.active}</span>
                  </div>
                  <Progress value={(counts.sensorCount.active / counts.sensorCount.total) * 100} className="h-1 bg-muted" />
                  
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span>Inactive/Error</span>
                    <span className="text-red-500 font-medium">
                      {counts.sensorCount.inactive + counts.sensorCount.error}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" className="p-0 h-auto" onClick={() => navigate('/sensors')}>
                <span className="text-sm">View Sensors</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Relationships Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Relationship Overview</CardTitle>
              <CardDescription>Connections between entities in your digital twin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium">Zone-Device Connections</span>
                    <div className="text-2xl font-bold">{relationshipCounts.zoneDeviceRelationships}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Device-Sensor Connections</span>
                    <div className="text-2xl font-bold">{relationshipCounts.deviceSensorRelationships}</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Total Relationships</span>
                    <span className="font-medium">{relationshipCounts.total}</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Connected Entities</CardTitle>
              <CardDescription>Entities with the most relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Zones with Most Devices</h3>
                  <div className="space-y-2">
                    {topZonesByDevices.map((zone) => (
                      <div key={zone.id} className="flex items-center justify-between py-1 border-b">
                        <div className="flex items-center">
                          <Map className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">{zone.displayName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Cpu className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm font-medium">{zone.devices.length}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Devices with Most Sensors</h3>
                  <div className="space-y-2">
                    {topDevicesBySensors.map((device) => {
                      const zone = zones.find(z => z.id === device.zoneId);
                      return (
                        <div key={device.id} className="flex items-center justify-between py-1 border-b">
                          <div>
                            <div className="flex items-center">
                              <Cpu className="h-4 w-4 mr-2 text-orange-500" />
                              <span className="text-sm">{device.name}</span>
                            </div>
                            {zone && (
                              <div className="text-xs text-muted-foreground ml-6">
                                in {zone.displayName}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm font-medium">{device.sensors.length}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for digital twin management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button
                variant="outline"
                className="h-auto p-4 justify-start text-left"
                onClick={() => navigate('/zones')}
              >
                <div className="flex flex-col items-start">
                  <Map className="h-5 w-5 mb-2" />
                  <h3 className="font-medium">Explore Zones</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    View and manage zones and their relationships
                  </p>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 justify-start text-left"
                onClick={() => {/* TODO: Implement upload */}}
              >
                <div className="flex flex-col items-start">
                  <Building2 className="h-5 w-5 mb-2" />
                  <h3 className="font-medium">Add New Asset</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Register a new building or facility
                  </p>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 justify-start text-left"
                onClick={() => {/* TODO: Implement dashboard */}}
              >
                <div className="flex flex-col items-start">
                  <Activity className="h-5 w-5 mb-2" />
                  <h3 className="font-medium">Sensor Dashboard</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Monitor real-time sensor data
                  </p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
