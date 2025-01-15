import { Wallet } from "ethers";
import { Transaction } from "./Transaction";
import { Block } from "./Block";

export class Blockchain {
    chain: Block[];
    difficulty: number;
    pendingTransactions: Transaction[];
    miningThreshold: number;
    balances: Map<string, number>; // Зберігаємо баланс для кожного гаманця

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningThreshold = 5;
        this.balances = new Map<string, number>(); // Баланси всіх гаманців
    }

    createGenesisBlock(): Block { // Метод з ethers             
        const newBlock = new Block(0, [], "0");
        return newBlock;
    }

    getLastBlock(): Block {
        const lastBlock = this.chain[this.chain.length - 1];
        return lastBlock;
    }
    
    addTransaction(transaction: Transaction): void {
        if (this.balances.get(transaction.sender)! < transaction.amount) {
            throw new Error("Недостатньо коштів");
        }
        this.balances.set(transaction.sender, this.balances.get(transaction.sender)! - transaction.amount); // Мотод віднімання коштів з сендера
        this.balances.set(transaction.receiver, (this.balances.get(transaction.receiver) || 0) + transaction.amount); // Метод додавання до отримувача
        
        this.pendingTransactions.push(transaction);
        if (this.pendingTransactions.length >= this.miningThreshold) {
            this.minePendingTransactions();
        }
    }

    createWallet(): { address: string; privateKey: string } { // Метод з ethers 
        const wallet = Wallet.createRandom();
        return {
            address: wallet.address,
            privateKey: wallet.privateKey
        };
    }

    getBalance(address: string): number { // Метод з ethers 
        return this.balances.get(address) || 0; // Якщо адресу не знайдено, повертаємо 0
    }    

    addBalance(address: string, amount: number): void {
        const currentBalance = this.balances.get(address) || 0;
        this.balances.set(address, currentBalance + amount);
        console.log(`Added ${amount} to address ${address}. \nNew balance: ${this.balances.get(address)}`);
    }

    minePendingTransactions(): void {
        const newBlock = new Block(this.getLastBlock().index + 1, this.pendingTransactions, this.getLastBlock().hash);
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        console.log(`Block added to the chain with index: ${newBlock.index}`);
        this.pendingTransactions = [];
    }

    toJSON() { // Методя для нормального виведення
        return {
            chain: this.chain,
            difficulty: this.difficulty,
            pendingTransactions: this.pendingTransactions,
            miningThreshold: this.miningThreshold,
            balances: Object.fromEntries(this.balances), // Конвертуємо Map у звичайний об'єкт
        };
    }
}