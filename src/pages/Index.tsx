
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Building2, Home, Cpu, Activity, ArrowRight, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { assets, zones, devices, sensors } from "@/lib/sample-data";
import { HierarchyLevels } from "@/components/HierarchyLevels";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Get counts for each entity type with status breakdown
const getCounts = (assetFilter: string | null) => {
  let filteredAssets = assets;
  let filteredZones = zones;
  let filteredDevices = devices;
  let filteredSensors = sensors;
  
  // Apply asset filter if specified
  if (assetFilter) {
    filteredAssets = assets.filter(a => a.type === assetFilter);
    const assetIds = filteredAssets.map(a => a.id);
    filteredZones = zones.filter(z => assetIds.includes(z.assetId));
    
    const zoneIds = filteredZones.map(z => z.id);
    filteredDevices = devices.filter(d => zoneIds.some(id => d.zoneId === id));
    
    const deviceIds = filteredDevices.map(d => d.id);
    filteredSensors = sensors.filter(s => deviceIds.includes(s.deviceId));
  }
  
  const assetCount = {
    total: filteredAssets.length,
    office: filteredAssets.filter(a => a.type === 'office').length,
    residential: filteredAssets.filter(a => a.type === 'residential').length
  };
  
  const zoneCount = {
    total: filteredZones.length,
    office: filteredZones.filter(z => z.type === 'office').length,
    meetingRoom: filteredZones.filter(z => z.type === 'meeting-room').length,
    commonArea: filteredZones.filter(z => z.type === 'common-area').length
  };
  
  const deviceCount = {
    total: filteredDevices.length,
    online: filteredDevices.filter(d => d.status === "online").length,
    offline: filteredDevices.filter(d => d.status === "offline").length,
    error: filteredDevices.filter(d => d.status === "error").length,
    terabee: filteredDevices.filter(d => d.type === "terabee").length,
    nexelec: filteredDevices.filter(d => d.type === "nexelec").length,
    ewattch: filteredDevices.filter(d => d.type === "ewattch").length
  };
  
  const sensorCount = {
    total: filteredSensors.length,
    active: filteredSensors.filter(s => s.status === "active").length,
    inactive: filteredSensors.filter(s => s.status === "inactive").length,
    error: filteredSensors.filter(s => s.status === "error").length,
    activePower: filteredSensors.filter(s => s.type === "active-power").length,
    peopleCounting: filteredSensors.filter(s => s.type === "people-counting").length,
    co2: filteredSensors.filter(s => s.type === "co2").length
  };

  return { assetCount, zoneCount, deviceCount, sensorCount };
};

// Function to create a subcategory item for metrics cards
const SubcategoryItem = ({ label, count }: { label: string; count: number }) => (
  <div className="flex justify-between text-xs text-muted-foreground mt-1">
    <span>{label}</span>
    <span>{count}</span>
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const [assetFilter, setAssetFilter] = useState<string | null>(null);
  const counts = getCounts(assetFilter);

  return (
    <Layout>
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Home className="h-4 w-4" />
          <span>Home</span>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Digital Twin Dashboard</h1>
          <div className="w-64">
            <Select onValueChange={(value) => setAssetFilter(value === "all" ? null : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by asset type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assets</SelectItem>
                <SelectItem value="office">Office Buildings</SelectItem>
                <SelectItem value="residential">Residential Buildings</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
              <div className="text-3xl font-bold">{counts.assetCount.total}</div>
              <div className="mt-2 space-y-1 border-t pt-2">
                <SubcategoryItem label="Office" count={counts.assetCount.office} />
                <SubcategoryItem label="Residential" count={counts.assetCount.residential} />
              </div>
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
              <div className="text-3xl font-bold">{counts.zoneCount.total}</div>
              <div className="mt-2 space-y-1 border-t pt-2">
                <SubcategoryItem label="Office" count={counts.zoneCount.office} />
                <SubcategoryItem label="Meeting Rooms" count={counts.zoneCount.meetingRoom} />
                <SubcategoryItem label="Common Areas" count={counts.zoneCount.commonArea} />
              </div>
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
                <div className="mt-2 space-y-1 border-t pt-2">
                  <SubcategoryItem label="Terabee" count={counts.deviceCount.terabee} />
                  <SubcategoryItem label="Nexelec" count={counts.deviceCount.nexelec} />
                  <SubcategoryItem label="Ewattch" count={counts.deviceCount.ewattch} />
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
                <div className="mt-2 space-y-1 border-t pt-2">
                  <SubcategoryItem label="Active Power (kW)" count={counts.sensorCount.activePower} />
                  <SubcategoryItem label="People Counting (count)" count={counts.sensorCount.peopleCounting} />
                  <SubcategoryItem label="CO2 (ppm)" count={counts.sensorCount.co2} />
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

        {/* Hierarchy Levels Section */}
        <div className="grid gap-6">
          <HierarchyLevels />
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
