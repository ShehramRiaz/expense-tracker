import type { TransactionType } from "./transaction";

export type TransactionTypeFilter = TransactionType | "all";

export type TransactionSortOrder =
  | "newest"
  | "oldest"
  | "amount-high"
  | "amount-low";
