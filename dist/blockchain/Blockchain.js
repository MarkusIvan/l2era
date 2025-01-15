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
        this.balances = new Map();
        const developerWallet = this.createWallet(); // Створюємо головний гаманець
        this.balances.set(developerWallet.address, 1000000); // Присвоюємо йому баланс
        console.log(`Головний гаманець: ${developerWallet.address}, Баланс: 1000000`);
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
        this.balances.set(transaction.sender, this.balances.get(transaction.sender) - transaction.amount);
        this.balances.set(transaction.receiver, (this.balances.get(transaction.receiver) || 0) + transaction.amount);
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
    minePendingTransactions() {
        const newBlock = new Block_1.Block(this.getLastBlock().index + 1, this.pendingTransactions, this.getLastBlock().hash);
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        console.log(`Block added to the chain with index: ${newBlock.index}`);
        this.pendingTransactions = [];
    }
}
exports.Blockchain = Blockchain;
