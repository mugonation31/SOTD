---
name: MVP V1 Key Decisions
description: Core product decisions for Predict3 MVP - scoring rules, prediction model, API choice, joker rules, super admin scope
type: project
---

**Predict3 MVP** is a pure EPL prediction app. No payments — users handle prizes externally.

## Scoring Rules (confirmed by owner)
- Correct result: Home win 3pts, Away win 4pts, Draw 6pts
- Correct score: +3pts per correct score
- 3 correct scores in a round: +10pts bonus
- Joker: doubles the entire round's points
- Boxing Day & Final Day: predict all 10 matches (not just 3)

## Prediction Model
- ONE set of predictions per player per gameweek (not per group)
- DB: `UNIQUE(user_id, match_id)` — no group_id in predictions
- Same predictions count across all groups the player belongs to
- Rankings differ per group because different members competing

## Joker Rules
- 2 jokers per season per player
- 1st joker: must be used before Boxing Day round. Auto-assigned to round before Boxing Day if not used.
- 2nd joker: must be used after Boxing Day and before final round. Auto-assigned to round before final round if not used.
- Show friendly warning when approaching auto-assign deadline

## Football Data API
- Using football-data.org (free tier, 10 req/min) for MVP
- Covers EPL fixtures and results — sufficient for MVP

## Super Admin
- Simplified to 1-2 pages (dashboard + users/groups)
- No separate registration — owner gets `role = 'super-admin'` in profiles table
- Removed: revenue tracking, coaching, mentoring, fake analytics
- Added: gameweek overview, API sync status, manual sync trigger

## MVP Plan
- 13 tasks across 4 phases at `docs/plans/mvp-plan.md`
