import { useState } from "react";
import { ChevronDown, Database, Search, Save, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface SapHeaderProps {
  onOpenQueries: () => void;
}

export function SapHeader({ onOpenQueries }: SapHeaderProps) {
  return (
    <header className="h-12 bg-sap-header text-sap-header-foreground shadow-header border-b border-sap-header/20">
      <div className="flex items-center h-full px-4">
        <div className="flex items-center gap-2 mr-8">
          <Database className="h-5 w-5" />
          <span className="font-semibold text-sm">SAP SQL Playground</span>
        </div>
        
        <nav className="flex items-center space-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-sap-header-foreground hover:bg-sap-header-foreground/10 h-8 px-3"
              >
                Ferramentas
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-card border-border shadow-card">
              <DropdownMenuItem className="cursor-pointer">
                <Search className="mr-2 h-4 w-4" />
                Pesquisar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <DropdownMenuItem className="cursor-pointer">
                    <Database className="mr-2 h-4 w-4" />
                    Consultas
                    <ChevronDown className="ml-auto h-3 w-3" />
                  </DropdownMenuItem>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 ml-2 bg-card border-border shadow-card">
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={onOpenQueries}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Gerenciar Consultas
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Save className="mr-2 h-4 w-4" />
                    Consultas Salvas
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}