"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockchainMini_1 = require("./blockchain/BlockchainMini");
const blockchainMini = new BlockchainMini_1.BlockchainMini();
const wallet1 = blockchainMini.createWallet();
console.log(wallet1);
