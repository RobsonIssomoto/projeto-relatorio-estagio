# 1. Imagem base (O mesmo ambiente Node.js do frontend)
FROM node:20

# 2. Pasta de trabalho dentro do container
WORKDIR /app

# 3. Copia a lista de dependências (Express, Mongoose, bcrypt, etc.)
COPY package.json package-lock.json* ./

# 4. Instala todas as bibliotecas
RUN npm install

# 5. Copia o resto do código da sua API
COPY . .

# 6. Libera a porta da API (Substitua 3000 pela porta que você usa no seu app.listen)
EXPOSE 3000

# 7. O comando para ligar o servidor em modo de desenvolvimento
# O npm run dev vai acionar o script com o 'tsx --watch' que você já tem configurado
CMD ["npm", "run", "dev"]