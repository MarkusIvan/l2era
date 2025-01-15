// import "./server/server";
import { Blockchain } from "./blockchain/Blockchain";
import { Transaction } from "./blockchain/Transaction";

const l2era = new Blockchain();

// Створюємо гаманці
const wallet1 = l2era.createWallet();
const wallet2 = l2era.createWallet();

console.log(`Wallet 1: ${wallet1.address}`);
console.log(`Wallet 2: ${wallet2.address}`);
