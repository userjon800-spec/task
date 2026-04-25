import { NextRequest, NextResponse } from "next/server";
import { deduplicateContributors } from "@/lib/contribution";
const headers = {
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
};
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const allRepos = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      `https://api.github.com/orgs/${slug}/repos?type=public&per_page=100&page=${page}`,
      { headers },
    );
    if (res.status === 404) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    if (res.status === 403 || res.status === 429) {
      const reset = res.headers.get("X-RateLimit-Reset");
      const minutesLeft = reset
        ? Math.ceil((Number(reset) * 1000 - Date.now()) / 1000 / 60)
        : 60;
      return NextResponse.json(
        { error: "rate_limit", resetIn: minutesLeft },
        { status: 429 },
      );
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    allRepos.push(...data);
    if (data.length < 100) break;
    page++;
  }
  const top3 = [...allRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 3);
  const contributorLists = await Promise.all(
    top3.map((repo) =>
      fetch(
        `https://api.github.com/repos/${slug}/${repo.name}/contributors?per_page=10`,
        { headers },
      ).then((res) => {
        if (!res.ok) return [];
        return res.json();
      }),
    ),
  );
  const top5 = deduplicateContributors(contributorLists);
  return NextResponse.json({ contributors: top5 });
}