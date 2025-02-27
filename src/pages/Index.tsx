
import { Card } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Building, Home, Upload, Database, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const dimensions = [
  { title: "Assets", count: 24, icon: Building, path: "/assets" },
  { title: "Zones", count: 10, icon: Map, path: "/zones" },
  { title: "Devices", count: 36, icon: Database, path: "/devices" },
  { title: "Sensors", count: 52, icon: Database, path: "/sensors" },
  { title: "Properties", count: 18, icon: Building, path: "/properties" },
  { title: "Leases", count: 5, icon: Upload, path: "/leases" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Home className="h-4 w-4" />
          <span>Home</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of your digital twin system
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dimensions.map((dim) => (
            <Card
              key={dim.title}
              className="p-6 hover:shadow-lg transition-shadow animate-slideIn cursor-pointer"
              onClick={() => navigate(dim.path)}
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <dim.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{dim.title}</h3>
                  <p className="text-2xl font-bold">{dim.count}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Button
              variant="outline"
              className="p-4 h-auto text-left justify-start"
              onClick={() => {/* TODO: Implement upload */}}
            >
              <Upload className="w-5 h-5 mr-3" />
              <div>
                <h3 className="font-medium">Upload Data</h3>
                <p className="text-sm text-muted-foreground">
                  Import data via Excel or CSV
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="p-4 h-auto text-left justify-start"
              onClick={() => {/* TODO: Implement manual entry */}}
            >
              <Database className="w-5 h-5 mr-3" />
              <div>
                <h3 className="font-medium">Manual Entry</h3>
                <p className="text-sm text-muted-foreground">
                  Add or edit data manually
                </p>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
