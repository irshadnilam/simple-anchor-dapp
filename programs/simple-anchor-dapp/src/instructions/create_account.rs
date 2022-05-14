use crate::state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CreateAccount<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        seeds = [b"user", authority.key().as_ref()],
        bump,
        space = User::space()
    )]
    pub user: Box<Account<'info, User>>,

    #[account(
        init,
        payer = authority,
        seeds = [b"stats", user.key().as_ref()],
        bump,
        space = Stats::space()
    )]
    pub stats: Box<Account<'info, Stats>>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<CreateAccount>) -> Result<()> {
    let user = &mut ctx.accounts.user;
    let stats = &mut ctx.accounts.stats;

    user.has_already_been_initialized = true;
    user.bump = *ctx.bumps.get("user").unwrap();
    user.authority = ctx.accounts.authority.key();

    stats.has_already_been_initialized = true;
    stats.bump = *ctx.bumps.get("stats").unwrap();
    stats.authority = ctx.accounts.authority.key();

    stats.total_transfers_sent = 0;
    stats.total_transfers_received = 0;
    stats.total_sol_sent = 0;
    stats.total_sol_received = 0;

    stats.user = user.key();
    user.stats = stats.key();

    Ok(())
}
