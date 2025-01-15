// import "./server/server";
import { Blockchain } from "./blockchain/Blockchain";
import { Transaction } from "./blockchain/Transaction";

const l2era = new Blockchain();

// Створюємо гаманці
const wallet1 = l2era.createWallet();
const wallet2 = l2era.createWallet();

console.log(`Wallet 1: ${wallet1.address}`);
console.log(`Wallet 2: ${wallet2.address}`);

// Додаємо стартовий баланс
l2era.balances.set(wallet1.address, 500);

console.log(`Balance of Wallet 1: ${l2era.getBalance(wallet1.address)}`);
console.log(`Balance of Wallet 2: ${l2era.getBalance(wallet2.address)}`);

l2era.addTransaction(new Transaction(wallet1.address, wallet2.address, 200));

console.log(`Balance of Wallet 1: ${l2era.getBalance(wallet1.address)}`);
console.log(`Balance of Wallet 2: ${l2era.getBalance(wallet2.address)}`);
