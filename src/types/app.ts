import type { Transaction } from "./transaction";

export interface AppOutletContext {
  openTransactionModal: () => void;
  openEditTransactionModal: (transaction: Transaction) => void;
}
