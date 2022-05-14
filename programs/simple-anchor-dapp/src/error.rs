use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("User account does not exists")]
    UserAccountDoesNotExists,

    #[msg("You are not allowed to perform the action")]
    UserUnauthorized,

    #[msg("Stats account does not exists")]
    StatsAccountDoesNotExists,

    #[msg("Stats account does not match the user")]
    StatsAccountDoesNotMatch,
}
