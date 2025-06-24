# simpfor-fun-sdk

TypeScript SDK for interacting with the [Simpfor.fun](https://simpfor.fun) API, including authentication and copy trading flows.

## Installation

```bash
npm install simpfor-fun-sdk
```

## Build (for development)

```bash
npm run build
```

## Usage

```typescript
import { SimpforFunSDK } from 'simpfor-fun-sdk';

(async () => {
  const sdk = new SimpforFunSDK();
  await sdk.sendVerificationCode('your@email.com');
  const loginRes = await sdk.verifyOtp('your@email.com', 'YOUR_OTP_CODE');
  const userId = loginRes?.data?.user?.uid;
  if (!userId) throw new Error('User ID not found');

  // Fetch top traders
  const traders = await sdk.fetchTopTraders();

  // Create a copy trade
  const copyTrade = await sdk.createCopyTrade(userId, 'LEADER_ACCOUNT', 'FOLLOWER_ACCOUNT');

  // Run the copy trade
  await sdk.runCopyTrade(userId, copyTrade.data.info.copyTradeId);

  // List open copy trades
  const openTrades = await sdk.listCopyTrades(userId);

  // Get copy trade PnL history
  const pnlHistory = await sdk.getCopyTradeHistoryPnl(userId, 'FOLLOWER_ACCOUNT');

  // Get copy trade details
  const tradeDetails = await sdk.getCopyTradeDetails(userId, copyTrade.data.info.copyTradeId);

  // Stop the copy trade
  await sdk.stopCopyTrade(userId, copyTrade.data.info.copyTradeId, true);
})();
```

## API

### Authentication
- `sendVerificationCode(email: string)`
- `verifyOtp(email: string, code: string)`

### Copy Trading
- `fetchTopTraders()`
- `createCopyTrade(userId, leaderAccount, followerAccount)`
- `runCopyTrade(userId, copyTradeId)`
- `stopCopyTrade(userId, copyTradeId, closePositions?)`
- `listCopyTrades(userId)`
- `getCopyTradeHistoryPnl(userId, followerAccount, sortByPnlDesc?, page?)`
- `getCopyTradeDetails(userId, copyTradeId, page?)`

## License

ISC

---

**Author:** [rkmonarch](https://github.com/rkmonarch) 