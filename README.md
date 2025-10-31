# Aethon - Visual Workflow Automation Platform

Aethon is a production-ready, open-source platform for building and automating complex workflows. Inspired by tools like n8n, it provides a visual canvas where you can connect different services, transform data, and execute tasks in real-time.

This platform is built as a complete Software-as-a-Service (SaaS) solution, including user authentication, payments, subscriptions, and tiered feature access.

## Core Features

- **Visual Workflow Canvas:** A clean, node-based interface for building workflows by connecting triggers and execution nodes.
- **Real-time Execution:** Watch your workflows execute step-by-step with live status updates on each node, powered by WebSockets via Inngest.
- **Extensible Node System:**
    - **Triggers:** Start workflows from various sources like Webhooks, Google Form submissions, or Stripe events.
    - **Actions:** Integrate with a wide range of services, including AI providers (OpenAI, Google Gemini, Anthropic), messaging platforms (Discord, Slack), and generic HTTP requests. The system is designed to be easily extendable with new integrations.
- **Data Mapping:** Control the flow of data between nodes using a simple templating syntax, allowing for powerful data transformations.
- **SaaS Ready:**
    - **Payments & Subscriptions:** Built-in integration with Polar for managing paid plans, free tiers, and paywalls.
    - **Authentication:** Secure user authentication handled by Better Auth, supporting email/password and various OAuth providers.
- **Reliable Background Processing:** Long-running tasks are offloaded to Inngest, ensuring the UI remains responsive and workflows run reliably with built-in retries.
- **Monitoring & Observability:** Integrated with Sentry for comprehensive error tracking, logging, and AI agent monitoring, providing detailed insights into LLM calls.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **API Layer:** [tRPC](https://trpc.io/)
- **Database:** [Prisma](https://www.prisma.io/) ORM with [Neon](https://neon.tech/) Serverless Postgres
- **Background Jobs & WebSockets:** [Inngest](https://www.inngest.com/)
- **Authentication:** [Better Auth](https://github.com/polarsource/better-auth)
- **Payments & Subscriptions:** [Polar](https://polar.sh/)
- **UI:** [shadcn/ui](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/)
- **Monitoring:** [Sentry](https://sentry.io/)
- **AI:** [Vercel AI SDK](https://sdk.vercel.ai/docs)

## Architecture Diagram

```mermaid
graph TD
    subgraph "User Interface (Next.js)"
        A[Visual Canvas]
        B[Node Configuration]
        C[Dashboard]
        A -- Interacts with --> D{tRPC API}
        B -- Interacts with --> D
        C -- Interacts with --> D
        E[Real-time UI Updates]
    end

    subgraph "Backend (Next.js Server)"
        D -- Manages --> F[Workflows]
        D -- Manages --> G[Users & Auth]
        D -- Manages --> H[Subscriptions]
        D -- Triggers --> I{Inngest}
        G -- Handled by --> J[Better Auth]
        H -- Handled by --> K[Polar]
    end

    subgraph "Data & State"
        F -- Stored in --> L[(Neon DB via Prisma)]
        G -- Stored in --> L
        H -- Stored in --> L
    end

    subgraph "Background Processing (Inngest)"
        I -- Executes --> M[Workflow Steps]
        M -- Calls --> N[External APIs <br/>(Google, OpenAI, Slack...)]
        I -- Pub/Sub --> E
    end

    subgraph "Monitoring"
        D -- Reports to --> O{Sentry}
        I -- Reports to --> O
    end
```

## Getting Started

### Prerequisites

- Node.js and npm
- A PostgreSQL database (e.g., from [Neon](https://neon.tech/))
- API keys for any services you want to integrate (e.g., OpenAI, Google AI, Polar, Sentry).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd aethon
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file by copying the `.env.example` file. Fill in the required environment variables, including your database connection string, auth secrets, and API keys.
    ```bash
    cp .env.example .env.local
    ```

4.  **Run database migrations:**
    ```bash
    npx prisma db push
    ```

5.  **Run the development servers:**
    This command uses `mprocs` to start the Next.js app and the Inngest dev server concurrently.
    ```bash
    npm run dev:all
    ```

Your application should now be running at `http://localhost:3000`.
