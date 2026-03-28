export const MODULE_VIDEOS: Record<string, string> = {
  "workforce-planning": "https://app.heygen.com/embeds/208f449126e5447a91f69b5ebab59a97",
  "employee-listening": "https://app.heygen.com/embeds/34fced82-4fdf-4af3-9305-70fd5e2a0005",
  "learning-development": "https://app.heygen.com/embeds/c34d1ef3-0c2f-4761-9060-c5e9ac949199",
  "performance-management": "https://app.heygen.com/embeds/ef1135eb-7c1e-4416-af72-17410870a9ee",
  "recruiting-ats": "https://app.heygen.com/embeds/4e124a2a-828e-4542-852e-d3fc083a3bc3",
  "onboarding": "",
  "compliance": "https://app.heygen.com/embeds/941369b7-9241-4e6e-86f7-8558cfa20683",
  "comp-benchmarking": "https://app.heygen.com/embeds/22caad77-fdf0-4f6d-80bd-c10cbdc81295",
  "dei-analytics": "",
  "document-generation": "",
  "employee-relations": "",
  "benefits-admin": ""
};

export const getModuleVideoById = (id: string) => MODULE_VIDEOS[id];
