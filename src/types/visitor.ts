export type VisitorRole = 
  | 'recruiter-headhunter'
  | 'potential-client'
  | 'consulting-partner'
  | 'investor-advisor'
  | 'curious'
  | 'other';

export type RoleKey = 'default' | 'recruiter' | 'client' | 'partner' | 'investor' | 'curious' | 'other';

export const ROLE_KEY_MAP: Record<VisitorRole, RoleKey> = {
  'recruiter-headhunter': 'recruiter',
  'potential-client': 'client',
  'consulting-partner': 'partner',
  'investor-advisor': 'investor',
  'curious': 'curious',
  'other': 'other'
};

export const ROLE_OPTIONS: { key: RoleKey; label: string }[] = [
  { key: "recruiter", label: "Recruiter" },
  { key: "client", label: "Potential client" },
  { key: "partner", label: "Consulting partner / Agency" },
  { key: "investor", label: "Investor / Advisor" },
  { key: "curious", label: "Curious visitor" },
  { key: "other", label: "Other" },
];

export const ROLE_SUGGESTED_QUESTIONS: Record<RoleKey, string[]> = {
  default: [
    "Who is Baptiste Leroux and what does he do?",
    "What kind of missions does he usually take on as PM / PMO / CTO / CPTO?",
    "In what situations does it make sense to work with him?",
  ],

  recruiter: [
    "What types of interim PMO / CTO / CPTO missions does Baptiste usually take?",
    "In what kinds of organizations and sectors has he delivered successful missions?",
    "Can you summarize his key achievements and typical impact on assignments?",
  ],

  client: [
    "In what ways can Baptiste help a company like ours with digital transformation or IT governance?",
    "What does a typical engagement with Baptiste look like, from first contact to delivery?",
    "How does he work with internal teams (IT, product, business) to drive measurable outcomes?",
  ],

  partner: [
    "How can Baptiste collaborate with us on client projects (roles, scope, responsibilities)?",
    "What experience does he have setting up and managing offshore or hybrid delivery teams?",
    "What types of partnership models does he usually consider with consulting firms or agencies?",
  ],

  investor: [
    "How can Baptiste support a board or C-level team in assessing and reorganizing IT and digital delivery?",
    "What experience does he have running technology or software due diligence for startups and scale-ups?",
    "How does he advise on building offshore or hybrid engineering teams to scale software development and innovation?",
  ],

  curious: [
    "What is Baptiste's experience with outsourcing and offshore development teams?",
    "How broad is his technology knowledge across stacks, tools, and platforms?",
    "How does his background combine corporate consulting with startup and scale-up environments?",
  ],

  other: [
    "Who is Baptiste Leroux and what does he do?",
    "What kind of missions does he usually take on as PM / PMO / CTO / CPTO?",
    "In what situations does it make sense to work with him?",
  ],
};

export type VisitorIndustry =
  | 'technology-saas'
  | 'finance-banking'
  | 'insurance'
  | 'manufacturing'
  | 'healthcare-medical'
  | 'events-conference'
  | 'education-edtech'
  | 'environmental-agritech'
  | 'aviation-aerospace'
  | 'ngo-social'
  | 'hospitality-etourism'
  | 'ecommerce-retail'
  | 'government-public'
  | 'other';

export type VisitorInterest =
  | 'it-strategy'
  | 'cto-cpto-advisory'
  | 'pmo'
  | 'digital-factory'
  | 'saas-development'
  | 'software-architecture'
  | 'offshoring-outsourcing'
  | 'business-intelligence'
  | 'ux-ui-product'
  | 'interim-roles'
  | 'digital-transformation'
  | 'other';

export type CompanySize = 'startup' | 'sme' | 'enterprise';

export interface VisitorProfile {
  roleKey: RoleKey;
  role: string;
  visitorRole: VisitorRole;
  industry: VisitorIndustry;
  interests: VisitorInterest[];
  companySize?: CompanySize;
  timestamp: number;
}

export interface SuggestedQuestion {
  text: string;
  category: string;
}
