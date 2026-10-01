export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Path under /public. Leave empty to show a placeholder. */
  photo: string;
};

export const teamTitle = "The team";

export const team: TeamMember[] = [
  {
    name: "Franklin Wiafe",
    role: "Founder & CEO",
    bio: "Franklin leads Afrokan Labs from the first client call to the final deploy. He studies Information Technology at the University of Ghana and researches human-computer interaction, which shapes how the team designs tools people actually enjoy using.",
    photo: "/team/franklin-wiafe.jpg",
  },
  // Add teammates here. Use the same light-gray backdrop and head-and-shoulders crop.
  // {
  //   name: "Full Name",
  //   role: "Role",
  //   bio: "One or two sentences.",
  //   photo: "/team/full-name.jpg",
  // },
];

export const joinCard = {
  title: "We're growing",
  body: "We work with engineers, designers and data people who want to build for African businesses.",
  linkLabel: "Get in touch",
  emailSubject: "Joining Afrokan Labs",
};
