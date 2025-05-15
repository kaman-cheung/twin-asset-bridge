
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Asset, Zone, Device, Sensor, Property, Lease, Procedure } from "@/lib/models"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to filter assets by selected asset IDs
export function filterBySelectedAssetIds(
  selectedAssetIds: string[],
  assets: Asset[]
): Asset[] {
  if (selectedAssetIds.includes("all")) {
    return assets;
  }
  return assets.filter(a => selectedAssetIds.includes(a.id.toString()));
}

// Helper function to get child entities based on filtered assets
export function getFilteredEntities(
  selectedAssetIds: string[],
  assets: Asset[],
  zones: Zone[],
  devices: Device[],
  sensors: Sensor[],
  properties: Property[],
  leases: Lease[],
  procedures: Procedure[]
) {
  const filteredAssets = filterBySelectedAssetIds(selectedAssetIds, assets);
  const assetIds = filteredAssets.map(a => a.id);
  
  const filteredZones = zones.filter(z => assetIds.includes(z.assetId));
  const zoneIds = filteredZones.map(z => z.id);
  
  const filteredDevices = devices.filter(d => zoneIds.includes(d.zoneId));
  const deviceIds = filteredDevices.map(d => d.id);
  
  const filteredSensors = sensors.filter(s => deviceIds.includes(s.deviceId));
  
  const filteredProcedures = procedures.filter(p => assetIds.includes(p.asset));
  
  const filteredProperties = properties.filter(p => 
    (p.entityType === "asset" && assetIds.includes(p.entityId)) ||
    (p.entityType === "zone" && zoneIds.includes(p.entityId)) ||
    (p.entityType === "device" && deviceIds.includes(p.entityId)) ||
    (p.entityType === "sensor" && filteredSensors.map(s => s.id).includes(p.entityId))
  );
  
  const filteredLeases = leases.filter(l => 
    l.zoneIds.some(zId => zoneIds.includes(zId))
  );
  
  return {
    assets: filteredAssets,
    zones: filteredZones,
    devices: filteredDevices,
    sensors: filteredSensors,
    properties: filteredProperties,
    leases: filteredLeases,
    procedures: filteredProcedures
  };
}

// Helper function to get child zones for a given parent zone
export function getChildZones(zones: Zone[], parentId: number) {
  return zones.filter(z => {
    // Check both parent_zones array and parentZoneId (if they exist)
    const hasParentZones = z.parent_zones && z.parent_zones.includes(parentId);
    return hasParentZones;
  });
}
