# Simple anchor dapp

This is a simple solana dapp.

The logic of the dapp is simple. 
 - Anyone can create an account
 - A user with an account can send `SOL` to another user with an account
 - The following stats are recorded on chain
   - Total transfers sent
   - Total transfers received
   - Total `SOL` sent
   - Total `SOL` received


## Program (smart contract)
The program is written using anchor protocol.

> This program was tested on `Solana version 1.9.21` and `Anchor version 0.24.2`

Build the project
```
anchor build
```

Run the [tests](/tests)

```
anchor test
```

### Instructions
---

**create_account** ()

#### Accounts

| Name | Description | References & Notes|
| :------ | :------ | :------ |
| `authority` |The account which creates the user account | ***Signer***|
| `user` | The user account to be created (**init**) ||
| `stats` | The account which stats are stored (**init**) ||
| `system_program` | System Program | [SystemProgram.programId](https://solana-labs.github.io/solana-web3.js/classes/SystemProgram.html#programId)

---
**send_sol** (amount)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `u64` | Amount to send in lamports

#### Accounts

| Name | Description | References & Notes|
| :------ | :------ | :------ |
| `authority` |The account which sends SOL | ***Signer***|
| `from` | The user-account of the sender ||
| `from_stats` | The stats-account of the sender ||
| `to` | The user-account of the the receiver ||
| `from_stats` | The stats-account of the receiver ||
| `reciever` | The account which recieves SOL ||
| `system_program` | System Program | [SystemProgram.programId](https://solana-labs.github.io/solana-web3.js/classes/SystemProgram.html#programId)

---

## Frontend

todo()