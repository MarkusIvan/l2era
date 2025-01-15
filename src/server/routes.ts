import { Router } from "express";
import { Blockchain } from "../blockchain/Blockchain";
import { Transaction } from "../blockchain/Transaction";
import { Wallet } from "ethers";

const router = Router();
const blockchain = new Blockchain();

// Створення нового гаманця
router.get("/create-wallet", (req, res) => {
    const wallet = Wallet.createRandom();
    res.json({
        address: wallet.address,
        privateKey: wallet.privateKey
    });
});

// Додавання транзакції
router.post("/add-transaction", (req, res) => {
    const { sender, receiver, amount } = req.body;

    if (!sender || !receiver || !amount) {
        return res.status(400).json({ error: "Invalid transaction data" });
    }

    const transaction = new Transaction(sender, receiver, amount);
    blockchain.addTransaction(transaction);

    res.status(201).json({ message: "Transaction added successfully", transaction });
});

// Майнінг блоку вручну
router.get("/mine", (req, res) => {
    blockchain.minePendingTransactions();
    res.json({ message: "Block mined successfully", blockchain: blockchain.chain });
});

// Отримання всього блокчейну
router.get("/chain", (req, res) => {
    res.json(blockchain.chain);
});

export default router;
