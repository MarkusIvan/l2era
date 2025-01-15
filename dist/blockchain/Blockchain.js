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
        console.log("Blockchain initialized!");
    }
    createGenesisBlock() {
        console.log("Creating genesis block...");
        const newBlock = new Block_1.Block(0, [], "0");
        console.log("Genesis block created:", newBlock);
        return newBlock;
    }
    getLastBlock() {
        const lastBlock = this.chain[this.chain.length - 1];
        console.log("Fetching last block:", lastBlock);
        return lastBlock;
    }
    addTransaction(transaction) {
        console.log("Adding transaction:", transaction);
        if (this.balances.get(transaction.sender) < transaction.amount) {
            console.error(`Transaction failed. Sender ${transaction.sender} has insufficient funds.`);
            throw new Error("Недостатньо коштів");
        }
        this.balances.set(transaction.sender, this.balances.get(transaction.sender) - transaction.amount);
        this.balances.set(transaction.receiver, (this.balances.get(transaction.receiver) || 0) + transaction.amount);
        console.log(`Transaction added successfully. Sender: ${transaction.sender}, Receiver: ${transaction.receiver}, Amount: ${transaction.amount}`);
        this.pendingTransactions.push(transaction);
        if (this.pendingTransactions.length >= this.miningThreshold) {
            console.log("Transaction threshold reached. Mining block...");
            this.minePendingTransactions();
        }
    }
    createWallet() {
        console.log("Creating new wallet...");
        const wallet = ethers_1.Wallet.createRandom();
        console.log("Wallet created:", wallet.address);
        return {
            address: wallet.address,
            privateKey: wallet.privateKey
        };
    }
    getBalance(address) {
        const balance = this.balances.get(address) || 0;
        console.log(`Balance fetched for address ${address}: ${balance}`);
        return balance;
    }
    addBalance(address, amount) {
        console.log(`Adding balance. Address: ${address}, Amount: ${amount}`);
        const currentBalance = this.balances.get(address) || 0;
        this.balances.set(address, currentBalance + amount);
        console.log(`Balance updated for address ${address}: ${this.balances.get(address)}`);
    }
    minePendingTransactions() {
        console.log("Starting mining process...");
        const newBlock = new Block_1.Block(this.getLastBlock().index + 1, this.pendingTransactions, this.getLastBlock().hash);
        newBlock.mineBlock(this.difficulty);
        console.log(`Block mined successfully: ${newBlock.hash}`);
        this.chain.push(newBlock);
        console.log(`Block added to the chain with index: ${newBlock.index}`);
        this.pendingTransactions = [];
    }
    validateChain() {
        console.log("Validating blockchain integrity...");
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.error(`Block ${currentBlock.index} has an invalid hash.`);
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                console.error(`Block ${currentBlock.index} has an invalid previous hash.`);
                return false;
            }
            for (const tx of currentBlock.transactions) {
                if (!this.isTransactionValid(tx)) {
                    console.error(`Block ${currentBlock.index} contains an invalid transaction.`);
                    return false;
                }
            }
        }
        console.log("Blockchain is valid.");
        return true;
    }
    isTransactionValid(transaction) {
        const senderBalance = this.balances.get(transaction.sender) || 0;
        const isValid = senderBalance >= transaction.amount;
        console.log(`Transaction validation for ${transaction.sender} -> ${transaction.receiver} (${transaction.amount}): ${isValid}`);
        return isValid;
    }
}
exports.Blockchain = Blockchain;
