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
        this.balances = new Map<string, number>();

        const developerWallet = this.createWallet(); // Створюємо головний гаманець
        this.balances.set(developerWallet.address, 1000000); // Присвоюємо йому баланс
        console.log(`Головний гаманець: ${developerWallet.address}, Баланс: 1000000`);

    }

    createGenesisBlock(): Block {
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
        
        this.balances.set(transaction.sender, this.balances.get(transaction.sender)! - transaction.amount);
        this.balances.set(transaction.receiver, (this.balances.get(transaction.receiver) || 0) + transaction.amount);
        
        this.pendingTransactions.push(transaction);
        if (this.pendingTransactions.length >= this.miningThreshold) {
            this.minePendingTransactions();
        }
    }

    createWallet(): { address: string; privateKey: string } {
        const wallet = Wallet.createRandom();
        return {
            address: wallet.address,
            privateKey: wallet.privateKey
        };
    }

    getBalance(address: string): number {
        return this.balances.get(address) || 0; // Якщо адресу не знайдено, повертаємо 0
    }    

    minePendingTransactions(): void {
        const newBlock = new Block(this.getLastBlock().index + 1, this.pendingTransactions, this.getLastBlock().hash);
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        console.log(`Block added to the chain with index: ${newBlock.index}`);
        this.pendingTransactions = [];
    }
}