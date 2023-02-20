import { ethers } from "hardhat";
import { Evil15__factory, GatekeeperTwo__factory } from "../typechain-types";

async function main() {
  let [deployer] = await ethers.getSigners();
  let tx;
  let contract = "0xE354BCbe7e1a22b12A6CDe74977394f9894432cd";

  let gatekeeper = new GatekeeperTwo__factory(deployer).attach(contract);
  console.log(await gatekeeper.entrant());

  await new Evil15__factory(deployer).deploy(contract);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
