import { SimpforFunSDK } from './sdk';

// Example usage:
(async () => {
    const sdk = new SimpforFunSDK();
    try {
        // Step 1: Send verification code
        await sdk.sendVerificationCode('YOUR_EMAIL');
        // Step 2: After receiving OTP in email, verify OTP
        const loginRes = await sdk.verifyOtp('YOUR_EMAIL', '123456');
        console.log('Login response:', loginRes);

        // Extract userId from login response
        const userId = loginRes?.data?.user?.uid;
        if (!userId) throw new Error('User ID not found in login response');

        // Step 3: Fetch top traders
        const traders = await sdk.fetchTopTraders();
        console.log('Top traders:', traders);

        // Step 4: Create a copy trade
        const copyTrade = await sdk.createCopyTrade(userId, 'EXPERT_ADDRESS', 'FOLLOWER_ADDRESS');
        console.log('Copy trade created:', copyTrade);

        // Step 5: Run the copy trade
        const runRes = await sdk.runCopyTrade(userId, copyTrade.data.info.copyTradeId);
        console.log('Copy trade run:', runRes);

        // Step 6: List open copy trades
        const openTrades = await sdk.listCopyTrades(userId);
        console.log('Open copy trades:', openTrades);

        // Step 7: Get copy trade PnL history
        const pnlHistory = await sdk.getCopyTradeHistoryPnl(userId, 'FOLLOWER_ADDRESS');
        console.log('PnL history:', pnlHistory);

        // Step 8: Get copy trade details
        const tradeDetails = await sdk.getCopyTradeDetails(userId, copyTrade.data.info.copyTradeId);
        console.log('Copy trade details:', tradeDetails);

        // Step 9: Stop the copy trade
        const stopRes = await sdk.stopCopyTrade(userId, copyTrade.data.info.copyTradeId, true);
        console.log('Copy trade stopped:', stopRes);

        // Auth-related (most throw Not implemented)
        await sdk.googleLogin({ referralCode: 'REF_CODE' });
        await sdk.googleCallback('code', 'state');
        await sdk.privyLogin({ privyAuthToken: 'TOKEN', privyEmail: 'YOUR_EMAIL' });
        await sdk.signUp({ invitedByCode: 'INVITE_CODE' });
        await sdk.logout();
        await sdk.getUserInfo();

        // Paxg
        await sdk.congressTrading('SYMBOL');

        // Trader
        await sdk.shareInfo('WALLET_ADDRESS', '7D');
        await sdk.topTradersWithPeriod({ field: 'roi', order: 'desc' }, { page: 1, limit: 20 });
        await sdk.traderOverview('ADDRESS');
        await sdk.smartTraders();
        await sdk.traderSnapshot('ADDRESS');

        // User
        await sdk.addWatchedTrader('ADDRESS');
        await sdk.claimCommission('RECEIVE_WALLET');
        await sdk.claimCoupon(1, 'ADDRESS');
        await sdk.userCoupons('all');
        await sdk.getReferralCodeByChannelId('CHANNEL_ID');
        await sdk.getReferralCommission();
        await sdk.getReferralInfo();
        await sdk.getReferralList();
        await sdk.removeWatchedTrader('ADDRESS');
        await sdk.getSolanaAddresses();
        await sdk.getSolanaAuthMessage('ADDRESS');
        await sdk.linkSolanaAddress('ADDRESS', 'MESSAGE', 'SIGNATURE');
        await sdk.userWalletInfo('WALLET_ADDRESS');
        await sdk.getWatchedTraders({ field: 'roi', order: 'desc' }, { page: 1, limit: 20 });

        // Wallet
        await sdk.activateKmsWallet(
            'WALLET_ADDRESS',
            'AGENT_ADDRESS',
            'WALLET_NAME',
            {
                nonce: 0,
                agentAddress: [0],
                agentName: 'string',
                hyperliquidChain: 'string',
                signatureChainId: 'string'
            },
            'SIGNATURE'
        );
        await sdk.bindBuilder('WALLET_ADDRESS', {
            nonce: 0,
            builder: [0],
            maxFeeRate: '0',
            hyperliquidChain: 'string',
            signatureChainId: 'string'
        }, 'SIGNATURE');
        await sdk.checkWallet('WALLET_ADDRESS');
        await sdk.createKmsKey('WALLET_ADDRESS');
        await sdk.getBuilderFee();
        await sdk.walletList();
        await sdk.refreshAgentWallet('WALLET_ADDRESS');

        // Deposit
        await sdk.getBridgeAddress(userId, 'WALLET_ADDRESS');
        await sdk.listBridgeAddress(userId);
        await sdk.registerBridgeAddress(userId, {
            tokenAddress: 'TOKEN_ADDRESS',
            userWalletAddress: 'WALLET_ADDRESS',
            userBridgeAddress: 'BRIDGE_ADDRESS',
            permitValue: 'PERMIT_VALUE',
            permitDeadline: 'PERMIT_DEADLINE',
            permitSig: 'PERMIT_SIG'
        });
    } catch (err) {
        console.error('Error:', err);
    }
})(); 