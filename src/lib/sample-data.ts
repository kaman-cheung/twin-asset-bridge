export const assets = [
  {
    id: 1,
    name: "Building A",
    type: "office",
    location: "123 Main St",
    status: "active",
    zones: [1, 2],
  },
  {
    id: 2,
    name: "Building B",
    type: "residential",
    location: "456 Elm St",
    status: "maintenance",
    zones: [3, 4],
  },
  {
    id: 3,
    name: "Building C",
    type: "office",
    location: "789 Oak St",
    status: "inactive",
    zones: [5, 6],
  },
];

export const zones = [
  {
    id: 1,
    assetId: 1,
    displayName: "Floor 1",
    internalName: "floor_1",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    devices: [1, 2],
  },
  {
    id: 2,
    assetId: 1,
    displayName: "Floor 2",
    internalName: "floor_2",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    devices: [3, 4],
  },
  {
    id: 3,
    assetId: 2,
    displayName: "Apartment 101",
    internalName: "apt_101",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    devices: [5, 6],
  },
  {
    id: 4,
    assetId: 2,
    displayName: "Apartment 102",
    internalName: "apt_102",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    devices: [7, 8],
  },
  {
    id: 5,
    assetId: 3,
    displayName: "Floor 1",
    internalName: "floor_1",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    devices: [9, 10],
  },
  {
    id: 6,
    assetId: 3,
    displayName: "Floor 2",
    internalName: "floor_2",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    devices: [11, 12],
  },
].map(zone => ({
  ...zone,
  type: ['office', 'meeting-room', 'common-area'][Math.floor(Math.random() * 3)] // Randomly assign types for demo
}));

export const devices = [
  {
    id: 1,
    zoneId: 1,
    name: "Thermostat 1",
    type: "thermostat",
    model: "XYZ-100",
    status: "online",
    sensors: [1, 2],
  },
  {
    id: 2,
    zoneId: 1,
    name: "Lighting Control 1",
    type: "lighting",
    model: "ABC-200",
    status: "offline",
    sensors: [3, 4],
  },
  {
    id: 3,
    zoneId: 2,
    name: "Thermostat 2",
    type: "thermostat",
    model: "XYZ-100",
    status: "online",
    sensors: [5, 6],
  },
  {
    id: 4,
    zoneId: 2,
    name: "Lighting Control 2",
    type: "lighting",
    model: "ABC-200",
    status: "error",
    sensors: [7, 8],
  },
  {
    id: 5,
    zoneId: 3,
    name: "Thermostat 3",
    type: "thermostat",
    model: "XYZ-100",
    status: "offline",
    sensors: [9, 10],
  },
  {
    id: 6,
    zoneId: 3,
    name: "Lighting Control 3",
    type: "lighting",
    model: "ABC-200",
    status: "online",
    sensors: [11, 12],
  },
  {
    id: 7,
    zoneId: 4,
    name: "Thermostat 4",
    type: "thermostat",
    model: "XYZ-100",
    status: "online",
    sensors: [13, 14],
  },
  {
    id: 8,
    zoneId: 4,
    name: "Lighting Control 4",
    type: "lighting",
    model: "ABC-200",
    status: "offline",
    sensors: [15, 16],
  },
  {
    id: 9,
    zoneId: 5,
    name: "Thermostat 5",
    type: "thermostat",
    model: "XYZ-100",
    status: "error",
    sensors: [17, 18],
  },
  {
    id: 10,
    zoneId: 5,
    name: "Lighting Control 5",
    type: "lighting",
    model: "ABC-200",
    status: "online",
    sensors: [19, 20],
  },
  {
    id: 11,
    zoneId: 6,
    name: "Thermostat 6",
    type: "thermostat",
    model: "XYZ-100",
    status: "offline",
    sensors: [21, 22],
  },
  {
    id: 12,
    zoneId: 6,
    name: "Lighting Control 6",
    type: "lighting",
    model: "ABC-200",
    status: "online",
    sensors: [23, 24],
  },
].map(device => ({
  ...device,
  type: ['terabee', 'nexelec', 'ewattch'][Math.floor(Math.random() * 3)] // Randomly assign types for demo
}));

export const sensors = [
  {
    id: 1,
    deviceId: 1,
    name: "Temperature Sensor 1",
    type: "temperature",
    unit: "°C",
    status: "active",
    lastReading: { value: 22, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 2,
    deviceId: 1,
    name: "Humidity Sensor 1",
    type: "humidity",
    unit: "%",
    status: "active",
    lastReading: { value: 45, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 3,
    deviceId: 2,
    name: "Light Sensor 1",
    type: "light",
    unit: "lux",
    status: "inactive",
    lastReading: { value: 100, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 4,
    deviceId: 2,
    name: "Motion Sensor 1",
    type: "motion",
    unit: "boolean",
    status: "active",
    lastReading: { value: 1, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 5,
    deviceId: 3,
    name: "Temperature Sensor 2",
    type: "temperature",
    unit: "°C",
    status: "active",
    lastReading: { value: 23, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 6,
    deviceId: 3,
    name: "Humidity Sensor 2",
    type: "humidity",
    unit: "%",
    status: "active",
    lastReading: { value: 46, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 7,
    deviceId: 4,
    name: "Light Sensor 2",
    type: "light",
    unit: "lux",
    status: "error",
    lastReading: { value: 101, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 8,
    deviceId: 4,
    name: "Motion Sensor 2",
    type: "motion",
    unit: "boolean",
    status: "inactive",
    lastReading: { value: 0, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 9,
    deviceId: 5,
    name: "Temperature Sensor 3",
    type: "temperature",
    unit: "°C",
    status: "active",
    lastReading: { value: 24, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 10,
    deviceId: 5,
    name: "Humidity Sensor 3",
    type: "humidity",
    unit: "%",
    status: "active",
    lastReading: { value: 47, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 11,
    deviceId: 6,
    name: "Light Sensor 3",
    type: "light",
    unit: "lux",
    status: "inactive",
    lastReading: { value: 102, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 12,
    deviceId: 6,
    name: "Motion Sensor 3",
    type: "motion",
    unit: "boolean",
    status: "active",
    lastReading: { value: 1, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 13,
    deviceId: 7,
    name: "Temperature Sensor 4",
    type: "temperature",
    unit: "°C",
    status: "active",
    lastReading: { value: 25, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 14,
    deviceId: 7,
    name: "Humidity Sensor 4",
    type: "humidity",
    unit: "%",
    status: "active",
    lastReading: { value: 48, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 15,
    deviceId: 8,
    name: "Light Sensor 4",
    type: "light",
    unit: "lux",
    status: "inactive",
    lastReading: { value: 103, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 16,
    deviceId: 8,
    name: "Motion Sensor 4",
    type: "motion",
    unit: "boolean",
    status: "active",
    lastReading: { value: 0, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 17,
    deviceId: 9,
    name: "Temperature Sensor 5",
    type: "temperature",
    unit: "°C",
    status: "active",
    lastReading: { value: 26, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 18,
    deviceId: 9,
    name: "Humidity Sensor 5",
    type: "humidity",
    unit: "%",
    status: "active",
    lastReading: { value: 49, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 19,
    deviceId: 10,
    name: "Light Sensor 5",
    type: "light",
    unit: "lux",
    status: "inactive",
    lastReading: { value: 104, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 20,
    deviceId: 10,
    name: "Motion Sensor 5",
    type: "motion",
    unit: "boolean",
    status: "active",
    lastReading: { value: 1, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 21,
    deviceId: 11,
    name: "Temperature Sensor 6",
    type: "temperature",
    unit: "°C",
    status: "active",
    lastReading: { value: 27, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 22,
    deviceId: 11,
    name: "Humidity Sensor 6",
    type: "humidity",
    unit: "%",
    status: "active",
    lastReading: { value: 50, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 23,
    deviceId: 12,
    name: "Light Sensor 6",
    type: "light",
    unit: "lux",
    status: "inactive",
    lastReading: { value: 105, timestamp: "2023-01-01T12:00:00Z" },
  },
  {
    id: 24,
    deviceId: 12,
    name: "Motion Sensor 6",
    type: "motion",
    unit: "boolean",
    status: "active",
    lastReading: { value: 0, timestamp: "2023-01-01T12:00:00Z" },
  },
].map(sensor => ({
  ...sensor,
  type: ['active-power', 'people-counting', 'co2'][Math.floor(Math.random() * 3)] // Randomly assign types for demo
}));

export const leases: Lease[] = [
  {
    id: 1,
    tenant: "Acme Corp",
    startDate: "2023-01-01",
    endDate: "2024-12-31",
    zoneIds: [1, 2]
  },
  {
    id: 2,
    tenant: "TechSolutions Inc",
    startDate: "2023-03-15",
    endDate: "2024-03-14",
    zoneIds: [3]
  },
  {
    id: 3,
    tenant: "Global Services LLC",
    startDate: "2023-06-01",
    endDate: "2023-11-30",
    zoneIds: [4, 5]
  },
  {
    id: 4,
    tenant: "Innovate Design Studio",
    startDate: "2023-08-15",
    endDate: "2025-08-14",
    zoneIds: [6]
  },
  {
    id: 5,
    tenant: "Future Solutions",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    zoneIds: [7, 8]
  }
];

export const properties: Property[] = [
  {
    id: 1,
    name: "Floor Area",
    type: "number",
    value: "1200",
    entityType: "asset",
    entityId: 1
  },
  {
    id: 2,
    name: "Construction Year",
    type: "number",
    value: "2010",
    entityType: "asset",
    entityId: 2
  },
  {
    id: 3,
    name: "Occupancy Capacity",
    type: "number",
    value: "25",
    entityType: "zone",
    entityId: 1
  },
  {
    id: 4,
    name: "HVAC System",
    type: "string",
    value: "Central",
    entityType: "zone",
    entityId: 2
  },
  {
    id: 5,
    name: "IP Address",
    type: "string",
    value: "192.168.1.100",
    entityType: "device",
    entityId: 1
  },
  {
    id: 6,
    name: "Firmware Version",
    type: "string",
    value: "v2.3.5",
    entityType: "device",
    entityId: 2
  },
  {
    id: 7,
    name: "Calibration Date",
    type: "date",
    value: "2023-09-15",
    entityType: "sensor",
    entityId: 1
  },
  {
    id: 8,
    name: "Accuracy",
    type: "string",
    value: "±0.5%",
    entityType: "sensor",
    entityId: 2
  },
  {
    id: 9,
    name: "active-power threshold",
    type: "number",
    value: "1000",
    entityType: "sensor",
    entityId: 3
  },
  {
    id: 10,
    name: "people-counting max",
    type: "number",
    value: "50",
    entityType: "sensor",
    entityId: 4
  },
  {
    id: 11,
    name: "co2 warning level",
    type: "number",
    value: "1000",
    entityType: "sensor",
    entityId: 5
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
