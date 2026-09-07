// A route is published only with original, reviewed tool-specific content.
export interface ToolLanding {
  slug: string;
  tool: string;
  title: string;
  description: string;
  specificChecks: { title: string; evidence: string; source: string }[];
  reviewedAt: string;
  published: boolean;
}
export const toolLandings: ToolLanding[] = [];
// Add a route consuming this registry when the first substantive landing exists.
