# 📑 Fatec Atibaia - Projeto Interdisciplinar 4ºSemestre - Sistema de Gestão de Relatórios de Estágio

Projeto desenvolvido para a disciplina de Projeto Integrador (PI) do 4º Semestre. O sistema visa automatizar o envio e a gestão de relatórios semanais/mensais de atividades de estágio, utilizando uma arquitetura moderna e escalável.

---

## 🏗️ Estrutura do Projeto (Monorepo)

O repositório está organizado em duas frentes principais:

- **`/backend`**: API REST desenvolvida com Node.js, Express e TypeScript. Utiliza persistência com **MongoDB Atlas** (documentos flexíveis para relatórios) e **SQL Server via Prisma ORM** (dados relacionais para usuários e perfis).
- **`/frontend`**: Interface SPA (Single Page Application) desenvolvida com React, Vite, TypeScript, **Material UI** e **Axios**.
---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos

Certifique-se de ter o Node.js instalado em sua máquina.

### 2. Configuração do Back-end

1. No terminal, entre na pasta do servidor:
   cd backend
2. Instale as dependências:
   npm install
3. Variáveis de Ambiente: Crie um arquivo .env na raiz da pasta /backend baseado no .env.example e insira sua string de conexão do MongoDB Atlas (MONGO_URI).
4. Inicie o servidor em modo de desenvolvimento:
   npm run dev
   (O servidor rodará por padrão em: http://localhost:3000)

---

### 3. Configuração do Front-end

1. Em um novo terminal, a partir da raiz do projeto, entre na pasta da interface:
   cd frontend
2. Instale as dependências:
   npm install
3. Inicie o ambiente de desenvolvimento:
   npm run dev
   (O front-end rodará por padrão em: http://localhost:5173)

---

## 🛠️ Tecnologias e Bibliotecas Utilizadas

| Camada         | Tecnologias Principais                                                                 |
| :------------- | :------------------------------------------------------------------------------------- |
| **Back-end**   | Node.js, TypeScript, Express, Prisma ORM (SQL Server), Mongoose (MongoDB), JWT, bcrypt |
| **Front-end**  | React (Vite), TypeScript, Material UI, Axios, React Hook Form, Zod                     |
| **Arquitetura**| Monorepo, Arquitetura Modular, Persistência Poliglota, API RESTful                     |

---

## 🏗️ Novas Implementações Técnicas
### **1. Gestão de Perfil de Usuário**
* **Visualização Centralizada:** Busca de dados de perfis específicos (Estagiário/Empresa) utilizando relações aninhadas no Prisma.
* **Edição com Segurança:** Atualização de dados cadastrais com bloqueio de edição em campos sensíveis (E-mail, CPF e CNPJ) para garantir a consistência do sistema.
* **Layout Padronizado:** Interface de usuário vertical e retangular, seguindo o padrão visual dos formulários de registro de atividade para uma experiência coesa (UX).

### **2. Tratamento e Sanitização de Dados**
* **Máscaras no Front-end:** Implementação de formatação em tempo real para CPF, CNPJ e Telefone.
* **Limpeza no Back-end:** Uso de Regex para remover caracteres especiais antes da persistência no SQL Server, evitando erros de tipo e tamanho de campo.

### **3. Segurança (Middleware)**
* **authMiddleware:** Proteção de rotas privadas e validação de sessão ativa no lado do servidor.

---
- **Segurança:** Implementação de hashing de senhas utilizando a biblioteca bcrypt para garantir a proteção dos dados sensíveis dos usuários.
- **Arquitetura de Módulos:** Migração da estrutura MVC global para uma organização baseada em módulos independentes (relatorio, usuario), facilitando a escalabilidade e manutenção.
- **Persistência Poliglota:** Estruturação do sistema para suportar múltiplos bancos de dados simultâneos:
  - **MongoDB:** Armazenamento de documentos flexíveis (Relatórios de Estágio).
  - **SQL Server:** Gestão de usuários e perfis de acesso através do Prisma ORM.
- **CSS Grid:** Migração do sistema de Grid legando para a nova sintaxe de `size` do Material UI v6, eliminando inconsistências de layout.
- **Simetria de Dashboard:** Lógica de quebra de colunas (4 -> 2 -> 1) para evitar "cards órfãos" em resoluções intermediárias.

---

## 🚀 O que já foi implementado

### ⚙️ Back-end (Node.js & TypeScript)

- [x] **Arquitetura MVC & Modular:** Organização do código por domínios de negócio.
- [x] **Módulo de Relatórios:** CRUD Completo integrado ao MongoDB Atlas.
- [x] **Migração do núcleo para SQL Server via Prisma:** Repositório de usuários e perfis migrado para base relacional.
- [x] **Integração Legada (C# & SQL):** Conexão com a base de dados existente para sincronização de cadastros.

### 💻 Front-end (React & Material UI)

- [x] **Setup Inicial:** Configuração do projeto utilizando Vite e React.
- [x] **Tema Global (Material UI):** Criação de um tema customizado com as cores oficiais da instituição (`fatec.main`).
- [x] **Layout & Navegação:** Desenvolvimento de uma `Navbar` responsiva (com menu hambúrguer lateral) e um container principal de layout flexível.
- [x] **Telas de Autenticação:** Implementação da tela de **Cadastro** com renderização condicional.
- [x] **Componentização:** Refatoração de formulários em subcomponentes e criação de inputs customizados reutilizáveis (ex: `CampoSenha`).
- [x] **UX e Validação Dinâmica:** Implementação de checklist visual de força de senha em tempo real (Regex) e validação de confirmação de senhas com gatilhos de foco.
- [x] **Arquitetura de Layout:** Implementação de `DashboardLayout` com *Mini Variant Drawer* (sidebar retrátil) e persistência de estado.
- [x] **Componentização:**
  - `Header`: Barra superior com menu de usuário, avatar e ações de perfil/logout.
  - `CardMetrica`: Cards de indicadores (KPIs) com suporte a tendências e ícones dinâmicos.
- [x] **Responsividade:** Uso de **CSS Grid** com `minmax` e `auto-fit` para garantir que o dashboard se adapte, mantendo a simetria visual.
- [x] **Perfil do Usuário:** Implementação do fluxo completo de visualização/edição de perfil.

---

## 🗺️ Próximos Passos (Roadmap)

- [ ] **Lógica de Dados:** Integrar `React Hook Form` e `Zod` no formulário de "Nova Atividade".
- [ ] **Painel do Supervisor:** Interface para visualização, aprovação ou devolução (com observações) de relatórios pendentes.
- [ ] **Geração de PDF:** Implementação de exportação dos relatórios aprovados para formato PDF pronto para assinatura.

---

_Desenvolvido como parte do currículo de Desenvolvimento de Software Multiplataforma na Fatec Atibaia._
