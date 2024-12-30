import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_LENGTH = 32;
  private readonly EXPIRATION_DAYS = 7;

  generateInvitationToken(email: string): string {
    // Create a unique token combining timestamp, random bytes, and email
    const timestamp = Date.now().toString(36);
    const randomBytes = this.generateRandomBytes(16);
    const emailHash = this.hashString(email);

    // Combine all parts and encode using base64
    const tokenParts = `${timestamp}.${randomBytes}.${emailHash}`;
    return btoa(tokenParts)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, ''); // Make URL safe
  }

  validateToken(token: string): boolean {
    try {
      // Decode token (reverse URL-safe base64)
      const safeToken = token.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = atob(safeToken);
      const [timestamp] = decoded.split('.');

      // Check if token has expired
      const tokenDate = parseInt(timestamp, 36);
      const expirationDate =
        tokenDate + this.EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

      return Date.now() < expirationDate;
    } catch {
      return false;
    }
  }

  private generateRandomBytes(length: number): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }
}
