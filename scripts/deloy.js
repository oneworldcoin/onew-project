const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
    console.log("Deploying with:", deployer.address);

      const decimals = 18;
        const cap = ethers.utils.parseUnits("42000000", decimals); // 42M cap

          const OneW = await ethers.getContractFactory("OneW");
            const onew = await OneW.deploy(cap);
              await onew.deployed();
                console.log("OneW:", onew.address);

                  const RewardsVault = await ethers.getContractFactory("RewardsVault");
                    const beneficiary = deployer.address;
                      const allocated = ethers.utils.parseUnits("21000000", decimals);
                        const now = Math.floor(Date.now() / 1000);
                          const startTime = now + 60; // start in 1 minute (test)
                            const duration = 365 * 24 * 60 * 60; // 1 year

                              const vault = await RewardsVault.deploy(onew.address, beneficiary, allocated, startTime, duration);
                                await vault.deployed();
                                  console.log("RewardsVault:", vault.address);

                                    // mint 21M to deployer (circulating) and 21M to vault
                                      const mintCirculating = ethers.utils.parseUnits("21000000", decimals);
                                        const mintRewards = ethers.utils.parseUnits("21000000", decimals);

                                          await (await onew.mint(deployer.address, mintCirculating)).wait();
                                            console.log("Minted circulating 21M to deployer");

                                              await (await onew.mint(vault.address, mintRewards)).wait();
                                                console.log("Minted 21M to vault");
                                                }

                                                main().catch((e) => { console.error(e); process.exitCode = 1; });