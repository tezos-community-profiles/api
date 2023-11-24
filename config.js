import { config } from 'tiny-env-config'

export const PG_HOST = config('PG_HOST', '')
export const PG_PORT = config('PG_HORT', '')
export const PG_NAME = config('PG_NAME', '')
export const PG_USER = config('PG_USER', '')
export const PG_PASS = config('PG_PASS', '')
export const IPFS_API = config('IPFS_API', '')
export const IPFS_PASS = config('IPFS_PASS', '')
export const IPFS_USER = config('IPFS_USER', '')
export const HTTP_PORT = config('HTTP_PORT', '8080')
export const INDEX_KEYS = config('INDEX_KEYS', '["profile", "proofs"]', JSON.parse)
export const SENTRY_DSN = config('SENTRY_DSN', '')
export const TCP_CONTRACT = config('TCP_CONTRACT', '')
