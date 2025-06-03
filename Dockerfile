# Etapa de construcción
FROM node:18 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:ssr

# Etapa de producción
FROM node:18-slim

WORKDIR /app

# Copiar toda la carpeta dist para preservar estructura
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --production

EXPOSE 4000

CMD ["npm", "run", "serve:ssr"]
