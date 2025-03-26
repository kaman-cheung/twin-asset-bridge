
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AssetsHeaderProps {
  totalCount: number;
  selectedCount: number;
}

export function AssetsHeader({ totalCount, selectedCount }: AssetsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
      <div className="flex items-center gap-2">
        {selectedCount > 0 && (
          <span className="text-sm text-muted-foreground">
            {selectedCount} of {totalCount} selected
          </span>
        )}
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Asset
        </Button>
      </div>
    </div>
  );
}
