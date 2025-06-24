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
    getAuthHeaders() {
        if (!this.accessToken)
            throw new Error('Not authenticated. Please login first.');
        return {
            Cookie: `access_token=${this.accessToken}`,
        };
    }
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
}
exports.SimpforFunSDK = SimpforFunSDK;
