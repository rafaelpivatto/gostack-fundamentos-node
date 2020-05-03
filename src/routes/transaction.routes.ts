import { Router } from 'express';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (_, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = new Transaction({ title, value, type });

    return response.json(createTransaction.execute(transaction));
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
