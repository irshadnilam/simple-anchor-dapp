import * as anchor from "@project-serum/anchor";
import { Program, BN, Wallet } from "@project-serum/anchor";
import { SimpleAnchorDapp } from "../target/types/simple_anchor_dapp";
import { assert } from 'chai';

const utf8 = anchor.utils.bytes.utf8;

import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
} from '@solana/web3.js';

describe("simple-anchor-dapp", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SimpleAnchorDapp as Program<SimpleAnchorDapp>;

  let sender: Wallet, receiver: Wallet;

  let senderUserAccount: PublicKey, senderStatsAccount: PublicKey,
    receiverUserAccount: PublicKey, receiverStatsAccount: PublicKey;

  let senderBump: number, senderStatsBump: number,
     receiverBump: number, receiverStatsBump: number;


  before('Boilerplates', async () => {
    // Creating a wallet for sender with 500 SOL
    sender = new Wallet(Keypair.generate());
    const sAirDrop = await provider.connection.requestAirdrop(sender.publicKey, 500 * LAMPORTS_PER_SOL);
    await provider.connection.confirmTransaction(sAirDrop);
  
    // Creating a wallet for receiver with 500 SOL
    receiver = new Wallet(Keypair.generate());
    const rAirDrop = await provider.connection.requestAirdrop(receiver.publicKey, 500 * LAMPORTS_PER_SOL);
    await provider.connection.confirmTransaction(rAirDrop);
  });

  it("Creates sender account", async () => {
    [senderUserAccount, senderBump] = await PublicKey.findProgramAddress(
      [
        utf8.encode("user"),
        sender.publicKey.toBuffer(),
      ],
      program.programId
    );

    [senderStatsAccount, senderStatsBump] = await PublicKey.findProgramAddress(
      [
        utf8.encode("stats"),
        senderUserAccount.toBuffer(),
      ],
      program.programId
    );

    const tx = await program.methods.createAccount()
      .accounts({
        authority: sender.publicKey,
        user: senderUserAccount,
        stats: senderStatsAccount,
        systemProgram: SystemProgram.programId,
      })
      .signers([sender.payer])
      .rpc();
    
    // verify account data is set properly
    const senderUserAccountData = await program.account.user.fetch(senderUserAccount);
    
    assert.ok(
      senderUserAccountData.bump = senderBump,
      "Incrorrect pda bump for sender acccount."
    );

    assert.ok(
      senderUserAccountData.hasAlreadyBeenInitialized === true,
      "sender account not initialzied"
    );

    assert.ok(
      senderUserAccountData.authority.equals(sender.publicKey),
      "sender account authority not set."
    );

    assert.ok(
      senderUserAccountData.stats.equals(senderStatsAccount),
      "sender account stats not set."
    );

    // verify stats account data is set correctly
    const senderStatsAccountData = await program.account.stats.fetch(senderStatsAccount);
    assert.ok(
      senderStatsAccountData.bump = senderStatsBump,
      "Incrorrect pda bump for sender stat acccount."
    );

    assert.ok(
      senderStatsAccountData.hasAlreadyBeenInitialized === true,
      "sender stat account not initialzied"
    );

    assert.ok(
      senderStatsAccountData.authority.equals(sender.publicKey),
      "sender account authority not set."
    );

    assert.ok(
      senderStatsAccountData.user.equals(senderUserAccount),
      "sender user account stats not set."
    );

    assert(
      senderStatsAccountData.totalTransfersSent == 0 &&
      senderStatsAccountData.totalTransfersReceived == 0 &&
      senderStatsAccountData.totalSolSent == 0 &&
      senderStatsAccountData.totalSolReceived == 0,
      "Sender stats invalid"
    );
  });

  it("Creates receiver account", async () => {
    [receiverUserAccount, receiverBump] = await PublicKey.findProgramAddress(
      [
        utf8.encode("user"),
        receiver.publicKey.toBuffer(),
      ],
      program.programId
    );

    [receiverStatsAccount, receiverStatsBump] = await PublicKey.findProgramAddress(
      [
        utf8.encode("stats"),
        receiverUserAccount.toBuffer(),
      ],
      program.programId
    );

    const tx = await program.methods.createAccount()
      .accounts({
        authority: receiver.publicKey,
        user: receiverUserAccount,
        stats: receiverStatsAccount,
        systemProgram: SystemProgram.programId,
      })
      .signers([receiver.payer])
      .rpc();
    
    // verify account data is set properly
    const receiverUserAccountData = await program.account.user.fetch(receiverUserAccount);
    
    assert.ok(
      receiverUserAccountData.bump = receiverBump,
      "Incrorrect pda bump for receiver acccount."
    );

    assert.ok(
      receiverUserAccountData.hasAlreadyBeenInitialized === true,
      "receiver account not initialzied"
    );

    assert.ok(
      receiverUserAccountData.authority.equals(receiver.publicKey),
      "receiver account authority not set."
    );

    assert.ok(
      receiverUserAccountData.stats.equals(receiverStatsAccount),
      "receiver account stats not set."
    );

    // verify stats account data is set correctly
    const receiverStatsAccountData = await program.account.stats.fetch(receiverStatsAccount);
    assert.ok(
      receiverStatsAccountData.bump = receiverStatsBump,
      "Incrorrect pda bump for receiver stat acccount."
    );

    assert.ok(
      receiverStatsAccountData.hasAlreadyBeenInitialized === true,
      "receiver stat account not initialzied"
    );

    assert.ok(
      receiverStatsAccountData.authority.equals(receiver.publicKey),
      "receiver account authority not set."
    );

    assert.ok(
      receiverStatsAccountData.user.equals(receiverUserAccount),
      "receiver user account stats not set."
    );

    assert(
      receiverStatsAccountData.totalTransfersSent == 0 &&
      receiverStatsAccountData.totalTransfersReceived == 0 &&
      receiverStatsAccountData.totalSolSent == 0 &&
      receiverStatsAccountData.totalSolReceived == 0,
      "Receiver stats invalid"
    );
  });

  it("Sends sol", async () => {
    const senderBalanceBefore = await provider.connection.getBalance(sender.publicKey);
    const receiverBalanceBefore = await provider.connection.getBalance(receiver.publicKey);

    const amount = 100 * LAMPORTS_PER_SOL;
  
    await program.methods.sendSol(new BN(amount)).accounts({
      authority: sender.publicKey,
      from: senderUserAccount,
      fromStats: senderStatsAccount,
      to: receiverUserAccount,
      toStats: receiverStatsAccount,
      receiver: receiver.publicKey,
      systemProgram: SystemProgram.programId,
    }).signers([sender.payer]).rpc({
      commitment: 'confirmed',
      preflightCommitment: 'confirmed'
    });
  
    const senderBalanceAfter = await provider.connection.getBalance(sender.publicKey);
    const receiverBalanceAfter = await provider.connection.getBalance(receiver.publicKey);

    assert(
      senderBalanceAfter === (senderBalanceBefore - (amount)),
      "SOL is not sent from sender."
    );

    assert(
      receiverBalanceAfter === (receiverBalanceBefore + amount),
      "SOL is not received by the receiver."
    );

    const senderStatsAccountData = await program.account.stats.fetch(senderStatsAccount);
    assert(
      senderStatsAccountData.totalTransfersSent == 1 &&
      senderStatsAccountData.totalTransfersReceived == 0 &&
      senderStatsAccountData.totalSolSent == amount &&
      senderStatsAccountData.totalSolReceived == 0,
      "Sender stats invalid"
    );

    const receiverStatsAccountData = await program.account.stats.fetch(receiverStatsAccount);
    assert(
      receiverStatsAccountData.totalTransfersSent == 0 &&
      receiverStatsAccountData.totalTransfersReceived == 1 &&
      receiverStatsAccountData.totalSolSent == 0 &&
      receiverStatsAccountData.totalSolReceived == amount,
      "Receiver stats invalid"
    );
  });
});
