
export const BASE_URL = "http://localhost:5000"
export const API_PATH = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getUser",
        LOGOUT: "/api/v1/auth/logout",
        GOOGLE_LOGIN:"/api/v1/auth/google",
        GITHUB_LOGIN:"/api/v1/auth/github"
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/auth/dashboard"
    },
    IMAGE: {
        UPLOAD_IMG: "/api/v1/auth/upload-image"
    },
    INCOME: {
        ADD: "/api/v1/income/addIncome",
        GETINCOME: "/api/v1/income/getIncome",
        EDITINCOME: "/api/v1/income/editIncome",
        DELETEINCOME: "/api/v1/income/deleteIncome"
    },
    EXPENSE: {
        ADD: "/api/v1/expense/addExpense",
        GETEXPENSE: "/api/v1/expense/getExpense",
        EDITEXPENSE: "/api/v1/expense/editExpense",
        DELETEEXPENSE: "/api/v1/expense/deleteExpense"
    },
    TOTALINCOMEEXPENSE: {
        GET: "/api/v1/dashboard/getDashBoard"
    },
    PING: {
        GET: "/api/ping"
    },
    PROFILE: {
        PROFILE_UPDATE: "/api/v1/profile/profile-update",
        UPDATE_IMG: "/api/v1/profile/profile-avatar-update",
        PASSWORD_CHANGE: "/api/v1/profile/change-password",
        RESET_PASSWORD: "/api/v1/profile/reset-password",
        RESET_TOKEN_VERIFY: "/api/v1/profile/resetPassword",
        RESET_PASSWORD_CHANGE: "/api/v1/profile/reset-password-change",
        VERIFY_EMAIL_LINK: "/api/v1/profile/email-verification",
        VERIFY_EMAIL_TOKEN: "/api/v1/profile/email-verification-code"
    },
    SETTINGS: {
        COUNTRIES: "/api/v1/settings/countries",
        SET_CURRENCY: "/api/v1/settings/currency_info"
    }
}