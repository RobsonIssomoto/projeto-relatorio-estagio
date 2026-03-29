# 📑 Fatec Atibaia - Projeto Interdisciplinar 4ºSemestre - Sistema de Gestão de Relatórios de Estágio

Projeto desenvolvido para a disciplina de Projeto Integrador (PI) do 4º Semestre. O sistema visa automatizar o envio e a gestão de relatórios semanais/mensais de atividades de estágio, utilizando uma arquitetura moderna e escalável.

---

## 🏗️ Estrutura do Projeto (Monorepo)

O repositório está organizado em duas frentes principais:

- /backend: API REST desenvolvida com Node.js, TypeScript e persistência no MongoDB Atlas. Segue padrões de POO (Singleton) e MVC.
- /frontend: Interface SPA (Single Page Application) desenvolvida com React, Vite, TypeScript e Material UI.

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

| Camada      | Tecnologias Principais                                            |
| :---------- | :---------------------------------------------------------------- |
| Back-end    | Node.js, TypeScript, Express, Mongoose (MongoDB), BCrypt          |
| Front-end   | React (Vite), Material UI (MUI), Axios, React Hook Form, Zod      |
| Arquitetura | Monorepo, Module-Based Architecture, Singleton, In-Memory Mocking |

---

🏗️ Novas Implementações Técnicas
Segurança: Implementação de hashing de senhas utilizando a biblioteca bcrypt para garantir a proteção dos dados sensíveis dos usuários.

Arquitetura de Módulos: Migração da estrutura MVC global para uma organização baseada em módulos independentes (relatorio, usuario), facilitando a escalabilidade e manutenção.

Persistência Poliglota: Estruturação do sistema para suportar múltiplos bancos de dados:

MongoDB: Armazenamento de documentos flexíveis (Relatórios de Estágio).

SQL Server (Em breve): Gestão de usuários e perfis de acesso (RBAC).

---

## 🔗 Próximos Passos e Roadmap

Roadmap de Desenvolvimento

## 🚀 O que já foi implementado

### ⚙️ Back-end (Node.js & TypeScript)

- [x] **Arquitetura MVC:** Separação clara de responsabilidades entre `Routes`, `Controllers` e `Services`.
- [x] **Módulo de Relatórios:** Rotas `POST` e `GET` integradas com o **MongoDB Atlas** usando Mongoose.
- [x] **Módulo de Usuários:** Rotas `POST` e `GET` com persistência em memória e regras de negócio para criação de perfis.
- [x] **Segurança:** Implementação de criptografia de senhas usando a biblioteca `bcrypt`.

### 💻 Front-end (React & Material UI)

- [x] **Setup Inicial:** Configuração do projeto utilizando Vite e React.
- [x] **Tema Global (Material UI):** Criação de um tema customizado com as cores oficias da instituição (`fatec.main`).
- [x] **Layout & Navegação:** Desenvolvimento de uma `Navbar` responsiva (com menu hamburguer lateral) e um container principal de layout flexível.
- [x] **Telas de Autenticação:** Implementação da tela de **Cadastro** com renderização condicional, exibindo formulários dinâmicos e otimizados de acordo com o perfil selecionado (Estagiário ou Empresa).

---

## 🗺️ Próximos Passos (Roadmap)

- [ ] **Back-end:** Substituir a persistência em memória dos Usuários pela conexão definitiva com o **SQL Server**.
- [ ] **Back-end:** Implementação completa dos Perfis de Acesso (Estagiário, Empresa, Orientador e Admin).
- [ ] **Front-end:** Integrar os formulários de Cadastro e Login com a API Node.js utilizando o `Axios`.
- [ ] **Front-end:** Configurar o `React Router` para navegação fluida entre a Página Inicial, Login, Cadastro e Dashboards.

---

Desenvolvido como parte do currículo de Desenvolvimento de Software Multiplataforma
