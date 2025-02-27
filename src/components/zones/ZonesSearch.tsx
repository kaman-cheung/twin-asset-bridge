
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter } from "lucide-react";

interface ZonesSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function ZonesSearch({ searchTerm, setSearchTerm }: ZonesSearchProps) {
  return (
    <div className="flex justify-between space-x-4">
      <div className="flex-1 max-w-md relative">
        <Input 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
          placeholder="Search..."
        />
      </div>
      <div className="flex space-x-2">
        <Button variant="outline">
          <Filter className="mr-1 h-4 w-4" />
          Filters
        </Button>
        <Button variant="outline">
          <Download className="mr-1 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
