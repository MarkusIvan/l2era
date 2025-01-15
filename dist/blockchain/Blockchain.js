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
        console.log("✅ Ланцюг блоків ініціалізовано.");
    }
    createGenesisBlock() {
        const newBlock = new Block_1.Block(0, [], "0");
        console.log("🟢 Генезис-блок створено.");
        return newBlock;
    }
    getLastBlock() {
        const lastBlock = this.chain[this.chain.length - 1];
        console.log("🔎 Останній блок отримано:", lastBlock.index);
        return lastBlock;
    }
    addTransaction(transaction) {
        console.log(`➕ Додаємо транзакцію від ${transaction.sender} до ${transaction.receiver} на суму ${transaction.amount}`);
        if ((this.balances.get(transaction.sender) || 0) < transaction.amount) {
            throw new Error("❌ Недостатньо коштів для виконання транзакції.");
        }
        this.balances.set(transaction.sender, this.balances.get(transaction.sender) - transaction.amount);
        this.balances.set(transaction.receiver, (this.balances.get(transaction.receiver) || 0) + transaction.amount);
        console.log(`✅ Транзакція додана. Новий баланс відправника: ${this.balances.get(transaction.sender)}`);
        this.pendingTransactions.push(transaction);
        if (this.pendingTransactions.length >= this.miningThreshold) {
            this.minePendingTransactions();
        }
    }
    createWallet() {
        const wallet = ethers_1.Wallet.createRandom();
        console.log(`🎉 Створено гаманець: ${wallet.address}`);
        return {
            address: wallet.address,
            privateKey: wallet.privateKey
        };
    }
    getBalance(address) {
        const balance = this.balances.get(address) || 0;
        console.log(`💰 Баланс для ${address}: ${balance}`);
        return balance;
    }
    addBalance(address, amount) {
        const currentBalance = this.balances.get(address) || 0;
        this.balances.set(address, currentBalance + amount);
        console.log(`✅ Додано ${amount} до балансу адреси ${address}. Новий баланс: ${this.balances.get(address)}`);
    }
    minePendingTransactions() {
        console.log("⛏️ Початок майнінгу...");
        const newBlock = new Block_1.Block(this.getLastBlock().index + 1, this.pendingTransactions, this.getLastBlock().hash);
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        console.log(`🟢 Блок з індексом ${newBlock.index} додано до ланцюга.`);
        this.pendingTransactions = [];
    }
    validateChain() {
        console.log("🔍 Початок перевірки ланцюга...");
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.log(`❌ Помилка: Хеш блоку ${currentBlock.index} є некоректним.`);
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log(`❌ Помилка: Попередній хеш для блоку ${currentBlock.index} не відповідає.`);
                return false;
            }
        }
        console.log("✅ Ланцюг блоків валідний.");
        return true;
    }
}
exports.Blockchain = Blockchain;
