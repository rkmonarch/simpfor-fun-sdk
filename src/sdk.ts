import axios from 'axios';

const HOST_URL = 'https://hype-api.simpfor.fun';

// --- Types ---
export interface User {
    uid: number;
    email: string;
    referralCode: string;
    invitedByCode: string;
}

export interface LoginResponse {
    code: number;
    message: string;
    data: {
        user: User;
    };
    accessToken?: string;
}

export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

export interface Trader {
    address: string;
    value: number;
    roi: number;
    pnl: number;
    apy: number;
    maxDrawdown: number;
    sharpeRatio: number;
    winRate: number;
    tradingVolume: number;
    totalLong: number;
    totalShort: number;
    followValue: number;
    labels: Record<string, number>;
    paxgInfo: TraderPaxgInfo;
    watched: boolean;
    copying: boolean;
}

export interface CopyTradeInfo {
    copyTradeId: number;
    active: boolean;
    description: string;
    followerAccount: string;
    leaderAccount: string;
    watched: boolean;
    createTime: string;
    updateTime: string;
}

export interface CopyTradeCreateResponse {
    info: CopyTradeInfo;
}

export interface CopyTradeRunResponse {
    info: CopyTradeInfo;
}

export interface CopyTradeStopResponse {
    copyTradeId: number;
}

export interface CopyTradeListResponse {
    infos: CopyTradeInfo[];
}

export interface CopyTradeHistoryPnlResponse {
    history: PnlHistory[];
}

export interface CopyTradeDetailsResponse {
    trades: TradeRecord[];
}

export interface EmailLoginRes { user: User }
export interface EmailVerifyCodeRes { }
export interface GoogleCallbackRes { }
export interface GoogleLoginRes { url: string }
export interface LogoutRes { }
export interface PrivyLoginRes { user: User }
export interface SignUpRes { user: User }
export interface GetUserInfoRes { user: User }

export interface AddWatchedTraderRes { }
export interface ClaimCommissionRes { success: boolean }
export interface ClaimCouponRes { success: boolean }
export interface UserCouponsRes { total: number; coupons: UserCoupon[] }
export interface GetReferralCodeByChannelIdRes { referralCode: string; channelId: string; isFound: boolean }
export interface GetReferralCommissionRes { commissions: CommissionEntry[]; total: number }
export interface GetReferralInfoRes {
    userBuilderFee: number;
    referralBuilderFee: number;
    referralUserCount: number;
    referralTraderCount: number;
    totalCommission: number;
    totalPaidCommission: number;
    totalPendingCommission: number;
}
export interface GetReferralListRes { referrals: ReferralEntry[]; total: number }
export interface RemoveWatchedTraderRes { }
export interface GetSolanaAddressesRes { address: string; linked: boolean }
export interface AuthMessageRes { message: string }
export interface LinkSolanaAddressRes { success: boolean }
export interface UserWalletInfoRes { realizedPnl: number }
export interface GetWatchedTradersRes { list: TraderUserView[]; total: number }

export interface CreateRes { info: CopyTradeInfo }
export interface GetHistoryPnlRes { history: PnlHistory[] }
export interface ListRes { infos: CopyTradeInfo[] }
export interface GetPnlRes { currentPnl: number; cumulativePnl: number }
export interface RemoveRes { copyTradeId: number }
export interface RunRes { info: CopyTradeInfo }
export interface StopRes { copyTradeId: number }
export interface GetTotalPnlRes { pnl: number }
export interface GetTradesRes { trades: TradeRecord[] }

export interface ShareInfoRes { period: string; roi: number; pnl: number }
export interface TopTradersRes { traders: TraderUserView[]; total: number }
export interface TopTradersWithPeriodRes { traders: TopTraderWithPeriodInfo[]; total: number }
export interface TraderOverviewRes { traderOverview: TraderOverview }
export interface SmartTraderRes {
    topValueTrader: SmartTraderInfo[];
    topRoiTrader: SmartTraderInfo[];
    topPnlTrader: SmartTraderInfo[];
    topFollowValueTrader: SmartTraderInfo[];
}
export interface TraderSnapshotRes {
    trader: TraderUserView;
    snapshot: TraderSnapshotPoint[];
    followerSummary: FollowerSummary;
    followerSnapshot: TraderSnapshotPoint[];
}

// --- Additional referenced types ---
export interface UserCoupon {
    id: number;
    amount: number;
    status: string;
    expiry: string;
    effective: string;
    receivingAddress: string;
}
export interface CommissionEntry {
    referralID: number;
    commissionDate: number;
    status: string;
    tradingVolume: number;
    builderFee: number;
    commissionRate: number;
    commission: number;
}
export interface ReferralEntry {
    userId: number;
    joinTime: number;
    tradingVolume: number;
    commission: number;
    builderFee: number;
    referralLevel: string;
}
export interface TraderUserView {
    address: string;
    value: number;
    roi: number;
    pnl: number;
    apy: number;
    maxDrawdown: number;
    sharpeRatio: number;
    winRate: number;
    tradingVolume: number;
    totalLong: number;
    totalShort: number;
    followValue: number;
    labels: Record<string, number>;
    paxgInfo: TraderPaxgInfo;
    watched: boolean;
    copying: boolean;
}
export interface TraderPaxgInfo {
    pnl_30d: number;
    mdd_30d: string;
    pv: string;
    wr_30d: number;
    snapshots: TraderSnapshotPoint[];
}
export interface TraderSnapshotPoint {
    date: string;
    roi: number;
    pnl: number;
    value: number;
}
export interface PnlHistory {
    leaderAccount: string;
    pnl: number;
    timestamp: string;
}
export interface TradeRecord {
    leader: string;
    follower: string;
    oid: number;
    coin: string;
    side: string;
    filledSize: number;
    filledPrice: number;
    reduceOnly: boolean;
    createTime: string;
}
export interface TopTraderWithPeriodInfo {
    trader: TraderUserView;
    period: string;
    snapshot: TraderSnapshotPoint[];
}
export interface TraderOverview {
    address: string;
    value: number;
    position: number;
    averageLeverage: number;
    daysTrading: number;
}
export interface SmartTraderInfo {
    Trader: TraderUserView;
    period: string;
    Snapshot: TraderSnapshotPoint[];
}
export interface FollowerSummary {
    copiersValue: number;
    copiersPnl: number;
    totalCopiers: number;
    sharpeRatio: number;
    winRate: number;
    TradingVolume: number;
}
export interface BridgeAddressInfo {
    userWalletAddress: string;
    userBridgeAddress: string;
}

export interface SignRawAction {
    nonce: number;
    agentAddress: number[];
    agentName: string;
    hyperliquidChain: string;
    signatureChainId: string;
}

// --- Add missing interfaces for request/response bodies ---
export interface EmailVerifyCodeReq { email: string; }
export interface GoogleCallbackReq { code: string; state: string; }
export interface GoogleLoginReq { referralCode?: string; }
export interface PrivyLoginReq { privyAuthToken: string; privyEmail: string; referralCode?: string; }
export interface SignUpReq { invitedByCode?: string; }
export interface LogoutReq { }
export interface GetUserInfoReq { }
export interface CongressTradingReq { symbol: string; }
export interface CongressTradingRes { congressTrading: CongressTrading[]; }
export interface ShareInfoReq { walletAddress: string; period: '7D' | '30D' | '90D' | '180D'; }
export interface TopTradersReq { sort: { field: string; order: 'asc' | 'desc' }; page: { page: number; limit: number }; }
export interface TopTradersWithPeriodReq { sort: { field: string; order: 'asc' | 'desc' }; page: { page: number; limit: number }; }
export interface TraderOverviewReq { address: string; }
export interface SmartTraderReq { }
export interface TraderSnapshotReq { address: string; dateRange?: string; }
export interface AddWatchedTraderReq { address: string; }
export interface ClaimCommissionReq { receiveWallet: string; }
export interface ClaimCouponReq { couponId: number; address: string; }
export interface UserCouponsReq { type: 'all' | 'active' | 'expired' | 'pending' | 'claimed'; }
export interface GetReferralCodeByChannelIdReq { channelId: string; }
export interface GetReferralCommissionReq { filterId?: number; startTime?: number; endTime?: number; page?: { page: number; limit: number }; }
export interface GetReferralInfoReq { }
export interface GetReferralListReq { filterId?: number; startTime?: number; endTime?: number; page?: { page: number; limit: number }; }
export interface RemoveWatchedTraderReq { address: string; }
export interface GetSolanaAddressesReq { }
export interface AuthMessageReq { address: string; }
export interface LinkSolanaAddressReq { address: string; message: string; signature: string; }
export interface UserWalletInfoReq { walletAddress: string; }
export interface GetWatchedTradersReq { sort?: { field: string; order: 'asc' | 'desc' }; page?: { page: number; limit: number }; }
export interface BindBuilderReq { walletAddress: string; signRawAction: ApproveBuilderFeeRequest; signature: string; }
export interface CheckWalletReq { walletAddress: string; }
export interface CreateKmsKeyReq { walletAddress: string; }
export interface GetBuilderFeeReq { }
export interface WalletListReq { }
export interface RefreshAgentWalletReq { walletAddress: string; }
export interface GetBridgeAddressReq { userId: number; userWalletAddress: string; }
export interface ListBridgeAddressReq { userId: number; }
export interface RegisterBridgeAddressReq { userId: number; params: PermitRegistrationParams; }

// Add missing wallet and deposit response types
export interface ActivateKmsWalletRes { builderAddress: string; builderFeeRate: string; }
export interface BindBuilderRes { }
export interface CheckWalletRes { isAvailable: boolean; message: string; errorCode: string; }
export interface CreateKmsKeyRes { agentKmsAddress: string; kmsExpireTimestamp: number; }
export interface GetBuilderFeeRes { builderAddress: string; builderFeeRate: string; }
export interface WalletListRes { keys: KeyEntry[]; limit: number; }
export interface KeyEntry {
    hyperliquidAddress: string;
    walletName: string;
    agentAddress: string;
    expireTimestamp: number;
    following: boolean;
    expirationStatus: string;
    perpEquity: string;
    uPnl: string;
    actions: string[];
}
export interface RefreshAgentWalletRes { agentKmsAddress: string; kmsExpireTimestamp: number; }
export interface GetBridgeAddressRes { userBridgeAddress: string; }
export interface ListBridgeAddressRes { addresses: BridgeAddressInfo[]; }
export interface RegisterBridgeAddressRes { txHash: string; }

// Add missing wallet and deposit request types
export interface ApproveBuilderFeeRequest {
    nonce: number;
    builder: number[];
    maxFeeRate: string;
    hyperliquidChain: string;
    signatureChainId: string;
}
export interface PermitRegistrationParams {
    tokenAddress: string;
    userWalletAddress: string;
    userBridgeAddress: string;
    permitValue: string;
    permitDeadline: string;
    permitSig: string;
}

export interface CongressTrading {
    representative: string;
    bioGuideID: string;
    reportDate: string;
    transactionDate: string;
    ticker: string;
    transaction: string;
    range: string;
    house: string;
    amount: number;
    party: string;
    lastModified: string;
    tickerType: string;
    description: string;
    excessReturn: number;
    priceChange: number;
    spyChange: number;
}

export class SimpforFunSDK {
    hostUrl: string;
    accessToken: string | null = null;

    constructor(hostUrl: string = HOST_URL) {
        this.hostUrl = hostUrl;
    }

    /**
     * Sends a verification code to the specified email address for authentication.
     */
    async sendVerificationCode(email: string): Promise<ApiResponse<{}>> {
        try {
            const response = await axios.post<ApiResponse<{}>>(`${this.hostUrl}/auth/email/verify_code`, { email });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw error.response.data;
            } else {
                throw new Error(error.message);
            }
        }
    }

    /**
     * Verifies the OTP code sent to the user's email and logs in the user.
     * Stores the access token if login is successful.
     */
    async verifyOtp(email: string, code: string): Promise<LoginResponse> {
        try {
            const response = await axios.post<ApiResponse<{ user: User }>>(
                `${this.hostUrl}/auth/email/login`,
                { email, code },
                { withCredentials: true }
            );
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
        } catch (error: any) {
            if (error.response) {
                throw error.response.data;
            } else {
                throw new Error(error.message);
            }
        }
    }

    /**
     * Returns authentication headers containing the access token cookie.
     * Throws an error if not authenticated.
     */
    private getAuthHeaders(): { Cookie: string } {
        if (!this.accessToken) throw new Error('Not authenticated. Please login first.');
        return {
            Cookie: `access_token=${this.accessToken}`,
        };
    }

    /**
     * Fetches the list of top traders from the platform.
     */
    async fetchTopTraders(): Promise<Trader[]> {
        try {
            const response = await axios.post<ApiResponse<{ traders: Trader[] }>>(
                'https://hype-api.simpfor.fun/top_traders',
                {
                    page: { page: 1, limit: 20 },
                    sort: { field: 'roi', order: 'desc' },
                },
                {
                    headers: this.accessToken ? this.getAuthHeaders() : undefined,
                }
            );
            return response.data.data.traders;
        } catch (error: any) {
            if (error.response) {
                throw error.response.data;
            } else {
                throw new Error(error.message);
            }
        }
    }

    /**
     * Creates a new copy trade for the specified user, leader, and follower accounts.
     */
    async createCopyTrade(
        userId: number,
        leaderAccount: string,
        followerAccount: string
    ): Promise<ApiResponse<CopyTradeCreateResponse>> {
        try {
            const response = await axios.post<ApiResponse<CopyTradeCreateResponse>>(
                `${this.hostUrl}/copy_trade/create`,
                { userId, leaderAccount, followerAccount },
                {
                    headers: this.getAuthHeaders(),
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw error.response.data;
            } else {
                throw new Error(error.message);
            }
        }
    }

    /**
     * Runs an existing copy trade for the specified user and copy trade ID.
     */
    async runCopyTrade(userId: number, copyTradeId: number): Promise<ApiResponse<CopyTradeRunResponse>> {
        try {
            const response = await axios.post<ApiResponse<CopyTradeRunResponse>>(
                `${this.hostUrl}/copy_trade/run`,
                { userId, copyTradeId },
                {
                    headers: this.getAuthHeaders(),
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw error.response.data;
            } else {
                throw new Error(error.message);
            }
        }
    }

    /**
     * Stops a running copy trade and optionally closes positions.
     */
    async stopCopyTrade(
        userId: number,
        copyTradeId: number,
        closePositions: boolean = true
    ): Promise<ApiResponse<CopyTradeStopResponse>> {
        try {
            const response = await axios.post<ApiResponse<CopyTradeStopResponse>>(
                `${this.hostUrl}/copy_trade/stop`,
                { userId, copyTradeId, closePositions },
                {
                    headers: this.getAuthHeaders(),
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw error.response.data;
            } else {
                throw new Error(error.message);
            }
        }
    }

    /**
     * Lists all copy trades for the specified user.
     */
    async listCopyTrades(userId: number): Promise<ApiResponse<CopyTradeListResponse>> {
        try {
            const response = await axios.post<ApiResponse<CopyTradeListResponse>>(
                `${this.hostUrl}/copy_trade/list`,
                { userId },
                {
                    headers: this.getAuthHeaders(),
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw error.response.data;
            } else {
                throw new Error(error.message);
            }
        }
    }

    /**
     * Gets the PnL (profit and loss) history for a user's copy trades.
     */
    async getCopyTradeHistoryPnl(
        userId: number,
        followerAccount: string,
        sortByPnlDesc: boolean = true,
        page: { page: number; limit: number } = { page: 1, limit: 1 }
    ): Promise<ApiResponse<CopyTradeHistoryPnlResponse>> {
        try {
            const response = await axios.post<ApiResponse<CopyTradeHistoryPnlResponse>>(
                `${this.hostUrl}/copy_trade/history_pnl`,
                { userId, followerAccount, sortByPnlDesc, page },
                {
                    headers: this.getAuthHeaders(),
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw error.response.data;
            } else {
                throw new Error(error.message);
            }
        }
    }

    /**
     * Gets the details of a specific copy trade for a user.
     */
    async getCopyTradeDetails(
        userId: number,
        copyTradeId: number,
        page: { page: number; limit: number } = { page: 1, limit: 1 }
    ): Promise<ApiResponse<CopyTradeDetailsResponse>> {
        try {
            const response = await axios.post<ApiResponse<CopyTradeDetailsResponse>>(
                `${this.hostUrl}/copy_trade/trades`,
                { userId, copyTradeId, page },
                {
                    headers: this.getAuthHeaders(),
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw error.response.data;
            } else {
                throw new Error(error.message);
            }
        }
    }

    // --- Auth ---
    /**
     * Initiates Google login flow. (Not implemented)
     */
    async googleLogin(req: GoogleLoginReq): Promise<GoogleLoginRes> {
        const response = await axios.post<GoogleLoginRes>(`${this.hostUrl}/auth/google/login`, req);
        return response.data;
    }
    /**
     * Handles Google login callback. (Not implemented)
     */
    async googleCallback(code: string, state: string): Promise<GoogleCallbackRes> {
        const response = await axios.get<GoogleCallbackRes>(`${this.hostUrl}/auth/google/callback`, { params: { code, state } });
        return response.data;
    }
    /**
     * Initiates Privy login flow. (Not implemented)
     */
    async privyLogin(req: PrivyLoginReq): Promise<PrivyLoginRes> {
        const response = await axios.post<PrivyLoginRes>(`${this.hostUrl}/auth/privy/login`, req);
        return response.data;
    }
    /**
     * Signs up a new user with an optional invite code. (Not implemented)
     */
    async signUp(req: SignUpReq): Promise<SignUpRes> {
        const response = await axios.post<SignUpRes>(`${this.hostUrl}/auth/sign_up`, req);
        return response.data;
    }
    /**
     * Logs out the current user. (Not implemented)
     */
    async logout(): Promise<LogoutRes> {
        const response = await axios.post<LogoutRes>(`${this.hostUrl}/auth/logout`, {});
        return response.data;
    }
    // Get user info
    async getUserInfo(): Promise<GetUserInfoRes> {
        const response = await axios.post<GetUserInfoRes>(`${this.hostUrl}/auth/user_info`, {});
        return response.data;
    }

    // --- Paxg ---
    async congressTrading(symbol: string): Promise<CongressTradingRes> {
        const response = await axios.post<CongressTradingRes>(`${this.hostUrl}/congresstrading`, { symbol });
        return response.data;
    }

    // --- Trader ---
    async shareInfo(walletAddress: string, period: '7D' | '30D' | '90D' | '180D'): Promise<ShareInfoRes> {
        const response = await axios.post<ShareInfoRes>(`${this.hostUrl}/share_info`, { walletAddress, period });
        return response.data;
    }
    async topTradersWithPeriod(sort: { field: string; order: 'asc' | 'desc' }, page: { page: number; limit: number }): Promise<TopTradersWithPeriodRes> {
        const response = await axios.post<TopTradersWithPeriodRes>(`${this.hostUrl}/top_traders_with_period`, { sort, page });
        return response.data;
    }
    async traderOverview(address: string): Promise<TraderOverviewRes> {
        const response = await axios.post<TraderOverviewRes>(`${this.hostUrl}/trader/overview`, { address });
        return response.data;
    }
    async smartTraders(): Promise<SmartTraderRes> {
        const response = await axios.post<SmartTraderRes>(`${this.hostUrl}/trader/smart_traders`, {});
        return response.data;
    }
    async traderSnapshot(address: string, dateRange?: string): Promise<TraderSnapshotRes> {
        const response = await axios.post<TraderSnapshotRes>(`${this.hostUrl}/trader/snapshot`, { address, dateRange });
        return response.data;
    }

    // --- User ---
    async addWatchedTrader(address: string): Promise<AddWatchedTraderRes> {
        const response = await axios.post<AddWatchedTraderRes>(`${this.hostUrl}/user/add_watching_address`, { address });
        return response.data;
    }
    async claimCommission(receiveWallet: string): Promise<ClaimCommissionRes> {
        const response = await axios.post<ClaimCommissionRes>(`${this.hostUrl}/user/claim_commission`, { receiveWallet });
        return response.data;
    }
    async claimCoupon(couponId: number, address: string): Promise<ClaimCouponRes> {
        const response = await axios.post<ClaimCouponRes>(`${this.hostUrl}/user/claim_coupon`, { couponId, address });
        return response.data;
    }
    async userCoupons(type: 'all' | 'active' | 'expired' | 'pending' | 'claimed'): Promise<UserCouponsRes> {
        const response = await axios.post<UserCouponsRes>(`${this.hostUrl}/user/coupons`, { type });
        return response.data;
    }
    async getReferralCodeByChannelId(channelId: string): Promise<GetReferralCodeByChannelIdRes> {
        const response = await axios.post<GetReferralCodeByChannelIdRes>(`${this.hostUrl}/user/referral_code_by_channel_id`, { channelId });
        return response.data;
    }
    async getReferralCommission(filterId?: number, startTime?: number, endTime?: number, page?: { page: number; limit: number }): Promise<GetReferralCommissionRes> {
        const response = await axios.post<GetReferralCommissionRes>(`${this.hostUrl}/user/referral_commission`, { filterId, startTime, endTime, page });
        return response.data;
    }
    async getReferralInfo(): Promise<GetReferralInfoRes> {
        const response = await axios.post<GetReferralInfoRes>(`${this.hostUrl}/user/referral_info`, {});
        return response.data;
    }
    async getReferralList(filterId?: number, startTime?: number, endTime?: number, page?: { page: number; limit: number }): Promise<GetReferralListRes> {
        const response = await axios.post<GetReferralListRes>(`${this.hostUrl}/user/referral_list`, { filterId, startTime, endTime, page });
        return response.data;
    }
    async removeWatchedTrader(address: string): Promise<RemoveWatchedTraderRes> {
        const response = await axios.post<RemoveWatchedTraderRes>(`${this.hostUrl}/user/remove_watching_address`, { address });
        return response.data;
    }
    async getSolanaAddresses(): Promise<GetSolanaAddressesRes> {
        const response = await axios.post<GetSolanaAddressesRes>(`${this.hostUrl}/user/solana_address`, {});
        return response.data;
    }
    async getSolanaAuthMessage(address: string): Promise<AuthMessageRes> {
        const response = await axios.post<AuthMessageRes>(`${this.hostUrl}/user/solana_auth`, { address });
        return response.data;
    }
    async linkSolanaAddress(address: string, message: string, signature: string): Promise<LinkSolanaAddressRes> {
        const response = await axios.post<LinkSolanaAddressRes>(`${this.hostUrl}/user/solana_link`, { address, message, signature });
        return response.data;
    }
    async userWalletInfo(walletAddress: string): Promise<UserWalletInfoRes> {
        const response = await axios.post<UserWalletInfoRes>(`${this.hostUrl}/user/wallet_info`, { walletAddress });
        return response.data;
    }
    async getWatchedTraders(sort?: { field: string; order: 'asc' | 'desc' }, page?: { page: number; limit: number }): Promise<GetWatchedTradersRes> {
        const response = await axios.post<GetWatchedTradersRes>(`${this.hostUrl}/user/watching_list`, { sort, page });
        return response.data;
    }

    // --- Wallet ---
    async activateKmsWallet(walletAddress: string, agentAddress: string, walletName: string, signRawAction: SignRawAction, signature: string): Promise<ActivateKmsWalletRes> {
        const response = await axios.post<ActivateKmsWalletRes>(`${this.hostUrl}/wallet/activate_kms_wallet`, { walletAddress, agentAddress, walletName, signRawAction, signature });
        return response.data;
    }
    async bindBuilder(walletAddress: string, signRawAction: ApproveBuilderFeeRequest, signature: string): Promise<BindBuilderRes> {
        const response = await axios.post<BindBuilderRes>(`${this.hostUrl}/wallet/bind_builder`, { walletAddress, signRawAction, signature });
        return response.data;
    }
    async checkWallet(walletAddress: string): Promise<CheckWalletRes> {
        const response = await axios.post<CheckWalletRes>(`${this.hostUrl}/wallet/check_wallet`, { walletAddress });
        return response.data;
    }
    async createKmsKey(walletAddress: string): Promise<CreateKmsKeyRes> {
        const response = await axios.post<CreateKmsKeyRes>(`${this.hostUrl}/wallet/create_kms_key`, { walletAddress });
        return response.data;
    }
    async getBuilderFee(): Promise<GetBuilderFeeRes> {
        const response = await axios.post<GetBuilderFeeRes>(`${this.hostUrl}/wallet/get_builder_fee`, {});
        return response.data;
    }
    async walletList(): Promise<WalletListRes> {
        const response = await axios.post<WalletListRes>(`${this.hostUrl}/wallet/list`, {});
        return response.data;
    }
    async refreshAgentWallet(walletAddress: string): Promise<RefreshAgentWalletRes> {
        const response = await axios.post<RefreshAgentWalletRes>(`${this.hostUrl}/wallet/refresh_agent_wallet`, { walletAddress });
        return response.data;
    }

    // --- Deposit ---
    async getBridgeAddress(userId: number, userWalletAddress: string): Promise<GetBridgeAddressRes> {
        const response = await axios.post<GetBridgeAddressRes>(`${this.hostUrl}/deposit/get_bridge_address`, { userId, userWalletAddress });
        return response.data;
    }
    async listBridgeAddress(userId: number): Promise<ListBridgeAddressRes> {
        const response = await axios.post<ListBridgeAddressRes>(`${this.hostUrl}/deposit/list_bridge_address`, { userId });
        return response.data;
    }
    async registerBridgeAddress(userId: number, params: PermitRegistrationParams): Promise<RegisterBridgeAddressRes> {
        const response = await axios.post<RegisterBridgeAddressRes>(`${this.hostUrl}/deposit/register_bridge_address`, { userId, params });
        return response.data;
    }
} 