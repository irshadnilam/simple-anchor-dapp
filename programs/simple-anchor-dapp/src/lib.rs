use anchor_lang::prelude::*;

pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("66aoA3njN9pM3WyaaVr3PcLViq6aZycPR3Pf4bz3qtCU");

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