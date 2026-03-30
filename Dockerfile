# Usa uma versão específica do Node (evita conflito se um amigo tiver o Node 18 e outro o 22)
FROM node:20

# Define onde o código ficará dentro do container
WORKDIR /usr/src/app

# Copia apenas os arquivos de dependências primeiro (otimiza o cache)
COPY package*.json ./

# Instala as dependências EXATAMENTE como estão no seu package-lock.json
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Porta que a aplicação vai expor
EXPOSE 3000

# Comando para iniciar
# No Dockerfile, altere o CMD para:
CMD ["npm", "run", "dev"]