import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Copy, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';

interface ResultRow {
  [key: string]: any;
}

interface ResultsTableProps {
  data: ResultRow[];
  columns: string[];
  query: string;
  isLoading?: boolean;
}

export function ResultsTable({ data, columns, query, isLoading = false }: ResultsTableProps) {
  const { toast } = useToast();

  const handleCopyToExcel = () => {
    if (data.length === 0) return;

    // Cria formato TSV (Tab Separated Values) que o Excel reconhece
    const headers = columns.join('\t');
    const rows = data.map(row => 
      columns.map(col => row[col] || '').join('\t')
    ).join('\n');
    
    const tsvContent = headers + '\n' + rows;
    
    navigator.clipboard.writeText(tsvContent).then(() => {
      toast({
        title: "Copiado para área de transferência",
        description: "Dados copiados em formato Excel. Cole no Excel ou Google Sheets.",
      });
    });
  };

  const handleExportExcel = () => {
    if (data.length === 0) return;

    try {
      // Cria uma nova planilha
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      
      // Adiciona a planilha ao workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Resultados");
      
      // Gera o nome do arquivo com timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      const filename = `consulta_sql_${timestamp}.xlsx`;
      
      // Salva o arquivo
      XLSX.writeFile(workbook, filename);
      
      toast({
        title: "Excel exportado com sucesso",
        description: `Arquivo ${filename} baixado com ${data.length} registros.`,
      });
    } catch (error) {
      toast({
        title: "Erro ao exportar",
        description: "Não foi possível exportar o arquivo Excel.",
        variant: "destructive",
      });
    }
  };

  const getExecutionSummary = () => {
    if (isLoading) return "Executando consulta...";
    if (data.length === 0) return "Nenhum resultado encontrado";
    return `${data.length} registro${data.length !== 1 ? 's' : ''} encontrado${data.length !== 1 ? 's' : ''}`;
  };

  return (
    <Card className="flex-1 shadow-card">
      <CardHeader className="bg-sap-table-header border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Resultados da Consulta
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {getExecutionSummary()}
            </span>
            
            {data.length > 0 && (
              <>
                <Button
                  onClick={handleCopyToExcel}
                  variant="outline"
                  size="sm"
                  className="border-border hover:bg-accent"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar para Excel
                </Button>
                
                <Button
                  onClick={handleExportExcel}
                  variant="outline"
                  size="sm"
                  className="border-border hover:bg-accent"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Excel
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Execute uma consulta para ver os resultados</p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader className="bg-sap-table-header">
                <TableRow className="border-b border-border">
                  {columns.map((column) => (
                    <TableHead key={column} className="font-semibold text-foreground">
                      {column}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow 
                    key={index}
                    className={index % 2 === 0 ? 'bg-sap-table-row-even' : 'bg-sap-table-row-odd'}
                  >
                    {columns.map((column) => (
                      <TableCell key={column} className="text-sm">
                        {row[column] || '-'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}