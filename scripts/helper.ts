import { ethers } from "hardhat";
import { Ethernaut__factory } from "../typechain-types";

export async function getEthernaut() {
  let [deployer] = await ethers.getSigners();

  let contractEthernaut = "0xD991431D8b033ddCb84dAD257f4821E9d5b38C33";
  let ethernaut = new Ethernaut__factory(deployer).attach(contractEthernaut);

  await ethernaut.deployed();

  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
