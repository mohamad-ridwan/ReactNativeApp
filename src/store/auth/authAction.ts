import { createAsyncThunk } from "@reduxjs/toolkit"
import { reqHeaders } from "../../services/api/reqHeaders"
import { ReqAuthUserT, ReqLoginUserT, ReqRefreshTokenT } from "../../types/store/auth/authAction"
import { dummyJSON_API_URL } from "../../services/api/baseURL"

export const loginUser = createAsyncThunk(
    "login-user",
    async ({
        username,
        password,
        expiresInMin
    }: ReqLoginUserT, { rejectWithValue }) => {
        try {
            const response = await fetch(`${dummyJSON_API_URL}auth/login`, reqHeaders(
                'POST',
                { "Content-Type": "application/json" },
                JSON.stringify({ username, password, expiresInMin }),
                'include'
            ))
            if (!response.ok) {
                return rejectWithValue(response.statusText)
            }
            const result = await response.json()
            if (result?.id === undefined) {
                return rejectWithValue(result)
            }
            return result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const refreshToken = createAsyncThunk(
    "refresh-token",
    async ({
        refreshToken,
        expiresInMins
    }: ReqRefreshTokenT, { rejectWithValue }) => {
        try {
            const response = await fetch(`${dummyJSON_API_URL}auth/refresh`,
                reqHeaders(
                    'POST',
                    {
                        "Content-Type": "application/json"
                    },
                    JSON.stringify({
                        refreshToken,
                        expiresInMins
                    }),
                    'include'
                )
            )
            if (!response.ok) {
                return rejectWithValue(response.statusText)
            }
            const result = await response.json()
            if (result?.accessToken === undefined) {
                return rejectWithValue(result)
            }
            return result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getAuthUser = createAsyncThunk(
    "auth-user",
    async ({ token }: ReqAuthUserT, { rejectWithValue }) => {
        try {
            const response = await fetch(`${dummyJSON_API_URL}auth/me`,
                reqHeaders(
                    'GET',
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                ))
            if (!response.ok) {
                return rejectWithValue(response.statusText)
            }
            const result = await response?.json()
            if (result?.id === undefined) {
                return rejectWithValue(result)
            }
            return result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)