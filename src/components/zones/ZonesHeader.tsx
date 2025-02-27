
import { Button } from "@/components/ui/button";
import { Home, Plus } from "lucide-react";

interface ZonesHeaderProps {
  count: number;
}

export function ZonesHeader({ count }: ZonesHeaderProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Home className="h-4 w-4" />
        <span>Home</span>
        <span>/</span>
        <span className="font-medium text-foreground">Zones</span>
      </div>
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Zones</h1>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <span>record count: {count}</span>
          </div>
          <p className="text-muted-foreground mt-1">List of zones with their associated devices and sensors.</p>
        </div>
        <Button>
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>
    </>
  );
}
