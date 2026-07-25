export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  metrics?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
};

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type BudgetOption = {
  value: string;
  label: string;
};
