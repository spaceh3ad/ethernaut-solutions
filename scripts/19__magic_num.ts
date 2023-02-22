import { ethers } from "hardhat";
import { MagicNum__factory } from "../typechain-types";

async function main() {
  let [deployer] = await ethers.getSigners();
  let tx;
  let contract = "0xA5C516ea2C4da08b793f35F3A2c526dba6c94812";

  let magic_num = new MagicNum__factory(deployer).attach(contract);

  // RUNTIME CODE

  // STORE 42 at 1st slot
  // 60 2a
  // 60 00
  // 52

  // RETURN 42 from 1st slot
  // 60 20
  // 60 00
  // f3

  // code => 602a60005260206000f3

  // CREATION CODE

  // STORE runtime code
  // 69 602a60005260206000f3
  // 60 0
  // 52

  // RETURN code
  // 60 0a
  // 60 16
  // f3

  // use creation code
  let evil_bytecode = "69602a60005260206000f3600052600a6016f3";

  tx = await deployer.sendTransaction({ data: "0x" + evil_bytecode });
  await tx.wait();

  let evil = tx.creates;

  await magic_num.setSolver(evil);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
