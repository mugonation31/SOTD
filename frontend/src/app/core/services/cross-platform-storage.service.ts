import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

/**
 * Cross-platform storage service that uses:
 * - Capacitor Preferences for native platforms (iOS/Android)
 * - localStorage for web platform
 */
@Injectable({
  providedIn: 'root'
})
export class CrossPlatformStorageService {
  private isNative = Capacitor.isNativePlatform();

  /**
   * Set a value in storage
   */
  async set(key: string, value: any): Promise<void> {
    const stringValue = JSON.stringify(value);
    
    if (this.isNative) {
      await Preferences.set({
        key,
        value: stringValue
      });
    } else {
      localStorage.setItem(key, stringValue);
    }
  }

  /**
   * Get a value from storage
   */
  async get(key: string): Promise<any> {
    try {
      let value: string | null;
      
      if (this.isNative) {
        const result = await Preferences.get({ key });
        value = result.value;
      } else {
        value = localStorage.getItem(key);
      }
      
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting value for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Remove a value from storage
   */
  async remove(key: string): Promise<void> {
    if (this.isNative) {
      await Preferences.remove({ key });
    } else {
      localStorage.removeItem(key);
    }
  }

  /**
   * Clear all storage
   */
  async clear(): Promise<void> {
    if (this.isNative) {
      await Preferences.clear();
    } else {
      localStorage.clear();
    }
  }

  /**
   * Get all keys from storage
   */
  async keys(): Promise<string[]> {
    if (this.isNative) {
      const result = await Preferences.keys();
      return result.keys;
    } else {
      return Object.keys(localStorage);
    }
  }

  /**
   * Check if a key exists in storage
   */
  async has(key: string): Promise<boolean> {
    const value = await this.get(key);
    return value !== null;
  }

  /**
   * Get multiple values at once
   */
  async getMultiple(keys: string[]): Promise<{ [key: string]: any }> {
    const result: { [key: string]: any } = {};
    
    for (const key of keys) {
      result[key] = await this.get(key);
    }
    
    return result;
  }

  /**
   * Set multiple values at once
   */
  async setMultiple(keyValuePairs: { [key: string]: any }): Promise<void> {
    const promises = Object.entries(keyValuePairs).map(([key, value]) => 
      this.set(key, value)
    );
    
    await Promise.all(promises);
  }

  /**
   * Remove multiple keys at once
   */
  async removeMultiple(keys: string[]): Promise<void> {
    const promises = keys.map(key => this.remove(key));
    await Promise.all(promises);
  }
}
