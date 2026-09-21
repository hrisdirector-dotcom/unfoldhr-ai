import { describe, expect, it } from "vitest";
import {
  accessRedirect,
  canonicalPathFor,
  metaForRoute,
  pathForPage,
  resolveAlias,
  resolvePath,
} from "@/lib/routes";
import { WORKFLOWS } from "@/data/workflows";
import { AGENTS } from "@/data/agents";

const CORE_PAGES = [
  ["/", "home"],
  ["/services", "services"],
  ["/agents", "agents"],
  ["/workflows", "workflows"],
  ["/about", "about"],
  ["/pricing", "pricing"],
  ["/integrations", "integrations"],
  ["/contact", "contact"],
] as const;

describe("route classification", () => {
  it.each(CORE_PAGES)("%s resolves to %s", (path, page) => {
    expect(resolvePath(path)).toEqual({ page });
  });

  it("ignores a trailing slash", () => {
    expect(resolvePath("/services/")).toEqual({ page: "services" });
  });

  it("redirects the legacy snapshot address", () => {
    expect(resolvePath("/snapshot")).toEqual({
      page: "executive-snapshot",
      redirectTo: "/executive-snapshot",
    });
  });

  it("resolves the three control demonstrations", () => {
    expect(resolvePath("/agents/global-lifecycle").page).toBe("global-lifecycle-agent");
    expect(resolvePath("/agents/leave-control").page).toBe("leave-control-agent");
    expect(resolvePath("/agents/compensation-change").page).toBe("compensation-change-agent");
  });

  it("resolves the free try pages", () => {
    expect(resolvePath("/agents/employee-listening").page).toBe("try-listening-agent");
    expect(resolvePath("/agents/performance-management").page).toBe("try-performance-agent");
    expect(resolvePath("/agents/us-workforce-complexity").page).toBe("try-us-workforce-agent");
    expect(resolvePath("/agents/workforce-planning").page).toBe("try-agent");
  });

  it("resolves every catalog agent to a detail screen", () => {
    for (const agent of AGENTS) {
      const route = resolvePath(`/agents/${agent.id}`);
      expect(route.notFound).toBeFalsy();
    }
  });

  it("resolves every workflow to its detail address", () => {
    for (const workflow of WORKFLOWS) {
      expect(resolvePath(`/workflows/${workflow.id}`)).toEqual({
        page: "workflows",
        workflowId: workflow.id,
      });
    }
  });
});

describe("invalid addresses", () => {
  const bad = [
    "/nope",
    "/agents/does-not-exist",
    "/workflows/does-not-exist",
    "/workflows/leave-of-absence/extra",
    "/agents/%zz",
    "/workflows/%E0%A4%A",
    "/agents/%",
  ];

  it.each(bad)("%s is not found", (path) => {
    expect(resolvePath(path)).toEqual({ page: "not-found", notFound: true });
  });

  it("never throws on malformed percent-encoding", () => {
    expect(() => resolvePath("/agents/%zz")).not.toThrow();
    expect(() => resolvePath("/workflows/%zz")).not.toThrow();
  });
});

describe("head metadata", () => {
  it("gives core pages an indexable, self-referencing canonical", () => {
    for (const [path, page] of CORE_PAGES) {
      const route = resolvePath(path);
      expect(metaForRoute(route).noindex).toBeFalsy();
      expect(canonicalPathFor(route)).toBe(page === "home" ? "/" : path);
    }
  });

  it("marks demonstrations, detail screens and private screens noindex", () => {
    const noindexPaths = [
      "/agents/global-lifecycle",
      "/agents/leave-control",
      "/agents/compensation-change",
      "/agents/employee-listening",
      "/executive-snapshot",
      "/login",
      "/dashboard",
      "/admin",
      "/today-decisions",
      "/executive-deck",
      `/workflows/${WORKFLOWS[0].id}`,
    ];
    for (const path of noindexPaths) {
      expect(metaForRoute(resolvePath(path)).noindex).toBe(true);
    }
  });

  it("marks an unknown address noindex", () => {
    const route = resolvePath("/nope");
    expect(metaForRoute(route).noindex).toBe(true);
    expect(metaForRoute(route).title).toContain("not found");
  });

  it("describes a workflow detail with its own record", () => {
    const workflow = WORKFLOWS[0];
    const meta = metaForRoute(resolvePath(`/workflows/${workflow.id}`));
    expect(meta.title).toContain(workflow.name);
    expect(meta.description).toBe(workflow.outcome);
  });

  it("round-trips a page back to its address", () => {
    expect(pathForPage("services")).toBe("/services");
    expect(pathForPage("our-method")).toBe("/#our-method");
    expect(pathForPage("leave-control-agent")).toBe("/agents/leave-control");
    expect(pathForPage("agent-detail", { agentId: AGENTS[0].id })).toBe(`/agents/${AGENTS[0].id}`);
    expect(pathForPage("workflows", { workflowId: WORKFLOWS[0].id })).toBe(
      `/workflows/${WORKFLOWS[0].id}`,
    );
  });

  it("keeps the internal aliases working", () => {
    expect(resolveAlias("try-agents")).toBe("global-lifecycle-agent");
    expect(resolveAlias("employee-listening")).toBe("try-listening-agent");
    expect(resolveAlias("services")).toBe("services");
  });
});

describe("private route access policy", () => {
  const base = { loading: false, signedIn: false, isAdmin: false, hasDeckState: false };

  it("sends signed-out visitors on private screens to sign-in", () => {
    for (const page of ["dashboard", "admin", "today-decisions", "executive-deck"]) {
      expect(accessRedirect(page, base)).toBe("/login");
    }
  });

  it("waits while the session is still loading", () => {
    expect(accessRedirect("admin", { ...base, loading: true })).toBeNull();
  });

  it("sends a signed-in non-admin away from the admin screen", () => {
    expect(accessRedirect("admin", { ...base, signedIn: true })).toBe("/dashboard");
  });

  it("lets an admin through", () => {
    expect(accessRedirect("admin", { ...base, signedIn: true, isAdmin: true })).toBeNull();
    expect(accessRedirect("dashboard", { ...base, signedIn: true })).toBeNull();
  });

  it("never renders the executive deck without its in-memory data", () => {
    expect(accessRedirect("executive-deck", { ...base, signedIn: true })).toBe("/dashboard");
    expect(
      accessRedirect("executive-deck", { ...base, signedIn: true, hasDeckState: true }),
    ).toBeNull();
  });

  it("leaves public screens alone", () => {
    for (const page of ["home", "services", "agents", "workflows", "contact", "privacy"]) {
      expect(accessRedirect(page, base)).toBeNull();
    }
  });
});
