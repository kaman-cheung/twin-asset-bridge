
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Treemap, ResponsiveContainer } from "recharts";
import { assets, zones, devices, sensors, getPropertiesByEntity } from "@/lib/sample-data";

// Transform data into a hierarchical structure for the treemap
const transformData = () => {
  const data = assets.map(asset => ({
    name: asset.name,
    children: asset.zones.map(zoneId => {
      const zone = zones.find(z => z.id === zoneId);
      if (!zone) return null;

      return {
        name: zone.displayName,
        size: 1,
        children: zone.devices.map(deviceId => {
          const device = devices.find(d => d.id === deviceId);
          if (!device) return null;

          return {
            name: device.name,
            children: device.sensors.map(sensorId => {
              const sensor = sensors.find(s => s.id === sensorId);
              if (!sensor) return null;

              const properties = getPropertiesByEntity("sensor", sensor.id);
              return {
                name: sensor.name,
                children: properties.map(prop => ({
                  name: prop.name,
                  size: 1,
                })),
              };
            }).filter(Boolean),
          };
        }).filter(Boolean),
      };
    }).filter(Boolean),
  }));

  return [{
    name: "Digital Twin Hierarchy",
    children: data
  }];
};

const COLORS = [
  "#9b87f5", // Primary Purple
  "#7E69AB", // Secondary Purple
  "#6E59A5", // Tertiary Purple
  "#D6BCFA", // Light Purple
  "#E5DEFF", // Soft Purple
];

const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, name, index } = props;

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
          strokeWidth: 2,
          strokeOpacity: 1,
          fillOpacity: depth === 1 ? 0.8 : 0.6,
        }}
      />
      {width > 50 && height > 20 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fill: '#fff',
            fontSize: Math.min(width / 10, 14),
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
        <CardDescription>Hierarchical visualization of digital twin metadata</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="w-full" style={{ height: '450px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={data}
                dataKey="size"
                stroke="#fff"
                fill="#8884d8"
                content={<CustomizedContent />}
                aspectRatio={4 / 3}
              />
            </ResponsiveContainer>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
