### Goals

Send funds to the contract

### Exploit

For smart contract to receive funds they need to specify a special function for that. There is 2 kind of them.

Fallback: this is a function that will be called if the msg.sig wont match available function in the contract. Funds can also be sent along.

Receive: it explicitly marks that contract can receive ether

However this contract does not specify them, so we cannot sent ether to it....
or can we?

There is an ulimate hack to force this contract to receive ether and it can be done by using a special opcode `selfdestruct()` which delete it's contract code and sends all it's funds to specified address.

**NOTE**: As of solidity 0.8.18 `selfdestruct` is [deprecated](https://eips.ethereum.org/EIPS/eip-4758)

### Code

Use Remix to deploy smart contract

```code
contract ForceFunds {
    constructor(address _force) payable {
        selfdestruct(payable(_force));
    }
}
```

This contract didn't last very long :D

Done!
