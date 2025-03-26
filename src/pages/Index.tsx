
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Building2, Home, Cpu, Activity, ArrowRight, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { assets, zones, devices, sensors } from "@/lib/sample-data";
import { MetadataTable } from "@/components/MetadataTable";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Function to create a subcategory item for metrics cards
const SubcategoryItem = ({ label, count }: { label: string; count: number }) => (
  <div className="flex justify-between text-xs text-muted-foreground mt-1">
    <span>{label}</span>
    <span>{count}</span>
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const [selectedAssets, setSelectedAssets] = useState<number[]>([]);
  
  // Get filtered data based on selected assets
  const filteredAssets = selectedAssets.length > 0 
    ? assets.filter(a => selectedAssets.includes(a.id)) 
    : assets;
  
  const assetIds = filteredAssets.map(a => a.id);
  const filteredZones = zones.filter(z => assetIds.includes(z.assetId));
  const zoneIds = filteredZones.map(z => z.id);
  const filteredDevices = devices.filter(d => zoneIds.includes(d.zoneId));
  const deviceIds = filteredDevices.map(d => d.id);
  const filteredSensors = sensors.filter(s => deviceIds.includes(s.deviceId));
  
  // Calculate counts and active/inactive metrics
  const assetCount = {
    total: filteredAssets.length,
    active: filteredAssets.filter(a => a.status === 'active').length,
    inactive: filteredAssets.filter(a => a.status !== 'active').length,
    office: filteredAssets.filter(a => a.type === 'office').length,
    residential: filteredAssets.filter(a => a.type === 'residential').length
  };
  
  const zoneCount = {
    total: filteredZones.length,
    active: filteredZones.length, // We don't have a status field for zones, assuming all are active
    inactive: 0,
    office: filteredZones.filter(z => z.type === 'office').length,
    meetingRoom: filteredZones.filter(z => z.type === 'meeting-room').length,
    commonArea: filteredZones.filter(z => z.type === 'common-area').length
  };
  
  const deviceCount = {
    total: filteredDevices.length,
    active: filteredDevices.filter(d => d.status === "online").length,
    inactive: filteredDevices.filter(d => d.status !== "online").length,
    terabee: filteredDevices.filter(d => d.type === "terabee").length,
    nexelec: filteredDevices.filter(d => d.type === "nexelec").length,
    ewattch: filteredDevices.filter(d => d.type === "ewattch").length
  };
  
  const sensorCount = {
    total: filteredSensors.length,
    active: filteredSensors.filter(s => s.status === "active").length,
    inactive: filteredSensors.filter(s => s.status !== "active").length,
    activePower: filteredSensors.filter(s => s.type === "active-power").length,
    peopleCounting: filteredSensors.filter(s => s.type === "people-counting").length,
    co2: filteredSensors.filter(s => s.type === "co2").length
  };

  // Toggle asset selection
  const toggleAssetSelection = (assetId: number) => {
    setSelectedAssets(prev => 
      prev.includes(assetId)
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Home className="h-4 w-4" />
          <span>Home</span>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Digital Twin Dashboard</h1>
          <div className="w-full max-w-xl">
            <Card className="p-4">
              <div className="text-sm font-medium mb-2">Filter by assets:</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {assets.map(asset => (
                  <div key={asset.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`asset-${asset.id}`} 
                      checked={selectedAssets.includes(asset.id)}
                      onCheckedChange={() => toggleAssetSelection(asset.id)}
                    />
                    <Label htmlFor={`asset-${asset.id}`}>{asset.name}</Label>
                  </div>
                ))}
              </div>
            </Card>
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
              <div className="text-3xl font-bold">{assetCount.total}</div>
              <div className="flex items-center justify-between text-xs mt-2">
                <span>Active / Inactive</span>
                <span>{assetCount.active} / {assetCount.inactive}</span>
              </div>
              <Progress value={(assetCount.active / (assetCount.total || 1)) * 100} className="h-1 bg-muted mt-1" />
              <div className="mt-2 space-y-1 border-t pt-2">
                <SubcategoryItem label="Office" count={assetCount.office} />
                <SubcategoryItem label="Residential" count={assetCount.residential} />
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
              <div className="text-3xl font-bold">{zoneCount.total}</div>
              <div className="flex items-center justify-between text-xs mt-2">
                <span>Active / Inactive</span>
                <span>{zoneCount.active} / {zoneCount.inactive}</span>
              </div>
              <Progress value={(zoneCount.active / (zoneCount.total || 1)) * 100} className="h-1 bg-muted mt-1" />
              <div className="mt-2 space-y-1 border-t pt-2">
                <SubcategoryItem label="Office" count={zoneCount.office} />
                <SubcategoryItem label="Meeting Rooms" count={zoneCount.meetingRoom} />
                <SubcategoryItem label="Common Areas" count={zoneCount.commonArea} />
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
              <div className="text-3xl font-bold">{deviceCount.total}</div>
              <div className="flex items-center justify-between text-xs mt-2">
                <span>Active / Inactive</span>
                <span>{deviceCount.active} / {deviceCount.inactive}</span>
              </div>
              <Progress value={(deviceCount.active / (deviceCount.total || 1)) * 100} className="h-1 bg-muted mt-1" />
              <div className="mt-2 space-y-1 border-t pt-2">
                <SubcategoryItem label="Terabee" count={deviceCount.terabee} />
                <SubcategoryItem label="Nexelec" count={deviceCount.nexelec} />
                <SubcategoryItem label="Ewattch" count={deviceCount.ewattch} />
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
              <div className="text-3xl font-bold">{sensorCount.total}</div>
              <div className="flex items-center justify-between text-xs mt-2">
                <span>Active / Inactive</span>
                <span>{sensorCount.active} / {sensorCount.inactive}</span>
              </div>
              <Progress value={(sensorCount.active / (sensorCount.total || 1)) * 100} className="h-1 bg-muted mt-1" />
              <div className="mt-2 space-y-1 border-t pt-2">
                <SubcategoryItem label="Active Power (kW)" count={sensorCount.activePower} />
                <SubcategoryItem label="People Counting (count)" count={sensorCount.peopleCounting} />
                <SubcategoryItem label="CO2 (ppm)" count={sensorCount.co2} />
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

        {/* Metadata Table Section */}
        <div className="grid gap-6">
          <MetadataTable />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
