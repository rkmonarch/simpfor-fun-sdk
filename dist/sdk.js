"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpforFunSDK = void 0;
const axios_1 = __importDefault(require("axios"));
const HOST_URL = 'https://hype-api.simpfor.fun';
class SimpforFunSDK {
    constructor(hostUrl = HOST_URL) {
        this.accessToken = null;
        this.hostUrl = hostUrl;
    }
    /**
     * Sends a verification code to the specified email address for authentication.
     */
    async sendVerificationCode(email) {
        try {
            const response = await axios_1.default.post(`${this.hostUrl}/auth/email/verify_code`, { email });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data;
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    /**
     * Verifies the OTP code sent to the user's email and logs in the user.
     * Stores the access token if login is successful.
     */
    async verifyOtp(email, code) {
        try {
            const response = await axios_1.default.post(`${this.hostUrl}/auth/email/login`, { email, code }, { withCredentials: true });
            const setCookieHeader = response.headers['set-cookie'];
            let accessToken = undefined;
            if (setCookieHeader) {
                const cookies = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
                for (const cookie of cookies) {
                    const match = cookie.match(/access_token=([^;]+)/);
                    if (match) {
                        accessToken = match[1];
                        break;
                    }
                }
            }
            if (accessToken) {
                this.accessToken = accessToken;
            }
            return { ...response.data, accessToken };
        }
        catch (error) {
            if (error.response) {
                throw error.response.data;
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    /**
     * Returns authentication headers containing the access token cookie.
     * Throws an error if not authenticated.
     */
    getAuthHeaders() {
        if (!this.accessToken)
            throw new Error('Not authenticated. Please login first.');
        return {
            Cookie: `access_token=${this.accessToken}`,
        };
    }
    /**
     * Fetches the list of top traders from the platform.
     */
    async fetchTopTraders() {
        try {
            const response = await axios_1.default.post('https://hype-api.simpfor.fun/top_traders', {
                page: { page: 1, limit: 20 },
                sort: { field: 'roi', order: 'desc' },
            }, {
                headers: this.accessToken ? this.getAuthHeaders() : undefined,
            });
            return response.data.data.traders;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data;
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    /**
     * Creates a new copy trade for the specified user, leader, and follower accounts.
     */
    async createCopyTrade(userId, leaderAccount, followerAccount) {
        try {
            const response = await axios_1.default.post(`${this.hostUrl}/copy_trade/create`, { userId, leaderAccount, followerAccount }, {
                headers: this.getAuthHeaders(),
                withCredentials: true,
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data;
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    /**
     * Runs an existing copy trade for the specified user and copy trade ID.
     */
    async runCopyTrade(userId, copyTradeId) {
        try {
            const response = await axios_1.default.post(`${this.hostUrl}/copy_trade/run`, { userId, copyTradeId }, {
                headers: this.getAuthHeaders(),
                withCredentials: true,
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data;
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    /**
     * Stops a running copy trade and optionally closes positions.
     */
    async stopCopyTrade(userId, copyTradeId, closePositions = true) {
        try {
            const response = await axios_1.default.post(`${this.hostUrl}/copy_trade/stop`, { userId, copyTradeId, closePositions }, {
                headers: this.getAuthHeaders(),
                withCredentials: true,
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data;
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    /**
     * Lists all copy trades for the specified user.
     */
    async listCopyTrades(userId) {
        try {
            const response = await axios_1.default.post(`${this.hostUrl}/copy_trade/list`, { userId }, {
                headers: this.getAuthHeaders(),
                withCredentials: true,
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data;
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    /**
     * Gets the PnL (profit and loss) history for a user's copy trades.
     */
    async getCopyTradeHistoryPnl(userId, followerAccount, sortByPnlDesc = true, page = { page: 1, limit: 1 }) {
        try {
            const response = await axios_1.default.post(`${this.hostUrl}/copy_trade/history_pnl`, { userId, followerAccount, sortByPnlDesc, page }, {
                headers: this.getAuthHeaders(),
                withCredentials: true,
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data;
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    /**
     * Gets the details of a specific copy trade for a user.
     */
    async getCopyTradeDetails(userId, copyTradeId, page = { page: 1, limit: 1 }) {
        try {
            const response = await axios_1.default.post(`${this.hostUrl}/copy_trade/trades`, { userId, copyTradeId, page }, {
                headers: this.getAuthHeaders(),
                withCredentials: true,
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data;
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    // --- Auth ---
    /**
     * Initiates Google login flow. (Not implemented)
     */
    async googleLogin(req) {
        const response = await axios_1.default.post(`${this.hostUrl}/auth/google/login`, req);
        return response.data;
    }
    /**
     * Handles Google login callback. (Not implemented)
     */
    async googleCallback(code, state) {
        const response = await axios_1.default.get(`${this.hostUrl}/auth/google/callback`, { params: { code, state } });
        return response.data;
    }
    /**
     * Initiates Privy login flow. (Not implemented)
     */
    async privyLogin(req) {
        const response = await axios_1.default.post(`${this.hostUrl}/auth/privy/login`, req);
        return response.data;
    }
    /**
     * Signs up a new user with an optional invite code. (Not implemented)
     */
    async signUp(req) {
        const response = await axios_1.default.post(`${this.hostUrl}/auth/sign_up`, req);
        return response.data;
    }
    /**
     * Logs out the current user. (Not implemented)
     */
    async logout() {
        const response = await axios_1.default.post(`${this.hostUrl}/auth/logout`, {});
        return response.data;
    }
    // Get user info
    async getUserInfo() {
        const response = await axios_1.default.post(`${this.hostUrl}/auth/user_info`, {});
        return response.data;
    }
    // --- Paxg ---
    async congressTrading(symbol) {
        const response = await axios_1.default.post(`${this.hostUrl}/congresstrading`, { symbol });
        return response.data;
    }
    // --- Trader ---
    async shareInfo(walletAddress, period) {
        const response = await axios_1.default.post(`${this.hostUrl}/share_info`, { walletAddress, period });
        return response.data;
    }
    async topTradersWithPeriod(sort, page) {
        const response = await axios_1.default.post(`${this.hostUrl}/top_traders_with_period`, { sort, page });
        return response.data;
    }
    async traderOverview(address) {
        const response = await axios_1.default.post(`${this.hostUrl}/trader/overview`, { address });
        return response.data;
    }
    async smartTraders() {
        const response = await axios_1.default.post(`${this.hostUrl}/trader/smart_traders`, {});
        return response.data;
    }
    async traderSnapshot(address, dateRange) {
        const response = await axios_1.default.post(`${this.hostUrl}/trader/snapshot`, { address, dateRange });
        return response.data;
    }
    // --- User ---
    async addWatchedTrader(address) {
        const response = await axios_1.default.post(`${this.hostUrl}/user/add_watching_address`, { address });
        return response.data;
    }
    async claimCommission(receiveWallet) {
        const response = await axios_1.default.post(`${this.hostUrl}/user/claim_commission`, { receiveWallet });
        return response.data;
    }
    async claimCoupon(couponId, address) {
        const response = await axios_1.default.post(`${this.hostUrl}/user/claim_coupon`, { couponId, address });
        return response.data;
    }
    async userCoupons(type) {
        const response = await axios_1.default.post(`${this.hostUrl}/user/coupons`, { type });
        return response.data;
    }
    async getReferralCodeByChannelId(channelId) {
        const response = await axios_1.default.post(`${this.hostUrl}/user/referral_code_by_channel_id`, { channelId });
        return response.data;
    }
    async getReferralCommission(filterId, startTime, endTime, page) {
        const response = await axios_1.default.post(`${this.hostUrl}/user/referral_commission`, { filterId, startTime, endTime, page });
        return response.data;
    }
    async getReferralInfo() {
        const response = await axios_1.default.post(`${this.hostUrl}/user/referral_info`, {});
        return response.data;
    }
    async getReferralList(filterId, startTime, endTime, page) {
        const response = await axios_1.default.post(`${this.hostUrl}/user/referral_list`, { filterId, startTime, endTime, page });
        return response.data;
    }
    async removeWatchedTrader(address) {
        const response = await axios_1.default.post(`${this.hostUrl}/user/remove_watching_address`, { address });
        return response.data;
    }
    async getSolanaAddresses() {
        const response = await axios_1.default.post(`${this.hostUrl}/user/solana_address`, {});
        return response.data;
    }
    async getSolanaAuthMessage(address) {
        const response = await axios_1.default.post(`${this.hostUrl}/user/solana_auth`, { address });
        return response.data;
    }
    async linkSolanaAddress(address, message, signature) {
        const response = await axios_1.default.post(`${this.hostUrl}/user/solana_link`, { address, message, signature });
        return response.data;
    }
    async userWalletInfo(walletAddress) {
        const response = await axios_1.default.post(`${this.hostUrl}/user/wallet_info`, { walletAddress });
        return response.data;
    }
    async getWatchedTraders(sort, page) {
        const response = await axios_1.default.post(`${this.hostUrl}/user/watching_list`, { sort, page });
        return response.data;
    }
    // --- Wallet ---
    async activateKmsWallet(walletAddress, agentAddress, walletName, signRawAction, signature) {
        const response = await axios_1.default.post(`${this.hostUrl}/wallet/activate_kms_wallet`, { walletAddress, agentAddress, walletName, signRawAction, signature });
        return response.data;
    }
    async bindBuilder(walletAddress, signRawAction, signature) {
        const response = await axios_1.default.post(`${this.hostUrl}/wallet/bind_builder`, { walletAddress, signRawAction, signature });
        return response.data;
    }
    async checkWallet(walletAddress) {
        const response = await axios_1.default.post(`${this.hostUrl}/wallet/check_wallet`, { walletAddress });
        return response.data;
    }
    async createKmsKey(walletAddress) {
        const response = await axios_1.default.post(`${this.hostUrl}/wallet/create_kms_key`, { walletAddress });
        return response.data;
    }
    async getBuilderFee() {
        const response = await axios_1.default.post(`${this.hostUrl}/wallet/get_builder_fee`, {});
        return response.data;
    }
    async walletList() {
        const response = await axios_1.default.post(`${this.hostUrl}/wallet/list`, {});
        return response.data;
    }
    async refreshAgentWallet(walletAddress) {
        const response = await axios_1.default.post(`${this.hostUrl}/wallet/refresh_agent_wallet`, { walletAddress });
        return response.data;
    }
    // --- Deposit ---
    async getBridgeAddress(userId, userWalletAddress) {
        const response = await axios_1.default.post(`${this.hostUrl}/deposit/get_bridge_address`, { userId, userWalletAddress });
        return response.data;
    }
    async listBridgeAddress(userId) {
        const response = await axios_1.default.post(`${this.hostUrl}/deposit/list_bridge_address`, { userId });
        return response.data;
    }
    async registerBridgeAddress(userId, params) {
        const response = await axios_1.default.post(`${this.hostUrl}/deposit/register_bridge_address`, { userId, params });
        return response.data;
    }
}
exports.SimpforFunSDK = SimpforFunSDK;
