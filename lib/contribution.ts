import { Contributor } from "@/types";
export function deduplicateContributors(lists: Contributor[][]): Contributor[] {
  const map = new Map<string, Contributor>();
  for (const list of lists) {
    for (const person of list) {
      if (map.has(person.login)) {
        map.get(person.login)!.contributions += person.contributions;
      } else {
        map.set(person.login, { ...person });
      }
    }
  }
  return Array.from(map.values())
    .sort((a, b) => a.contributions - b.contributions)
    .slice(0, 5);
}