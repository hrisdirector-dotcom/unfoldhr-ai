export const MODULE_VIDEOS: Record<string, string> = {
  "workforce-planning": "https://app.heygen.com/embeds/208f449126e5447a91f69b5ebab59a97",
  "employee-listening": "https://app.heygen.com/embeds/2473de36ec4a4274b67b42f67b6f7ae2",
  "learning-development": "https://app.heygen.com/embeds/1c4488f2404a4a49a8c9bffaff33d554",
  "performance-management": "https://app.heygen.com/embeds/c623a77d9894402b9c0ab22022198064",
  "recruiting-ats": "https://app.heygen.com/embeds/2a779bdbe8b040d5a80a4dacdd17bb72",
  onboarding: "",
  compliance: "https://app.heygen.com/embeds/85e0bc506e4c4aed9d9cca3661f52dde",
  "comp-benchmarking": "https://app.heygen.com/embeds/569b73c43f1a4df9850896becac5099c",
  "dei-analytics": "",
  "document-generation": "",
  "employee-relations": "",
  "benefits-admin": "",
};

export const getModuleVideoById = (id: string) => MODULE_VIDEOS[id];
