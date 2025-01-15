"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
const ethers_1 = require("ethers");
const Block_1 = require("./Block");
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningThreshold = 5;
        this.balances = new Map(); // Баланси всіх гаманців
    }
    createGenesisBlock() {
        const newBlock = new Block_1.Block(0, [], "0");
        return newBlock;
    }
    getLastBlock() {
        const lastBlock = this.chain[this.chain.length - 1];
        return lastBlock;
    }
    addTransaction(transaction) {
        if (this.balances.get(transaction.sender) < transaction.amount) {
            throw new Error("Недостатньо коштів");
        }
        this.balances.set(transaction.sender, this.balances.get(transaction.sender) - transaction.amount); // Мотод віднімання коштів з сендера
        this.balances.set(transaction.receiver, (this.balances.get(transaction.receiver) || 0) + transaction.amount); // Метод додавання до отримувача
        this.pendingTransactions.push(transaction);
        if (this.pendingTransactions.length >= this.miningThreshold) {
            this.minePendingTransactions();
        }
    }
    createWallet() {
        const wallet = ethers_1.Wallet.createRandom();
        return {
            address: wallet.address,
            privateKey: wallet.privateKey
        };
    }
    getBalance(address) {
        return this.balances.get(address) || 0; // Якщо адресу не знайдено, повертаємо 0
    }
    addBalance(address, amount) {
        const currentBalance = this.balances.get(address) || 0;
        this.balances.set(address, currentBalance + amount);
        console.log(`Added ${amount} to address ${address}. \nNew balance: ${this.balances.get(address)}`);
    }
    minePendingTransactions() {
        const newBlock = new Block_1.Block(this.getLastBlock().index + 1, this.pendingTransactions, this.getLastBlock().hash);
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        console.log(`Block added to the chain with index: ${newBlock.index}`);
        this.pendingTransactions = [];
    }
    toJSON() {
        return {
            chain: this.chain,
            difficulty: this.difficulty,
            pendingTransactions: this.pendingTransactions,
            miningThreshold: this.miningThreshold,
            balances: Object.fromEntries(this.balances), // Конвертуємо Map у звичайний об'єкт
        };
    }
}
exports.Blockchain = Blockchain;
