import { SupabaseError } from './supabase-error';

describe('SupabaseError', () => {
  it('should be an instance of Error so it can be caught as Error', () => {
    // Arrange / Act
    const err = new SupabaseError({
      context: 'test.context',
      userMessage: 'Something went wrong',
    });

    // Assert
    expect(err).toBeInstanceOf(Error);
  });

  it('should be an instance of SupabaseError for the specific check', () => {
    // Arrange / Act
    const err = new SupabaseError({
      context: 'test.context',
      userMessage: 'Something went wrong',
    });

    // Assert
    expect(err).toBeInstanceOf(SupabaseError);
  });

  it('should set .message equal to .userMessage so existing .message assertions keep working', () => {
    // Arrange / Act
    const err = new SupabaseError({
      context: 'supabase.getGroups',
      userMessage: 'Unable to load groups',
    });

    // Assert
    expect(err.message).toBe('Unable to load groups');
    expect(err.message).toBe(err.userMessage);
  });

  it('should preserve .context verbatim', () => {
    // Arrange / Act
    const err = new SupabaseError({
      context: 'supabase.getGroups',
      userMessage: 'Unable to load groups',
    });

    // Assert
    expect(err.context).toBe('supabase.getGroups');
  });

  it('should preserve .userMessage verbatim', () => {
    // Arrange / Act
    const err = new SupabaseError({
      context: 'supabase.getGroups',
      userMessage: 'Unable to load groups',
    });

    // Assert
    expect(err.userMessage).toBe('Unable to load groups');
  });

  it('should extract .rawMessage from a Supabase-shaped raw object with a message property', () => {
    // Arrange
    const supabaseRaw = { message: 'column "x" does not exist' };

    // Act
    const err = new SupabaseError({
      context: 'supabase.getGroups',
      userMessage: 'Unable to load groups',
      raw: supabaseRaw,
    });

    // Assert
    expect(err.rawMessage).toBe('column "x" does not exist');
  });

  it('should extract .rawMessage from a generic Error raw', () => {
    // Arrange
    const rawErr = new Error('Network failure');

    // Act
    const err = new SupabaseError({
      context: 'supabase.getGroups',
      userMessage: 'Unable to load groups',
      raw: rawErr,
    });

    // Assert
    expect(err.rawMessage).toBe('Network failure');
  });

  it('should extract .rawMessage from a string raw', () => {
    // Arrange / Act
    const err = new SupabaseError({
      context: 'supabase.getGroups',
      userMessage: 'Unable to load groups',
      raw: 'something broke',
    });

    // Assert
    expect(err.rawMessage).toBe('something broke');
  });

  it('should set .rawMessage to empty string when raw is undefined', () => {
    // Arrange / Act
    const err = new SupabaseError({
      context: 'supabase.getGroups',
      userMessage: 'Unable to load groups',
    });

    // Assert
    expect(err.rawMessage).toBe('');
  });

  it('should set .rawMessage to empty string when raw is null', () => {
    // Arrange / Act
    const err = new SupabaseError({
      context: 'supabase.getGroups',
      userMessage: 'Unable to load groups',
      raw: null,
    });

    // Assert
    expect(err.rawMessage).toBe('');
  });

  it('should preserve .raw verbatim with no transformation', () => {
    // Arrange
    const originalRaw = { code: '42P01', message: 'relation does not exist', details: 'foo' };

    // Act
    const err = new SupabaseError({
      context: 'supabase.getGroups',
      userMessage: 'Unable to load groups',
      raw: originalRaw,
    });

    // Assert
    expect(err.raw).toBe(originalRaw);
  });

  it('should set .name to "SupabaseError"', () => {
    // Arrange / Act
    const err = new SupabaseError({
      context: 'supabase.getGroups',
      userMessage: 'Unable to load groups',
    });

    // Assert
    expect(err.name).toBe('SupabaseError');
  });

  it('should show "SupabaseError:" prefix in err.stack', () => {
    // Arrange / Act
    const err = new SupabaseError({
      context: 'supabase.getGroups',
      userMessage: 'Unable to load groups',
    });

    // Assert
    expect(err.stack).toBeDefined();
    expect(err.stack!.startsWith('SupabaseError:')).toBe(true);
  });
});
