# Feature: Application Rename from SOTD to Predict3

**Date:** 2026-01-04
**Status:** Analysis Complete
**Complexity:** Medium
**Risk Level:** Medium-High (requires systematic approach)

---

## Problem Statement

The application needs to be completely rebranded from "SOTD" (Song of the Day) to "Predict3" across all files, configurations, code, documentation, and UI without breaking functionality, imports, or build processes.

### Current State
- Application name: "SOTD" (Song of the Day)
- **1,870 occurrences** of "SOTD" in codebase
- **63 occurrences** of "sotd" in source code (CSS classes, variables)
- **2,494 files** to consider (TypeScript, HTML, SCSS, JSON, Markdown)
- Used in: config files, UI text, CSS classes, documentation, comments

### Desired State
- Application name: "Predict3"
- All references updated systematically
- Zero broken imports or functionality
- Consistent branding across all touchpoints

---

## Proposed Solution

### High-Level Approach

**Systematic Multi-Phase Rename Strategy:**

1. **Preparation Phase:** Analyze all occurrences and categorize by type
2. **Configuration Phase:** Update config files first
3. **Code Phase:** Update CSS classes, TypeScript, HTML in order
4. **Documentation Phase:** Update all documentation files
5. **Testing Phase:** Verify nothing broke
6. **Optional:** Consider renaming project directory (with caution)

### Why This Approach?

- ✅ **Systematic:** Prevents missing files
- ✅ **Testable:** Can verify at each phase
- ✅ **Safe:** Configuration first, code second
- ✅ **Reversible:** Each phase can be rolled back
- ✅ **Trackable:** Clear progress through phases

---

## Technical Design

### 1. File Categories to Update

#### **A. Configuration Files** (Priority 1 - Critical)
- `frontend/ionic.config.json` - `"name": "SOTD"` → `"name": "Predict3"`
- `frontend/package.json` - Check if app name needs update (currently "frontend")
- `.vscode/settings.json` - If any SOTD references
- `.claude/` files - Update project references

**Impact:** Low risk, high importance

#### **B. CSS Classes** (Priority 2 - Visual Breaking)
- `.logo-sotd` → `.logo-predict3` in **~19 SCSS files**
- Affects: All auth pages, player pages, group-admin pages, welcome page

**Files:**
```
frontend/src/app/platforms/auth/styles/auth.shared.scss
frontend/src/app/platforms/auth/pages/login/login.page.scss
frontend/src/app/platforms/auth/pages/signup/signup.page.scss
frontend/src/app/platforms/auth/pages/forgot-password/forgot-password.page.scss
frontend/src/app/platforms/auth/pages/reset-password/reset-password.page.scss
frontend/src/app/platforms/auth/pages/otp/otp.page.scss
frontend/src/app/platforms/auth/pages/email-confirmed/email-confirmed.page.scss
frontend/src/app/platforms/welcome/welcome.page.scss
frontend/src/app/platforms/player/pages/dashboard/dashboard.page.scss
frontend/src/app/platforms/player/pages/matches/matches.page.scss
frontend/src/app/platforms/player/pages/predictions/predictions.page.scss
frontend/src/app/platforms/player/pages/standings/standings.page.scss
frontend/src/app/platforms/player/pages/group-standings/group-standings.page.scss
frontend/src/app/platforms/player/pages/join-group/join-group.page.scss
frontend/src/app/platforms/player/pages/settings/settings.page.scss
frontend/src/app/platforms/group-admin/layout/group-admin-layout.page.scss
frontend/src/app/platforms/group-admin/pages/leaderboard/leaderboard.page.scss
frontend/src/app/platforms/group-admin/pages/predictions/predictions.page.scss
frontend/src/app/platforms/super-admin/layout/super-admin-layout.page.scss
```

**Impact:** Medium risk - will break styling if HTML not updated simultaneously

#### **C. HTML Templates** (Priority 2 - Must Match CSS)
- Update `<span class="logo-sotd">SOTD</span>` → `<span class="logo-predict3">Predict3</span>`
- Affects: **~20 HTML files** with logo references
- Text content "SOTD" → "Predict3"

**Impact:** Medium risk - must be synchronized with CSS changes

#### **D. TypeScript Files** (Priority 3 - Limited Impact)
- Update string literals with "SOTD" where used as display text
- Minimal occurrences in actual TypeScript logic
- Mostly in comments or template strings

**Impact:** Low risk

#### **E. Documentation** (Priority 4 - No Functional Impact)
- All `.md` files in `docs/`
- [TODO.md](../../TODO.md)
- [GLOSSARY.md](../../GLOSSARY.md)
- [CLAUDE.md](../../CLAUDE.md)
- `.claude/prompts/` files

**Impact:** No functional risk, important for consistency

#### **F. Project Directory** (Priority 5 - Optional, High Risk)
- Current: `/home/simbamugoz/workspace/SOTD`
- Potential: `/home/simbamugoz/workspace/Predict3`

**Risks:**
- ⚠️ Git remote URL might break
- ⚠️ IDE settings might break
- ⚠️ Absolute paths might break
- ⚠️ CI/CD configs might break

**Recommendation:** **NOT recommended** - Keep directory as SOTD, or do as separate final step with extreme caution

---

## Database Changes

**None Required** - This is a frontend-only rename operation.

---

## Security Considerations

**Minimal Security Impact:**
- ✅ No authentication changes
- ✅ No authorization changes
- ✅ No data model changes
- ⚠️ Need to ensure Angular build cache is cleared after rename
- ⚠️ Need to ensure no hardcoded strings in environment configs

**Actions:**
1. Clear `.angular/cache/` after rename
2. Rebuild application completely
3. Test all authentication flows still work

---

## Testing Strategy

### 1. Pre-Rename Testing
- [ ] Run full test suite: `npm run test`
- [ ] Verify all tests pass
- [ ] Take screenshot of app running locally
- [ ] Document current build command works

### 2. During Rename Testing (Per Phase)
**After each phase:**
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] No lint errors: `npm run lint`
- [ ] Visual inspection of affected pages

### 3. Post-Rename Testing
- [ ] **Unit Tests:** Run full Jest suite
- [ ] **Build Test:** `npm run build:prod` succeeds
- [ ] **Visual Test:** Check all affected pages render correctly
- [ ] **Functional Test:** Test auth flows (login, signup, password reset)
- [ ] **Cross-Platform:** Test on web, check no broken native references
- [ ] **Search Test:** Search codebase for any remaining "SOTD" references

### 4. Regression Testing Checklist
- [ ] Login page displays "Predict3" correctly
- [ ] Signup page displays "Predict3" correctly
- [ ] All player pages show correct branding
- [ ] All group-admin pages show correct branding
- [ ] All super-admin pages show correct branding
- [ ] Welcome page shows correct branding
- [ ] CSS styling intact (logo styles work)
- [ ] No console errors
- [ ] No 404s for missing CSS classes

---

## Implementation Plan

### Phase 1: Preparation & Backup
1. Create analysis document (this file) ✅
2. Commit all current changes
3. Create backup branch: `backup/pre-rename-$(date +%Y%m%d)`
4. Create feature branch: `feature/rename-sotd-to-predict3`
5. Run pre-rename tests

### Phase 2: Configuration Files
1. Update `frontend/ionic.config.json`: `"name": "SOTD"` → `"name": "Predict3"`
2. Check `frontend/package.json` (likely no change needed)
3. Update any SOTD references in `.vscode/settings.json`
4. Test: Build succeeds

### Phase 3: CSS Classes (Synchronized with HTML)
1. **Find all CSS files** with `.logo-sotd` class
2. **Replace** `.logo-sotd` → `.logo-predict3` in all SCSS files (~19 files)
3. **Simultaneously replace** in corresponding HTML templates:
   - `class="logo-sotd"` → `class="logo-predict3"`
   - `<span class="logo-sotd">SOTD</span>` → `<span class="logo-predict3">Predict3</span>`
4. Test: Visual inspection of all affected pages

### Phase 4: Remaining HTML Text
1. Search for remaining "SOTD" in HTML files
2. Replace display text "SOTD" → "Predict3"
3. Test: Visual inspection

### Phase 5: TypeScript Files
1. Search for "SOTD" in .ts files
2. Update string literals where used as display text
3. Update comments if desired
4. Test: TypeScript compilation succeeds

### Phase 6: Documentation
1. Update `.claude/prompts/01-analyze.md` (line 3, line 10)
2. Update all `docs/**/*.md` files
3. Update [TODO.md](../../TODO.md) references
4. Update [GLOSSARY.md](../../GLOSSARY.md) if "SOTD" appears
5. Update [CLAUDE.md](../../CLAUDE.md) title and references
6. Test: Documentation reads correctly

### Phase 7: Clean & Verify
1. Clear Angular build cache: `rm -rf frontend/.angular/cache`
2. Clear coverage and www: Already gitignored
3. Full rebuild: `cd frontend && npm run build`
4. Run tests: `npm test`
5. Search for any remaining "SOTD": `grep -r "SOTD" --exclude-dir=node_modules --exclude-dir=.git .`

### Phase 8: Commit & Test
1. Stage all changes
2. Commit with descriptive message
3. Run full test suite
4. Visual QA of all platforms
5. Create PR for review

### Phase 9: Optional - Directory Rename
**⚠️ Only if absolutely necessary:**
1. Rename directory: `mv ~/workspace/SOTD ~/workspace/Predict3`
2. Update git remote if needed
3. Update IDE workspace settings
4. Update any CI/CD references
5. Test: Everything still works

**Recommendation:** Skip this phase - not worth the risk

---

## Deployment Plan

1. **Merge to main** after all tests pass
2. **Rebuild production bundle:** `npm run build:prod`
3. **Deploy** to hosting (Cloudflare/Vercel)
4. **Verify** deployed app shows "Predict3"
5. **Monitor** for any errors in production

---

## Risks & Mitigations

### Risk 1: Broken CSS Styling
**Likelihood:** Medium
**Impact:** High (visual breakage)
**Mitigation:**
- Update CSS and HTML simultaneously in same commit
- Test visually after each page update
- Keep backup branch for quick rollback

### Risk 2: Missed References
**Likelihood:** Medium
**Impact:** Low (inconsistent branding)
**Mitigation:**
- Use comprehensive grep search after rename
- Automated testing catches functional breaks
- Manual visual QA catches display issues

### Risk 3: Angular Build Cache Issues
**Likelihood:** Low
**Impact:** Medium (build errors)
**Mitigation:**
- Clear `.angular/cache/` before final build
- Full clean rebuild after rename
- Test build multiple times

### Risk 4: Git History Confusion
**Likelihood:** Low
**Impact:** Low (developer confusion)
**Mitigation:**
- Clear commit message explaining rename
- Keep this analysis document for reference
- Tag commit for easy reference: `git tag v0.1-renamed-to-predict3`

### Risk 5: Directory Rename Breaking Things
**Likelihood:** High if attempted
**Impact:** High (everything could break)
**Mitigation:**
- **Don't do it** - keep directory as SOTD
- If must rename, do as separate final step
- Test exhaustively after directory rename

---

## Success Criteria

- ✅ All 1,870+ "SOTD" references updated to "Predict3" or appropriate variant
- ✅ All CSS classes `.logo-sotd` renamed to `.logo-predict3`
- ✅ All HTML displays "Predict3" in UI
- ✅ All tests pass (`npm test`)
- ✅ Build succeeds (`npm run build:prod`)
- ✅ No TypeScript errors
- ✅ No console errors in browser
- ✅ Visual inspection confirms correct branding across all platforms
- ✅ Documentation updated consistently
- ✅ Git history clean and understandable

---

## Estimated Effort

**Total Time:** 2-3 hours
**Breakdown:**
- Preparation: 15 minutes
- Configuration: 10 minutes
- CSS + HTML (19 files): 45-60 minutes
- TypeScript updates: 15-20 minutes
- Documentation (32 files): 30-40 minutes
- Testing & QA: 30-40 minutes
- Cleanup & Commit: 10 minutes

**Complexity Level:** **Medium**
- Not complex technically
- Requires attention to detail
- Systematic approach essential
- Testing crucial for confidence

---

## Next Steps

1. ✅ Analysis document created
2. ⏳ Get user approval for plan
3. ⏳ Use `/implement` to execute systematic rename
4. ⏳ Test thoroughly at each phase
5. ⏳ Commit and push when complete

---

## Notes

- The term "SOTD" may still appear in git history - this is normal and expected
- Some compiled files in `.angular/cache/` may have old references - will be regenerated on build
- Focus on source files, not generated/compiled files
- Keep communication clear about what "Predict3" means to avoid confusion

