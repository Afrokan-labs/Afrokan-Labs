import type { z } from "zod";
import type { Solutions } from "./schema";

/** Solutions page copy. Source: the site handoff's reference/solutions.html (approved). */
export const solutions = {
  meta: {
    title: "Solutions",
    description:
      "See a business day that runs itself: enquiries answered, checklists sent, orders tracked. Tools for clearing firms, shops, schools, clinics and restaurants.",
  },
  poster: {
    label:
      "Four moments in a business day: enquiry answered at 6:42 am, checklist sent at 9:15 am, order tracked at 1:30 pm, daily report ready at 6:00 pm",
    pillTime: "@ {time}",
    kicker: ["Serve customers, run the office,", "sleep well…"],
    heading: { lead: "A business day that ", bold: "runs itself" },
    tagline: { tag: "#BuiltForGhana", rest: " for the businesses that never stop." },
  },
  day: {
    heading: { lead: "One day, ", mark: "four moments" },
    body: "Here's how our tools fit into an ordinary working day. Each moment is something a business owner used to handle by hand.",
    labels: { before: "Before", with: "With Afrokan" },
    moments: [
      {
        time: "6:42 am",
        title: "Enquiry answered",
        before:
          "A customer messages before the office opens and waits hours for a reply, or goes elsewhere.",
        with: "The WhatsApp assistant answers straight away from your own documents and prices.",
        tool: "WhatsApp AI Assistant",
      },
      {
        time: "9:15 am",
        title: "Checklist sent",
        before: "Staff explain the same document requirements on the phone, again and again.",
        with: "The customer gets an exact checklist of what they need, generated in seconds.",
        tool: "Workflow Tool",
      },
      {
        time: "1:30 pm",
        title: "Order tracked",
        before:
          "Updates live in paper files and someone's memory, so customers keep calling to ask.",
        with: "Every job has a status your team updates once, and everyone sees the same thing.",
        tool: "Backend System",
      },
      {
        time: "6:00 pm",
        title: "Daily report ready",
        before: "The owner pieces the day together from calls and chats, late into the evening.",
        with: "A short summary of enquiries and jobs is waiting on the owner's phone.",
        tool: "Dashboard",
      },
    ],
  },
  industries: {
    heading: { lead: "Built for businesses ", mark: "like yours" },
    body: "We've delivered for clearing and forwarding. The same tools fit any business that answers the same questions every day. Open an industry to see how.",
  },
} satisfies z.input<typeof Solutions>;
