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
import { caseStudy } from "../content/case-study";
import { contact } from "../content/contact";
import { home } from "../content/home";
import { privacy } from "../content/privacy";
import { workProcess } from "../content/process";
import * as schema from "../content/schema";
import { services } from "../content/services";
import { site } from "../content/site";
import { team } from "../content/team";
import { tierCopy } from "../content/tiers";

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
export const getCaseStudyCopy = () =>
  parse("src/content/case-study.ts", schema.CaseStudyCopy, caseStudy);
export const getPrivacy = () => parse("src/content/privacy.ts", schema.Privacy, privacy);
export const getContactCopy = () => parse("src/content/contact.ts", schema.ContactCopy, contact);
export const getServices = () => parse("src/content/services.ts", schema.Services, services);
export const getProcess = () => parse("src/content/process.ts", schema.Process, workProcess);
export const getTeam = () => parse("src/content/team.ts", schema.Team, team);
export const getTierCopy = () => parse("src/content/tiers.ts", schema.TierCopy, tierCopy);

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
 * Header and footer links. /work exists only while a project is visible
 * (architecture §4), so "Work" is dropped otherwise: the site never links
 * to a page that does not exist.
 */
export function getNav() {
  const { nav, footer } = getSite();
  const hasWork = getProjects().length > 0;
  const keep = (l: { href: string }) => hasWork || l.href !== "/work";
  return {
    items: nav.items.filter(keep),
    cta: nav.cta,
    footerLinks: footer.links.filter(keep),
  };
}

// ----- Tier-derived copy (architecture §4) -----

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** The name shown for a client: real name at the named tier, else the anonymised label. */
export function clientDisplayName(p: schema.Project): string {
  return p.client.nameApproved ? p.client.name : p.client.anonymisedLabel;
}

/** Hero proof line, e.g. "Built and running for a Ghanaian clearing and forwarding firm." */
export function getProofLine(p: schema.Project): string {
  const copy = getTierCopy().proofLine;
  const who = p.client.nameApproved ? p.client.name : lowerFirst(p.client.anonymisedLabel);
  return (p.status === "live" ? copy.live : copy.delivered).replace("{client}", who);
}

/** Caption under the HTML conversation. Undefined when the project has no approved conversation. */
export function getConversationCaption(p: schema.Project): string | undefined {
  if (!p.conversation) return undefined;
  const copy = getTierCopy();
  if (p.status !== "live") return copy.conversationCaption.delivered;
  if (!p.client.nameApproved) return copy.conversationCaption.anonymised;
  const short = copy.shortNames[p.slug];
  if (!short)
    throw new ContentError("src/content/tiers.ts", `shortNames has no entry for "${p.slug}".`);
  return copy.conversationCaption.named.replace("{short}", short);
}

/** Screen-reader speaker labels for the conversation, by tier. */
export function getSpeakerLabels(p: schema.Project) {
  const copy = getTierCopy();
  const short = copy.shortNames[p.slug];
  const assistant =
    p.client.nameApproved && short
      ? copy.speakerLabels.assistantNamed.replace("{short}", short)
      : copy.speakerLabels.assistantAnonymised;
  return { customer: copy.speakerLabels.customer, assistant };
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
  getHome();
  getCaseStudyCopy();
  getPrivacy();
  getContactCopy();
  getTierCopy();
  const services = getServices();
  const processContent = getProcess();
  const team = getTeam();
  const projects = readProjectFiles();
  for (const file of projects) await compileBody(file);

  // Every referenced image must exist as a source file (the pipeline needs it).
  const referenced = [
    ...team.members.flatMap((m) =>
      m.photo ? [{ src: m.photo.src, from: "src/content/team.ts" }] : [],
    ),
    ...projects.flatMap((f) => f.project.images.map((i) => ({ src: i.src, from: f.source }))),
  ];
  for (const { src, from } of referenced) {
    if (!existsSync(join(process.cwd(), src)))
      throw new ContentError(from, `image "${src}" does not exist. Add it under assets/images/.`);
  }

  return {
    services: services.items.length,
    steps: processContent.steps.length,
    teamMembers: team.members.length,
    projects: projects.length,
    published: projects.filter((f) => f.project.published).length,
  };
}
