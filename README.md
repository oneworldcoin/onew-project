OneW - One World token (Testnet-ready)

How to use:
1. Fill .env with:
   PRIVATE_KEY=0x...
   BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.binance.org:8545/

2. Install & compile:
   npm install
   npx hardhat compile

3. Deploy to testnet:
   npx hardhat run --network bscTestnet scripts/deploy.js

Note: Do NOT commit .env or private keys to GitHub.
