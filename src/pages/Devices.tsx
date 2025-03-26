
import { Layout } from "@/components/Layout";
import { devices } from "@/lib/sample-data";
import { DevicesTable } from "@/components/devices/DevicesTable";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Device } from "@/lib/models";

const Devices = () => {
  const [selectedDevices, setSelectedDevices] = useState<number[]>([]);

  const handleSelectAll = () => {
    if (selectedDevices.length === devices.length) {
      setSelectedDevices([]);
    } else {
      setSelectedDevices(devices.map(d => d.id));
    }
  };

  const handleSelectDevice = (id: number) => {
    setSelectedDevices(prev => {
      if (prev.includes(id)) {
        return prev.filter(deviceId => deviceId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectDetail = (id: number) => {
    console.log(`View details for device ${id}`);
    // Future implementation: view device details
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Devices</h1>
        <Card>
          <CardHeader>
            <CardTitle>All Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <DevicesTable 
              devices={devices as Device[]}
              selectedRows={selectedDevices}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectDevice}
              onSelectDevice={handleSelectDetail}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Devices;
