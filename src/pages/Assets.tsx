
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { assets } from "@/lib/sample-data";
import { AssetsTable } from "@/components/assets/AssetsTable";
import { AssetsHeader } from "@/components/assets/AssetsHeader";
import { AssetsSearch } from "@/components/assets/AssetsSearch";
import { Home } from "lucide-react";

const Assets = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter assets based on search query
  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectAll = () => {
    if (selectedRows.length === filteredAssets.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredAssets.map(asset => asset.id));
    }
  };
  
  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  
  const handleSelectAsset = (id: number) => {
    console.log(`Selected asset: ${id}`);
    // Here you would navigate to the asset details page or show a modal
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Home className="h-4 w-4" />
          <span>Assets</span>
        </div>
        
        <AssetsHeader 
          totalCount={filteredAssets.length}
          selectedCount={selectedRows.length}
        />
        
        <AssetsSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <AssetsTable
          assets={filteredAssets}
          selectedRows={selectedRows}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          onSelectAsset={handleSelectAsset}
        />
      </div>
    </Layout>
  );
};

export default Assets;
