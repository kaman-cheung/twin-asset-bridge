
import { Card } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Building, Home, Upload, Database } from "lucide-react";

const dimensions = [
  { title: "Assets", count: 0, icon: Building },
  { title: "Zones", count: 0, icon: Home },
  { title: "Devices", count: 0, icon: Database },
  { title: "Sensors", count: 0, icon: Database },
  { title: "Properties", count: 0, icon: Building },
  { title: "Leases", count: 0, icon: Upload },
];

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fadeIn">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of your digital twin system
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dimensions.map((dim) => (
            <Card
              key={dim.title}
              className="p-6 hover:shadow-lg transition-shadow animate-slideIn"
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
            <button
              className="p-4 text-left border rounded-lg hover:bg-accent transition-colors"
              onClick={() => {/* TODO: Implement upload */}}
            >
              <Upload className="w-5 h-5 mb-2" />
              <h3 className="font-medium">Upload Data</h3>
              <p className="text-sm text-muted-foreground">
                Import data via Excel or CSV
              </p>
            </button>
            <button
              className="p-4 text-left border rounded-lg hover:bg-accent transition-colors"
              onClick={() => {/* TODO: Implement manual entry */}}
            >
              <Database className="w-5 h-5 mb-2" />
              <h3 className="font-medium">Manual Entry</h3>
              <p className="text-sm text-muted-foreground">
                Add or edit data manually
              </p>
            </button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
