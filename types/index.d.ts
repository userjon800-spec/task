export interface ICompany {
  name: string;
  avatar_url: string;
  description: string;
  followers: number;
  following: number;
  blog: string;
  location: string;
  public_repos: number;
  html_url: string;
}
export interface IRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks: number;
  language: string;
  pushed_at: Date;
  html_url: string;
  size: number;
  watchers: number;
}
export interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}