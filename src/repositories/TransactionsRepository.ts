import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((t, { value }) => t + value, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((t, { value }) => t + value, 0);

    return { income, outcome, total: income - outcome };
  }

  public create({ id, title, type, value }: Transaction): Transaction {
    const transaction = { id, title, type, value };
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
