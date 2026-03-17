const DEFAULT_PROD_API_URL = "https://eclecticabackend-production-ffd4.up.railway.app";
const DEFAULT_DEV_API_URL = "http://localhost:5000";

const normalizeBaseUrl = (value) => String(value || "").trim().replace(/\/+$/g, "");

const parseCsvUrls = (value) =>
  String(value || "")
    .split(",")
    .map((item) => normalizeBaseUrl(item))
    .filter(Boolean);

const envPrimaryApiUrl = normalizeBaseUrl(import.meta.env.VITE_API_URL);
const envApiCandidates = parseCsvUrls(import.meta.env.VITE_API_URLS);

const defaultCandidates = import.meta.env.DEV
  ? [DEFAULT_DEV_API_URL, DEFAULT_PROD_API_URL]
  : [envPrimaryApiUrl || DEFAULT_PROD_API_URL, DEFAULT_DEV_API_URL];

const knownApiBaseUrls = [
  ...new Set(
    [...envApiCandidates, envPrimaryApiUrl, ...defaultCandidates]
      .map((url) => normalizeBaseUrl(url))
      .filter(Boolean)
  ),
];

let preferredApiBaseUrl = knownApiBaseUrls[0] || DEFAULT_PROD_API_URL;

const isNetworkLikeError = (error) => {
  const status = error?.response?.status;
  if (status === 502 || status === 503 || status === 504) {
    return true;
  }

  return !error?.response;
};

export const getApiBaseUrl = () => preferredApiBaseUrl;

export const getApiCandidates = () => [
  preferredApiBaseUrl,
  ...knownApiBaseUrls.filter((url) => url !== preferredApiBaseUrl),
];

export const buildApiUrl = (baseUrl, endpointPath) => {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  const normalizedPath = endpointPath.startsWith("/") ? endpointPath : `/${endpointPath}`;
  return `${normalizedBaseUrl}${normalizedPath}`;
};

export const callApiWithFallback = async (requestBuilder) => {
  const candidates = getApiCandidates();
  let lastError = null;

  for (const baseUrl of candidates) {
    try {
      const response = await requestBuilder(baseUrl);
      preferredApiBaseUrl = baseUrl;
      return response;
    } catch (error) {
      lastError = error;
      if (!isNetworkLikeError(error)) {
        throw error;
      }
    }
  }

  throw lastError;
};

export { DEFAULT_PROD_API_URL };