import { TestBed } from '@angular/core/testing';
import { ScoringService, PredictionResult } from './scoring.service';

describe('ScoringService', () => {
  let service: ScoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScoringService],
    });

    service = TestBed.inject(ScoringService);
  });

  describe('applyJokerDoubling', () => {
    it('should double base points when joker is used', () => {
      expect(service.applyJokerDoubling(20, true)).toBe(40);
    });

    it('should return base points unchanged when joker is not used', () => {
      expect(service.applyJokerDoubling(20, false)).toBe(20);
    });

    it('should return 0 when base points are 0, even with joker used', () => {
      expect(service.applyJokerDoubling(0, true)).toBe(0);
    });
  });

  describe('calculatePoints', () => {
    // 3 home-win correct-score predictions:
    //   per prediction: 3 (home-win base) + 3 (correct score) = 6
    //   total: 18
    //   perfect-round bonus: +10 -> 28
    const makePerfectRoundPredictions = (isJokerRound: boolean): PredictionResult[] => [
      {
        prediction: { homeScore: 2, awayScore: 1 },
        actual: { homeScore: 2, awayScore: 1 },
        isJokerRound,
      },
      {
        prediction: { homeScore: 3, awayScore: 0 },
        actual: { homeScore: 3, awayScore: 0 },
        isJokerRound,
      },
      {
        prediction: { homeScore: 1, awayScore: 0 },
        actual: { homeScore: 1, awayScore: 0 },
        isJokerRound,
      },
    ];

    it('should return the base round total unchanged when isJokerRound is false', () => {
      const predictions = makePerfectRoundPredictions(false);

      expect(service.calculatePoints(predictions)).toBe(28);
    });

    it('should double the full round total (including perfect-round bonus) when isJokerRound is true', () => {
      const predictions = makePerfectRoundPredictions(true);

      expect(service.calculatePoints(predictions)).toBe(56);
    });
  });

  describe('removed legacy methods', () => {
    it('should not expose isBoxingDay on the service instance', () => {
      expect((service as any).isBoxingDay).toBeUndefined();
    });

    it('should not expose isFinalDay on the service instance', () => {
      expect((service as any).isFinalDay).toBeUndefined();
    });

    it('should not expose shouldForceJokerUse on the service instance', () => {
      expect((service as any).shouldForceJokerUse).toBeUndefined();
    });
  });
});
