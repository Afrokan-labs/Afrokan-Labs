/**
 * Loads and validates all content. Pages call this module; sections receive
 * the validated data as props and never read content themselves.
 *
 * Invalid content throws, so `pnpm content:validate` and `pnpm build` fail
 * with a message naming the file and the rule that was broken.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import matter from "gray-matter";
import * as runtime from "react/jsx-runtime";
import { z } from "zod";
import { about } from "../content/about";
import { articles, insights } from "../content/articles";
import { caseStudy } from "../content/case-study";
import { contact } from "../content/contact";
import { home } from "../content/home";
import { industries } from "../content/industries";
import { legal } from "../content/legal";
import { packages } from "../content/packages";
import * as schema from "../content/schema";
import { services } from "../content/services";
import { site } from "../content/site";
import { solutions } from "../content/solutions";
import { members } from "../content/team";
import { reviews, testimonials } from "../content/testimonials";
import { work } from "../content/work";

const PROJECTS_DIR = join(process.cwd(), "src", "content", "projects");

export class ContentError extends Error {
  constructor(source: string, detail: string) {
    super(`Invalid content in ${source}:\n${detail}`);
    this.name = "ContentError";
  }
}

function parse<T extends z.ZodType>(source: string, s: T, data: unknown): z.output<T> {
  const result = s.safeParse(data);
  if (!result.success) throw new ContentError(source, z.prettifyError(result.error));
  return result.data;
}

// ----- Typed content files -----

export const getSite = () => parse("src/content/site.ts", schema.Site, site);
export const getHome = () => parse("src/content/home.ts", schema.Home, home);
export const getAbout = () => parse("src/content/about.ts", schema.About, about);
export const getWork = () => parse("src/content/work.ts", schema.Work, work);
export const getInsights = () => parse("src/content/articles.ts", schema.Insights, insights);
export const getArticles = () =>
  parse("src/content/articles.ts (articles)", schema.Articles, articles);
export const getLegal = () => parse("src/content/legal.ts", schema.Legal, legal);
export const getCaseStudyCopy = () =>
  parse("src/content/case-study.ts", schema.CaseStudyCopy, caseStudy);
export const getContactCopy = () => parse("src/content/contact.ts", schema.ContactCopy, contact);
export const getServices = () => parse("src/content/services.ts", schema.Services, services);
export const getPackages = () => parse("src/content/packages.ts", schema.Packages, packages);
export const getSolutions = () => parse("src/content/solutions.ts", schema.Solutions, solutions);
export const getIndustries = () =>
  parse("src/content/industries.ts", schema.Industries, industries);
export const getMembers = () => parse("src/content/team.ts (members)", schema.Members, members);
export const getReviews = () =>
  parse("src/content/testimonials.ts (reviews)", schema.Reviews, reviews);
export const getTestimonials = () =>
  parse("src/content/testimonials.ts", schema.Testimonials, testimonials);

// ----- Projects (MDX) -----

type ProjectFile = { project: schema.Project; body: string; source: string };

// gray-matter can evaluate `---js` front matter; content is YAML only.
const noJs = () => {
  throw new Error("JavaScript front matter is not allowed; use YAML.");
};

function readProjectFiles(): ProjectFile[] {
  const files = readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  const seen = new Set<string>();

  return files.map((file) => {
    const source = `src/content/projects/${file}`;
    const { data, content } = matter(readFileSync(join(PROJECTS_DIR, file), "utf8"), {
      engines: { js: noJs, javascript: noJs },
    });
    const project = parse(source, schema.Project, data);

    if (project.slug !== basename(file, ".mdx"))
      throw new ContentError(source, `slug "${project.slug}" must match the file name.`);
    if (seen.has(project.slug)) throw new ContentError(source, `duplicate slug "${project.slug}".`);
    seen.add(project.slug);

    return { project, body: content, source };
  });
}

/**
 * Drafts (published: false) appear only under `next dev`. They never reach a
 * deployed build, previews included, because preview URLs are public.
 */
const includeDrafts = () => process.env.NODE_ENV === "development";

function visibleProjectFiles() {
  return readProjectFiles()
    .filter((f) => f.project.published || includeDrafts())
    .sort((a, b) => a.project.order - b.project.order);
}

export function getProjects(): schema.Project[] {
  return visibleProjectFiles().map((f) => f.project);
}

export function getProject(slug: string): schema.Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

async function compileBody(file: ProjectFile) {
  try {
    // @mdx-js/mdx is ESM-only; a dynamic import loads it from CommonJS (tsx) too.
    const { evaluate } = await import("@mdx-js/mdx");
    const { default: Body } = await evaluate(file.body, { ...runtime });
    return Body;
  } catch (error) {
    throw new ContentError(file.source, `MDX body: ${(error as Error).message}`);
  }
}

/** The case study body as a component, compiled at build time. */
export async function getProjectBody(slug: string) {
  const file = visibleProjectFiles().find((f) => f.project.slug === slug);
  if (!file) throw new Error(`No visible project "${slug}".`);
  return compileBody(file);
}

// ----- Navigation -----

/**
 * Header and footer links. Work (the homepage section, /work and case
 * studies) exists only while a project is visible (architecture §4), so those
 * links are dropped otherwise: the site never links to a page that does not exist.
 */
export function getNav() {
  const { nav, footer } = getSite();
  const hasWork = getProjects().length > 0;
  const keep = (l: { href: string }) =>
    hasWork || !(l.href === "/#work" || l.href === "/work" || l.href.startsWith("/work/"));
  const { company, services, resources, contact } = footer.columns;
  return {
    items: nav.items.filter(keep),
    cta: nav.cta,
    columns: {
      company: { ...company, links: company.links.filter(keep) },
      services,
      resources: { ...resources, links: resources.links.filter(keep) },
      contact,
    },
  };
}

// ----- Tier-derived copy (architecture §4) -----

/** The name shown for a client: real name at the named tier, else the anonymised label. */
export function clientDisplayName(p: schema.Project): string {
  return p.client.nameApproved ? p.client.name : p.client.anonymisedLabel;
}

/** StatusChip labels, e.g. { live: "Live since May 2026", delivered: "Delivered" }. */
export function getStatusLabels(p: schema.Project) {
  const { status } = getSite().ui;
  const live = p.liveSince
    ? status.liveSince.replace("{date}", formatMonth(p.liveSince))
    : status.live;
  return { live, delivered: status.delivered };
}

/** "2026-05" -> "May 2026". */
function formatMonth(yyyyMm: string): string {
  const [y, m] = yyyyMm.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, 1)));
}

// ----- Validation entry point (pnpm content:validate) -----

/** Validates every content file, drafts included, and compiles every MDX body. */
export async function validateAllContent() {
  getSite();
  const home = getHome();
  getAbout();
  const workCopy = getWork();
  getInsights();
  getArticles();
  getLegal();
  getCaseStudyCopy();
  getContactCopy();
  const quotes = getTestimonials();
  const services = getServices();
  getPackages();
  getSolutions();
  getIndustries();
  const team = getMembers();
  const projects = readProjectFiles();
  for (const file of projects) await compileBody(file);

  // Every referenced image must exist as a source file (the pipeline needs it).
  const referenced = [
    ...[workCopy.hero.photo, ...workCopy.cases.items.map((c) => c.background)].map((i) => ({
      src: `assets/images/${i.src}`,
      from: "src/content/work.ts",
    })),
    ...[home.welcome.photo, home.welcome.mini.image, home.ideas.wide, home.ideas.tall].map((i) => ({
      src: `assets/images/${i.src}`,
      from: "src/content/home.ts",
    })),
    ...quotes.items.flatMap((q) =>
      q.photo ? [{ src: q.photo.src, from: "src/content/testimonials.ts" }] : [],
    ),
    ...team.flatMap((m) =>
      [m.photo, m.cutout].map((i) => ({
        src: `assets/images/${i.src}`,
        from: "src/content/team.ts",
      })),
    ),
    ...projects.flatMap((f) => f.project.images.map((i) => ({ src: i.src, from: f.source }))),
  ];
  for (const { src, from } of referenced) {
    if (!existsSync(join(process.cwd(), src)))
      throw new ContentError(from, `image "${src}" does not exist. Add it under assets/images/.`);
  }

  return {
    services: services.items.length,
    steps: home.process.steps.length,
    teamMembers: team.length,
    projects: projects.length,
    published: projects.filter((f) => f.project.published).length,
  };
}
