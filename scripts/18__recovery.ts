import { ethers } from "hardhat";
import { SimpleToken__factory } from "../typechain-types";

async function main() {
  let [deployer] = await ethers.getSigners();
  let tx;
  let contract = "0x115bB5deAF795E54175537004ACcF707bc8D29A0";

  let recovery = new SimpleToken__factory(deployer).attach(contract);

  tx = await recovery.destroy(deployer.address);
  await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
