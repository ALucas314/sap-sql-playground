import { useState } from "react";
import { SapHeader } from "@/components/SapHeader";
import QueryManager from "./QueryManager";

const Index = () => {
  const [currentView, setCurrentView] = useState<"home" | "queries">("home");

  const handleOpenQueries = () => {
    setCurrentView("queries");
  };

  if (currentView === "queries") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SapHeader onOpenQueries={handleOpenQueries} />
        <QueryManager />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SapHeader onOpenQueries={handleOpenQueries} />
      
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <div className="w-24 h-24 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 shadow-button">
              <span className="text-3xl font-bold text-primary-foreground">SQL</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              SAP SQL Playground
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Interface para treinar consultas SQL inspirada no SAP Business One
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-card border border-border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Bem-vindo ao ambiente de consultas
            </h2>
            <p className="text-muted-foreground mb-6">
              Use o menu <strong>Ferramentas → Consultas → Gerenciar Consultas</strong> para começar a praticar suas consultas SQL.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="p-4 bg-accent/50 rounded-lg">
                <h3 className="font-semibold mb-2 text-accent-foreground">✨ Recursos disponíveis:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Editor SQL com sintaxe destacada</li>
                  <li>• Explorador de banco de dados</li>
                  <li>• Resultados em tabela interativa</li>
                  <li>• Export para Excel</li>
                </ul>
              </div>
              
              <div className="p-4 bg-accent/50 rounded-lg">
                <h3 className="font-semibold mb-2 text-accent-foreground">🎯 Funcionalidades:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Salvar consultas favoritas</li>
                  <li>• Visualizar estrutura das tabelas</li>
                  <li>• Copiar resultados</li>
                  <li>• Interface SAP-like familiar</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
