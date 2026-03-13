export interface Section {
  id: string;
  title: string;
  icon: string;
  badge: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  content: string;
}

export interface CodeExample {
  language: string;
  title: string;
  code: string;
}

export interface ComparisonItem {
  feature: string;
  dart: string;
  go: string;
  impact?: string;
}