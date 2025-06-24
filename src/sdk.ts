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
    paxgInfo: any;
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
    // Define fields as per actual API response if needed
    [key: string]: any;
}

export interface CopyTradeStopResponse {
    // Define fields as per actual API response if needed
    [key: string]: any;
}

export interface CopyTradeListResponse {
    // Define fields as per actual API response if needed
    [key: string]: any;
}

export interface CopyTradeHistoryPnlResponse {
    // Define fields as per actual API response if needed
    [key: string]: any;
}

export interface CopyTradeDetailsResponse {
    // Define fields as per actual API response if needed
    [key: string]: any;
}

export class SimpforFunSDK {
    hostUrl: string;
    accessToken: string | null = null;

    constructor(hostUrl: string = HOST_URL) {
        this.hostUrl = hostUrl;
    }

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

    private getAuthHeaders(): { Cookie: string } {
        if (!this.accessToken) throw new Error('Not authenticated. Please login first.');
        return {
            Cookie: `access_token=${this.accessToken}`,
        };
    }

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
} 