
// Define types for our digital twin system
export interface Asset {
  id: number;
  name: string;
  type: string;
  location: string;
  status: "active" | "inactive" | "maintenance";
  zones: number[]; // References to zone IDs
}

export interface Zone {
  id: number;
  displayName: string;
  internalName: string;
  startDate: string;
  endDate: string;
  assetId?: number; // Reference to parent asset
  parentZoneId?: number; // Reference to parent zone (for hierarchical zones)
  childZones?: number[]; // References to child zones
  devices: number[]; // References to device IDs
}

export interface Device {
  id: number;
  name: string;
  type: string;
  model: string;
  status: string; // Changed from "online" | "offline" | "error" to string to match sample data
  zoneId: number; // Reference to parent zone
  sensors: number[]; // References to sensor IDs
}

export interface Sensor {
  id: number;
  name: string;
  type: string;
  unit: string;
  status: "active" | "inactive" | "error";
  deviceId: number; // Reference to parent device
  lastReading?: {
    value: number;
    timestamp: string;
  };
}

export interface Property {
  id: number;
  name: string;
  type: string;
  value: string;
  entityType: "asset" | "zone" | "device" | "sensor";
  entityId: number; // Reference to the entity this property belongs to
}

export interface Lease {
  id: number;
  tenant: string;
  startDate: string;
  endDate: string;
  zoneIds: number[]; // References to leased zones
}
