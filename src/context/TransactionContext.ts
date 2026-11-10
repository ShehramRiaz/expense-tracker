import { createContext } from "react";
import type { TransactionContextValue } from "../types/transactionContext";

export const TransactionContext = createContext<TransactionContextValue | null>(null);
