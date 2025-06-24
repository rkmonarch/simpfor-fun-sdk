"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("./sdk");
// Example usage:
(async () => {
    const sdk = new sdk_1.SimpforFunSDK();
    try {
        // Step 1: Send verification code
        // await sdk.sendVerificationCode('rahul@soo.network');
        // Step 2: After receiving OTP in email, verify OTP
        const loginRes = await sdk.verifyOtp('rahul@soo.network', '711429');
        console.log('Login response:', loginRes);
        // Extract userId from login response
        const userId = loginRes?.data?.user?.uid;
        if (!userId)
            throw new Error('User ID not found in login response');
        // Step 3: Fetch top traders
        const traders = await sdk.fetchTopTraders();
        // console.log('Top traders:', traders);
        // Step 4: Create a copy trade
        const copyTrade = await sdk.createCopyTrade(userId, '0x5b5d51203a0f9079f8aeb098a6523a13f298c060', '0x10784125cb1d893f921dd1818050ca9e124c96d7');
        console.log('Copy trade created:', copyTrade);
        // Step 5: Run the copy trade
        const runRes = await sdk.runCopyTrade(userId, copyTrade.data.info.copyTradeId);
        console.log('Copy trade run:', runRes);
        // Step 6: List open copy trades
        const openTrades = await sdk.listCopyTrades(userId);
        console.log('Open copy trades:', openTrades);
        // Step 7: Get copy trade PnL history
        const pnlHistory = await sdk.getCopyTradeHistoryPnl(userId, '0x10784125cb1d893f921dd1818050ca9e124c96d7');
        console.log('PnL history:', pnlHistory);
        // Step 8: Get copy trade details
        const tradeDetails = await sdk.getCopyTradeDetails(userId, copyTrade.data.info.copyTradeId);
        console.log('Copy trade details:', tradeDetails);
        // Step 9: Stop the copy trade
        const stopRes = await sdk.stopCopyTrade(userId, copyTrade.data.info.copyTradeId, true);
        console.log('Copy trade stopped:', stopRes);
    }
    catch (err) {
        console.error('Error:', err);
    }
})();
