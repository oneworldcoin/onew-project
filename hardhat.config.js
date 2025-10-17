require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
    networks: {
        bscTestnet: {
              url: process.env.BSC_TESTNET_RPC || "https://data-seed-prebsc-1-s1.binance.org:8545/",
                    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
                        },
                            bsc: {
                                  url: process.env.BSC_RPC || "https://bsc-dataseed.binance.org/",
                                        accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
                                            }
                                              }
                                              };