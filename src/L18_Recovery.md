### Goals

Recover funds from SimpleToken

### Exploit

This one is simple we need to call `SimpleToken::destory()` to claim funds. We only need to figure out the address of the `SimpleToken` contract. We can grab the `Recover` address and with help of explorer find the deployment transaction and find the `SimpleToken` address.

### Code

```code
interface Simple {
    function destroy(address payable _to) external;
}
```

We just attach to the contract and call the destory function.

Done!
