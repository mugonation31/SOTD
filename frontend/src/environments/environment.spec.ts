import { environment as devEnvironment } from './environment';
import { environment as prodEnvironment } from './environment.prod';

describe('environment configuration', () => {
  describe('environment.ts (dev/test)', () => {
    it('should have production flag set to false', () => {
      // Arrange / Act
      const env = devEnvironment;

      // Assert
      expect(env.production).toBe(false);
    });

    it('should expose a non-empty supabase url and key for local dev', () => {
      // Arrange / Act
      const { url, key } = devEnvironment.supabase;

      // Assert
      expect(typeof url).toBe('string');
      expect(url.length).toBeGreaterThan(0);
      expect(typeof key).toBe('string');
      expect(key.length).toBeGreaterThan(0);
    });
  });

  describe('environment.prod.ts (production, placeholder-substituted at build)', () => {
    it('should have production flag set to true', () => {
      // Arrange / Act
      const env = prodEnvironment;

      // Assert
      expect(env.production).toBe(true);
    });

    it('should expose the same top-level keys as environment.ts (shape parity)', () => {
      // Arrange
      const devKeys = Object.keys(devEnvironment).sort();
      const prodKeys = Object.keys(prodEnvironment).sort();

      // Act / Assert
      expect(prodKeys).toEqual(devKeys);
      // Nested supabase shape must also match so consumers don't break
      expect(Object.keys(prodEnvironment.supabase).sort())
        .toEqual(Object.keys(devEnvironment.supabase).sort());
    });

    it('should ship placeholder tokens in source control (real values injected by replace-env.js at build)', () => {
      // Arrange
      const placeholderPattern = /^__[A-Z_]+__$/;

      // Act
      const { url, key } = prodEnvironment.supabase;

      // Assert — file committed to source control must contain placeholders only
      expect(url).toMatch(placeholderPattern);
      expect(key).toMatch(placeholderPattern);
    });
  });
});
