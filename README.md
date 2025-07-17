# Ekoru Web

A modern, scalable web application built with Next.js, TypeScript, Apollo Client, and modular architecture. This project is designed for maintainability, performance, and ease of development.

## Features

- Modular folder structure for features and shared components
- TypeScript for type safety
- Apollo Client for GraphQL data fetching
- Custom hooks and stores for state management
- Reusable UI components
- Environment-based configuration
- Docker support for production and QA

## Project Structure

```
app/                # Main application logic, feature-based folders
components/         # Shared UI components
config/             # Environment and variable configuration
constants/          # Shared constants
graphql/            # GraphQL queries and mutations
hooks/              # Custom React hooks
lib/                # Library and setup files
public/             # Static assets
services/           # API and business logic
store/              # State management
types/              # TypeScript types
utils/              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Testing

```bash
npm run test
```

### Linting

```bash
npm run lint
```

### Building for Production

```bash
npm run build
```

### Docker

- Use `Dockerfile` for local builds
- Use `Dockerfile.prod` and `compose.prod.yml` for production
- Use `Dockerfile.qa` and `compose.qa.yml` for QA

## Environment Variables

Configure your environment variables in `.env.local` for local development.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Create a Pull Request

## License

MIT

---

For more details, see the inline documentation and comments throughout the codebase.
