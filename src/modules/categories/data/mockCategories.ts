import { Category } from "../types";

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "One time visitor",
    color: "#0071E3",
    createdAt: "24.01.2021",
    description: "Visitors who come for a single visit"
  },
  {
    id: "2", 
    name: "Regular visitor-long term",
    color: "#FF6B35",
    createdAt: "24.01.2021",
    description: "Frequent visitors with long-term access"
  },
  {
    id: "3",
    name: "VIP",
    color: "#8B5CF6",
    createdAt: "24.01.2021",
    description: "High priority visitors requiring special treatment"
  },
  {
    id: "4",
    name: "parents/customer",
    color: "#10B981",
    createdAt: "24.01.2021",
    description: "Parents or customers of the organization"
  },
  {
    id: "5",
    name: "Regulatory authority",
    color: "#EF4444",
    createdAt: "24.01.2021",
    description: "Government or regulatory officials"
  },
  {
    id: "6",
    name: "Supplier/contractor",
    color: "#F59E0B",
    createdAt: "24.01.2021",
    description: "External suppliers and contractors"
  },
];
