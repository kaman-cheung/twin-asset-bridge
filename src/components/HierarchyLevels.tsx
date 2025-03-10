
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Treemap, ResponsiveContainer } from "recharts";
import { assets, zones, devices, sensors, getPropertiesByEntity } from "@/lib/sample-data";

// Transform data into a hierarchical structure for the treemap
const transformData = () => {
  const data = assets.map(asset => ({
    name: asset.name,
    size: 100, // Larger size for assets
    children: asset.zones.map(zoneId => {
      const zone = zones.find(z => z.id === zoneId);
      if (!zone) return null;

      return {
        name: zone.displayName,
        size: 50, // Medium size for zones
        children: zone.devices.flatMap(deviceId => {
          const device = devices.find(d => d.id === deviceId);
          if (!device) return [];

          return device.sensors.map(sensorId => {
            const sensor = sensors.find(s => s.id === sensorId);
            if (!sensor) return null;

            const properties = getPropertiesByEntity("sensor", sensor.id);
            return {
              name: sensor.name,
              size: 25, // Smaller size for sensors
              children: properties.map(prop => ({
                name: prop.name,
                size: 10, // Smallest size for properties
              })),
            };
          }).filter(Boolean);
        }).filter(Boolean),
      };
    }).filter(Boolean),
  }));

  return [{
    name: "Digital Twin Hierarchy",
    children: data
  }];
};

// Different colors for each hierarchical level
const COLORS = [
  "#4A4A8F", // Dark blue for assets (level 1)
  "#6E59A5", // Purple for zones (level 2)
  "#9B87F5", // Light purple for devices/sensors (level 3)
  "#D6BCFA", // Very light purple for properties (level 4)
];

const CustomizedContent = (props: any) => {
  const { depth, x, y, width, height, name } = props;
  
  // Skip rendering if too small to be visible
  if (width < 2 || height < 2) return null;
  
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: COLORS[depth % COLORS.length],
          stroke: '#fff',
          strokeWidth: depth < 3 ? 2 : 1, // Thicker borders for higher levels
          fillOpacity: 0.9 - (depth * 0.1), // Higher opacity for higher levels
        }}
      />
      {width > 40 && height > 25 && ( // Only show text if there's enough space
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fill: depth > 2 ? '#000' : '#fff', // Light text on dark backgrounds, dark text on light backgrounds
            fontSize: Math.min(width / 10, 12),
            fontWeight: depth === 1 ? 'bold' : 'normal',
          }}
        >
          {name}
        </text>
      )}
    </g>
  );
};

export function HierarchyLevels() {
  const data = transformData();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hierarchy Levels</CardTitle>
        <CardDescription>
          Asset → Zone → Sensor → Property hierarchy visualization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]"> {/* Increased height for better visibility */}
          <div className="w-full" style={{ height: '550px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={data}
                dataKey="size"
                stroke="#fff"
                fill="#8884d8"
                content={<CustomizedContent />}
                aspectRatio={4/3}
              />
            </ResponsiveContainer>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
