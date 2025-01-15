// import "./server/server";
import { Wallet, WordlistOwlA } from "ethers";
import { Blockchain } from "./blockchain/Blockchain";
import { Transaction } from "./blockchain/Transaction";

const blockchain = new Blockchain();
const wallet = blockchain.createWallet();
const wallet1 = blockchain.createWallet();


blockchain.addBalance(wallet.address, 5000); // Додаємо 500 до балансу
console.log(blockchain.getBalance(wallet.address)); // Виводить: 500
blockchain.addBalance(wallet1.address, 5000); // Додаємо 500 до балансу
console.log(blockchain.getBalance(wallet1.address)); // Виводить: 500

blockchain.addTransaction(new Transaction(wallet.address, wallet1.address, 5));
blockchain.addTransaction(new Transaction(wallet.address, wallet1.address, 4));
blockchain.addTransaction(new Transaction(wallet.address, wallet1.address, 23));
blockchain.addTransaction(new Transaction(wallet.address, wallet1.address, 1));
blockchain.addTransaction(new Transaction(wallet.address, wallet1.address, 55));
blockchain.addTransaction(new Transaction(wallet.address, wallet1.address, 523));
blockchain.addTransaction(new Transaction(wallet.address, wallet1.address, 52));

console.log(JSON.stringify(blockchain, null, 5));
