import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Save, Trash2, Database, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SqlEditorProps {
  onExecuteQuery: (query: string) => void;
  isExecuting?: boolean;
}

export function SqlEditor({ onExecuteQuery, isExecuting = false }: SqlEditorProps) {
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const handleExecute = () => {
    if (!query.trim()) {
      toast({
        title: "Consulta vazia",
        description: "Digite uma consulta SQL para executar.",
        variant: "destructive",
      });
      return;
    }
    onExecuteQuery(query);
  };

  const handleSave = () => {
    if (!query.trim()) {
      toast({
        title: "Consulta vazia",
        description: "Digite uma consulta SQL para salvar.",
        variant: "destructive",
      });
      return;
    }

    // Simula salvamento
    const savedQueries = JSON.parse(localStorage.getItem("savedQueries") || "[]");
    const newQuery = {
      id: Date.now(),
      query: query.trim(),
      name: `Consulta ${savedQueries.length + 1}`,
      createdAt: new Date().toISOString(),
    };
    
    savedQueries.push(newQuery);
    localStorage.setItem("savedQueries", JSON.stringify(savedQueries));
    
    toast({
      title: "Consulta salva",
      description: "Sua consulta foi salva com sucesso.",
    });
  };

  const handleClear = () => {
    setQuery("");
    toast({
      title: "Tela limpa",
      description: "Editor SQL foi limpo.",
    });
  };

  const insertSampleQuery = () => {
    const sample = `SELECT 
    c.CustomerID,
    c.CompanyName,
    c.ContactName,
    c.Country,
    COUNT(o.OrderID) as TotalOrders
FROM Customers c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
WHERE c.Country IN ('Germany', 'France', 'UK')
GROUP BY c.CustomerID, c.CompanyName, c.ContactName, c.Country
ORDER BY TotalOrders DESC;`;
    
    setQuery(sample);
  };

  return (
    <Card className="flex-1 shadow-card">
      <CardHeader className="bg-sap-table-header border-b border-border">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Database className="h-5 w-5" />
          Editor de Consultas SQL
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Button
              onClick={handleExecute}
              disabled={isExecuting}
              className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-button"
            >
              <Play className="mr-2 h-4 w-4" />
              {isExecuting ? "Executando..." : "Executar Consulta"}
            </Button>
            
            <Button
              onClick={handleSave}
              variant="outline"
              className="border-border hover:bg-accent"
            >
              <Save className="mr-2 h-4 w-4" />
              Salvar Consulta
            </Button>
            
            <Button
              onClick={handleClear}
              variant="outline"
              className="border-border hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Limpar Tela
            </Button>

            <Button
              onClick={insertSampleQuery}
              variant="outline"
              className="border-border hover:bg-accent"
            >
              <Copy className="mr-2 h-4 w-4" />
              Exemplo
            </Button>
          </div>

          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite sua consulta SQL aqui...

Exemplo:
SELECT * FROM Customers 
WHERE Country = 'Germany' 
ORDER BY CompanyName;"
            className="min-h-[300px] font-mono text-sm bg-card border-border focus:ring-primary resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}