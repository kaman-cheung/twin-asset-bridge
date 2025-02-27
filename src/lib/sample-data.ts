
import { Asset, Zone, Device, Sensor, Property, Lease } from './models';

// Sample Assets
export const assets: Asset[] = [
  { 
    id: 1, 
    name: "DTStest Building",
    type: "Office Building",
    location: "123 Main Street",
    status: "active",
    zones: [1, 2, 3]
  },
  { 
    id: 2, 
    name: "DTStest3 Complex",
    type: "Mixed-Use Development",
    location: "456 Tech Blvd",
    status: "active",
    zones: [4, 5, 6, 7]
  }
];

// Sample Zones
export const zones: Zone[] = [
  {
    id: 1,
    displayName: "DTStest F000 zone01-01",
    internalName: "dtstest3.DTStest3.F000.zone01-01",
    startDate: "15/08/2024",
    endDate: "16/03/2025",
    assetId: 1,
    devices: [1, 2]
  },
  {
    id: 2,
    displayName: "DTStest3 F000 zone01-02",
    internalName: "dtstest3.DTStest3.F000.zone01-02",
    startDate: "16/08/2024",
    endDate: "-",
    assetId: 1,
    devices: [3]
  },
  {
    id: 3,
    displayName: "DTS test3 F000",
    internalName: "dtstest3.DTStest3.F000",
    startDate: "16/08/2024",
    endDate: "-",
    assetId: 1,
    parentZoneId: 1,
    devices: [4]
  },
  {
    id: 4,
    displayName: "Floor_batchtest",
    internalName: "dtstest_edit.Building_batchtest.Floor_batchtest",
    startDate: "28/08/2024",
    endDate: "-",
    assetId: 2,
    devices: [5, 6]
  },
  {
    id: 5,
    displayName: "Space_batchtest",
    internalName: "dtstest_edit.Building_batchtest.Floor_batchtest.Space_batchtest",
    startDate: "28/08/2024",
    endDate: "-",
    assetId: 2,
    parentZoneId: 4,
    devices: [7]
  },
  {
    id: 6,
    displayName: "DTS test building A",
    internalName: "dtstest.buildingA",
    startDate: "22/08/2024",
    endDate: "22/10/2025",
    assetId: 2,
    devices: [8, 9]
  },
  {
    id: 7,
    displayName: "DTStest3 building",
    internalName: "dtstest3.DTStest3",
    startDate: "14/08/2024",
    endDate: "-",
    assetId: 2,
    devices: [10]
  },
  {
    id: 8,
    displayName: "Building1 F001 zone01",
    internalName: "DTStest.Building1.F001.zone01",
    startDate: "08/08/2024",
    endDate: "-",
    assetId: 1,
    devices: []
  },
  {
    id: 9,
    displayName: "DTStest F000 zon01",
    internalName: "DTStest.DTStest.F000.zon01",
    startDate: "08/08/2024",
    endDate: "-",
    assetId: 1,
    devices: []
  }
];

// Sample Devices
export const devices: Device[] = [
  {
    id: 1,
    name: "Temperature Control Unit 1",
    type: "HVAC",
    model: "TC-2000",
    status: "online",
    zoneId: 1,
    sensors: [1, 2, 3]
  },
  {
    id: 2,
    name: "Access Control System A",
    type: "Security",
    model: "SecureTech Pro",
    status: "online",
    zoneId: 1,
    sensors: [4]
  },
  {
    id: 3,
    name: "Lighting Controller 101",
    type: "Lighting",
    model: "SmartLight X3",
    status: "online",
    zoneId: 2,
    sensors: [5, 6]
  },
  {
    id: 4,
    name: "Air Quality Monitor",
    type: "Environmental",
    model: "AirSense 5",
    status: "online",
    zoneId: 3,
    sensors: [7, 8, 9]
  },
  {
    id: 5,
    name: "Energy Meter F1",
    type: "Power",
    model: "PowerTrack Pro",
    status: "online",
    zoneId: 4,
    sensors: [10, 11]
  },
  {
    id: 6,
    name: "Water Usage Monitor",
    type: "Utilities",
    model: "HydroSense",
    status: "offline",
    zoneId: 4,
    sensors: [12]
  },
  {
    id: 7,
    name: "Occupancy Tracker",
    type: "Occupancy",
    model: "PeopleCount X2",
    status: "online",
    zoneId: 5,
    sensors: [13, 14]
  },
  {
    id: 8,
    name: "Fire Detection System",
    type: "Safety",
    model: "FireGuard 3000",
    status: "online",
    zoneId: 6,
    sensors: [15, 16, 17]
  },
  {
    id: 9,
    name: "Elevator Monitor",
    type: "Transport",
    model: "LiftTrack",
    status: "online",
    zoneId: 6,
    sensors: [18]
  },
  {
    id: 10,
    name: "CCTV Camera System",
    type: "Security",
    model: "SecuView Pro",
    status: "error",
    zoneId: 7,
    sensors: [19, 20]
  }
];

// Sample Sensors
export const sensors: Sensor[] = [
  // Temperature Control Unit 1 Sensors
  {
    id: 1,
    name: "Zone Temperature",
    type: "Temperature",
    unit: "°C",
    status: "active",
    deviceId: 1,
    lastReading: { value: 22.5, timestamp: "2024-08-23T10:15:30Z" }
  },
  {
    id: 2,
    name: "Humidity Sensor",
    type: "Humidity",
    unit: "%",
    status: "active",
    deviceId: 1,
    lastReading: { value: 45, timestamp: "2024-08-23T10:15:30Z" }
  },
  {
    id: 3,
    name: "Air Flow",
    type: "Flow",
    unit: "m³/h",
    status: "active",
    deviceId: 1,
    lastReading: { value: 250, timestamp: "2024-08-23T10:15:30Z" }
  },
  
  // Access Control System Sensors
  {
    id: 4,
    name: "Door Status",
    type: "Binary",
    unit: "state",
    status: "active",
    deviceId: 2,
    lastReading: { value: 0, timestamp: "2024-08-23T10:20:15Z" }
  },
  
  // Lighting Controller Sensors
  {
    id: 5,
    name: "Light Level",
    type: "Illuminance",
    unit: "lux",
    status: "active",
    deviceId: 3,
    lastReading: { value: 450, timestamp: "2024-08-23T10:18:45Z" }
  },
  {
    id: 6,
    name: "Occupancy",
    type: "Binary",
    unit: "state",
    status: "active",
    deviceId: 3,
    lastReading: { value: 1, timestamp: "2024-08-23T10:18:45Z" }
  },
  
  // Air Quality Monitor Sensors
  {
    id: 7,
    name: "CO2 Level",
    type: "CO2",
    unit: "ppm",
    status: "active",
    deviceId: 4,
    lastReading: { value: 650, timestamp: "2024-08-23T10:22:10Z" }
  },
  {
    id: 8,
    name: "Particulate Matter",
    type: "PM2.5",
    unit: "µg/m³",
    status: "active",
    deviceId: 4,
    lastReading: { value: 12, timestamp: "2024-08-23T10:22:10Z" }
  },
  {
    id: 9,
    name: "VOC Level",
    type: "VOC",
    unit: "ppb",
    status: "active",
    deviceId: 4,
    lastReading: { value: 125, timestamp: "2024-08-23T10:22:10Z" }
  },
  
  // Additional sensors (abbreviated data)
  {
    id: 10,
    name: "Power Consumption",
    type: "Power",
    unit: "kW",
    status: "active",
    deviceId: 5,
    lastReading: { value: 4.2, timestamp: "2024-08-23T10:25:00Z" }
  },
  {
    id: 11,
    name: "Voltage",
    type: "Voltage",
    unit: "V",
    status: "active",
    deviceId: 5,
    lastReading: { value: 220, timestamp: "2024-08-23T10:25:00Z" }
  },
  {
    id: 12,
    name: "Water Flow",
    type: "Flow",
    unit: "L/min",
    status: "inactive",
    deviceId: 6
  },
  {
    id: 13,
    name: "People Count",
    type: "Count",
    unit: "people",
    status: "active",
    deviceId: 7,
    lastReading: { value: 12, timestamp: "2024-08-23T10:30:15Z" }
  },
  {
    id: 14,
    name: "Motion Detector",
    type: "Motion",
    unit: "state",
    status: "active",
    deviceId: 7,
    lastReading: { value: 1, timestamp: "2024-08-23T10:30:15Z" }
  },
  {
    id: 15,
    name: "Smoke Detector",
    type: "Smoke",
    unit: "state",
    status: "active",
    deviceId: 8,
    lastReading: { value: 0, timestamp: "2024-08-23T10:31:20Z" }
  },
  {
    id: 16,
    name: "Temperature",
    type: "Temperature",
    unit: "°C",
    status: "active",
    deviceId: 8,
    lastReading: { value: 24.1, timestamp: "2024-08-23T10:31:20Z" }
  },
  {
    id: 17,
    name: "Heat Detector",
    type: "Heat",
    unit: "state",
    status: "active",
    deviceId: 8,
    lastReading: { value: 0, timestamp: "2024-08-23T10:31:20Z" }
  },
  {
    id: 18,
    name: "Elevator Status",
    type: "Status",
    unit: "state",
    status: "active",
    deviceId: 9,
    lastReading: { value: 1, timestamp: "2024-08-23T10:33:45Z" }
  },
  {
    id: 19,
    name: "Camera 1",
    type: "Camera",
    unit: "state",
    status: "error",
    deviceId: 10
  },
  {
    id: 20,
    name: "Camera 2",
    type: "Camera",
    unit: "state",
    status: "active",
    deviceId: 10,
    lastReading: { value: 1, timestamp: "2024-08-23T10:35:10Z" }
  }
];

// Sample Properties
export const properties: Property[] = [
  {
    id: 1,
    name: "Building Area",
    type: "dimension",
    value: "5000 sqm",
    entityType: "asset",
    entityId: 1
  },
  {
    id: 2,
    name: "Construction Year",
    type: "year",
    value: "2015",
    entityType: "asset",
    entityId: 1
  },
  {
    id: 3,
    name: "Zone Type",
    type: "category",
    value: "Meeting Room",
    entityType: "zone",
    entityId: 1
  },
  {
    id: 4,
    name: "Maximum Occupancy",
    type: "limit",
    value: "25",
    entityType: "zone",
    entityId: 1
  },
  {
    id: 5,
    name: "Device IP",
    type: "network",
    value: "192.168.1.105",
    entityType: "device",
    entityId: 1
  },
  {
    id: 6,
    name: "Installation Date",
    type: "date",
    value: "2023-05-15",
    entityType: "device",
    entityId: 1
  },
  {
    id: 7,
    name: "Calibration Date",
    type: "date",
    value: "2024-01-10",
    entityType: "sensor",
    entityId: 1
  },
  {
    id: 8,
    name: "Sensor Range",
    type: "range",
    value: "-10°C to 50°C",
    entityType: "sensor",
    entityId: 1
  }
];

// Sample Leases
export const leases: Lease[] = [
  {
    id: 1,
    tenant: "Tech Innovators Inc.",
    startDate: "01/01/2024",
    endDate: "31/12/2025",
    zoneIds: [1, 2]
  },
  {
    id: 2,
    tenant: "Global Finance Group",
    startDate: "01/03/2024",
    endDate: "28/02/2026",
    zoneIds: [3]
  },
  {
    id: 3,
    tenant: "Creative Studios",
    startDate: "01/05/2024",
    endDate: "30/04/2025",
    zoneIds: [4, 5]
  },
  {
    id: 4,
    tenant: "Health Services",
    startDate: "01/07/2024",
    endDate: "30/06/2026",
    zoneIds: [6]
  },
  {
    id: 5,
    tenant: "Green Energy Solutions",
    startDate: "01/08/2024",
    endDate: "31/07/2025",
    zoneIds: [7]
  }
];

// Helper functions to get related entities
export const getZonesByAsset = (assetId: number): Zone[] => {
  return zones.filter(zone => zone.assetId === assetId);
};

export const getDevicesByZone = (zoneId: number): Device[] => {
  return devices.filter(device => device.zoneId === zoneId);
};

export const getSensorsByDevice = (deviceId: number): Sensor[] => {
  return sensors.filter(sensor => sensor.deviceId === deviceId);
};

export const getSensorsByZone = (zoneId: number): Sensor[] => {
  const zoneDevices = getDevicesByZone(zoneId);
  const zoneSensors: Sensor[] = [];
  
  zoneDevices.forEach(device => {
    const deviceSensors = getSensorsByDevice(device.id);
    zoneSensors.push(...deviceSensors);
  });
  
  return zoneSensors;
};

export const getAssetById = (id: number): Asset | undefined => {
  return assets.find(asset => asset.id === id);
};

export const getZoneById = (id: number): Zone | undefined => {
  return zones.find(zone => zone.id === id);
};

export const getDeviceById = (id: number): Device | undefined => {
  return devices.find(device => device.id === id);
};

export const getSensorById = (id: number): Sensor | undefined => {
  return sensors.find(sensor => sensor.id === id);
};

export const getPropertiesByEntity = (entityType: "asset" | "zone" | "device" | "sensor", entityId: number): Property[] => {
  return properties.filter(prop => prop.entityType === entityType && prop.entityId === entityId);
};

export const getLeasesByZone = (zoneId: number): Lease[] => {
  return leases.filter(lease => lease.zoneIds.includes(zoneId));
};
