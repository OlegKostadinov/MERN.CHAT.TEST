FROM node:20 AS frontend

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm ci

COPY frontend/ .

RUN npm run build


FROM node:20-slim AS backend

WORKDIR /app

# Copy dependency files first (cache layer)
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy backend code
COPY backend/ .

# COPY --from=frontend /app/frontend/ ./frontend/

# Copy the frontend build into the public folder
COPY --from=frontend /app/frontend/dist  /frontend/dist



EXPOSE 3003

CMD ["npm", "start"]