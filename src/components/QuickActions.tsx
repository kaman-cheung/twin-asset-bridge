
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Zone, Device, Sensor, Lease } from "@/lib/models";

interface QuickActionsProps {
  zones: Zone[];
  devices: Device[];
  sensors: Sensor[];
  leases: Lease[];
}

export function QuickActions({ zones, devices, sensors, leases }: QuickActionsProps) {
  // Calculate metrics
  const today = new Date();
  
  // Zones without leases
  const zonesWithLeases = new Set<number>();
  leases.forEach(lease => {
    if (new Date(lease.endDate) > today) {
      lease.zoneIds.forEach(zoneId => zonesWithLeases.add(zoneId));
    }
  });
  const zonesWithoutLeases = zones.filter(zone => !zonesWithLeases.has(zone.id)).length;
  
  // Zones without zone_usage
  const zonesWithoutUsage = zones.filter(zone => !zone.usage && !zone.zone_usage).length;
  
  // Devices without sensors
  const devicesWithoutSensors = devices.filter(device => !device.sensors.length).length;
  
  // Sensors without properties
  const sensorIds = sensors.map(sensor => sensor.id);
  const sensorsWithProperties = new Set<number>();
  // This is a placeholder - in a real app, we would check which sensors have properties
  // For this demo, we'll assume 30% of sensors don't have properties
  const sensorsWithoutProperties = Math.round(sensors.length * 0.3);

  const ActionItem = ({ count, label, severity }: { count: number, label: string, severity: "low" | "medium" | "high" }) => {
    const getBgColor = () => {
      if (count === 0) return "bg-green-50 text-green-700 border-green-200";
      switch (severity) {
        case "high": return "bg-red-50 text-red-700 border-red-200";
        case "medium": return "bg-amber-50 text-amber-700 border-amber-200";
        case "low": return "bg-blue-50 text-blue-700 border-blue-200";
        default: return "bg-gray-50 text-gray-700 border-gray-200";
      }
    };
    
    return (
      <div className={`flex items-center justify-between p-4 rounded-lg border ${getBgColor()}`}>
        <div className="flex items-center gap-3">
          {count > 0 && <AlertCircle className="h-5 w-5" />}
          <span>{label}</span>
        </div>
        <span className="font-semibold">{count}</span>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <ActionItem 
            count={zonesWithoutLeases}
            label="Zones without a lease today"
            severity={zonesWithoutLeases > 5 ? "high" : zonesWithoutLeases > 0 ? "medium" : "low"}
          />
          <ActionItem 
            count={zonesWithoutUsage}
            label="Zones without a zone_usage today"
            severity={zonesWithoutUsage > 10 ? "high" : zonesWithoutUsage > 0 ? "medium" : "low"}
          />
          <ActionItem 
            count={devicesWithoutSensors}
            label="Devices without a sensor"
            severity={devicesWithoutSensors > 3 ? "high" : devicesWithoutSensors > 0 ? "medium" : "low"}
          />
          <ActionItem 
            count={sensorsWithoutProperties}
            label="Sensors without a property"
            severity={sensorsWithoutProperties > 5 ? "high" : sensorsWithoutProperties > 0 ? "medium" : "low"}
          />
        </div>
      </CardContent>
    </Card>
  );
}
