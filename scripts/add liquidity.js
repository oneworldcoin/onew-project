const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
    console.log("Adding liquidity from:", deployer.address);

      const oneWAddress = "0xYOUR_ONEW_ADDRESS";
        const busdAddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
          const pancakeRouter = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
            const decimals = 18;

              const amountOneW = ethers.utils.parseUnits("5000000", decimals);
                const amountBUSD = ethers.utils.parseUnits("5000000", decimals);

                  const tokenAbi = ["function approve(address,uint256) external returns (bool)"];
                    const routerAbi = ["function addLiquidity(address,address,uint,uint,uint,uint,address,uint) external returns (uint,uint,uint)"];

                      const token = new ethers.Contract(oneWAddress, tokenAbi, deployer);
                        const router = new ethers.Contract(pancakeRouter, routerAbi, deployer);

                          console.log("Approving router...");
                            await (await token.approve(pancakeRouter, amountOneW)).wait();
                              const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

                                console.log("Adding liquidity...");
                                  const tx = await router.addLiquidity(
                                      oneWAddress,
                                          busdAddress,
                                              amountOneW,
                                                  amountBUSD,
                                                      amountOneW.mul(99).div(100),
                                                          amountBUSD.mul(99).div(100),
                                                              deployer.address,
                                                                  deadline
                                                                    );
                                                                      const receipt = await tx.wait();
                                                                        console.log("Liquidity tx:", receipt.transactionHash);
                                                                        }

                                                                        main().catch((e)=>{ console.error(e); process.exitCode = 1; });