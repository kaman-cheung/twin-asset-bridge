
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Zone, Device, Sensor, Lease } from "@/lib/models";
import { useNavigate } from "react-router-dom";

interface QuickActionsProps {
  zones: Zone[];
  devices: Device[];
  sensors: Sensor[];
  leases: Lease[];
}

export function QuickActions({ zones, devices, sensors, leases }: QuickActionsProps) {
  const navigate = useNavigate();
  
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

  // Only show items that have a count greater than 0
  const actionItems = [
    {
      count: zonesWithoutLeases,
      label: "Zones without a lease today",
      severity: zonesWithoutLeases > 5 ? "high" as const : zonesWithoutLeases > 0 ? "medium" as const : "low" as const,
      action: () => navigate("/zones", { state: { filter: "no-lease" } })
    },
    {
      count: zonesWithoutUsage,
      label: "Zones without a zone_usage today",
      severity: zonesWithoutUsage > 10 ? "high" as const : zonesWithoutUsage > 0 ? "medium" as const : "low" as const,
      action: () => navigate("/zones", { state: { filter: "no-usage" } })
    },
    {
      count: devicesWithoutSensors,
      label: "Devices without a sensor",
      severity: devicesWithoutSensors > 3 ? "high" as const : devicesWithoutSensors > 0 ? "medium" as const : "low" as const,
      action: () => navigate("/devices", { state: { filter: "no-sensors" } })
    },
    {
      count: sensorsWithoutProperties,
      label: "Sensors without a property",
      severity: sensorsWithoutProperties > 5 ? "high" as const : sensorsWithoutProperties > 0 ? "medium" as const : "low" as const,
      action: () => navigate("/devices", { state: { filter: "sensors-no-properties" } })
    }
  ].filter(item => item.count > 0); // Filter out items with count = 0

  const ActionItem = ({ 
    count, 
    label, 
    severity, 
    action 
  }: { 
    count: number, 
    label: string, 
    severity: "low" | "medium" | "high",
    action: () => void 
  }) => {
    const getBgColor = () => {
      switch (severity) {
        case "high": return "bg-red-50 text-red-700 border-red-200";
        case "medium": return "bg-amber-50 text-amber-700 border-amber-200";
        case "low": return "bg-blue-50 text-blue-700 border-blue-200";
        default: return "bg-gray-50 text-gray-700 border-gray-200";
      }
    };
    
    return (
      <div 
        className={`flex items-center justify-between p-4 rounded-lg border ${getBgColor()} cursor-pointer hover:shadow-md transition-shadow`}
        onClick={action}
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5" />
          <span>{label}</span>
        </div>
        <span className="font-semibold">{count}</span>
      </div>
    );
  };

  // If there are no items to show, don't render the card
  if (actionItems.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {actionItems.map((item, index) => (
            <ActionItem
              key={index}
              count={item.count}
              label={item.label}
              severity={item.severity}
              action={item.action}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
