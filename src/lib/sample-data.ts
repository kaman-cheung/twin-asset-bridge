import { Lease, Property, Procedure } from "./models";

export const assets = [
  {
    id: 1,
    name: "Building A",
    display_name: "Building A",
    type: "office",
    location: "123 Main St",
    status: "active",
    zones: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    usage: "office",
    address: "123 Main St",
    city: "New York",
    country: "USA",
    is_active: true,
    is_cbd: true,
    external_id: "BLDG-001",
    timezone: "America/New_York"
  },
  {
    id: 2,
    name: "Building B",
    display_name: "Building B",
    type: "residential",
    location: "456 Elm St",
    status: "maintenance",
    zones: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    usage: "mixed-use",
    address: "456 Elm St",
    city: "Chicago",
    country: "USA",
    is_active: true,
    is_cbd: false,
    external_id: "BLDG-002",
    timezone: "America/Chicago"
  },
  {
    id: 3,
    name: "Building C",
    display_name: "Building C",
    type: "office",
    location: "789 Oak St",
    status: "inactive",
    zones: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    usage: "office",
    address: "789 Oak St",
    city: "San Francisco",
    country: "USA",
    is_active: false,
    is_cbd: true,
    external_id: "BLDG-003",
    timezone: "America/Los_Angeles"
  },
];

export const zones = [
  { id: 1, assetId: 1, displayName: "Floor 1", internalName: "floor_1", startDate: "2023-01-01", endDate: "2024-01-01", devices: [1, 2, 3, 4, 5], internal_name: "floor_1", display_name: "Floor 1", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "office", lettable_area: 1200, capacity: 50, asset: 1, parent_zones: [] },
  { id: 2, assetId: 1, displayName: "Floor 2", internalName: "floor_2", startDate: "2023-01-01", endDate: "2024-01-01", devices: [6, 7, 8, 9, 10], internal_name: "floor_2", display_name: "Floor 2", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "office", lettable_area: 1200, capacity: 50, asset: 1, parent_zones: [] },
  { id: 3, assetId: 1, displayName: "Conference Room A", internalName: "conf_a", startDate: "2023-01-01", endDate: "2024-01-01", devices: [11, 12], internal_name: "conf_a", display_name: "Conference Room A", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "meeting-room", lettable_area: 50, capacity: 10, asset: 1, parent_zones: [1] },
  { id: 4, assetId: 1, displayName: "Conference Room B", internalName: "conf_b", startDate: "2023-01-01", endDate: "2024-01-01", devices: [13, 14], internal_name: "conf_b", display_name: "Conference Room B", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "meeting-room", lettable_area: 40, capacity: 8, asset: 1, parent_zones: [1] },
  { id: 5, assetId: 1, displayName: "Office Suite 101", internalName: "suite_101", startDate: "2023-01-01", endDate: "2024-01-01", devices: [15, 16], internal_name: "suite_101", display_name: "Office Suite 101", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "office", lettable_area: 150, capacity: 5, asset: 1, parent_zones: [1] },
  { id: 6, assetId: 1, displayName: "Office Suite 102", internalName: "suite_102", startDate: "2023-01-01", endDate: "2024-01-01", devices: [17, 18], internal_name: "suite_102", display_name: "Office Suite 102", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "office", lettable_area: 160, capacity: 6, asset: 1, parent_zones: [1] },
  { id: 7, assetId: 1, displayName: "Kitchen", internalName: "kitchen", startDate: "2023-01-01", endDate: "2024-01-01", devices: [19, 20], internal_name: "kitchen", display_name: "Kitchen", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "common-area", lettable_area: 80, capacity: 15, asset: 1, parent_zones: [2] },
  { id: 8, assetId: 1, displayName: "Reception", internalName: "reception", startDate: "2023-01-01", endDate: "2024-01-01", devices: [21, 22], internal_name: "reception", display_name: "Reception", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "common-area", lettable_area: 70, capacity: 10, asset: 1, parent_zones: [1] },
  { id: 9, assetId: 1, displayName: "IT Room", internalName: "it_room", startDate: "2023-01-01", endDate: "2024-01-01", devices: [23, 24], internal_name: "it_room", display_name: "IT Room", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "technical", lettable_area: 40, capacity: 2, asset: 1, parent_zones: [2] },
  { id: 10, assetId: 1, displayName: "Storage Room", internalName: "storage", startDate: "2023-01-01", endDate: "2024-01-01", devices: [25], internal_name: "storage", display_name: "Storage Room", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "technical", lettable_area: 30, capacity: 1, asset: 1, parent_zones: [2] },
  
  { id: 11, assetId: 2, displayName: "Apartment 101", internalName: "apt_101", startDate: "2023-01-01", endDate: "2024-01-01", devices: [26, 27, 28], internal_name: "apt_101", display_name: "Apartment 101", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "office", lettable_area: 100, capacity: 10, asset: 2, parent_zones: [] },
  { id: 12, assetId: 2, displayName: "Apartment 102", internalName: "apt_102", startDate: "2023-01-01", endDate: "2024-01-01", devices: [29, 30, 31], internal_name: "apt_102", display_name: "Apartment 102", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "office", lettable_area: 110, capacity: 12, asset: 2, parent_zones: [] },
  { id: 13, assetId: 2, displayName: "Apartment 201", internalName: "apt_201", startDate: "2023-01-01", endDate: "2024-01-01", devices: [32, 33, 34], internal_name: "apt_201", display_name: "Apartment 201", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "office", lettable_area: 120, capacity: 14, asset: 2, parent_zones: [] },
  { id: 14, assetId: 2, displayName: "Apartment 202", internalName: "apt_202", startDate: "2023-01-01", endDate: "2024-01-01", devices: [35, 36, 37], internal_name: "apt_202", display_name: "Apartment 202", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "office", lettable_area: 130, capacity: 16, asset: 2, parent_zones: [] },
  { id: 15, assetId: 2, displayName: "Lobby", internalName: "lobby", startDate: "2023-01-01", endDate: "2024-01-01", devices: [38, 39], internal_name: "lobby", display_name: "Lobby", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "common-area", lettable_area: 60, capacity: 8, asset: 2, parent_zones: [1] },
  { id: 16, assetId: 2, displayName: "Gymnasium", internalName: "gym", startDate: "2023-01-01", endDate: "2024-01-01", devices: [40, 41], internal_name: "gym", display_name: "Gymnasium", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "common-area", lettable_area: 70, capacity: 10, asset: 2, parent_zones: [1] },
  { id: 17, assetId: 2, displayName: "Laundry Room", internalName: "laundry", startDate: "2023-01-01", endDate: "2024-01-01", devices: [42, 43], internal_name: "laundry", display_name: "Laundry Room", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "common-area", lettable_area: 50, capacity: 6, asset: 2, parent_zones: [1] },
  { id: 18, assetId: 2, displayName: "Parking Garage", internalName: "garage", startDate: "2023-01-01", endDate: "2024-01-01", devices: [44, 45], internal_name: "garage", display_name: "Parking Garage", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "common-area", lettable_area: 60, capacity: 8, asset: 2, parent_zones: [1] },
  { id: 19, assetId: 2, displayName: "Garden", internalName: "garden", startDate: "2023-01-01", endDate: "2024-01-01", devices: [46, 47], internal_name: "garden", display_name: "Garden", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "common-area", lettable_area: 50, capacity: 6, asset: 2, parent_zones: [1] },
  { id: 20, assetId: 2, displayName: "Swimming Pool", internalName: "pool", startDate: "2023-01-01", endDate: "2024-01-01", devices: [48, 49, 50], internal_name: "pool", display_name: "Swimming Pool", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "common-area", lettable_area: 80, capacity: 12, asset: 2, parent_zones: [1] },
  
  { id: 21, assetId: 3, displayName: "Floor 1", internalName: "floor_1", startDate: "2023-01-01", endDate: "2024-01-01", devices: [51, 52, 53], internal_name: "floor_1", display_name: "Floor 1", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "office", lettable_area: 1200, capacity: 50, asset: 3, parent_zones: [] },
  { id: 22, assetId: 3, displayName: "Floor 2", internalName: "floor_2", startDate: "2023-01-01", endDate: "2024-01-01", devices: [54, 55, 56], internal_name: "floor_2", display_name: "Floor 2", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "office", lettable_area: 1200, capacity: 50, asset: 3, parent_zones: [] },
  { id: 23, assetId: 3, displayName: "Floor 3", internalName: "floor_3", startDate: "2023-01-01", endDate: "2024-01-01", devices: [57, 58, 59], internal_name: "floor_3", display_name: "Floor 3", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "office", lettable_area: 1300, capacity: 55, asset: 3, parent_zones: [] },
  { id: 24, assetId: 3, displayName: "Meeting Room A", internalName: "meet_a", startDate: "2023-01-01", endDate: "2024-01-01", devices: [60, 61], internal_name: "meet_a", display_name: "Meeting Room A", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "meeting-room", lettable_area: 50, capacity: 10, asset: 3, parent_zones: [1] },
  { id: 25, assetId: 3, displayName: "Meeting Room B", internalName: "meet_b", startDate: "2023-01-01", endDate: "2024-01-01", devices: [62, 63], internal_name: "meet_b", display_name: "Meeting Room B", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "meeting-room", lettable_area: 40, capacity: 8, asset: 3, parent_zones: [1] },
  { id: 26, assetId: 3, displayName: "Cafeteria", internalName: "cafeteria", startDate: "2023-01-01", endDate: "2024-01-01", devices: [64, 65], internal_name: "cafeteria", display_name: "Cafeteria", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "common-area", lettable_area: 60, capacity: 8, asset: 3, parent_zones: [1] },
  { id: 27, assetId: 3, displayName: "Lounge", internalName: "lounge", startDate: "2023-01-01", endDate: "2024-01-01", devices: [66, 67], internal_name: "lounge", display_name: "Lounge", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "common-area", lettable_area: 70, capacity: 10, asset: 3, parent_zones: [1] },
  { id: 28, assetId: 3, displayName: "Data Center", internalName: "datacenter", startDate: "2023-01-01", endDate: "2024-01-01", devices: [68, 69], internal_name: "datacenter", display_name: "Data Center", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "technical", lettable_area: 40, capacity: 2, asset: 3, parent_zones: [2] },
  { id: 29, assetId: 3, displayName: "Security Office", internalName: "security", startDate: "2023-01-01", endDate: "2024-01-01", devices: [70, 71], internal_name: "security", display_name: "Security Office", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "technical", lettable_area: 50, capacity: 6, asset: 3, parent_zones: [1] },
  { id: 30, assetId: 3, displayName: "Loading Dock", internalName: "loading", startDate: "2023-01-01", endDate: "2024-01-01", devices: [72, 73, 74, 75], internal_name: "loading", display_name: "Loading Dock", start_date: "2023-01-01", end_date: "2024-01-01", zone_type: "common-area", lettable_area: 80, capacity: 15, asset: 3, parent_zones: [2] }
].map(zone => ({
  ...zone,
  type: ['office', 'meeting-room', 'common-area'][Math.floor(Math.random() * 3)] // Randomly assign types for demo
}));

export const devices = Array.from({ length: 75 }, (_, i) => {
  const id = i + 1;
  let zoneId = Math.ceil(id / 5); // Simple distribution of devices to zones
  if (zoneId > 30) zoneId = 30; // Cap at our max zone id
  
  const deviceTypes = ['terabee', 'nexelec', 'ewattch'];
  const deviceType = deviceTypes[Math.floor(Math.random() * 3)];
  
  const deviceModels = ['XYZ-100', 'ABC-200', 'DEF-300', 'GHI-400', 'JKL-500'];
  const model = deviceModels[Math.floor(Math.random() * 5)];
  
  const statuses = ['online', 'offline', 'error'];
  const status = statuses[Math.floor(Math.random() * 3)];
  
  // Calculate sensor IDs based on device ID
  const startSensorId = (id - 1) * 4 + 1;
  const sensors = [startSensorId, startSensorId + 1, startSensorId + 2, startSensorId + 3];
  
  // Find the zone's asset
  const zone = zones.find(z => z.id === zoneId);
  const assetId = zone ? zone.assetId : 1;
  
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - Math.floor(Math.random() * 2));
  
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + Math.floor(Math.random() * 3) + 1);
  
  return {
    id,
    name: `Device ${id}`,
    type: deviceType,
    model,
    status,
    zoneId,
    sensors,
    internal_name: `device_${id}`,
    display_name: `Device ${id}`,
    start_date: startDate.toISOString().split('T')[0],
    end_date: endDate.toISOString().split('T')[0],
    provider: ['Vendor A', 'Vendor B', 'Vendor C'][Math.floor(Math.random() * 3)],
    gateway: `gateway-${Math.floor(id / 10) + 1}`,
    physical_device_id: `phy-${id}-${Math.random().toString(36).substring(2, 8)}`,
    asset: assetId,
    zone: zoneId
  };
});

export const sensors = Array.from({ length: 300 }, (_, i) => {
  const id = i + 1;
  const deviceId = Math.ceil(id / 4);
  
  const sensorTypes = ['active-power', 'people-counting', 'co2'];
  const type = sensorTypes[Math.floor(Math.random() * 3)];
  
  const units = {
    'active-power': 'kW',
    'people-counting': 'count',
    'co2': 'ppm'
  };
  
  const statuses = ['active', 'inactive', 'error'];
  const status = statuses[Math.floor(Math.random() * 3)];
  
  // Generate random last reading value based on sensor type
  let value = 0;
  switch (type) {
    case 'active-power':
      value = Math.floor(Math.random() * 1000) / 10; // 0.0 - 100.0 kW
      break;
    case 'people-counting':
      value = Math.floor(Math.random() * 50); // 0 - 50 people
      break;
    case 'co2':
      value = Math.floor(Math.random() * 1500) + 400; // 400 - 1900 ppm
      break;
  }
  
  // Find the device's zone
  const device = devices.find(d => d.id === deviceId);
  const zoneId = device ? device.zoneId : 1;
  
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - Math.floor(Math.random() * 2));
  
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + Math.floor(Math.random() * 3) + 1);
  
  return {
    id,
    name: `Sensor ${id}`,
    type,
    unit: units[type],
    status,
    deviceId,
    lastReading: {
      value,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString() // Random timestamp within last 24h
    },
    internal_name: `sensor_${id}`,
    display_name: `Sensor ${id}`,
    start_date: startDate.toISOString().split('T')[0],
    end_date: endDate.toISOString().split('T')[0],
    external_id: `sensor-${id}`,
    provider: ['Vendor X', 'Vendor Y', 'Vendor Z'][Math.floor(Math.random() * 3)],
    zone: zoneId,
    parent_sensors: Math.random() > 0.7 ? [Math.floor(Math.random() * id) + 1] : [],
    identifier: `sensor-${type}-${id}`
  };
});

export const properties: Property[] = Array.from({ length: 90 }, (_, i) => {
  const id = i + 1;
  
  // Distribute across entity types
  let entityType: "asset" | "zone" | "device" | "sensor";
  let entityId: number;
  
  if (i < 15) {
    // Properties for assets
    entityType = "asset";
    entityId = Math.floor(i / 5) + 1; // Distribute across 3 assets
  } else if (i < 45) {
    // Properties for zones
    entityType = "zone";
    entityId = ((i - 15) % 30) + 1; // Distribute across 30 zones
  } else if (i < 65) {
    // Properties for devices
    entityType = "device";
    entityId = ((i - 45) % 75) + 1; // Distribute across 75 devices
  } else {
    // Properties for sensors
    entityType = "sensor";
    entityId = ((i - 65) % 300) + 1; // Distribute across 300 sensors
  }
  
  const propertyTypes = ["string", "number", "date", "boolean"];
  const type = propertyTypes[Math.floor(Math.random() * 4)];
  
  let value = "";
  switch (type) {
    case "string":
      value = ["High", "Medium", "Low", "Standard", "Custom", "Premium"][Math.floor(Math.random() * 6)];
      break;
    case "number":
      value = Math.floor(Math.random() * 1000).toString();
      break;
    case "date":
      value = new Date(Date.now() - Math.floor(Math.random() * 31536000000)).toISOString().split('T')[0]; // Random date in last year
      break;
    case "boolean":
      value = Math.random() > 0.5 ? "true" : "false";
      break;
  }
  
  const propertyNames = {
    asset: ["Area", "Year Built", "Floors", "Capacity", "Security Level", "Energy Rating"],
    zone: ["Capacity", "Temperature", "HVAC Zone", "Access Level", "Lighting Type", "Occupancy"],
    device: ["IP Address", "MAC Address", "Firmware Version", "Installation Date", "Warranty End", "Calibration Date"],
    sensor: ["Accuracy", "Range", "Calibration Date", "Alert Threshold", "Sample Rate", "Battery Level"]
  };
  
  const name = propertyNames[entityType][Math.floor(Math.random() * 6)];
  const display_name = name;
  const internal_name = name.toLowerCase().replace(/\s+/g, '_');
  
  return {
    id,
    name,
    internal_name,
    display_name,
    type,
    property_type: type,
    value,
    entityType,
    entityId,
    external_id: `prop-${id}`,
    usage: ['primary', 'secondary', 'tertiary'][Math.floor(Math.random() * 3)],
    unit: type === 'number' ? ['kW', 'sqm', 'ppm', 'count'][Math.floor(Math.random() * 4)] : '',
    is_cumulative: Math.random() > 0.5,
    direction: ['input', 'output', 'bidirectional'][Math.floor(Math.random() * 3)],
    sensor: Math.floor(Math.random() * 300) + 1
  };
});

export const leases: Lease[] = Array.from({ length: 15 }, (_, i) => {
  const id = i + 1;
  const assetId = Math.floor(i / 5) + 1; // Distribute across 3 assets
  
  const tenantNames = [
    "Acme Corp", "TechSolutions Inc", "Global Services LLC", "Innovate Design Studio", 
    "Future Solutions", "Apex Industries", "Pinnacle Group", "Quantum Enterprises",
    "Synergy Systems", "Catalyst Corporation", "Elite Ventures", "Horizon Holdings",
    "Matrix Media", "Precision Partners", "Dynamic Developments"
  ];
  
  // Get zones for this asset
  const assetZones = zones.filter(z => z.assetId === assetId).map(z => z.id);
  
  // Select a random subset of zones for this lease (between 1-3 zones)
  const numZones = Math.floor(Math.random() * 3) + 1;
  const zoneIds = [];
  for (let j = 0; j < numZones; j++) {
    const randomZoneIndex = Math.floor(Math.random() * assetZones.length);
    zoneIds.push(assetZones[randomZoneIndex]);
    // Remove this zone to avoid duplicates
    assetZones.splice(randomZoneIndex, 1);
    if (assetZones.length === 0) break;
  }
  
  // Generate random start date in past 2 years
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - Math.floor(Math.random() * 2));
  startDate.setMonth(Math.floor(Math.random() * 12));
  startDate.setDate(Math.floor(Math.random() * 28) + 1);
  
  // Generate random end date 1-5 years in future
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + Math.floor(Math.random() * 5) + 1);

  const tenant = tenantNames[i % tenantNames.length];
  
  return {
    id,
    tenant,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    zoneIds,
    internal_name: tenant.toLowerCase().replace(/\s+/g, '_'),
    display_name: tenant,
    lease_external_id: `lease-${id}`,
    is_sub_lease: Math.random() > 0.7,
    usage: ['office', 'retail', 'residential', 'industrial'][Math.floor(Math.random() * 4)],
    tenant_identifier: `tenant-${id}`,
    tenant_display_name: tenant,
    tenant_industry: ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail'][Math.floor(Math.random() * 5)],
    contractual_start_date: startDate.toISOString().split('T')[0],
    contractual_end_date: endDate.toISOString().split('T')[0],
    occupation_start_date: startDate.toISOString().split('T')[0]
  };
});

export const procedures: Procedure[] = [
  {
    id: 1,
    application_name: "Energy Optimizer",
    input_systems: ["BMS", "Meter Data"],
    output_system: "Building Controls",
    config: "Standard",
    asset: 1
  },
  {
    id: 2,
    application_name: "Occupancy Analyzer",
    input_systems: ["Access Control", "Sensor Network"],
    output_system: "Reporting Dashboard",
    config: "Enhanced",
    asset: 1
  },
  {
    id: 3,
    application_name: "Maintenance Scheduler",
    input_systems: ["Asset Registry", "Fault Detection"],
    output_system: "Work Order System",
    config: "Basic",
    asset: 2
  },
  {
    id: 4,
    application_name: "Climate Controller",
    input_systems: ["Weather API", "HVAC System"],
    output_system: "Building Management System",
    config: "Advanced",
    asset: 2
  },
  {
    id: 5,
    application_name: "Space Utilization",
    input_systems: ["Occupancy Sensors", "Booking System"],
    output_system: "Space Planning Tool",
    config: "Custom",
    asset: 3
  }
];

export const getAssetById = (id: number) => {
  return assets.find(asset => asset.id === id) || null;
};

export const getZoneById = (id: number) => {
  return zones.find(zone => zone.id === id) || null;
};

export const getDeviceById = (id: number) => {
  return devices.find(device => device.id === id) || null;
};

export const getSensorById = (id: number) => {
  return sensors.find(sensor => sensor.id === id) || null;
};

export const getZonesByAsset = (assetId: number) => {
  return zones.filter(zone => zone.assetId === assetId);
};

export const getDevicesByZone = (zoneId: number) => {
  return devices.filter(device => device.zoneId === zoneId);
};

export const getSensorsByDevice = (deviceId: number) => {
  return sensors.filter(sensor => sensor.deviceId === deviceId);
};

export const getSensorsByZone = (zoneId: number) => {
  const zoneDevices = getDevicesByZone(zoneId);
  const zoneSensors = zoneDevices.flatMap(device => 
    getSensorsByDevice(device.id)
  );
  return zoneSensors;
};

export const getPropertiesByEntity = (entityType: string, entityId: number) => {
  return properties.filter(
    (property) => property.entityType === entityType && property.entityId === entityId
  );
};
