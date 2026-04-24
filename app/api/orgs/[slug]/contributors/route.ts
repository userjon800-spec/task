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
  const paramsPromise = params;
  const { slug } = await paramsPromise;
  const res = await fetch(
    `https://api.github.com/orgs/${slug}/repos?type=public&per_page=100&page=100`,
    { headers },
  );
  if (res.status === 404) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }
  const repos = await res.json();
  const top = repos
    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
    .slice(0, 3);
  const contributorLists = await Promise.all(
    top.map((repo: any) =>
      fetch(
        `https://api.github.com/repos/${slug}/${repo.name}/contributors?per_page=10`,
        { headers },
      ).then((res) => res.json()),
    ),
  );
  const top5 = deduplicateContributors(contributorLists);
  return NextResponse.json({ contributors: top5 });
}