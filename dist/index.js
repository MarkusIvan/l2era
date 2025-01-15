"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Blockchain_1 = require("./blockchain/Blockchain");
const Transaction_1 = require("./blockchain/Transaction");
// Ініціалізуємо блокчейн
const blockchain = new Blockchain_1.Blockchain();
// Створюємо гаманці
const wallet1 = blockchain.createWallet();
const wallet2 = blockchain.createWallet();
console.log("🎉 Створено гаманці:");
console.log(`Гаманець 1: ${wallet1.address}`);
console.log(`Гаманець 2: ${wallet2.address}`);
// Додаємо баланс до першого гаманця
blockchain.addBalance(wallet1.address, 1000);
// Перевіряємо баланс
console.log(`💰 Баланс гаманця 1: ${blockchain.getBalance(wallet1.address)}`);
console.log(`💰 Баланс гаманця 2: ${blockchain.getBalance(wallet2.address)}`);
// Додаємо кілька транзакцій
console.log("➕ Додаємо транзакції...");
blockchain.addTransaction(new Transaction_1.Transaction(wallet1.address, wallet2.address, 100));
blockchain.addTransaction(new Transaction_1.Transaction(wallet1.address, wallet2.address, 50));
blockchain.addTransaction(new Transaction_1.Transaction(wallet1.address, wallet2.address, 150));
blockchain.addTransaction(new Transaction_1.Transaction(wallet1.address, wallet2.address, 200));
blockchain.addTransaction(new Transaction_1.Transaction(wallet1.address, wallet2.address, 100)); // Ця транзакція повинна викликати майнінг
// Перевіряємо баланси після транзакцій
console.log(`💰 Баланс гаманця 1 після транзакцій: ${blockchain.getBalance(wallet1.address)}`);
console.log(`💰 Баланс гаманця 2 після транзакцій: ${blockchain.getBalance(wallet2.address)}`);
// Виводимо ланцюг блоків
console.log("🔗 Ланцюг блоків:");
console.log(JSON.stringify(blockchain, null, 4));
// Перевіряємо цілісність ланцюга
console.log("🔍 Перевірка ланцюга...");
blockchain.validateChain();
