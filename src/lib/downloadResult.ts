/** Download agent result as CSV */
export function downloadCSV(agentName: string, result: Record<string, any>) {
  const rows: string[][] = [["Section", "Label", "Detail", "Tag"]];

  if (result.summary) {
    rows.push(["Summary", result.summary, "", ""]);
  }

  (result.sections || []).forEach((sec: any) => {
    (sec.items || []).forEach((item: any) => {
      rows.push([sec.title, item.label, item.detail, item.tag || ""]);
    });
  });

  (result.timeline || []).forEach((t: any) => {
    rows.push(["Timeline", t.phase, t.focus, `${t.pct}%`]);
  });

  (result.risks || []).forEach((r: string, i: number) => {
    rows.push(["Risks", `Risk ${i + 1}`, r, ""]);
  });

  if (result.confidence) {
    rows.push(["Confidence", result.confidence.level, result.confidence.reason, `${result.confidence.score}%`]);
  }

  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${agentName.replace(/\s+/g, "_")}_result.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/** Download agent result as a simple text-based "PDF" (uses print) */
export function downloadPDF(agentName: string, result: Record<string, any>) {
  const lines: string[] = [];
  lines.push(`${agentName} — Decision Snapshot`);
  lines.push("=".repeat(50));
  if (result.contextLine) lines.push(result.contextLine);
  lines.push("");
  if (result.summary) { lines.push("SUMMARY"); lines.push(result.summary); lines.push(""); }

  (result.sections || []).forEach((sec: any) => {
    lines.push(sec.title.toUpperCase());
    (sec.items || []).forEach((item: any) => {
      lines.push(`  • ${item.label}: ${item.detail}${item.tag ? ` [${item.tag}]` : ""}`);
    });
    lines.push("");
  });

  if (result.timeline?.length) {
    lines.push("TIMELINE");
    result.timeline.forEach((t: any) => lines.push(`  ${t.phase} — ${t.focus} (${t.pct}%)`));
    lines.push("");
  }

  if (result.risks?.length) {
    lines.push("RISKS & OBSERVATIONS");
    result.risks.forEach((r: string) => lines.push(`  ⚠ ${r}`));
    lines.push("");
  }

  if (result.confidence) {
    lines.push(`CONFIDENCE: ${result.confidence.level} (${result.confidence.score}%) — ${result.confidence.reason}`);
  }

  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`<pre style="font-family:monospace;font-size:12px;padding:40px;max-width:800px;margin:auto;white-space:pre-wrap;">${lines.join("\n")}</pre>`);
  w.document.title = `${agentName} Result`;
  w.document.close();
  setTimeout(() => { w.print(); }, 400);
}
