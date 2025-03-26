import { Lease, Property } from "./models";

export const assets = [
  {
    id: 1,
    name: "Building A",
    type: "office",
    location: "123 Main St",
    status: "active",
    zones: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    id: 2,
    name: "Building B",
    type: "residential",
    location: "456 Elm St",
    status: "maintenance",
    zones: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  },
  {
    id: 3,
    name: "Building C",
    type: "office",
    location: "789 Oak St",
    status: "inactive",
    zones: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  },
];

export const zones = [
  { id: 1, assetId: 1, displayName: "Floor 1", internalName: "floor_1", startDate: "2023-01-01", endDate: "2024-01-01", devices: [1, 2, 3, 4, 5] },
  { id: 2, assetId: 1, displayName: "Floor 2", internalName: "floor_2", startDate: "2023-01-01", endDate: "2024-01-01", devices: [6, 7, 8, 9, 10] },
  { id: 3, assetId: 1, displayName: "Conference Room A", internalName: "conf_a", startDate: "2023-01-01", endDate: "2024-01-01", devices: [11, 12] },
  { id: 4, assetId: 1, displayName: "Conference Room B", internalName: "conf_b", startDate: "2023-01-01", endDate: "2024-01-01", devices: [13, 14] },
  { id: 5, assetId: 1, displayName: "Office Suite 101", internalName: "suite_101", startDate: "2023-01-01", endDate: "2024-01-01", devices: [15, 16] },
  { id: 6, assetId: 1, displayName: "Office Suite 102", internalName: "suite_102", startDate: "2023-01-01", endDate: "2024-01-01", devices: [17, 18] },
  { id: 7, assetId: 1, displayName: "Kitchen", internalName: "kitchen", startDate: "2023-01-01", endDate: "2024-01-01", devices: [19, 20] },
  { id: 8, assetId: 1, displayName: "Reception", internalName: "reception", startDate: "2023-01-01", endDate: "2024-01-01", devices: [21, 22] },
  { id: 9, assetId: 1, displayName: "IT Room", internalName: "it_room", startDate: "2023-01-01", endDate: "2024-01-01", devices: [23, 24] },
  { id: 10, assetId: 1, displayName: "Storage Room", internalName: "storage", startDate: "2023-01-01", endDate: "2024-01-01", devices: [25] },
  
  { id: 11, assetId: 2, displayName: "Apartment 101", internalName: "apt_101", startDate: "2023-01-01", endDate: "2024-01-01", devices: [26, 27, 28] },
  { id: 12, assetId: 2, displayName: "Apartment 102", internalName: "apt_102", startDate: "2023-01-01", endDate: "2024-01-01", devices: [29, 30, 31] },
  { id: 13, assetId: 2, displayName: "Apartment 201", internalName: "apt_201", startDate: "2023-01-01", endDate: "2024-01-01", devices: [32, 33, 34] },
  { id: 14, assetId: 2, displayName: "Apartment 202", internalName: "apt_202", startDate: "2023-01-01", endDate: "2024-01-01", devices: [35, 36, 37] },
  { id: 15, assetId: 2, displayName: "Lobby", internalName: "lobby", startDate: "2023-01-01", endDate: "2024-01-01", devices: [38, 39] },
  { id: 16, assetId: 2, displayName: "Gymnasium", internalName: "gym", startDate: "2023-01-01", endDate: "2024-01-01", devices: [40, 41] },
  { id: 17, assetId: 2, displayName: "Laundry Room", internalName: "laundry", startDate: "2023-01-01", endDate: "2024-01-01", devices: [42, 43] },
  { id: 18, assetId: 2, displayName: "Parking Garage", internalName: "garage", startDate: "2023-01-01", endDate: "2024-01-01", devices: [44, 45] },
  { id: 19, assetId: 2, displayName: "Garden", internalName: "garden", startDate: "2023-01-01", endDate: "2024-01-01", devices: [46, 47] },
  { id: 20, assetId: 2, displayName: "Swimming Pool", internalName: "pool", startDate: "2023-01-01", endDate: "2024-01-01", devices: [48, 49, 50] },
  
  { id: 21, assetId: 3, displayName: "Floor 1", internalName: "floor_1", startDate: "2023-01-01", endDate: "2024-01-01", devices: [51, 52, 53] },
  { id: 22, assetId: 3, displayName: "Floor 2", internalName: "floor_2", startDate: "2023-01-01", endDate: "2024-01-01", devices: [54, 55, 56] },
  { id: 23, assetId: 3, displayName: "Floor 3", internalName: "floor_3", startDate: "2023-01-01", endDate: "2024-01-01", devices: [57, 58, 59] },
  { id: 24, assetId: 3, displayName: "Meeting Room A", internalName: "meet_a", startDate: "2023-01-01", endDate: "2024-01-01", devices: [60, 61] },
  { id: 25, assetId: 3, displayName: "Meeting Room B", internalName: "meet_b", startDate: "2023-01-01", endDate: "2024-01-01", devices: [62, 63] },
  { id: 26, assetId: 3, displayName: "Cafeteria", internalName: "cafeteria", startDate: "2023-01-01", endDate: "2024-01-01", devices: [64, 65] },
  { id: 27, assetId: 3, displayName: "Lounge", internalName: "lounge", startDate: "2023-01-01", endDate: "2024-01-01", devices: [66, 67] },
  { id: 28, assetId: 3, displayName: "Data Center", internalName: "datacenter", startDate: "2023-01-01", endDate: "2024-01-01", devices: [68, 69] },
  { id: 29, assetId: 3, displayName: "Security Office", internalName: "security", startDate: "2023-01-01", endDate: "2024-01-01", devices: [70, 71] },
  { id: 30, assetId: 3, displayName: "Loading Dock", internalName: "loading", startDate: "2023-01-01", endDate: "2024-01-01", devices: [72, 73, 74, 75] }
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
  
  return {
    id,
    name: `Device ${id}`,
    type: deviceType,
    model,
    status,
    zoneId,
    sensors
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
    }
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
  
  return {
    id,
    name,
    type,
    value,
    entityType,
    entityId
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
  
  return {
    id,
    tenant: tenantNames[i % tenantNames.length],
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    zoneIds
  };
});

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
