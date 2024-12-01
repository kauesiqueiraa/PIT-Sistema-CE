'use client'

import React, { useState } from "react";
import { Moon, Package, PlusCircle, Search, Sun, Trash2 } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { InventoryItem, Filters, NewItem } from '@/types';
  import { useTheme } from "next-themes";
import Footer from "./footer";

const InventorySystem: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('inventory');
    const [inventory, setInventory] = useState<InventoryItem[]>([
        { id: 1, name: 'Notebook Dell', type: 'Eletrônicos', quantity: 5, price: 4500.00 },
        { id: 2, name: 'Mesa de Escritório', type: 'Móveis', quantity: 3, price: 800.00 },
        { id: 3, name: 'Mouse Wireless', type: 'Acessórios', quantity: 15, price: 120.00 },
    ]);

    const { setTheme, theme } = useTheme();

    const [filters, setFilters] = useState<Filters>({
        type: 'all',
        search: '',
        priceRange: 'all',
    });

    const [newItem, setNewItem] = useState<NewItem>({
        name: '',
        type: '',
        quantity: '',
        price: '',
    });

    const productTypes = Array.from(new Set(inventory.map(item => item.type)));
    
    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.name || !newItem.type || !newItem.quantity || !newItem.price) return;

        const newInventoryItem: InventoryItem = {
            id: inventory.length + 1,
            name: newItem.name,
            type: newItem.type,
            quantity: parseInt(newItem.quantity),
            price: parseFloat(newItem.price),
        };

        setInventory(prev => [...prev, newInventoryItem]);
        setNewItem({ name: '', type: '', quantity: '', price: '' });
        setActiveTab("inventory");
    };

    const handleDeleteItem = (id: number) => {
        setInventory(prev => prev.filter(item => item.id !== id));
    }

    //  funcão para buscar os dados do inventário
    const filteredItems = inventory.filter(item => {
        const matchesType = filters.type === 'all' || item.type === filters.type;
        const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase());
        const matchesPriceRange = (() => {
          switch (filters.priceRange) {
            case 'under100': return item.price < 100;
            case 'under500': return item.price < 500;
            case 'under1000': return item.price < 1000;
            case 'over1000': return item.price >= 1000;
            default: return true;
          }
        })();
    
        return matchesType && matchesSearch && matchesPriceRange;
      });

      return (
        <div className="container mx-auto p-4">
          <Card className="mb-6">
            <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Package className="h-6 w-6" />
                    Sistema de Controle de Estoque
                </CardTitle>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
            </CardHeader>
          </Card>
          {/* Tabs de navegação para mostrar diferentes seções do sistema (cadastro e lista de itens) */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="inventory">Ver Estoque</TabsTrigger>
              <TabsTrigger value="add">Adicionar Item</TabsTrigger>
            </TabsList>
    
            <TabsContent value="inventory">
              <Card>
                <CardHeader>
                  <CardTitle>Estoque Atual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar item..."
                          className="pl-8"
                          value={filters.search}
                          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                      </div>
                    </div>
                    {/* Filtro de tipo de produto */}
                    <Select
                      value={filters.type}
                      onValueChange={(value) => setFilters({ ...filters, type: value })}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os tipos</SelectItem>
                        {productTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* Filtro de faixa de preço */}
                    <Select
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Faixa de Preço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas os preços</SelectItem>
                        <SelectItem value="under100">Até R$ 100</SelectItem>
                        <SelectItem value="under500">Até R$ 500</SelectItem>
                        <SelectItem value="under1000">Até R$ 1000</SelectItem>
                        <SelectItem value="over1000">Acima de R$ 1000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
    
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      {/* Cabeçalho da tabela */}
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Nome</th>
                          <th className="text-left p-2">Tipo</th>
                          <th className="text-left p-2">Quantidade</th>
                          <th className="text-left p-2">Preço</th>
                          <th className="text-left p-2">Ações</th>
                        </tr>
                      </thead>
                      {/* Exibição dos itens filtrados */}
                      <tbody>
                        {filteredItems.map(item => (
                            <tr key={item.id} className="border-b hover:bg-blue-600/80">
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">{item.type}</td>
                                <td className="p-2">{item.quantity}</td>
                                <td className="p-2">R$ {item.price.toFixed(2)}</td>
                                <td className="p-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tem certeza que deseja excluir o item &quot;{item.name}&quot;?
                                                    Esta ação não pode ser desfeita.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDeleteItem(item.id)}
                                                >
                                                    Excluir
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
    
            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5" />
                    Adicionar Novo Item
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddItem} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nome do Item</label>
                      <Input
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        placeholder="Digite o nome do item"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tipo</label>
                      <Input
                        value={newItem.type}
                        onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                        placeholder="Digite o tipo do item"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Quantidade</label>
                      <Input
                        type="number"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                        placeholder="Digite a quantidade"
                        required
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Preço (R$)</label>
                      <Input
                        type="number"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        placeholder="Digite o preço"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Adicionar Item
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

         <Footer />
        </div>
      );
    };

export default InventorySystem;