import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LeaderboardComponent } from './leaderboard.component';
import { Standing } from '@core/services/group.service';

const makeStanding = (overrides: Partial<Standing> & { userId: string; name: string }): Standing => ({
  position: 1,
  previousPosition: 1,
  played: 5,
  points: 30,
  correctScores: 3,
  correctResults: 7,
  jokerUsed: 1,
  isAdmin: false,
  avatar: undefined,
  ...overrides,
});

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;

  const standings: Standing[] = [
    makeStanding({ userId: 'u1', name: 'Alice', position: 1, previousPosition: 2, points: 50, jokerUsed: 1 }),
    makeStanding({ userId: 'u2', name: 'Bob',   position: 2, previousPosition: 1, points: 40, jokerUsed: 0 }),
    makeStanding({ userId: 'u3', name: 'Carol', position: 3, previousPosition: 3, points: 30, jokerUsed: 2 }),
    makeStanding({ userId: 'u4', name: 'Dave',  position: 4, previousPosition: 4, points: 20, jokerUsed: 0 }),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
  });

  // Test 1: renders the trophy icon and "Leaderboard" heading in the card header
  it('should render the trophy icon and "Leaderboard" heading in the card header', () => {
    component.standings = standings;
    fixture.detectChanges();

    const content: HTMLElement = fixture.nativeElement;
    const icon = content.querySelector('ion-icon[name="trophy-outline"]');
    expect(icon).not.toBeNull();
    expect(content.textContent).toContain('Leaderboard');
  });

  // Test 2: renders all 7 column headers
  it('should render all 7 column headers: POS, NAME, PLAYED, SCORES, RESULTS, JOKER, POINTS', () => {
    component.standings = standings;
    fixture.detectChanges();

    const header: HTMLElement = fixture.nativeElement.querySelector('.table-header');
    expect(header).not.toBeNull();
    const text = header!.textContent!.toUpperCase();
    expect(text).toContain('POS');
    expect(text).toContain('NAME');
    expect(text).toContain('PLAYED');
    expect(text).toContain('SCORES');
    expect(text).toContain('RESULTS');
    expect(text).toContain('JOKER');
    expect(text).toContain('POINTS');
  });

  // Test 3: renders one row per standing entry
  it('should render one row per standing entry', () => {
    component.standings = standings;
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('.table-row');
    expect(rows.length).toBe(standings.length);
  });

  // Test 4: applies current-user CSS class to the row matching currentUserId
  it('should apply "current-user" CSS class to the row matching currentUserId', () => {
    component.standings = standings;
    component.currentUserId = 'u2';
    fixture.detectChanges();

    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.table-row');
    const currentUserRow = Array.from(rows).find(r => r.classList.contains('current-user'));
    expect(currentUserRow).not.toBeUndefined();
    expect(currentUserRow!.textContent).toContain('Bob');
  });

  // Test 5: shows YOU badge on current user's row only
  it('should show YOU badge on current user\'s row only', () => {
    component.standings = standings;
    component.currentUserId = 'u1';
    fixture.detectChanges();

    const youBadges = fixture.nativeElement.querySelectorAll('.you-badge');
    expect(youBadges.length).toBe(1);
    const currentRow: HTMLElement = fixture.nativeElement.querySelector('.current-user');
    expect(currentRow!.textContent).toContain('YOU');
  });

  // Test 6: does NOT apply current-user or YOU badge to other rows
  it('should NOT apply "current-user" or YOU badge to other rows', () => {
    component.standings = standings;
    component.currentUserId = 'u3';
    fixture.detectChanges();

    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.table-row');
    const nonCurrentRows = Array.from(rows).filter(r => !r.classList.contains('current-user'));
    nonCurrentRows.forEach(row => {
      const youBadge = row.querySelector('.you-badge');
      expect(youBadge).toBeNull();
    });
  });

  // Test 7: shows "Your Position: #X" badge when userPosition is provided
  it('should show "Your Position: #X" badge when userPosition is provided', () => {
    component.standings = standings;
    component.currentUserId = 'u2';
    component.userPosition = 2;
    fixture.detectChanges();

    const content: string = fixture.nativeElement.textContent;
    expect(content).toContain('Your Position: #2');
  });

  // Test 8: hides the position badge when userPosition is null
  it('should hide the position badge when userPosition is null', () => {
    component.standings = standings;
    component.currentUserId = 'u2';
    component.userPosition = null;
    fixture.detectChanges();

    const content: string = fixture.nativeElement.textContent;
    expect(content).not.toContain('Your Position:');
  });

  // Test 9: renders joker as "X/2" format
  it('should render joker in "X/2" format', () => {
    component.standings = [
      makeStanding({ userId: 'u1', name: 'Alice', position: 1, previousPosition: 1, jokerUsed: 1 }),
    ];
    fixture.detectChanges();

    const content: string = fixture.nativeElement.textContent;
    expect(content).toContain('1/2');
  });

  // Test 10: shows empty state when standings is empty, hides table header
  it('should show empty state when standings is empty and hide table header', () => {
    component.standings = [];
    fixture.detectChanges();

    const emptyState = fixture.nativeElement.querySelector('.empty-state');
    expect(emptyState).not.toBeNull();

    const tableHeader = fixture.nativeElement.querySelector('.table-header');
    expect(tableHeader).toBeNull();
  });

  // Test 11: shows all rows when maxRows is null
  it('should show all rows when maxRows is null', () => {
    component.standings = standings;
    component.maxRows = null;
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('.table-row');
    expect(rows.length).toBe(standings.length);
  });

  // Test 12: limits to maxRows rows when user IS within the cutoff
  it('should limit to maxRows rows when user is within the cutoff', () => {
    component.standings = standings;
    component.currentUserId = 'u1'; // position 1, within top 3
    component.maxRows = 3;
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('.table-row');
    expect(rows.length).toBe(3);
  });

  // Test 13: shows separator row + user's row when user is BEYOND maxRows
  it('should show separator row and user\'s row when user is beyond maxRows', () => {
    component.standings = standings;
    component.currentUserId = 'u4'; // position 4, beyond top 3
    component.maxRows = 3;
    fixture.detectChanges();

    const separator = fixture.nativeElement.querySelector('.separator-row');
    expect(separator).not.toBeNull();

    const rows = fixture.nativeElement.querySelectorAll('.table-row');
    // 3 top rows + 1 user row = 4 rows (separator is not a .table-row)
    expect(rows.length).toBe(4);

    const content: string = fixture.nativeElement.textContent;
    expect(content).toContain('Dave');
  });

  // Test 14: renders a "View full leaderboard" button when (viewAllClicked) output is bound
  it('should render a "View full leaderboard" button when viewAllClicked output is observed', () => {
    component.standings = standings;
    const spy = jest.fn();
    component.viewAllClicked.subscribe(spy);
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('.view-full-btn');
    expect(btn).not.toBeNull();
    expect(btn!.textContent).toContain('View full leaderboard');
  });

  // Test 15: clicking the button emits viewAllClicked
  it('should emit viewAllClicked when the View full leaderboard button is clicked', () => {
    component.standings = standings;
    const spy = jest.fn();
    component.viewAllClicked.subscribe(spy);
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('.view-full-btn');
    btn.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // Test 16: maxRows=3 with no currentUserId shows exactly 3 rows, no separator
  it('should show top N rows with no separator when maxRows set and currentUserId is null', () => {
    component.standings = standings;
    component.maxRows = 3;
    component.currentUserId = null;
    fixture.detectChanges();

    const separator = fixture.nativeElement.querySelector('.separator-row');
    expect(separator).toBeNull();

    const rows = fixture.nativeElement.querySelectorAll('.table-row');
    expect(rows.length).toBe(3);
  });
});
