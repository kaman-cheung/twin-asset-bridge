
import { Button } from "@/components/ui/button";
import { EntityRelationship } from "@/components/EntityRelationship";
import { ChevronDown } from "lucide-react";
import { Zone } from "@/lib/models";

interface ZoneDetailsProps {
  zone: Zone | null;
  show: boolean;
  onClose: () => void;
}

export function ZoneDetails({ zone, show, onClose }: ZoneDetailsProps) {
  if (!zone) {
    return (
      <div className="border rounded-md p-8 text-center bg-muted/20">
        <p className="text-muted-foreground">Select a zone to view its details and relationships</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between md:hidden">
        <h3 className="font-semibold">Zone Details</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <EntityRelationship entity={zone} entityType="zone" />
    </div>
  );
}
