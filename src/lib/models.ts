
// Define types for our digital twin system
export interface Asset {
  id: number;
  name: string;
  display_name: string;
  type: string;
  location: string;
  status: "active" | "inactive" | "maintenance";
  zones: number[]; // References to zone IDs
  usage: string;
  address: string;
  city: string;
  country: string;
  is_active: boolean;
  is_cbd: boolean;
  external_id: string;
  timezone: string;
}

export interface Zone {
  id: number;
  displayName: string;
  internalName: string;
  internal_name: string;
  display_name: string;
  start_date: string;
  end_date: string;
  type?: string;
  zone_type?: string;
  lettable_area?: number;
  capacity?: number;
  assetId?: number; // Reference to parent asset
  asset?: number; // Alternative reference to parent asset
  parentZoneId?: number; // Reference to parent zone
  parent_zones?: number[]; // References to parent zones
  childZones?: number[]; // References to child zones
  devices: number[]; // References to device IDs
  startDate?: string; // Legacy field
  endDate?: string; // Legacy field
}

export interface Device {
  id: number;
  name: string;
  internal_name: string;
  display_name: string;
  type: string;
  model: string;
  status: string; // Changed from "online" | "offline" | "error" to string to match sample data
  zoneId: number; // Reference to parent zone
  zone?: number; // Alternative reference to parent zone
  sensors: number[]; // References to sensor IDs
  start_date: string;
  end_date: string;
  provider: string;
  gateway: string;
  physical_device_id: string;
  asset: number; // Reference to parent asset
}

export interface Sensor {
  id: number;
  name: string;
  internal_name: string;
  display_name: string;
  type: string;
  unit: string;
  status: "active" | "inactive" | "error";
  deviceId: number; // Reference to parent device
  device?: number; // Alternative reference to parent device
  lastReading?: {
    value: number;
    timestamp: string;
  };
  start_date: string;
  end_date: string;
  external_id: string;
  provider: string;
  zone: number; // Reference to zone
  parent_sensors?: number[]; // References to parent sensors
  identifier: string;
}

export interface Property {
  id: number;
  name: string;
  internal_name: string;
  display_name: string;
  type: string;
  value: string;
  entityType: "asset" | "zone" | "device" | "sensor";
  entityId: number; // Reference to the entity this property belongs to
  external_id: string;
  property_type: string;
  usage: string;
  unit: string;
  is_cumulative: boolean;
  direction: string;
  sensor: number; // Reference to sensor
}

export interface Lease {
  id: number;
  tenant: string;
  startDate: string;
  endDate: string;
  zoneIds: number[]; // References to leased zones
  internal_name: string;
  display_name: string;
  lease_external_id: string;
  is_sub_lease: boolean;
  usage: string;
  tenant_identifier: string;
  tenant_display_name: string;
  tenant_industry: string;
  contractual_start_date: string;
  contractual_end_date: string;
  occupation_start_date: string;
}

export interface Procedure {
  id: number;
  application_name: string;
  input_systems: string[];
  output_system: string;
  config: string;
  asset: number; // Reference to asset
}
