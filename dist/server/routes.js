"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Blockchain_1 = require("../blockchain/Blockchain");
const Transaction_1 = require("../blockchain/Transaction");
const ethers_1 = require("ethers");
const router = (0, express_1.Router)();
const blockchain = new Blockchain_1.Blockchain();
// Створення нового гаманця
router.get("/create-wallet", (req, res) => {
    const wallet = ethers_1.Wallet.createRandom();
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
    const transaction = new Transaction_1.Transaction(sender, receiver, amount);
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
exports.default = router;
