FROM node:18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Omit --production flag for TypeScript devDependencies
RUN npm ci

COPY src ./src
COPY next.config.mjs .
COPY tsconfig.json .
COPY prisma ./prisma

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG GITHUB_ID
ENV GITHUB_ID=${GITHUB_ID}
ARG GITHUB_SECRET
ENV GITHUB_SECRET=${GITHUB_SECRET}
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ARG GOOGLE_ID
ENV GOOGLE_ID=${GOOGLE_ID}
ARG GOOGLE_SECRET
ENV GOOGLE_SECRET=${GOOGLE_SECRET}

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js based on the preferred package manager
RUN npx prisma db push
RUN npm run build

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./
COPY --from=builder --chown=nextjs:nodejs /app/database ./database

# Environment variables must be redefined at run time
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG GITHUB_ID
ENV GITHUB_ID=${GITHUB_ID}
ARG GITHUB_SECRET
ENV GITHUB_SECRET=${GITHUB_SECRET}
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ARG GOOGLE_ID
ENV GOOGLE_ID=${GOOGLE_ID}
ARG GOOGLE_SECRET
ENV GOOGLE_SECRET=${GOOGLE_SECRET}

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]