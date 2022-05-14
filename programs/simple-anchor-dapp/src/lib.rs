use anchor_lang::prelude::*;

pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("GZ2Tyz9Ny5hsunTuydpHHXNppY86cH5zNVBHFrwCJEyB");

#[program]
pub mod simple_anchor_dapp {
    use super::*;

    pub fn create_account(ctx: Context<CreateAccount>) -> Result<()> {
        instructions::create_account::handler(ctx)
    }

    pub fn send_sol(ctx: Context<SendSol>, amount: u64) -> Result<()> {
        instructions::send_sol::handler(ctx, amount)
    }
}