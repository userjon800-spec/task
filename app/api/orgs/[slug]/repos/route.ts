import { IRepo } from "@/types";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const paramsPromise = params;
  const { slug } = await paramsPromise;
  const allRepos: IRepo[] = [];
  const companyInfo: any = [];
  let page = 1;
  for (let i = 0; i < 150; i++) {
    const repo = await fetch(
      `https://api.github.com/orgs/${slug}/repos?type=public&per_page=100&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
      },
    );
    const company = await fetch(`https://api.github.com/orgs/${slug}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
    });
    const reset = repo.headers.get("X-RateLimit-Reset");
    if (repo.status === 403 || repo.status === 429) {
      const resetDate = new Date(Number(reset) * 1000);
      const minutesLeft = Math.ceil(
        (resetDate.getTime() - Date.now()) / 1000 / 60,
      );
      return NextResponse.json(
        {
          error: "rate_limit",
          remaining: 0,
          resetIn: minutesLeft,
        },
        { status: 429 },
      );
    }
    if (repo.status === 404 && company.status === 404) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    const repos = await repo.json();
    const companyInfos = await company.json();
    companyInfo.push(companyInfos);
    if (repos.length === 0) break;
    allRepos.push(...repos);
    if (repos.length < 150) break;
    page++;
  }
  const sorted = allRepos
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      forks: repo.forks,
      language: repo.language,
      pushed_at: repo.pushed_at,
      html_url: repo.html_url,
      size: repo.size,
      watchers: repo.watchers,
    }))
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
  return NextResponse.json({
    message: "suceess",
    status: 200,
    data: { sorted, company: companyInfo },
  });
}