---
outline: deep
---

# Creating a Wallet

From the root zond directory where you have launched the node, enter:

### Windows

```cmd
gzond.exe --datadir=gzonddata account new
```

### Linux / MacOS

```bash
./gzond --datadir=gzonddata account new
```

You wil be prompted to enter (and confirm) a password. This password will be used to encrypt the private key file. You will need this password to unlock the account in the future.  **Do not lose this password!**

This will give you a new dilithium address, and store the keys into a file with the timestamp in UTC as the name.

Take note of the warnings:

- You can share your public address with anyone. Others need it to interact with you.
- You must **NEVER** share the secret key with anyone! The key controls access to your funds!
- You must **BACKUP** your key file! Without the key, it's impossible to access account funds!
- You must **REMEMBER** your password! Without the password, it's impossible to decrypt the key!

You will be able to see the available accounts in your gzond console: by entering `zond.accounts`.

You can also see the balance of an account by referencing the zond.accounts array in the gzond console. For example, to get the balance of the first account in the list, enter:

```js
web3.fromWei(web3.zond.getBalance(zond.accounts[0]))
```
