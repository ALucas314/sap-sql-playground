import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Database, Table2, ChevronDown, ChevronRight, Eye } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Mock database schema
const mockSchema = {
  tables: [
    {
      name: "Customers",
      columns: [
        { name: "CustomerID", type: "int", nullable: false, primaryKey: true },
        { name: "CompanyName", type: "nvarchar(40)", nullable: false },
        { name: "ContactName", type: "nvarchar(30)", nullable: true },
        { name: "Country", type: "nvarchar(15)", nullable: true },
        { name: "Phone", type: "nvarchar(24)", nullable: true },
      ]
    },
    {
      name: "Orders",
      columns: [
        { name: "OrderID", type: "int", nullable: false, primaryKey: true },
        { name: "CustomerID", type: "int", nullable: true, foreignKey: "Customers.CustomerID" },
        { name: "OrderDate", type: "datetime", nullable: true },
        { name: "ShipCountry", type: "nvarchar(15)", nullable: true },
        { name: "Freight", type: "money", nullable: true },
      ]
    },
    {
      name: "Products",
      columns: [
        { name: "ProductID", type: "int", nullable: false, primaryKey: true },
        { name: "ProductName", type: "nvarchar(40)", nullable: false },
        { name: "CategoryID", type: "int", nullable: true },
        { name: "UnitPrice", type: "money", nullable: true },
        { name: "UnitsInStock", type: "smallint", nullable: true },
      ]
    },
    {
      name: "Order_Details",
      columns: [
        { name: "OrderID", type: "int", nullable: false, primaryKey: true },
        { name: "ProductID", type: "int", nullable: false, primaryKey: true },
        { name: "UnitPrice", type: "money", nullable: false },
        { name: "Quantity", type: "smallint", nullable: false },
        { name: "Discount", type: "real", nullable: false },
      ]
    }
  ]
};

interface DatabaseExplorerProps {
  onTableSelect: (tableName: string) => void;
}

export function DatabaseExplorer({ onTableSelect }: DatabaseExplorerProps) {
  const [expandedTables, setExpandedTables] = useState<string[]>([]);

  const toggleTable = (tableName: string) => {
    setExpandedTables(prev => 
      prev.includes(tableName) 
        ? prev.filter(name => name !== tableName)
        : [...prev, tableName]
    );
  };

  const handleViewTable = (tableName: string) => {
    onTableSelect(tableName);
  };

  return (
    <Card className="w-80 shadow-card">
      <CardHeader className="bg-sap-table-header border-b border-border">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Database className="h-5 w-5" />
          Explorador de Banco
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="p-4 space-y-2">
            {mockSchema.tables.map((table) => (
              <Collapsible
                key={table.name}
                open={expandedTables.includes(table.name)}
                onOpenChange={() => toggleTable(table.name)}
              >
                <div className="flex items-center justify-between group">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 justify-start hover:bg-accent"
                    >
                      {expandedTables.includes(table.name) ? (
                        <ChevronDown className="h-4 w-4 mr-2" />
                      ) : (
                        <ChevronRight className="h-4 w-4 mr-2" />
                      )}
                      <Table2 className="h-4 w-4 mr-2" />
                      {table.name}
                    </Button>
                  </CollapsibleTrigger>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewTable(table.name)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                
                <CollapsibleContent className="ml-4 mt-2">
                  <div className="space-y-1">
                    {table.columns.map((column) => (
                      <div
                        key={column.name}
                        className="flex items-center text-sm p-2 rounded bg-accent/50 hover:bg-accent"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{column.name}</span>
                            {column.primaryKey && (
                              <span className="text-xs bg-primary text-primary-foreground px-1 rounded">
                                PK
                              </span>
                            )}
                            {column.foreignKey && (
                              <span className="text-xs bg-secondary text-secondary-foreground px-1 rounded">
                                FK
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {column.type} {column.nullable ? "(null)" : "(not null)"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}