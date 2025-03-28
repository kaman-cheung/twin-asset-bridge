import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Building2, Home, Cpu, Activity, List, CalendarClock, Code } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { assets, zones, devices, sensors, properties, leases, procedures } from "@/lib/sample-data";
import { MetadataTable } from "@/components/MetadataTable";
import { useState } from "react";
import { MultiSelect, Option } from "@/components/ui/multi-select";
import { QuickActions } from "@/components/QuickActions";

// Function to create a subcategory item for metrics cards
const SubcategoryItem = ({ label, count }: { label: string; count: number }) => (
  <div className="flex justify-between text-xs text-muted-foreground mt-1">
    <span>{label}</span>
    <span>{count}</span>
  </div>
);

const Index = () => {
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>(["all"]);
  
  // Convert assets to options for multi-select
  const assetOptions: Option[] = [
    { label: "All Assets", value: "all" },
    ...assets.map(asset => ({
      label: asset.name,
      value: asset.id.toString()
    }))
  ];
  
  // Get filtered data based on selected assets
  const filteredAssets = selectedAssetIds.includes("all") 
    ? assets 
    : assets.filter(a => selectedAssetIds.includes(a.id.toString()));
  
  const assetIds = filteredAssets.map(a => a.id);
  const filteredZones = zones.filter(z => assetIds.includes(z.assetId));
  const zoneIds = filteredZones.map(z => z.id);
  const filteredDevices = devices.filter(d => zoneIds.includes(d.zoneId));
  const deviceIds = filteredDevices.map(d => d.id);
  const filteredSensors = sensors.filter(s => deviceIds.includes(s.deviceId));
  const filteredProcedures = procedures.filter(p => assetIds.includes(p.asset));
  const filteredProperties = properties.filter(p => 
    (p.entityType === "asset" && assetIds.includes(p.entityId)) ||
    (p.entityType === "zone" && zoneIds.includes(p.entityId)) ||
    (p.entityType === "device" && deviceIds.includes(p.entityId)) ||
    (p.entityType === "sensor" && filteredSensors.map(s => s.id).includes(p.entityId))
  );
  const filteredLeases = leases.filter(l => 
    l.zoneIds.some(zId => zoneIds.includes(zId))
  );
  
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

  const propertyCount = {
    total: filteredProperties.length,
    active: filteredProperties.length, // Assuming all properties are active
    inactive: 0,
    activePower: filteredProperties.filter(p => p.name.includes("active-power")).length,
    peopleCounting: filteredProperties.filter(p => p.name.includes("people-counting")).length,
    co2: filteredProperties.filter(p => p.name.includes("co2")).length
  };

  const leaseCount = {
    total: filteredLeases.length,
    active: filteredLeases.filter(l => new Date(l.endDate) > new Date()).length,
    inactive: filteredLeases.filter(l => new Date(l.endDate) <= new Date()).length,
    shortTerm: filteredLeases.filter(l => {
      const start = new Date(l.startDate);
      const end = new Date(l.endDate);
      const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
      return months <= 12;
    }).length,
    longTerm: filteredLeases.filter(l => {
      const start = new Date(l.startDate);
      const end = new Date(l.endDate);
      const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
      return months > 12;
    }).length
  };

  const procedureCount = {
    total: filteredProcedures.length,
    active: filteredProcedures.length, // Assuming all procedures are active
    inactive: 0,
    energy: filteredProcedures.filter(p => p.application_name.toLowerCase().includes('energy')).length,
    occupancy: filteredProcedures.filter(p => p.application_name.toLowerCase().includes('occupancy')).length,
    maintenance: filteredProcedures.filter(p => p.application_name.toLowerCase().includes('maintenance')).length
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
          <div className="w-full max-w-xs">
            <MultiSelect 
              values={selectedAssetIds}
              setValues={setSelectedAssetIds}
              options={assetOptions}
              placeholder="Select assets"
            />
          </div>
        </div>

        {/* Entity Count Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
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
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-green-500" />
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
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <List className="h-5 w-5 text-amber-500" />
                Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{propertyCount.total}</div>
              <div className="flex items-center justify-between text-xs mt-2">
                <span>Active / Inactive</span>
                <span>{propertyCount.active} / {propertyCount.inactive}</span>
              </div>
              <Progress value={(propertyCount.active / (propertyCount.total || 1)) * 100} className="h-1 bg-muted mt-1" />
              <div className="mt-2 space-y-1 border-t pt-2">
                <SubcategoryItem label="Active Power (kW)" count={propertyCount.activePower} />
                <SubcategoryItem label="People Counting (count)" count={propertyCount.peopleCounting} />
                <SubcategoryItem label="CO2 (ppm)" count={propertyCount.co2} />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-teal-500" />
                Leases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{leaseCount.total}</div>
              <div className="flex items-center justify-between text-xs mt-2">
                <span>Active / Inactive</span>
                <span>{leaseCount.active} / {leaseCount.inactive}</span>
              </div>
              <Progress value={(leaseCount.active / (leaseCount.total || 1)) * 100} className="h-1 bg-muted mt-1" />
              <div className="mt-2 space-y-1 border-t pt-2">
                <SubcategoryItem label="Short Term" count={leaseCount.shortTerm} />
                <SubcategoryItem label="Long Term" count={leaseCount.longTerm} />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="h-5 w-5 text-indigo-500" />
                Procedures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{procedureCount.total}</div>
              <div className="flex items-center justify-between text-xs mt-2">
                <span>Active / Inactive</span>
                <span>{procedureCount.active} / {procedureCount.inactive}</span>
              </div>
              <Progress value={(procedureCount.active / (procedureCount.total || 1)) * 100} className="h-1 bg-muted mt-1" />
              <div className="mt-2 space-y-1 border-t pt-2">
                <SubcategoryItem label="Energy" count={procedureCount.energy} />
                <SubcategoryItem label="Occupancy" count={procedureCount.occupancy} />
                <SubcategoryItem label="Maintenance" count={procedureCount.maintenance} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Metadata Table Section */}
        <div className="grid gap-6">
          <MetadataTable selectedAssetId={selectedAssetIds.includes("all") ? "all" : selectedAssetIds.join(",")} />
        </div>
        
        {/* Quick Actions Section */}
        <QuickActions 
          zones={filteredZones}
          devices={filteredDevices}
          sensors={filteredSensors}
          leases={filteredLeases}
        />
      </div>
    </Layout>
  );
};

export default Index;
