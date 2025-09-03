export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  description?: string;
}

export interface CategoryFormData {
  name: string;
  color: string;
  description?: string;
}
