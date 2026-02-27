export const COMPOSITION_PATTERNS_SKILLS = [
  // 1. Component Architecture (HIGH → MEDIUM-HIGH)
  {
    id: "cp-architecture-avoid-boolean-props",
    name: "Avoid Boolean Props",
    category: "Component Architecture",
    impact: "MEDIUM-HIGH" as const,
    description: "Don't add boolean props to customize component behavior — use composition instead to avoid combinatorial complexity and keep APIs discoverable.",
    githubUrl: "https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/architecture-avoid-boolean-props.md",
  },
  {
    id: "cp-architecture-compound-components",
    name: "Compound Components with Shared Context",
    category: "Component Architecture",
    impact: "MEDIUM-HIGH" as const,
    description: "Structure complex components as compound components that share context internally, enabling flexible composition without prop drilling.",
    githubUrl: "https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/architecture-compound-components.md",
  },

  // 2. State Management (MEDIUM)
  {
    id: "cp-state-decouple-implementation",
    name: "Decouple State Implementation",
    category: "State Management",
    impact: "MEDIUM" as const,
    description: "Keep the provider as the only place that knows how state is managed, so consumers depend only on the interface and not the underlying implementation.",
    githubUrl: "https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/state-decouple-implementation.md",
  },
  {
    id: "cp-state-context-interface",
    name: "Generic Context Interface",
    category: "State Management",
    impact: "MEDIUM" as const,
    description: "Define a generic interface with state, actions, and meta fields for context values to enable dependency injection and easier testing.",
    githubUrl: "https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/state-context-interface.md",
  },
  {
    id: "cp-state-lift-state",
    name: "Lift State into Provider Components",
    category: "State Management",
    impact: "MEDIUM" as const,
    description: "Move shared state into provider components so sibling components can access it without prop drilling or duplicating state.",
    githubUrl: "https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/state-lift-state.md",
  },

  // 3. Implementation Patterns (MEDIUM)
  {
    id: "cp-patterns-explicit-variants",
    name: "Explicit Variant Components",
    category: "Implementation Patterns",
    impact: "MEDIUM" as const,
    description: "Create explicit named variant components (e.g. PrimaryButton, GhostButton) instead of a single component with boolean mode props to improve API clarity and discoverability.",
    githubUrl: "https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/patterns-explicit-variants.md",
  },
  {
    id: "cp-patterns-children-over-render-props",
    name: "Children Over Render Props",
    category: "Implementation Patterns",
    impact: "MEDIUM" as const,
    description: "Use children for composition instead of renderX callback props — it aligns with React's natural model and keeps JSX cleaner.",
    githubUrl: "https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/patterns-children-over-render-props.md",
  },

  // 4. React 19 APIs (MEDIUM)
  {
    id: "cp-react19-no-forwardref",
    name: "No forwardRef in React 19",
    category: "React 19 APIs",
    impact: "MEDIUM" as const,
    description: "Don't use forwardRef in React 19+ — ref is now a regular prop. Use use() instead of useContext() for cleaner context consumption. Only applies to React 19 and later.",
    githubUrl: "https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/react19-no-forwardref.md",
  },
];
