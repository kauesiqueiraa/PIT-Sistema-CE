# Sistema de Controle de Estoque

## Visão Geral
O Sistema de Controle de Estoque é uma aplicação web moderna desenvolvida utilizando Next.js, Tailwind CSS e a biblioteca de componentes shadcn/ui. O sistema oferece uma interface intuitiva para gerenciamento de inventário, permitindo visualização, adição e remoção de itens do estoque.

## Tecnologias Utilizadas
- **Next.js**: Framework React para desenvolvimento web
- **Tailwind CSS**: Framework de estilização utility-first
- **shadcn/ui**: Biblioteca de componentes reutilizáveis
- **React Hooks**: Para gerenciamento de estado (useState)
- **Lucide Icons**: Biblioteca de ícones
- **TypeScript**: Superset JavaScript para tipagem estática

## Funcionalidades Principais

### 1. Visualização do Estoque
- Tabela interativa com informações dos itens
- Colunas: Nome, Tipo, Quantidade, Preço e Ações
- Interface responsiva com suporte a scroll horizontal

### 2. Sistema de Filtros
- Busca por nome de item
- Filtro por tipo de produto
- Filtro por faixa de preço:
  - Até R$ 100
  - Até R$ 500
  - Até R$ 1000
  - Acima de R$ 1000

### 3. Gerenciamento de Itens
- **Adição de Novos Itens:**
  - Nome do item
  - Tipo
  - Quantidade
  - Preço
- **Remoção de Itens:**
  - Diálogo de confirmação para evitar exclusões acidentais

### 4. Interface Adaptativa
- Suporte a tema claro/escuro
- Layout responsivo
- Navegação por tabs
- Feedback visual nas interações

## Estrutura de Dados

### Item do Inventário (InventoryItem)
```typescript
{
    id: number;
    name: string;
    type: string;
    quantity: number;
    price: number;
}
```

### Filtros (Filters)
```typescript
{
    type: string;
    search: string;
    priceRange: string;
}
```

### Novo Item (NewItem)
```typescript
{
    name: string;
    type: string;
    quantity: string;
    price: string;
}
```

## Componentes Principais

### 1. InventorySystem
- Componente principal que gerencia todo o estado da aplicação
- Implementa a lógica de filtragem e manipulação do inventário

### 2. Tabs de Navegação
- "Ver Estoque": Exibe a lista de itens atual
- "Adicionar Item": Formulário para inclusão de novos itens

### 3. Card de Filtros
- Barra de busca com ícone
- Seletor de tipo de produto
- Seletor de faixa de preço

### 4. Tabela de Inventário
- Exibição dos itens filtrados
- Botão de exclusão com confirmação
- Formatação de valores monetários

## Segurança e Validação
- Confirmação antes de excluir itens
- Validação de campos obrigatórios no formulário
- Valores mínimos definidos para quantidade e preço

## Possíveis Melhorias Futuras
1. Implementação de persistência de dados
2. Sistema de autenticação
3. Histórico de alterações
4. Exportação de relatórios
5. Edição de itens existentes
6. Categorias personalizáveis
7. Alertas de estoque baixo

## Como Executar o Projeto
1. Certifique-se de ter Node.js instalado
2. Instale as dependências: `npm install`
3. Execute o projeto: `npm run dev`
4. Acesse: `http://localhost:3000`

## Requisitos do Sistema
- Node.js
- Navegador web moderno
- Conexão com internet (para carregamento de CDN)