export interface ClassItem {
  id: string;
  name: string;
  description: string;
  ageGroup: string;
  image: string;
  highlights: string[];
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface NavItem {
  name: string;
  href: string;
}