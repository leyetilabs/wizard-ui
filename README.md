# Terra

A bunch of helpers to setup quickly a Terra Webapp. I've decided to create this package, because I was writing over and over the same code for Terra protocols. I've got inspired by Anchor, Mirror and Terraswap.

You need to use `<TerraProvider data={data}>...</TerraProvider>`, where data is a JS object with this structure.

```
{
  "mainnet": {
    tokens: {},
    pairs: []
  }
  "testnet": {
    tokens: {},
    pairs: []
  }
  "bombay": {
    tokens: {},
    pairs: []
  }
}
```
