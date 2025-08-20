import { useState } from "react";
import { SqlEditor } from "@/components/SqlEditor";
import { ResultsTable } from "@/components/ResultsTable";
import { DatabaseExplorer } from "@/components/DatabaseExplorer";
import { useToast } from "@/hooks/use-toast";

// Mock data generator
const generateMockData = (query: string) => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Simulate different types of queries
  if (normalizedQuery.includes("customers")) {
    return {
      columns: ["CustomerID", "CompanyName", "ContactName", "Country", "Phone"],
      data: [
        { CustomerID: "ALFKI", CompanyName: "Alfreds Futterkiste", ContactName: "Maria Anders", Country: "Germany", Phone: "030-0074321" },
        { CustomerID: "ANATR", CompanyName: "Ana Trujillo Emparedados", ContactName: "Ana Trujillo", Country: "Mexico", Phone: "(5) 555-4729" },
        { CustomerID: "ANTON", CompanyName: "Antonio Moreno Taquería", ContactName: "Antonio Moreno", Country: "Mexico", Phone: "(5) 555-3932" },
        { CustomerID: "AROUT", CompanyName: "Around the Horn", ContactName: "Thomas Hardy", Country: "UK", Phone: "(171) 555-7788" },
        { CustomerID: "BERGS", CompanyName: "Berglunds snabbköp", ContactName: "Christina Berglund", Country: "Sweden", Phone: "0921-12 34 65" },
      ]
    };
  }
  
  if (normalizedQuery.includes("orders")) {
    return {
      columns: ["OrderID", "CustomerID", "OrderDate", "ShipCountry", "Freight"],
      data: [
        { OrderID: 10248, CustomerID: "VINET", OrderDate: "1996-07-04", ShipCountry: "France", Freight: 32.38 },
        { OrderID: 10249, CustomerID: "TOMSP", OrderDate: "1996-07-05", ShipCountry: "Germany", Freight: 11.61 },
        { OrderID: 10250, CustomerID: "HANAR", OrderDate: "1996-07-08", ShipCountry: "Brazil", Freight: 65.83 },
        { OrderID: 10251, CustomerID: "VICTE", OrderDate: "1996-07-08", ShipCountry: "France", Freight: 41.34 },
        { OrderID: 10252, CustomerID: "SUPRD", OrderDate: "1996-07-09", ShipCountry: "Belgium", Freight: 51.30 },
      ]
    };
  }
  
  if (normalizedQuery.includes("products")) {
    return {
      columns: ["ProductID", "ProductName", "CategoryID", "UnitPrice", "UnitsInStock"],
      data: [
        { ProductID: 1, ProductName: "Chai", CategoryID: 1, UnitPrice: 18.00, UnitsInStock: 39 },
        { ProductID: 2, ProductName: "Chang", CategoryID: 1, UnitPrice: 19.00, UnitsInStock: 17 },
        { ProductID: 3, ProductName: "Aniseed Syrup", CategoryID: 2, UnitPrice: 10.00, UnitsInStock: 13 },
        { ProductID: 4, ProductName: "Chef Anton's Cajun Seasoning", CategoryID: 2, UnitPrice: 22.00, UnitsInStock: 53 },
        { ProductID: 5, ProductName: "Chef Anton's Gumbo Mix", CategoryID: 2, UnitPrice: 21.35, UnitsInStock: 0 },
      ]
    };
  }
  
  // Default response for other queries
  return {
    columns: ["ID", "Name", "Status", "Created"],
    data: [
      { ID: 1, Name: "Item 1", Status: "Active", Created: "2024-01-15" },
      { ID: 2, Name: "Item 2", Status: "Inactive", Created: "2024-01-16" },
      { ID: 3, Name: "Item 3", Status: "Active", Created: "2024-01-17" },
    ]
  };
};

export default function QueryManager() {
  const [results, setResults] = useState({ columns: [], data: [] });
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastQuery, setLastQuery] = useState("");
  const { toast } = useToast();

  const handleExecuteQuery = async (query: string) => {
    setIsExecuting(true);
    setLastQuery(query);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResults = generateMockData(query);
      setResults(mockResults);
      
      toast({
        title: "Consulta executada",
        description: `${mockResults.data.length} registros encontrados.`,
      });
    } catch (error) {
      toast({
        title: "Erro na consulta",
        description: "Erro ao executar a consulta SQL.",
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleTableSelect = (tableName: string) => {
    const query = `SELECT TOP 100 * FROM ${tableName};`;
    handleExecuteQuery(query);
  };

  return (
    <div className="flex-1 bg-background">
      <div className="h-full flex gap-6 p-6">
        <DatabaseExplorer onTableSelect={handleTableSelect} />
        
        <div className="flex-1 flex flex-col gap-6">
          <SqlEditor 
            onExecuteQuery={handleExecuteQuery}
            isExecuting={isExecuting}
          />
          
          <ResultsTable
            data={results.data}
            columns={results.columns}
            query={lastQuery}
            isLoading={isExecuting}
          />
        </div>
      </div>
    </div>
  );
}