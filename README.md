# simpfor-fun-sdk

TypeScript SDK for interacting with the [Simpfor.fun](https://simpfor.fun) API, including copy trading, wallet management, and authentication flows.

## Features
- Copy trading (create, run, stop, list, PnL, etc.)
- User authentication (email, Google, Privy)
- Wallet management (KMS, builder, Solana, etc.)
- Referral and coupon management
- Deposit/bridge address management
- Fully typed, promise-based API

## Installation

```bash
npm install simpfor-fun-sdk
```

or

```bash
yarn add simpfor-fun-sdk
```

## Usage

```typescript
import { SimpforFunSDK } from 'simpfor-fun-sdk';

const sdk = new SimpforFunSDK();

(async () => {
  // Example: Email login
  await sdk.sendVerificationCode('your@email.com');
  const loginRes = await sdk.verifyOtp('your@email.com', '123456');
  const userId = loginRes?.data?.user?.uid;

  // Fetch top traders
  const traders = await sdk.fetchTopTraders();

  // Create a copy trade
  const copyTrade = await sdk.createCopyTrade(userId, 'EXPERT_ADDRESS', 'FOLLOWER_ADDRESS');

  // ... see src/example.ts for more usage examples
})();
```

## API Overview

The SDK exposes a class `SimpforFunSDK` with methods for all major Simpfor.fun API endpoints. All methods are fully typed and return promises.

### Authentication
- `sendVerificationCode(email: string)`
- `verifyOtp(email: string, code: string)`
- `googleLogin(...)`, `privyLogin(...)`, `signUp(...)`, `logout()`

### Copy Trading
- `createCopyTrade(...)`, `runCopyTrade(...)`, `stopCopyTrade(...)`, `listCopyTrades(...)`, `getCopyTradeHistoryPnl(...)`, `getCopyTradeDetails(...)`

### Wallet
- `activateKmsWallet(...)`, `bindBuilder(...)`, `checkWallet(...)`, `createKmsKey(...)`, `getBuilderFee(...)`, `walletList(...)`, `refreshAgentWallet(...)`

### User
- `addWatchedTrader(...)`, `claimCommission(...)`, `claimCoupon(...)`, `userCoupons(...)`, `getReferralCodeByChannelId(...)`, `getReferralCommission(...)`, `getReferralInfo(...)`, `getReferralList(...)`, `removeWatchedTrader(...)`, `getSolanaAddresses(...)`, `getSolanaAuthMessage(...)`, `linkSolanaAddress(...)`, `userWalletInfo(...)`, `getWatchedTraders(...)`

### Deposit/Bridge
- `getBridgeAddress(...)`, `listBridgeAddress(...)`, `registerBridgeAddress(...)`

### More
- See the [API documentation](https://github.com/rkmonarch/simpfor-fun-sdk) and `src/example.ts` for full usage examples and all available methods.

## TypeScript Support
All request and response types are exported and fully documented in the SDK.

## Contributing
Pull requests and issues are welcome! Please see the [issues page](https://github.com/rkmonarch/simpfor-fun-sdk/issues) to report bugs or request features.

## License
ISC

---

**Author:** [rkmonarch](https://github.com/rkmonarch) 