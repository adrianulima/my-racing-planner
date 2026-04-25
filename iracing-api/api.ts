/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto";
import axios from "axios";
import axiosClient from "./axiosClient";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
  scope?: string;
}

let tokenData: TokenResponse | null = null;
let tokenExpiry: Date | null = null;
let refreshTokenExpiry: Date | null = null;

/**
 * Mask a secret (client_secret or password) using iRacing's masking algorithm.
 * @param secret - The secret to mask
 * @param identifier - client_id for client_secret, username for password
 * @returns Base64 encoded SHA-256 hash
 */
function maskSecret(secret: string, identifier: string): string {
  const normalizedId = identifier.trim().toLowerCase();
  const combined = `${secret}${normalizedId}`;
  const hash = crypto.createHash("sha256").update(combined).digest("base64");
  return hash;
}

/**
 * Authenticate using OAuth 2.1 Password Limited Grant
 */
export const authenticate = async (
  username: string,
  password: string,
  clientId: string,
  clientSecret: string,
) => {
  // Check if we have a valid access token
  if (tokenData && tokenExpiry && new Date() < tokenExpiry) {
    console.log("Using existing valid access token");
    return;
  }

  // Check if we can refresh the token
  if (
    tokenData?.refresh_token &&
    refreshTokenExpiry &&
    new Date() < refreshTokenExpiry
  ) {
    console.log("Refreshing access token");
    await refreshAccessToken(clientId, clientSecret, tokenData.refresh_token);
    return;
  }

  // Perform new authentication
  console.log("Authenticating with Password Limited Grant");

  const maskedPassword = maskSecret(password, username);
  const maskedClientSecret = maskSecret(clientSecret, clientId);

  const params = new URLSearchParams({
    grant_type: "password_limited",
    client_id: clientId,
    client_secret: maskedClientSecret,
    username: username,
    password: maskedPassword,
    scope: "iracing.auth",
  });

  try {
    const response = await axios.post<TokenResponse>(
      "https://oauth.iracing.com/oauth2/token",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    tokenData = response.data;
    tokenExpiry = new Date(Date.now() + tokenData.expires_in * 1000);
    if (tokenData.refresh_token && tokenData.refresh_token_expires_in) {
      refreshTokenExpiry = new Date(
        Date.now() + tokenData.refresh_token_expires_in * 1000,
      );
    }

    console.log(
      `Authentication successful. Token expires at ${tokenExpiry.toISOString()}`,
    );
  } catch (error: any) {
    console.error(
      "Authentication failed:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

/**
 * Refresh the access token using a refresh token
 */
const refreshAccessToken = async (
  clientId: string,
  clientSecret: string,
  refreshToken: string,
) => {
  const maskedClientSecret = maskSecret(clientSecret, clientId);

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientId,
    client_secret: maskedClientSecret,
    refresh_token: refreshToken,
  });

  try {
    const response = await axios.post<TokenResponse>(
      "https://oauth.iracing.com/oauth2/token",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    tokenData = response.data;
    tokenExpiry = new Date(Date.now() + tokenData.expires_in * 1000);
    if (tokenData.refresh_token && tokenData.refresh_token_expires_in) {
      refreshTokenExpiry = new Date(
        Date.now() + tokenData.refresh_token_expires_in * 1000,
      );
    }

    console.log(
      `Token refreshed successfully. New token expires at ${tokenExpiry.toISOString()}`,
    );
  } catch (error: any) {
    console.error(
      "Token refresh failed:",
      error.response?.data || error.message,
    );
    // Clear token data so next call will re-authenticate
    tokenData = null;
    tokenExpiry = null;
    refreshTokenExpiry = null;
    throw error;
  }
};

/**
 * Get the current access token
 */
export const getAccessToken = (): string | null => {
  return tokenData?.access_token || null;
};

const apiGet = async (
  path: string,
  queryParams: { [key: string]: string } = {},
) => {
  const params = new URLSearchParams(queryParams).toString();
  const url = params ? `${path}?${params}` : path;
  const response = await axiosClient.get(url);
  // Use plain axios for S3 URLs (they have their own auth in the query params)
  return axios.get(response.data.link);
};

export const apiGetCars = async () => {
  return apiGet("/data/car/get");
};

export const apiGetCarAssets = async () => {
  return apiGet("/data/car/assets");
};

export const apiGetTracks = async () => {
  return apiGet("/data/track/get");
};

export const apiGetTrackAssets = async () => {
  return apiGet("/data/track/assets");
};

export const apiGetCarClasses = async () => {
  return apiGet("/data/carclass/get");
};

export const apiGetLicenses = async () => {
  return apiGet("/data/lookup/licenses");
};

// export const apiGetSeasons = async (
//   season_year: string,
//   season_quarter: string,
// ) => {
//   return apiGet("/data/season/list", { season_year, season_quarter });
// };

export const apiGetSeries = async () => {
  return apiGet("/data/series/get");
};

export const apiGetSeriesAssets = async () => {
  return apiGet("/data/series/assets");
};

export const apiGetSeriesSeasons = async () => {
  return apiGet("/data/series/seasons");
};

export const apiGetSeriesPastSeasons = async (series_id: string) => {
  return apiGet("/data/series/past_seasons", { series_id });
};
