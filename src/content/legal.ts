import type { z } from "zod";
import type { Legal } from "./schema";

/**
 * Privacy Policy and Terms of Use. Source: the site handoff's
 * reference/privacy.html and terms.html: plain-language drafts, pending review
 * by a Ghanaian lawyer (TODO.md). Remove `draft` once reviewed. The only
 * source for /privacy; analytics wording (Cloudflare Web Analytics) added
 * 2026-10-21.
 * In text: **bold**, [label](/path), and {email} / {domain} from site.ts.
 */
export const legal = {
  privacy: {
    meta: {
      title: "Privacy Policy",
      description:
        "How Afrokan Labs collects, uses and protects your information when you visit our website, contact us on WhatsApp or by email, or work with us.",
    },
    kicker: "Legal · Privacy",
    heading: { lead: "Privacy ", mark: "policy" },
    intro:
      "How Afrokan Labs collects, uses and protects your personal information when you visit our website or work with us.",
    updated: "Last updated: 22 October 2026",
    place: "Afrokan Labs · Accra, Ghana",
    draft: "Draft: pending legal review",
    tocLabel: "On this page",
    sections: [
      {
        title: "Who we are",
        blocks: [
          {
            p: "Afrokan Labs (“we”, “us”) is an AI and software studio based in Accra, Ghana. We build WhatsApp AI assistants, websites, workflow tools and backend systems for businesses. This policy explains how we handle personal information collected through **{domain}** and when you contact us.",
          },
          {
            p: "Afrokan Labs is run by its founders, Franklin Asare Wiafe, Kwabena Mawuli and Samuel Antwi, in Accra, Ghana. Contact: **{email}**.",
          },
          { p: "For any privacy question, email **{email}**." },
        ],
      },
      {
        title: "What we collect",
        blocks: [
          {
            ul: [
              "**Contact form**: your name, an email address or WhatsApp number for our reply, and your message. If you choose to, also your company, phone number and what you need help with. The form also records which page you sent it from and which page of our site you arrived from.",
              "**Messages you send us directly**: whatever you include when you email us or message us on WhatsApp.",
              "**Project information**: documents, requirements and other material you share with us so we can scope or build a project.",
              "**Basic technical data**: information your browser sends automatically, such as device type, pages visited and approximate location. We count visits with Cloudflare Web Analytics (see Analytics below).",
              "**Your theme choice**: if you switch between light and dark mode, your browser remembers the choice locally. It is not sent to us.",
            ],
          },
          {
            p: "This website and our services are for businesses and adults. They are not aimed at anyone under 18, and we do not knowingly collect personal information from anyone under 18. If you believe someone under 18 has sent us their information, email **{email}** and we will delete it.",
          },
          {
            p: "We do not ask for sensitive information such as health or financial details through this website.",
          },
        ],
      },
      {
        title: "Analytics",
        blocks: [
          {
            p: "We use **Cloudflare Web Analytics** to see how the site is used. It doesn’t use cookies, and it gives us aggregated page-view data only, processed by Cloudflare:",
          },
          {
            ul: [
              "which pages are visited, and which site linked to them",
              "the type of browser and device, and the country the visit came from",
              "how quickly pages load",
            ],
          },
          {
            p: "This data is aggregated and does not identify you. Cloudflare decides how long it is kept, under its [privacy policy](https://www.cloudflare.com/privacypolicy/).",
          },
        ],
      },
      {
        title: "Spam protection",
        blocks: [
          {
            p: "Our contact page uses **Cloudflare Turnstile** to check that a form is sent by a person, not a bot. To do that, Turnstile reads signals from your browser and device, such as how the page was loaded and interacted with, and Cloudflare processes them under its [privacy policy](https://www.cloudflare.com/privacypolicy/). It runs only on the contact page, and we receive only a pass or fail result.",
          },
        ],
      },
      {
        title: "How we use it",
        blocks: [
          {
            ul: [
              "To reply to your enquiry and talk about a possible project.",
              "To prepare plans, quotes and contracts, and to deliver and support the work you hire us for.",
              "To keep the website secure and working properly.",
              "To send you updates or articles, only if you have asked to receive them. You can unsubscribe at any time.",
            ],
          },
          { p: "We do not sell your personal information, and we do not use it for advertising." },
        ],
      },
      {
        title: "Legal basis",
        blocks: [
          {
            p: "We process personal information in line with Ghana’s **Data Protection Act, 2012 (Act 843)**. Depending on the situation, we rely on your consent (for example when you submit the contact form), on the steps needed to enter into or perform a contract with you, or on our legitimate interest in running and securing our business.",
          },
        ],
      },
      {
        title: "Who we share it with",
        blocks: [
          {
            p: "We share information only when needed to provide our services, with providers that help us operate, such as:",
          },
          {
            ul: [
              "**Cloudflare**, which hosts this website (Cloudflare Pages), runs the contact form, and provides Turnstile and Web Analytics.",
              "**Resend**, which delivers contact form messages to our inbox and sends you an automatic confirmation email when you give us an email address.",
              "**Namecheap Private Email** (Namecheap, Inc.), which hosts our {email} inbox and stores the messages we receive.",
              "WhatsApp (Meta), when you choose to contact us on WhatsApp.",
              "Form or newsletter services, if and when we connect them.",
            ],
          },
          {
            p: "Some of these providers, including Cloudflare, Resend, Namecheap Private Email (Namecheap, Inc.) and WhatsApp (Meta), may process or store data outside Ghana. Where that happens we choose reputable providers with appropriate safeguards. We may also disclose information if required by law.",
          },
        ],
      },
      {
        title: "Client projects and AI tools",
        blocks: [
          {
            p: "When we build tools for a client, such as a WhatsApp assistant, the client decides what data the tool uses and is responsible for its own customers’ data. We act on the client’s instructions, keep that data confidential, and use it only to build, run and support the tool. Details are set out in each project agreement.",
          },
        ],
      },
      {
        title: "How long we keep it",
        blocks: [
          {
            // Retention follows Act 843 instead of a fixed period (decided 2026-10-18).
            p: "As the Data Protection Act, 2012 (Act 843) requires, we keep personal information only for as long as we need it for the purpose we collected it for, unless the law or a contract requires us to keep it longer, or you agree that we can. Project records, for example, are kept for as long as needed to support the work and meet legal and tax obligations. After that we delete or anonymise them.",
          },
          {
            p: "**Enquiries.** If you contact us through the form, by email or on WhatsApp and it doesn't lead to a project, we delete your message and contact details within 12 months of our last exchange. If it does lead to a project, it becomes part of the project records described above.",
          },
        ],
      },
      {
        title: "Your rights",
        blocks: [
          { p: "Under Act 843 you can ask us to:" },
          {
            ul: [
              "Tell you what personal information we hold about you and give you a copy.",
              "Correct information that is wrong or out of date.",
              "Delete your information or stop using it, where there is no reason for us to keep it.",
              "Object to us using your information for direct marketing. If you do, we will stop, at no cost to you. Every marketing email also includes a way to unsubscribe.",
              "Object to decisions about you made solely by automated processing. We don't make decisions about you that are based solely on automated processing and have legal or similarly significant effects. If that ever changes, we will tell you, and you can ask for a person to review the decision.",
            ],
          },
          {
            p: "These rights come from the Data Protection Act, 2012 (Act 843), including sections 40 and 41.",
          },
          {
            p: "**To ask us to delete your information**, email **{email}** from the email address or WhatsApp number you contacted us with, and say what you would like deleted. We will confirm once it is done, or explain why we need to keep any of it.",
          },
          {
            p: "For any other request, email **{email}** and we will respond within a reasonable time. If you are not satisfied, you can contact Ghana’s **Data Protection Commission**.",
          },
        ],
      },
      {
        title: "Security",
        blocks: [
          {
            p: "We use reasonable technical and organisational measures to protect personal information, such as access controls and encrypted connections. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.",
          },
        ],
      },
      {
        title: "Changes to this policy",
        blocks: [
          {
            p: "We may update this policy from time to time. The date at the top shows when it last changed. Significant changes will be highlighted on this page.",
          },
        ],
      },
    ],
    note: "This document is a plain-language draft prepared for Afrokan Labs. It is not legal advice and should be reviewed by a qualified lawyer in Ghana before the site goes live.",
    other: { label: "Read our Terms of Use →", href: "/terms" },
  },
  terms: {
    meta: {
      title: "Terms of Service",
      description:
        "The rules for using the Afrokan Labs website, what its content does and doesn’t promise, and how our written proposals and project agreements fit in.",
    },
    kicker: "Legal · Terms",
    heading: { lead: "Terms of ", mark: "use" },
    intro: "The rules for using the Afrokan Labs website, and how our project agreements fit in.",
    updated: "Last updated: 22 October 2026",
    place: "Afrokan Labs · Accra, Ghana",
    draft: "Draft: pending legal review",
    tocLabel: "On this page",
    sections: [
      {
        title: "About these terms",
        blocks: [
          {
            p: "These terms apply to your use of **{domain}**, run by Afrokan Labs, an AI and software studio based in Accra, Ghana. Afrokan Labs is run by its founders, Franklin Asare Wiafe, Kwabena Mawuli and Samuel Antwi, in Accra, Ghana. Contact: **{email}**. By using the site, you agree to them. If you hire us for a project, the written proposal or contract for that project also applies, and it takes priority if anything conflicts.",
          },
        ],
      },
      {
        title: "Using this website",
        blocks: [
          {
            ul: [
              "Use the site lawfully and do not try to disrupt it, access it without permission, or copy it in bulk.",
              "Do not submit false information or anything harmful through our forms.",
              "We may change, pause or remove parts of the site at any time.",
            ],
          },
        ],
      },
      {
        title: "Information on the site",
        blocks: [
          {
            p: "Content on this site, including service descriptions, examples, articles and illustrations, is general information about what we do. It is not a binding offer. Examples such as the sample WhatsApp conversation are illustrations, not real customer data. Prices, timelines and scope are only confirmed in a written proposal.",
          },
        ],
      },
      {
        title: "Working with us",
        blocks: [
          {
            p: "Each project follows the process described on our site: a free first conversation, then a written plan with scope, timeline and price that you approve before work begins. Payment terms, deliverables, ownership of the finished work, and support after launch are set out in that project’s agreement.",
          },
        ],
      },
      {
        title: "Intellectual property",
        blocks: [
          {
            p: "The Afrokan Labs name, logo, website design, text and graphics belong to Afrokan Labs unless stated otherwise. You may share links to our pages, but you may not reuse our branding or content without permission. Client names and work shown in our case studies appear with the client’s permission.",
          },
        ],
      },
      {
        title: "Third-party services and links",
        blocks: [
          {
            p: "The site links to services we do not control, such as WhatsApp, LinkedIn and other websites. We are not responsible for their content or policies, and your use of them is governed by their own terms.",
          },
        ],
      },
      {
        title: "Our liability",
        blocks: [
          {
            p: "We work to keep the site accurate and available, but it is provided “as is”. To the extent allowed by Ghanaian law, we are not liable for indirect losses arising from use of this website. Nothing in these terms limits liability that cannot be limited by law. Liability for project work is governed by the project agreement.",
          },
        ],
      },
      {
        title: "Privacy",
        blocks: [
          {
            p: "How we handle personal information is explained in our [Privacy Policy](/privacy).",
          },
        ],
      },
      {
        title: "Governing law",
        blocks: [
          {
            p: "These terms are governed by the laws of the Republic of Ghana. Any dispute will first be discussed in good faith, and if it cannot be resolved, it will be handled by the courts of Ghana.",
          },
        ],
      },
      {
        title: "Changes and contact",
        blocks: [
          {
            p: "We may update these terms from time to time; the date at the top shows the latest version. Questions? Email **{email}**.",
          },
        ],
      },
    ],
    note: "This document is a plain-language draft prepared for Afrokan Labs. It is not legal advice and should be reviewed by a qualified lawyer in Ghana before the site goes live.",
    other: { label: "Read our Privacy Policy →", href: "/privacy" },
  },
} satisfies z.input<typeof Legal>;
