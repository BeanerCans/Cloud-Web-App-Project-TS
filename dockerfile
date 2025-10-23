# ---- Base Stage ----
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# ---- Build Stage ----
FROM base AS builder
COPY . .

# Disable linting & type-checking during build
ENV NEXT_DISABLE_ESLINT=1
ENV NEXT_SKIP_TYPECHECK=1

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# ---- Run Stage ----
FROM node:18-alpine AS runner
WORKDIR /app

# Copy built app and node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Expose the Next.js default port
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "start"]
