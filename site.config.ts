/**
 * Everything you'll want to edit without touching the layout lives here.
 * Empty strings hide the related buttons, so the WhatsApp and booking
 * options switch on automatically once you fill them in.
 */
export const site = {
  name: "Afrokan Labs",
  domain: "afrokanlabs.com",
  url: "https://afrokanlabs.com",
  tagline: ["Build", "Innovate", "Unlock Africa"],
  location: "Accra, Ghana",

  email: "hello@afrokanlabs.com",
  /** International format, digits only, e.g. "233201234567". Leave empty to hide. */
  whatsapp: "",
  /** e.g. "https://cal.com/afrokanlabs/intro". Leave empty to hide. */
  bookingUrl: "",

  social: {
    linkedin: "",
    x: "",
    instagram: "",
  },
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: string;
};

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
