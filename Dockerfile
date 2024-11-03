# Usa Node.js 20 como base para la etapa de construcción
FROM node:20 as builder

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila la aplicación TypeScript (asegúrate de que `npm run build` genere los archivos en /app/dist)
RUN npm run build

# Usa una imagen más ligera para la etapa de producción
FROM node:20-alpine

# Establece NODE_ENV en producción
ENV NODE_ENV=production

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia las dependencias instaladas y el código compilado de la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expone el puerto de la aplicación (ajusta el puerto si tu app usa otro)
EXPOSE 3000

# Comando para ejecutar la aplicación en modo producción
CMD ["node", "/app/dist/src/main.js"]
