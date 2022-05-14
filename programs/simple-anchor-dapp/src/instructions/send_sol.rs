use crate::{error::ErrorCode, state::*};
use anchor_lang::{
    prelude::*,
    solana_program::{program::invoke, system_instruction::transfer},
};

#[derive(Accounts)]
pub struct SendSol<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"user", authority.key().as_ref()],
        bump = from.bump,
        constraint = from.has_already_been_initialized @ ErrorCode::UserAccountDoesNotExists,
        has_one = authority @ErrorCode::UserUnauthorized,
        constraint = from.stats.key().eq(&from_stats.key()) @ErrorCode::StatsAccountDoesNotMatch,
    )]
    pub from: Box<Account<'info, User>>,

    #[account(
        mut,
        seeds = [b"stats", from.key().as_ref()],
        bump = from_stats.bump,
        constraint = from_stats.has_already_been_initialized @ ErrorCode::StatsAccountDoesNotExists,
        has_one = authority @ErrorCode::UserUnauthorized,
        constraint = from_stats.user.key().eq(&from.key()) @ ErrorCode::StatsAccountDoesNotMatch,
    )]
    pub from_stats: Box<Account<'info, Stats>>,

    #[account(
        mut,
        seeds = [b"user", receiver.key().as_ref()],
        bump = to.bump,
        constraint = to.has_already_been_initialized @ ErrorCode::UserAccountDoesNotExists,
        constraint = to.authority.key().eq(&receiver.key()) @ErrorCode::StatsAccountDoesNotMatch,
        constraint = to.stats.key().eq(&to_stats.key()) @ErrorCode::StatsAccountDoesNotMatch,
    )]
    pub to: Box<Account<'info, User>>,

    #[account(
        mut,
        seeds = [b"stats", to.key().as_ref()],
        bump = to_stats.bump,
        constraint = to_stats.has_already_been_initialized @ ErrorCode::StatsAccountDoesNotExists,
        constraint = to_stats.authority.key().eq(&receiver.key()) @ErrorCode::StatsAccountDoesNotMatch,
        constraint = to_stats.user.key().eq(&to.key()) @ ErrorCode::StatsAccountDoesNotMatch,
    )]
    pub to_stats: Box<Account<'info, Stats>>,

    #[account(mut)]
    /// CHECK: receiver account is checked for validity on pda seed in both user and stat accounts
    pub receiver: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<SendSol>, amount: u64) -> Result<()> {
    // transfer sol
    let instruction = transfer(
        &ctx.accounts.authority.key(),
        &ctx.accounts.receiver.key(),
        amount,
    );
    invoke(
        &instruction,
        &[
            ctx.accounts.authority.to_account_info(),
            ctx.accounts.receiver.to_account_info(),
        ],
    )?;

    // modify sender stat
    let sender_stat = &mut ctx.accounts.from_stats;
    sender_stat.total_transfers_sent = sender_stat.total_transfers_sent + 1;
    sender_stat.total_sol_sent = sender_stat.total_sol_sent + amount;

    // modify receiver stat
    let receiver_stat = &mut ctx.accounts.to_stats;
    receiver_stat.total_transfers_received = receiver_stat.total_transfers_received + 1;
    receiver_stat.total_sol_received = receiver_stat.total_sol_received + amount;

    Ok(())
}
