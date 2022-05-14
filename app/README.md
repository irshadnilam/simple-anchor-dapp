# UI

Built using Create React App, Solana Wallet adaptor and Anchor

### Install dependencies

`yarn install`

### Build

`yarn build`

### Serve

`yarn global add serve`

`serve -s build`

---

The code for that communicates with the program can be found in the [lib directory](/app/src/lib)

[fetch](/app/src/lib/fetch.ts)
Fetches the Solana devnet for `SOL balance` and `User` and `Stats`.

[createAccount](/app/src/lib/createAccount.ts)
Calls the [create_account](/programs/simple-anchor-dapp/src/instructions/create_account.rs) instruction

[sendSol](/app/src/lib/sendSol.ts)
Calls the [create_account](/programs/simple-anchor-dapp/src/instructions/send_sol.rs) instruction

---

Modify the [constants](/app/src/constants.ts) if you want to deploy the contracts and test locally.