import { IRepo } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import pLimit from "p-limit";
const headers = {
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
};
export const revalidate = 3600;
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const paramsPromise = params;
  const { slug } = await paramsPromise;
  try {
    let page = 1;
    let allRepos: IRepo[] = [];
    while (true) {
      const res = await fetch(
        `https://api.github.com/orgs/${slug}/repos?type=public&per_page=100&page=${page}`,
        { headers },
      );
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      if (data.length === 0) break;
      allRepos = [...allRepos, ...data];
      page++;
    }
    if (allRepos.length === 0) {
      return NextResponse.json({ language: [], count: 0 }, { status: 200 });
    }
    const repos = allRepos.sort((a, b) => b.size - a.size).slice(0, 150);
    const limit = pLimit(10);
    const languageResult = await Promise.all(
      repos.map((repo) =>
        limit(async () => {
          try {
            const res = await fetch(
              `https://api.github.com/repos/${slug}/${repo.name}/languages`,
              { headers },
            );
            if (!res.ok) return null;
            const data = await res.json();
            return { repo, langs: data };
          } catch (error) {
            return null;
          }
        }),
      ),
    );
    const totals: Record<string, number> = {};
    for (const result of languageResult) {
      if (!result) continue;
      const { repo, langs } = result;
      const repoTotal = Object.values(langs).reduce(
        (a: number, b: any) => a + b,
        0,
      );
      if (repoTotal === 0) continue;
      for (const [lang, bytes] of Object.entries(langs)) {
        const weight = ((bytes as number) / repoTotal) * repo.size;
        totals[lang] = (totals[lang] ?? 0) + weight;
      }
      const grandTotal = Object.values(totals).reduce((a, b) => a + b, 0);
      const language = Object.entries(totals)
        .map(([name, value]) => ({
          name,
          percentage: Number(((value / grandTotal) * 100).toFixed(2)),
        }))
        .sort((a, b) => a.percentage - b.percentage)
        .slice(0, 10);
      return NextResponse.json(
        {
          language,
          count: grandTotal,
          totalRepos: allRepos.length,
          analyzedRepos: repos.length,
        },
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { xato: "Something went wrong", error },
      { status: 500 },
    );
  }
}