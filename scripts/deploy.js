const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  const bal = await deployer.getBalance();
  console.log("Account balance (BNB):", hre.ethers.formatEther(bal));

  const decimals = 18;
  const cap = hre.ethers.parseUnits("42000000", decimals); // 42M cap

  const OneW = await hre.ethers.getContractFactory("OneW");
  const onew = await OneW.deploy(cap);
  await onew.waitForDeployment();
  console.log("OneW deployed to:", await onew.getAddress());

  const RewardsVault = await hre.ethers.getContractFactory("RewardsVault");
  const beneficiary = deployer.address;
  const allocated = hre.ethers.parseUnits("21000000", decimals);
  const now = Math.floor(Date.now() / 1000);
  const startTime = now + 60; // start in 1 minute
  const duration = 365 * 24 * 60 * 60; // 1 year

  const vault = await RewardsVault.deploy(await onew.getAddress(), beneficiary, allocated, startTime, duration);
  await vault.waitForDeployment();
  console.log("RewardsVault deployed to:", await vault.getAddress());

  // Mint tokens
  const mintCirculating = hre.ethers.parseUnits("21000000", decimals);
  const mintRewards = hre.ethers.parseUnits("21000000", decimals);

  const mintTx1 = await onew.mint(deployer.address, mintCirculating);
  await mintTx1.wait();
  console.log("Minted 21,000,000 to deployer");

  const mintTx2 = await onew.mint(vault.getAddress(), mintRewards);
  await mintTx2.wait();
  console.log("Minted 21,000,000 to vault");

  // Save deployment log
  const fs = require('fs');
  const log = `OneW:${await onew.getAddress()}\nRewardsVault:${await vault.getAddress()}\nDeployer:${deployer.address}\n`;
  fs.appendFileSync('DEPLOYMENT_LOG.txt', log);
  console.log("Deployment log written to DEPLOYMENT_LOG.txt");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
