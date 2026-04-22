import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';
import { SupabaseError } from '../errors/supabase-error';
import { environment } from '../../../environments/environment';

describe('LoggerService', () => {
  let service: LoggerService;
  let errorSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService],
    });
    service = TestBed.inject(LoggerService);
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });

  describe('dev mode (environment.production = false)', () => {
    beforeEach(() => {
      jest.replaceProperty(environment, 'production', false);
    });

    it('should print the full raw error via console.error when error() is called', () => {
      // Arrange
      const raw = { code: '42P01', message: 'column "x" does not exist' };

      // Act
      service.error('supabase.getGroups', raw);

      // Assert
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith('[supabase.getGroups]', raw);
    });

    it('should print via console.warn when warn() is called with details', () => {
      // Arrange
      const details = { fallback: 'using cached data' };

      // Act
      service.warn('supabase.cache', details);

      // Assert
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledWith('[supabase.cache]', details);
    });

    it('should print context only via console.warn when warn() is called without details', () => {
      // Arrange / Act
      service.warn('supabase.cache');

      // Assert
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledWith('[supabase.cache]');
    });
  });

  describe('prod mode (environment.production = true)', () => {
    beforeEach(() => {
      jest.replaceProperty(environment, 'production', true);
    });

    it('should print only "[context] userMessage" (never rawMessage) when error() is called with a SupabaseError', () => {
      // Arrange
      const supabaseErr = new SupabaseError({
        context: 'supabase.getGroups',
        userMessage: 'Unable to load groups',
        raw: { message: 'column "x" does not exist' },
      });

      // Act
      service.error('supabase.getGroups', supabaseErr);

      // Assert
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith('[supabase.getGroups] Unable to load groups');
      // Raw Postgres detail must never reach the console in prod
      const loggedArgs = errorSpy.mock.calls[0].join(' ');
      expect(loggedArgs).not.toContain('column "x" does not exist');
    });

    it('should print only "[context] An error occurred" when error() is called with a generic Error', () => {
      // Arrange
      const genericErr = new Error('Something leaky internal');

      // Act
      service.error('supabase.getGroups', genericErr);

      // Assert
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith('[supabase.getGroups] An error occurred');
      const loggedArgs = errorSpy.mock.calls[0].join(' ');
      expect(loggedArgs).not.toContain('Something leaky internal');
    });

    it('should print only "[context] Unknown error" when error() is called with an unknown object', () => {
      // Arrange
      const unknown = { weird: 'shape' };

      // Act
      service.error('supabase.getGroups', unknown);

      // Assert
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith('[supabase.getGroups] Unknown error');
    });

    it('should be a no-op when warn() is called — console.warn NOT called', () => {
      // Arrange / Act
      service.warn('supabase.cache', { fallback: 'x' });
      service.warn('supabase.cache');

      // Assert
      expect(warnSpy).not.toHaveBeenCalled();
    });
  });
});
