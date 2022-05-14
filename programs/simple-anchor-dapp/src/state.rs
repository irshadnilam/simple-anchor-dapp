use anchor_lang::prelude::*;

use crate::constants::PUBKEY_SIZE;

#[account]
pub struct User {
    pub bump: u8,
    pub has_already_been_initialized: bool,
    pub authority: Pubkey,
    pub stats: Pubkey,
}

impl User {
    pub fn space() -> usize {
        8 +  // discriminator
        1 + // bump
        1 + // has_already_been_initialized
        PUBKEY_SIZE + // authority
        PUBKEY_SIZE // stats
    }
}

#[account]
pub struct Stats {
    pub bump: u8,
    pub has_already_been_initialized: bool,
    pub user: Pubkey,
    pub authority: Pubkey,

    pub total_transfers_sent: u64,
    pub total_transfers_received: u64,
    pub total_sol_sent: u64,
    pub total_sol_received: u64,
}

impl Stats {
    pub fn space() -> usize {
        8 +  // discriminator
        1 + // bump
        1 + // has_already_been_initialized
        PUBKEY_SIZE + // user
        PUBKEY_SIZE + // authority
        8 + // total_transfers_sent
        8 + // total_transfers_received
        8 + // total_sol_sent
        8 // total_sol_received
    }
}
