export const MODULE_VIDEOS: Record<string, string> = {
  "workforce-planning": "https://app.heygen.com/embeds/208f449126e5447a91f69b5ebab59a97",
  "employee-listening": "https://app.heygen.com/embeds/2473de36ec4a4274b67b42f67b6f7ae2",
  "learning-development": "https://app.heygen.com/embeds/1c4488f2404a4a49a8c9bffaff33d554",
  "performance-management": "https://app.heygen.com/embeds/c623a77d9894402b9c0ab22022198064",
  "recruiting-ats": "https://app.heygen.com/embeds/2a779bdbe8b040d5a80a4dacdd17bb72",
  "onboarding Automation": "https://app.heygen.com/embeds/619d052c38064f6384153d18f1ce3469"",
  "Workforce compliance": "https://app.heygen.com/embeds/85e0bc506e4c4aed9d9cca3661f52dde",
  "comp-benchmarking": "https://app.heygen.com/embeds/569b73c43f1a4df9850896becac5099c",
  "dei-analytics": "https://app.heygen.com/embeds/399642dca2874b53889f901b15e1278a",
  "document-generation": "https://app.heygen.com/embeds/562a9ccbcf5f4f02991a921a098fa65b",
  "employee-relations": "https://app.heygen.com/embeds/13c7272cdd334ddca35ebad3b5507073",
  "benefits-admin": "https://app.heygen.com/embeds/19650c88f07142119932f369632e3c5e",
};

export const getModuleVideoById = (id: string) => MODULE_VIDEOS[id];
