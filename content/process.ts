export type Step = {
  title: string;
  body: string;
};

export const processTitle = "How a project runs";

export const steps: Step[] = [
  { title: "Discovery call", body: "We learn how your business runs today and where time or money leaks out." },
  { title: "Plan and quote", body: "You get a clear scope, timeline and fixed price before any work starts." },
  { title: "Build in short cycles", body: "We show you working pieces every week, so there are no surprises at the end." },
  { title: "Launch and support", body: "We go live with you, train your team, and stay on hand as you grow." },
];
