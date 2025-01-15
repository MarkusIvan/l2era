// import "./server/server";
import { Wallet, WordlistOwlA } from "ethers";
import { Blockchain } from "./blockchain/Blockchain";
import { Transaction } from "./blockchain/Transaction";
import { BlockchainMini } from "./blockchain/BlockchainMini";

const blockchainMini = new BlockchainMini();
const wallet1 = blockchainMini.createWallet();
console.log(wallet1);
