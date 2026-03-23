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

| Camada      | Tecnologias Principais                                       |
| :---------- | :----------------------------------------------------------- |
| Back-end    | Node.js, TypeScript, Express, Mongoose (MongoDB)             |
| Front-end   | React (Vite), Material UI (MUI), Axios, React Hook Form, Zod |
| Arquitetura | Monorepo, Singleton Pattern, MVC, CSS-in-JS (Emotion)        |

---

## 🔗 Próximos Passos e Roadmap

- [ ] Implementar Model de Relatórios e Esquema do Mongoose.
- [ ] Criar rotas de POST/GET para submissão de atividades.
- [ ] Desenvolver formulário de envio com validação via Zod no Front-end.
- [ ] Integração de documentos e geração de relatórios (Swagger em breve).

---

Desenvolvido como parte do currículo de Desenvolvimento de Software Multiplataforma
