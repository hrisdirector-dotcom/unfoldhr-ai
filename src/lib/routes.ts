import { getAgentById } from "@/data/agents";
import { getWorkflow } from "@/data/workflows";

export const SITE_URL = "https://www.unfoldhrai.com";

/** Free agents that open a dedicated interactive try-page. */
export const FREE_AGENT_PAGES: Record<string, string> = {
  "workforce-planning": "try-agent",
  "employee-listening": "try-listening-agent",
  "performance-management": "try-performance-agent",
  "us-workforce-complexity": "try-us-workforce-agent",
};

/** Control & Readiness demonstrations that own a named address under /agents. */
export const DEMO_SLUG_PAGES: Record<string, string> = {
  "global-lifecycle": "global-lifecycle-agent",
  "leave-control": "leave-control-agent",
  "compensation-change": "compensation-change-agent",
};

const PAGE_TO_FREE_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(FREE_AGENT_PAGES).map(([slug, page]) => [page, slug]),
);
const PAGE_TO_DEMO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(DEMO_SLUG_PAGES).map(([slug, page]) => [page, slug]),
);

const STATIC_PAGE_PATHS: Record<string, string> = {
  home: "/",
  services: "/services",
  agents: "/agents",
  workflows: "/workflows",
  about: "/about",
  pricing: "/pricing",
  integrations: "/integrations",
  contact: "/contact",
  login: "/login",
  auth: "/login",
  dashboard: "/dashboard",
  admin: "/admin",
  "today-decisions": "/today-decisions",
  "executive-deck": "/executive-deck",
  "executive-snapshot": "/executive-snapshot",
  snapshot: "/executive-snapshot",
  privacy: "/privacy",
};

const PATH_TO_STATIC_PAGE: Record<string, string> = {
  "/": "home",
  "/services": "services",
  "/agents": "agents",
  "/workflows": "workflows",
  "/about": "about",
  "/pricing": "pricing",
  "/integrations": "integrations",
  "/contact": "contact",
  "/login": "login",
  "/dashboard": "dashboard",
  "/admin": "admin",
  "/today-decisions": "today-decisions",
  "/executive-deck": "executive-deck",
  "/executive-snapshot": "executive-snapshot",
};

/** Internal aliases preserved from the pre-routing navigation API. */
export function resolveAlias(page: string): string {
  if (page === "try-agents") return "global-lifecycle-agent";
  if (FREE_AGENT_PAGES[page]) return FREE_AGENT_PAGES[page];
  return page;
}

export interface PathOptions {
  agentId?: string;
  workflowId?: string;
}

/** The address that represents a screen. */
export function pathForPage(page: string, opts: PathOptions = {}): string {
  const p = resolveAlias(page);

  if (p === "our-method") return "/#our-method";
  if (p === "agent-detail") return opts.agentId ? `/agents/${opts.agentId}` : "/agents";
  if (PAGE_TO_DEMO_SLUG[p]) return `/agents/${PAGE_TO_DEMO_SLUG[p]}`;
  if (PAGE_TO_FREE_SLUG[p]) return `/agents/${PAGE_TO_FREE_SLUG[p]}`;
  if (p === "workflows") return opts.workflowId ? `/workflows/${opts.workflowId}` : "/workflows";
  return STATIC_PAGE_PATHS[p] ?? "/";
}

export interface ResolvedRoute {
  page: string;
  agentId?: string;
  workflowId?: string;
  notFound?: boolean;
  redirectTo?: string;
}

/** Turn an address into the screen it should show. */
export function resolvePath(pathname: string): ResolvedRoute {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  if (clean === "/snapshot") return { page: "executive-snapshot", redirectTo: "/executive-snapshot" };

  const staticPage = PATH_TO_STATIC_PAGE[clean];
  if (staticPage) return { page: staticPage };

  const agentMatch = /^\/agents\/([^/]+)$/.exec(clean);
  if (agentMatch) {
    const slug = decodeURIComponent(agentMatch[1]);
    if (DEMO_SLUG_PAGES[slug]) return { page: DEMO_SLUG_PAGES[slug] };
    if (FREE_AGENT_PAGES[slug]) return { page: FREE_AGENT_PAGES[slug] };
    if (getAgentById(slug)) return { page: "agent-detail", agentId: slug };
    return { page: "not-found", notFound: true };
  }

  const workflowMatch = /^\/workflows\/([^/]+)$/.exec(clean);
  if (workflowMatch) {
    const slug = decodeURIComponent(workflowMatch[1]);
    if (getWorkflow(slug)) return { page: "workflows", workflowId: slug };
    return { page: "not-found", notFound: true };
  }

  return { page: "not-found", notFound: true };
}

export interface RouteMeta {
  title: string;
  description: string;
  noindex?: boolean;
}

const DEFAULT_DESCRIPTION =
  "UnfoldHR redesigns high-value HR workflows in ten business days, then helps you decide what to enable with technology — including the UnfoldHR Agent Platform.";

const PAGE_META: Record<string, RouteMeta> = {
  home: {
    title: "HR Workflow Redesign & Applied AI | UnfoldHR",
    description: DEFAULT_DESCRIPTION,
  },
  services: {
    title: "HR Workflow Redesign Services | UnfoldHR",
    description:
      "A ten business day sprint that redesigns one high-value HR workflow and defines its future-state operating model. Technology-independent by design.",
  },
  agents: {
    title: "UnfoldHR Agent Platform | Purpose-built intelligence for redesigned HR work",
    description:
      "A conceptual architecture for HR agents, with interactive demonstrations that run on prepared scenario data rather than live customer systems.",
  },
  workflows: {
    title: "HR Workflow Library — 20 Redesigned Workflows | UnfoldHR",
    description:
      "Twenty HR workflows decomposed activity by activity: what should stop, what a rule decides, what a system executes and what a person must still own.",
  },
  about: {
    title: "About UnfoldHR | HR work design and applied AI",
    description: "Why UnfoldHR redesigns HR work before enabling it with technology.",
  },
  pricing: {
    title: "Engagements & Pricing | UnfoldHR",
    description: "Explore, Redesign and Implement engagements for HR workflow redesign.",
  },
  integrations: {
    title: "Integration Catalog | UnfoldHR",
    description:
      "Potential connection points for redesigned HR workflows. The catalog lists options, not completed or deployed customer connections.",
  },
  contact: {
    title: "Contact UnfoldHR",
    description: "Start a conversation about redesigning one HR workflow.",
  },
  privacy: {
    title: "Privacy Policy | UnfoldHR",
    description: "How UnfoldHR collects, uses and protects personal information.",
  },
  "executive-snapshot": {
    title: "Executive Snapshot | UnfoldHR",
    description: "A condensed executive view of HR workflow redesign outcomes.",
    noindex: true,
  },
  "agent-detail": {
    title: "Agent Detail | UnfoldHR Agent Platform",
    description: "A conceptual agent description within the UnfoldHR Agent Platform.",
    noindex: true,
  },
  "global-lifecycle-agent": {
    title: "Global Lifecycle Agent — Demonstration | UnfoldHR",
    description: "A demonstration using prepared scenario data. It does not connect to a live customer system.",
    noindex: true,
  },
  "leave-control-agent": {
    title: "Leave / LOA Control Agent — Demonstration | UnfoldHR",
    description: "A demonstration using prepared scenario data. It does not connect to a live customer system.",
    noindex: true,
  },
  "compensation-change-agent": {
    title: "Compensation / Job Change Agent — Demonstration | UnfoldHR",
    description: "A demonstration using prepared scenario data. It does not connect to a live customer system.",
    noindex: true,
  },
  "try-agent": {
    title: "Workforce Planning Agent — Demonstration | UnfoldHR",
    description: "An interactive demonstration using prepared scenario data.",
    noindex: true,
  },
  "try-listening-agent": {
    title: "Employee Listening Agent — Demonstration | UnfoldHR",
    description: "An interactive demonstration using prepared scenario data.",
    noindex: true,
  },
  "try-performance-agent": {
    title: "Performance Management Agent — Demonstration | UnfoldHR",
    description: "An interactive demonstration using prepared scenario data.",
    noindex: true,
  },
  "try-us-workforce-agent": {
    title: "US Workforce Complexity Agent — Demonstration | UnfoldHR",
    description: "An interactive demonstration using prepared scenario data.",
    noindex: true,
  },
  "workforce-planning": {
    title: "Workforce Planning Agent — Demonstration | UnfoldHR",
    description: "An interactive demonstration using prepared scenario data.",
    noindex: true,
  },
  login: { title: "Sign in | UnfoldHR", description: "Sign in to your UnfoldHR account.", noindex: true },
  dashboard: { title: "Dashboard | UnfoldHR", description: "Your UnfoldHR workspace.", noindex: true },
  admin: { title: "Admin | UnfoldHR", description: "UnfoldHR administration.", noindex: true },
  "today-decisions": { title: "Today's Decisions | UnfoldHR", description: "Your decision queue.", noindex: true },
  "executive-deck": { title: "Executive Deck | UnfoldHR", description: "Executive deck export.", noindex: true },
  "not-found": { title: "Page not found | UnfoldHR", description: "This page does not exist.", noindex: true },
  unsubscribe: { title: "Unsubscribe | UnfoldHR", description: "Manage your email preferences.", noindex: true },
};

/** Head metadata for a resolved screen. Detail screens describe their own record. */
export function metaForRoute(route: ResolvedRoute): RouteMeta {
  if (route.page === "agent-detail" && route.agentId) {
    const agent = getAgentById(route.agentId);
    if (agent) {
      return {
        title: `${agent.name} | UnfoldHR Agent Platform`,
        description: agent.outcome ?? PAGE_META["agent-detail"].description,
        noindex: true,
      };
    }
  }
  if (route.page === "workflows" && route.workflowId) {
    const workflow = getWorkflow(route.workflowId);
    if (workflow) {
      return {
        title: `${workflow.name} — HR Workflow Redesign | UnfoldHR`,
        description: workflow.outcome,
        noindex: true,
      };
    }
  }
  return PAGE_META[route.page] ?? PAGE_META.home;
}

/** The canonical address for a resolved screen (no query, no fragment). */
export function canonicalPathFor(route: ResolvedRoute): string {
  if (route.page === "agent-detail" && route.agentId) return `/agents/${route.agentId}`;
  if (route.page === "workflows" && route.workflowId) return `/workflows/${route.workflowId}`;
  if (route.page === "not-found") return "/404";
  return pathForPage(route.page);
}
