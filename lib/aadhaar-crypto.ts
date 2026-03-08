import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const KEY_HEX = process.env.AADHAAR_ENCRYPTION_KEY || ''

function getKey(): Buffer {
  if (!KEY_HEX || KEY_HEX.length !== 64) {
    throw new Error('AADHAAR_ENCRYPTION_KEY must be a 64-char hex string (32 bytes). Generate: openssl rand -hex 32')
  }
  return Buffer.from(KEY_HEX, 'hex')
}

/**
 * Encrypt plaintext Aadhaar number.
 * Returns "iv:authTag:ciphertext" — all hex, safe to store in DB.
 */
export function encryptAadhaar(plainAadhaar: string): string {
  const key = getKey()
  const iv = randomBytes(12) // 96-bit IV recommended for GCM
  const cipher = createCipheriv(ALGORITHM, key, iv)

  const encrypted = Buffer.concat([
    cipher.update(plainAadhaar, 'utf8'),
    cipher.final(),
  ])
  const authTag = cipher.getAuthTag()

  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`
}

/**
 * Decrypt stored Aadhaar value back to plaintext.
 * Only used server-side when explicitly needed (e.g. verification flow).
 */
export function decryptAadhaar(stored: string): string {
  const key = getKey()
  const parts = stored.split(':')
  if (parts.length !== 3) throw new Error('Invalid encrypted Aadhaar format')

  const [ivHex, authTagHex, ciphertextHex] = parts
  const iv = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')
  const ciphertext = Buffer.from(ciphertextHex, 'hex')

  const decipher = createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(authTag)

  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8')
}

/** Returns "XXXX-XXXX-1234" mask for display from last 4 digits */
export function maskAadhaar(last4: string): string {
  return `XXXX-XXXX-${last4}`
}
