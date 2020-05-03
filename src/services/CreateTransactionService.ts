import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ id, title, type, value }: Transaction): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw Error(
        'Error to create outcome transaction without a positive balance',
      );
    }

    const transaction = this.transactionsRepository.create({
      id,
      title,
      type,
      value,
    });
    return transaction;
  }
}

export default CreateTransactionService;
