export const idl = {
    version: '0.1.0',
    name: 'simple_anchor_dapp',
    instructions: [
        {
            name: 'createAccount',
            accounts: [
                {
                    name: 'authority',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'user',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'stats',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
        {
            name: 'sendSol',
            accounts: [
                {
                    name: 'authority',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'from',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'fromStats',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'to',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'toStats',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'receiver',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'amount',
                    type: 'u64',
                },
            ],
        },
    ],
    accounts: [
        {
            name: 'User',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bump',
                        type: 'u8',
                    },
                    {
                        name: 'hasAlreadyBeenInitialized',
                        type: 'bool',
                    },
                    {
                        name: 'authority',
                        type: 'publicKey',
                    },
                    {
                        name: 'stats',
                        type: 'publicKey',
                    },
                ],
            },
        },
        {
            name: 'Stats',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bump',
                        type: 'u8',
                    },
                    {
                        name: 'hasAlreadyBeenInitialized',
                        type: 'bool',
                    },
                    {
                        name: 'user',
                        type: 'publicKey',
                    },
                    {
                        name: 'authority',
                        type: 'publicKey',
                    },
                    {
                        name: 'totalTransfersSent',
                        type: 'u64',
                    },
                    {
                        name: 'totalTransfersReceived',
                        type: 'u64',
                    },
                    {
                        name: 'totalSolSent',
                        type: 'u64',
                    },
                    {
                        name: 'totalSolReceived',
                        type: 'u64',
                    },
                ],
            },
        },
    ],
    errors: [
        {
            code: 6000,
            name: 'UserAccountDoesNotExists',
            msg: 'User account does not exists',
        },
        {
            code: 6001,
            name: 'UserUnauthorized',
            msg: 'You are not allowed to perform the action',
        },
        {
            code: 6002,
            name: 'StatsAccountDoesNotExists',
            msg: 'Stats account does not exists',
        },
        {
            code: 6003,
            name: 'StatsAccountDoesNotMatch',
            msg: 'Stats account does not match the user',
        },
    ],
}
