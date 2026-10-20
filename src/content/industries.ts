import type { z } from "zod";
import type { Industries } from "./schema";

/**
 * Solutions "Built for businesses like yours": the industry index. Source:
 * site update 4 §1 (reference/solutions.html). Only clearing and forwarding
 * is delivered (ESE, name approved in writing); the chats are illustrative.
 */
export const industries = {
  status: { delivered: "Delivered", fit: "Good fit" },
  labels: {
    chat: "Example WhatsApp conversation",
    question: "The question you get every day",
    assistant: "Your assistant",
    built: "What we built",
    wouldBuild: "What we'd build",
    changes: "What changes",
  },
  items: [
    {
      name: "Clearing & forwarding",
      status: "delivered",
      question: "Which documents do I need to clear my car?",
      reply: "Here's your checklist for a vehicle: Bill of Lading, Commercial Invoice, …",
      tools: [
        { label: "WhatsApp AI assistant", icon: "chat" },
        { label: "Checklist generator", icon: "checklist" },
        { label: "Company website", icon: "browser" },
      ],
      changes:
        "Customers get their exact document list straight away, and staff stop explaining it on the phone again and again.",
      note: "Built for ESE Logistic Solution Ltd.",
      cta: { label: "See the case study", href: "/work#cases" },
    },
    {
      name: "Retail & shops",
      status: "fit",
      question: "Do you have this in size 42? How much?",
      reply: "Yes, size 42 is in stock at GH₵ … Want me to hold one for you?",
      tools: [
        { label: "WhatsApp AI assistant", icon: "chat" },
        { label: "Order tracker", icon: "box" },
        { label: "Shop website", icon: "browser" },
      ],
      changes:
        "Price and stock questions get answered at any hour, and orders live in one list instead of a notebook.",
      cta: { label: "Talk to us about retail", href: "/contact" },
    },
    {
      name: "Schools",
      status: "fit",
      question: "When is the fees deadline? Are admissions open?",
      reply: "Admissions for next term are open. The fees deadline is …",
      tools: [
        { label: "WhatsApp AI assistant", icon: "chat" },
        { label: "Parent notices", icon: "bell" },
        { label: "Admissions form", icon: "form" },
      ],
      changes:
        "Parents get answers without calling the office, and admissions come in through one simple form.",
      cta: { label: "Talk to us about schools", href: "/contact" },
    },
    {
      name: "Clinics & pharmacies",
      status: "fit",
      question: "Are you open on Sunday? Can I book for tomorrow?",
      reply: "We're open 10am to 2pm on Sundays. Tomorrow has slots at 9:00 and 11:30.",
      tools: [
        { label: "WhatsApp AI assistant", icon: "chat" },
        { label: "Booking tool", icon: "calendar" },
      ],
      changes:
        "Opening hours and bookings are handled any time of day, so front-desk staff can focus on patients.",
      cta: { label: "Talk to us about clinics", href: "/contact" },
    },
    {
      name: "Real estate",
      status: "fit",
      question: "Is the 2-bedroom in East Legon still available?",
      reply: "Yes, it's available. Would you like to book a viewing this week?",
      tools: [
        { label: "Listings website", icon: "browser" },
        { label: "WhatsApp AI assistant", icon: "chat" },
        { label: "Viewing bookings", icon: "calendar" },
      ],
      changes:
        "Serious buyers get answers and book viewings themselves, and your team follows up with the warm leads.",
      cta: { label: "Talk to us about property", href: "/contact" },
    },
    {
      name: "Restaurants & catering",
      status: "fit",
      question: "Can you cater for 80 people on Saturday?",
      reply: "We can. Here are our catering packages for 80 guests …",
      tools: [
        { label: "WhatsApp orders", icon: "chat" },
        { label: "Order dashboard", icon: "chart" },
      ],
      changes:
        "Orders and event bookings arrive on WhatsApp and show up in one list your kitchen can follow.",
      cta: { label: "Talk to us about food", href: "/contact" },
    },
  ],
} satisfies z.input<typeof Industries>;
