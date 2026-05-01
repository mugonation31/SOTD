# Feature: Shared LeaderboardComponent

## Problem Statement

Three pages currently render leaderboards independently with inconsistent designs:
- `group-admin/home` — preview (POS, NAME, POINTS only; no column headers; no row highlight; no YOU badge)
- `group-admin/group` — minimal (POS, NAME, POINTS only; no column headers; no YOU badge)
- `player/group-standings` — reference design (all 7 columns, YOU badge, row highlight, position badge)

The `Standing` interface already contains all 7 required data fields — the problem is purely presentation and duplication.

## Proposed Solution

Create a standalone `LeaderboardComponent` in `shared/components/leaderboard/` that is the single source of truth for all leaderboard rendering. Both admin pages drop in `<app-leaderboard>` with their existing `Standing[]` data — no new API calls, no schema changes.

The player `group-standings` page is the **reference** and stays completely unchanged.

## Technical Design

### Component Interface

```typescript
@Component({ selector: 'app-leaderboard', standalone: true })
export class LeaderboardComponent {
  @Input() standings: Standing[] = [];
  @Input() currentUserId: string | null = null;
  @Input() userPosition: number | null = null;   // drives "Your Position: #X" badge
  @Input() maxRows: number | null = null;         // null = show all; 3 = home preview
}
```

### Rendering logic

- **Table header:** POS | NAME | PLAYED | SCORES | RESULTS | JOKER | POINTS
- **Each row:** current user gets `current-user` CSS class (light blue left border) + YOU badge
- **"Your Position" badge:** shown in the card header when `userPosition` is provided
- **maxRows behaviour:** if set, display the first N standings; if currentUser is beyond position N, show a `···` separator then the user's row so they always see themselves
- **Empty state:** "No standings yet — predictions will appear here after the first gameweek"

### Files

**Create:**
- `src/app/shared/components/leaderboard/leaderboard.component.ts`
- `src/app/shared/components/leaderboard/leaderboard.component.html`
- `src/app/shared/components/leaderboard/leaderboard.component.scss`
- `src/app/shared/components/leaderboard/leaderboard.component.spec.ts`

**Modify — group-admin/home:**
- `home.page.ts` — add `LeaderboardComponent` to imports array; expose `currentUserId`; compute `userPosition` from leaderboard; pass full leaderboard with `maxRows=3`
- `home.page.html` — replace `.leaderboard-row` divs with `<app-leaderboard>`
- `home.page.scss` — remove `.leaderboard-row`, `.caller-row`, `.position`, `.name`, `.points` rules (now in component)

**Modify — group-admin/group:**
- `group.page.ts` — add `LeaderboardComponent` to imports; expose `currentUserId`; compute `userPosition`
- `group.page.html` — replace leaderboard card content with `<app-leaderboard>`
- `group.page.scss` — remove `.leaderboard-row` rules

**Unchanged:**
- `player/group-standings` — reference, do not touch

### CSS / Visual Design

Exact copy of `group-standings.page.scss` leaderboard section:
- Grid: `60px 1fr 70px 70px 70px 70px 80px`
- Header: light background, uppercase, letter-spaced
- Current user row: `linear-gradient(90deg, rgba(primary, 0.08), transparent)` + `4px solid primary` left border
- Points column: primary color, bold
- Responsive: collapse SCORES + RESULTS columns below 480px

## Database Changes

None. `Standing` interface already has all required fields:
- `position`, `userId`, `name`, `played`, `correctScores`, `correctResults`, `jokerUsed`, `points`

## Security Considerations

- Component only reads `Standing[]` passed by parent — no direct Supabase calls
- `currentUserId` from `AuthService.getCurrentUser()?.id` — same pattern used throughout
- No new RLS surfaces

## Testing Strategy

**Unit tests (leaderboard.component.spec.ts):**
- Renders all 7 column headers
- Shows YOU badge on current user's row
- Highlights current user row with `.current-user` class
- Hides YOU badge on other rows
- Shows "Your Position: #X" when `userPosition` is provided
- Hides position badge when `userPosition` is null
- Respects `maxRows`: shows only N rows when set
- Shows user row below separator when user is beyond `maxRows`
- Shows empty state when `standings` is empty

**Integration tests (home/group page specs):**
- `<app-leaderboard>` renders in place of old `.leaderboard-row` divs
- Correct `currentUserId` passed through

## Deployment Plan

1. TDD: write failing component tests → implement → green
2. Wire into home and group pages
3. Code review
4. Security scan
5. Push → Cloudflare deploys
6. Manual QA: check all 3 pages look identical

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| `maxRows` + user-below-cutoff looks odd | Show `···` row as separator; always render user row last |
| Home page `callerStanding` separate from `leaderboardPreview` | Pass full leaderboard to component; component handles cutoff logic internally |
| Removing SCSS from home/group pages breaks styles | Keep unrelated SCSS; only remove leaderboard-specific rules |
| group page's `leaderboard` doesn't set `previousPosition` correctly | `convertToStandings` defaults to same position → arrows show "same" → correct for now |
