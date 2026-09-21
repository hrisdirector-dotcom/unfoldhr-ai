import { useEffect } from "react";
import { SITE_URL } from "@/lib/routes";

/**
 * Single authoritative head manager.
 *
 * Every tag it owns is reconciled in place: duplicates that already exist in the
 * static index.html (or left by a previous route) are removed so exactly one
 * element per name/property/canonical remains after any navigation.
 */

const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const nodes = Array.from(document.head.querySelectorAll<HTMLMetaElement>(`meta[${attr}="${key}"]`));
  nodes.slice(1).forEach((n) => n.remove());
  let el = nodes[0];
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(attr: "name" | "property", key: string) {
  document.head.querySelectorAll(`meta[${attr}="${key}"]`).forEach((n) => n.remove());
}

function upsertCanonical(href: string) {
  const nodes = Array.from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'));
  nodes.slice(1).forEach((n) => n.remove());
  let el = nodes[0];
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function removeCanonical() {
  document.head.querySelectorAll('link[rel="canonical"]').forEach((n) => n.remove());
}

export interface SeoProps {
  title: string;
  description: string;
  /** Canonical path, e.g. "/services". Pass null for screens that must not declare one. */
  path: string | null;
  noindex?: boolean;
}

export default function Seo({ title, description, path, noindex }: SeoProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "UnfoldHR");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:image", OG_IMAGE);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", OG_IMAGE);

    if (path) {
      const url = `${SITE_URL}${path}`;
      upsertCanonical(url);
      upsertMeta("property", "og:url", url);
    } else {
      removeCanonical();
      removeMeta("property", "og:url");
    }

    if (noindex) {
      upsertMeta("name", "robots", "noindex, nofollow");
    } else {
      removeMeta("name", "robots");
    }
  }, [title, description, path, noindex]);

  return null;
}
