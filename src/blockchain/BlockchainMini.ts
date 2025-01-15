import { Wallet } from "ethers";
import { Transaction } from "./Transaction";
import { Block } from "./Block";

export class BlockchainMini {
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

    createWallet(): { adress: string, privateKey: string } {
        const wallet = Wallet.createRandom();
        return {
            adress: wallet.address,
            privateKey: wallet.privateKey
        };
    }

    getBalance(address: string): number { // Метод з ethers 
        return this.balances.get(address) || 0; // Якщо адресу не знайдено, повертаємо 0
    }
}