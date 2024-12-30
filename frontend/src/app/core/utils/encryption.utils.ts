import { SHA256, AES, enc, lib } from 'crypto-js';
import { environment } from '../../../environments/environment';

const ENCRYPTION_KEY = environment.encryptionKey;

export function hashPassword(password: string): string {
  const salt = enc.Base64.stringify(lib.WordArray.random(16));
  const hash = SHA256(password + salt).toString();
  return `${salt}:${hash}`;
}

export function hashSecurityAnswer(answer: string): string {
  const normalizedAnswer = answer.trim().toLowerCase();
  return SHA256(normalizedAnswer).toString();
}

export function encryptData(data: string): string {
  return AES.encrypt(data, ENCRYPTION_KEY).toString();
}

export function decryptData(encryptedData: string): string {
  const bytes = AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return bytes.toString(enc.Utf8);
}

export function encryptSensitiveData<T>(
  data: T,
  sensitiveFields: (keyof T)[]
): T {
  const encryptedData = { ...data } as { [key: string]: any };

  sensitiveFields.forEach((field) => {
    if (encryptedData[field as string]) {
      encryptedData[field as string] = encryptData(
        encryptedData[field as string]
      );
    }
  });

  return encryptedData as T;
}
