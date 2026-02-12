# gitHExpl

A React Native mobile app for exploring and browsing GitHub repositories. Search repos by name, topic, or keyword, browse results with infinite scroll, and view detailed repository information -- all with a polished dark/light theme.

## Tech Stack & Reasoning

### Core

| Technology | Version | Why  
| **React Native** | 0.81 | Cross-platform iOS & Android from a single codebase. Version 0.81 ships with the New Architecture (Fabric renderer + TurboModules) enabled by default, delivering faster rendering and lower bridge overhead. |
| **TypeScript** | 5.8 | Strict type safety (`strict: true`) across the entire codebase. Catches a whole class of bugs at compile time and provides first-class autocompletion and refactoring support in the IDE. |
| **React Navigation 7** | Native Stack | The standard navigation solution for React Native. The native-stack navigator uses platform-native screen transitions (UINavigationController on iOS, Fragment on Android) for true 60fps animations, unlike JS-driven alternatives. |
| **TanStack React Query 5** | 5.x | Declarative server-state management that avoids reinventing data fetching. Provides built-in caching (5-minute stale time, 30-minute garbage collection), request deduplication, automatic retries, and first-class infinite scroll pagination via `useInfiniteQuery`. |
| **Zustand 5** | 5.x | Minimal, hook-based client state management for theme mode and search query/history. Chosen over Redux for its zero-boilerplate API, tiny bundle size (~1KB), and no need for providers or context wrappers. |

### UI & Icons

| Technology                         | Why                                                                                                                                                                                                                                                      |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **react-native-svg**               | Crisp, scalable vector icons that render pixel-perfectly across all screen densities and platforms. Replaces inconsistent text emojis with a unified Feather/Lucide-style icon system where every icon accepts `size`, `color`, and `strokeWidth` props. |
| **react-native-safe-area-context** | Provides safe area insets for notches, status bars, and home indicators. Required by React Navigation and used directly in screens for proper layout.                                                                                                    |
| **react-native-screens**           | Wraps navigation screens in native containers for better memory efficiency and transitions. Required by React Navigation's native stack.                                                                                                                 |

### Developer Experience

| Technology                              | Why                                                                                                                                                                                             |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prettier 3**                          | Enforced, opinionated code formatting so style discussions never block PRs.                                                                                                                     |
| **@ianvs/prettier-plugin-sort-imports** | Automatic import ordering: Node builtins, then `react`/`react-native`, then third-party, then `@/app`, `@/shared`, `@/features`, then relative imports -- each group separated by a blank line. |
| **ESLint + eslint-config-prettier**     | Linting for code quality without conflicting with Prettier's formatting rules. Extends `@react-native` base config.                                                                             |
| **babel-plugin-module-resolver**        | `@/*` path aliases (maps to `src/*`) to eliminate deep relative imports like `../../../shared/hooks/useColors`.                                                                                 |

## Project Structure

```
src/
├── app/                          # App-level setup
│   ├── navigation/               # RootNavigator, route types
│   └── providers/                # AppProviders (QueryClient, SafeArea, Navigation)
│
├── features/                     # Feature modules (self-contained)
│   ├── search/                   # GitHub repo search
│   │   ├── api/                  # searchRepos API call
│   │   ├── components/           # SearchBar, RepoList, RepoCard, SettingsMenu
│   │   ├── hooks/                # useSearchScreen, useSearchRepos, useSearchStore
│   │   ├── screens/              # SearchScreen
│   │   └── types.ts              # GitHubRepo, GitHubSearchResponse
│   │
│   └── repo-details/             # Repository detail view
│       ├── components/           # RepoHeader, StatsRow, OwnerCard
│       ├── hooks/                # useRepoDetailScreen
│       ├── screens/              # RepoDetailScreen
│       └── types.ts
│
└── shared/                       # Shared across features
    ├── components/
    │   ├── icons/                # SVG icon components (Star, Fork, Search, etc.)
    │   └── ui/                   # Badge, Chip, Separator
    ├── hooks/                    # useColors, useDebounce, useThemeStore
    ├── services/                 # API client, React Query client config
    ├── theme/                    # Colors (dark/light), spacing, typography
    └── utils/                    # formatNumber, formatDate, truncateText
```

Each **feature** is a self-contained module with its own API layer, components, hooks, screens, and types. Features import from `shared/` but never from each other's internals.

## Architecture

### Screen hook pattern

Business logic is separated from rendering. Every screen has a corresponding hook that owns all state, effects, and callbacks:

```
SearchScreen.tsx          -->  useSearchScreen.ts
RepoDetailScreen.tsx      -->  useRepoDetailScreen.ts
```

Screens are pure render functions that destructure the hook return value and pass props to child components. No `useState`, `useCallback`, `useMemo`, or `useEffect` lives in screen files.

### Data flow

```
GitHub REST API
      |
  apiFetch()             # Shared fetch wrapper with error handling
      |
  React Query            # Caching, pagination, retries, deduplication
      |
  Screen hooks           # Derive UI state (repos list, loading flags, callbacks)
      |
  Screen components      # Pure rendering
```

### Theming

Two complete color palettes (`darkColors`, `lightColors`) are defined in `shared/theme/colors.ts`. The active palette is controlled by a Zustand store (`useThemeStore`) and accessed via `useColors()`. All components use dynamic colors, so the entire app responds instantly to theme changes.

### Icon system

Custom SVG icons live in `shared/components/icons/` and are barrel-exported from an `index.ts`. Every icon follows a consistent API:

```tsx
<StarIcon size={20} color={colors.accent} filled />
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm
- Xcode (for iOS)
- Android Studio + Android SDK (for Android)
- CocoaPods (`gem install cocoapods`)

### Install

```bash
# Clone the repo
git clone <repo-url>
cd gitHExpl

# Install dependencies
pnpm install

# Install iOS pods
cd ios && pod install && cd ..
```

### Run

```bash
# Start Metro bundler
pnpm start

# Run on iOS
pnpm ios

# Run on Android
pnpm android
```

## Scripts

| Command             | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `pnpm start`        | Start the Metro bundler                                |
| `pnpm ios`          | Build and run on iOS simulator                         |
| `pnpm android`      | Build and run on Android emulator                      |
| `pnpm lint`         | Run ESLint                                             |
| `pnpm format`       | Format all files with Prettier                         |
| `pnpm format:check` | Check formatting (CI-friendly, exits non-zero on diff) |
| `pnpm test`         | Run Jest tests                                         |
