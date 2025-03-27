
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search, X } from "lucide-react";

interface ZonesSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function ZonesSearch({ searchTerm, setSearchTerm }: ZonesSearchProps) {
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="flex justify-between space-x-4">
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8"
          placeholder="Search..."
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-7 w-7 p-0"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
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
