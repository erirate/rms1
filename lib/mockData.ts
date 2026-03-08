// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export type VerificationLevel = 0 | 1 | 2;

export interface SitterSummary {
  id: string;
  name: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  initials: string;
  verificationLevel: VerificationLevel;
}

export interface CategoryRatings {
  reliability: number;
  communication: number;
  professionalism: number;
  childEngagement: number;
  safety: number;
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  tags: string[];
  comment: string;
  anonymous: boolean;
}

export interface SitterProfile extends SitterSummary {
  bio: string;
  ratings: CategoryRatings;
  reviews: Review[];
}

// ──────────────────────────────────────────────
// Review Tags (from playbook Stitch prompt)
// ──────────────────────────────────────────────

export const REVIEW_TAGS = [
  "Punctual",
  "Great with kids",
  "Communicative",
  "Patient",
  "Trustworthy",
  "CPR Certified",
  "Fun & Creative",
  "Pet Friendly",
  "Homework Help",
  "Bilingual",
];

// ──────────────────────────────────────────────
// Mock Sitters Grid (homepage)
// ──────────────────────────────────────────────

export const SITTERS: SitterSummary[] = [
  {
    id: "1",
    name: "Maria Gonzalez",
    city: "Washington",
    state: "DC",
    rating: 4.9,
    reviewCount: 47,
    initials: "MG",
    verificationLevel: 2,
  },
  {
    id: "2",
    name: "James Okafor",
    city: "Bethesda",
    state: "MD",
    rating: 4.7,
    reviewCount: 28,
    initials: "JO",
    verificationLevel: 1,
  },
  {
    id: "3",
    name: "Priya Nair",
    city: "Arlington",
    state: "VA",
    rating: 4.8,
    reviewCount: 35,
    initials: "PN",
    verificationLevel: 2,
  },
  {
    id: "4",
    name: "Tyler Brooks",
    city: "Alexandria",
    state: "VA",
    rating: 4.5,
    reviewCount: 19,
    initials: "TB",
    verificationLevel: 1,
  },
  {
    id: "5",
    name: "Sofia Reyes",
    city: "Silver Spring",
    state: "MD",
    rating: 4.6,
    reviewCount: 22,
    initials: "SR",
    verificationLevel: 0,
  },
  {
    id: "6",
    name: "Amara Washington",
    city: "Washington",
    state: "DC",
    rating: 4.3,
    reviewCount: 11,
    initials: "AW",
    verificationLevel: 0,
  },
  {
    id: "7",
    name: "Ethan Kim",
    city: "Rockville",
    state: "MD",
    rating: 4.8,
    reviewCount: 31,
    initials: "EK",
    verificationLevel: 2,
  },
  {
    id: "8",
    name: "Leila Hassan",
    city: "Reston",
    state: "VA",
    rating: 4.4,
    reviewCount: 14,
    initials: "LH",
    verificationLevel: 1,
  },
];

// ──────────────────────────────────────────────
// Full Sitter Profiles
// ──────────────────────────────────────────────

export const SITTER_PROFILES: Record<string, SitterProfile> = {
  "1": {
    id: "1",
    name: "Maria Gonzalez",
    city: "Washington",
    state: "DC",
    rating: 4.9,
    reviewCount: 47,
    initials: "MG",
    verificationLevel: 2,
    bio: "Professional childcare provider with 8+ years of experience caring for children ages 1–12. CPR and First Aid certified. Bilingual English/Spanish. I treat every child like my own — patient, nurturing, and always ready for a fun craft project or outdoor adventure.",
    ratings: {
      reliability: 5.0,
      communication: 4.9,
      professionalism: 4.8,
      childEngagement: 5.0,
      safety: 4.9,
    },
    reviews: [
      {
        id: "r1",
        author: "Rachel T.",
        date: "February 28, 2026",
        rating: 5,
        tags: ["Punctual", "Great with kids", "CPR Certified"],
        comment:
          "Maria is absolutely incredible. She arrived on time, had our kids laughing within minutes, and left the house tidier than we left it. We've rebooked for next month already!",
        anonymous: false,
      },
      {
        id: "r2",
        author: "David M.",
        date: "February 10, 2026",
        rating: 5,
        tags: ["Trustworthy", "Bilingual", "Patient"],
        comment:
          "Our daughter speaks mostly Spanish at home and Maria immediately connected with her. She handled a minor tantrum with incredible calm. Highly recommend.",
        anonymous: false,
      },
      {
        id: "r3",
        author: "",
        date: "January 22, 2026",
        rating: 4,
        tags: ["Fun & Creative"],
        comment:
          "Great sitter overall. She did an amazing arts and crafts session with my two boys. Would definitely use again.",
        anonymous: true,
      },
      {
        id: "r4",
        author: "Cynthia R.",
        date: "January 5, 2026",
        rating: 5,
        tags: ["Punctual", "Communicative"],
        comment:
          "Maria sent us photo updates throughout the evening and had both kids in bed on time. Exactly what we needed.",
        anonymous: false,
      },
    ],
  },

  "2": {
    id: "2",
    name: "James Okafor",
    city: "Bethesda",
    state: "MD",
    rating: 4.7,
    reviewCount: 28,
    initials: "JO",
    verificationLevel: 1,
    bio: "College student studying early childhood education. I've been babysitting since I was 16 and have cared for kids of all ages. I'm patient, energetic, and great at homework help. References available on request.",
    ratings: {
      reliability: 4.8,
      communication: 4.7,
      professionalism: 4.6,
      childEngagement: 4.9,
      safety: 4.7,
    },
    reviews: [
      {
        id: "r5",
        author: "Patricia L.",
        date: "March 1, 2026",
        rating: 5,
        tags: ["Homework Help", "Patient", "Great with kids"],
        comment:
          "James helped my 9-year-old finish his science project and apparently made it way more fun than I could have. He's now our go-to sitter.",
        anonymous: false,
      },
      {
        id: "r6",
        author: "Omar A.",
        date: "February 14, 2026",
        rating: 4,
        tags: ["Punctual", "Trustworthy"],
        comment:
          "Reliable and responsible. He followed our bedtime routine exactly as instructed and communicated well throughout the evening.",
        anonymous: false,
      },
      {
        id: "r7",
        author: "",
        date: "January 18, 2026",
        rating: 5,
        tags: ["Fun & Creative", "Great with kids"],
        comment: "My kids asked when James is coming back the moment he left. That says it all.",
        anonymous: true,
      },
    ],
  },

  "3": {
    id: "3",
    name: "Priya Nair",
    city: "Arlington",
    state: "VA",
    rating: 4.8,
    reviewCount: 35,
    initials: "PN",
    verificationLevel: 2,
    bio: "Experienced nanny and weekend sitter with 6 years caring for infants through pre-teens. Certified in infant CPR and pediatric first aid. I focus on structured routines, healthy meals, and creative play.",
    ratings: {
      reliability: 4.9,
      communication: 4.8,
      professionalism: 4.8,
      childEngagement: 4.8,
      safety: 5.0,
    },
    reviews: [
      {
        id: "r8",
        author: "Sunita K.",
        date: "February 22, 2026",
        rating: 5,
        tags: ["CPR Certified", "Safety oriented", "Punctual"],
        comment:
          "Priya is wonderfully attentive and keeps safety at the forefront without being overly restrictive. Our toddler loves her.",
        anonymous: false,
      },
      {
        id: "r9",
        author: "Ben H.",
        date: "February 3, 2026",
        rating: 5,
        tags: ["Communicative", "Trustworthy"],
        comment:
          "Priya checked in with updates throughout the evening. Really gave us peace of mind on our first night out since our baby was born.",
        anonymous: false,
      },
    ],
  },
};

// Fallback: return the first profile for any unknown ID
export function getSitterProfile(id: string): SitterProfile {
  return SITTER_PROFILES[id] ?? SITTER_PROFILES["1"];
}

export function getSitterSummary(id: string): SitterSummary {
  return SITTERS.find((s) => s.id === id) ?? SITTERS[0];
}
