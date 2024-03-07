### Goals

- claim ownership of contract

### Exploit

This contract uses a function that is supposed to be constructor. However it was not restricted anyhow to be able to be called more then once.

We just need to call suppossed construcor.

### Code

Execute following code in your developer console at Ethernaut page.

```code
await contract.Fal1out()
```

Done!
