interface Service {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  description: string;
  title: string;
  localizations: [];
  constrictions: [];
}
