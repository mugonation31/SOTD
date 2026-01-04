# Feature: Terms & Conditions and Privacy Policy Pages

**Date:** 2026-01-04
**Status:** Analysis Complete
**Priority:** 🔴 CRITICAL - Legal Requirement
**Complexity:** Simple

---

## Problem Statement

The Predict3 application currently has signup forms (player and super-admin) with checkboxes requiring users to accept Terms and Conditions and Privacy Policy. However:

1. **Broken Links**: The links in signup forms (`openTerms()` and `openPrivacy()` methods) have TODO placeholders and don't navigate anywhere
2. **Legal Requirement**: No legal pages exist, creating legal liability for data collection
3. **User Trust**: Users cannot review what they're agreeing to before signup
4. **GDPR Compliance**: Required for EU users - must disclose data collection practices
5. **App Store Requirements**: Apple and Google require privacy policies for apps

**Current State:**
- Signup forms have links: `<a href="#" (click)="openTerms($event)">Terms and Conditions</a>`
- Methods exist but are empty: `// TODO: Open Terms and Conditions modal or page`
- No routes defined for `/auth/terms` or `/auth/privacy`
- No pages created

---

## Proposed Solution

Create two standalone legal pages within the auth platform that:
1. Display professionally formatted legal content
2. Are accessible via routing (`/auth/terms` and `/auth/privacy`)
3. Include navigation to return to signup
4. Follow existing page patterns (similar to `email-confirmed.page.ts`)
5. Are mobile-responsive and accessible

**Approach:**
- **Static Content Pages**: Not database-driven, just TypeScript components with HTML content
- **Standalone Components**: Follow Angular 18 standalone pattern
- **Lazy Loaded**: Routes lazy load pages for performance
- **Reusable**: Accessible from player signup, super-admin signup, and future contexts

---

## Technical Design

### Architecture Overview

```
frontend/src/app/platforms/auth/pages/
├── terms/
│   ├── terms.page.ts          (Component with legal content)
│   ├── terms.page.html         (Template with formatted content)
│   ├── terms.page.scss         (Styling for readability)
│   └── terms.page.spec.ts      (Unit tests)
│
├── privacy/
│   ├── privacy.page.ts         (Component with policy content)
│   ├── privacy.page.html       (Template with formatted content)
│   ├── privacy.page.scss       (Styling for readability)
│   └── privacy.page.spec.ts    (Unit tests)
│
└── signup/
    └── signup.page.ts          (Update openTerms/openPrivacy methods)
```

### Component Structure

**Pattern**: Follow `email-confirmed.page.ts` as reference

```typescript
@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonButton, IonButtons, IonIcon,
    CommonModule
  ],
})
export class TermsPage {
  lastUpdated = '2026-01-04'; // Dynamic date

  constructor(private router: Router) {
    addIcons({ arrowBackOutline, closeOutline });
  }

  goBack() {
    // Navigate back to previous page or default to signup
    this.router.navigate(['/auth/signup']);
  }
}
```

### Routing Configuration

**File**: `auth.routes.ts`

```typescript
{
  path: 'terms',
  loadComponent: () =>
    import('./pages/terms/terms.page').then((m) => m.TermsPage),
},
{
  path: 'privacy',
  loadComponent: () =>
    import('./pages/privacy/privacy.page').then((m) => m.PrivacyPage),
},
```

### Navigation Implementation

**File**: `signup.page.ts` and `super-admin/pages/register/register.page.ts`

```typescript
openTerms(event: Event) {
  event.preventDefault();
  this.router.navigate(['/auth/terms']);
}

openPrivacy(event: Event) {
  event.preventDefault();
  this.router.navigate(['/auth/privacy']);
}
```

### UI/UX Design

**Layout:**
```
┌─────────────────────────────────────┐
│  ← Back        Terms & Conditions   │  (Header)
├─────────────────────────────────────┤
│                                     │
│  Card Container:                    │
│  ┌───────────────────────────────┐  │
│  │ Last Updated: Jan 4, 2026     │  │
│  │                               │  │
│  │ 1. Acceptance of Terms        │  │
│  │    Content...                 │  │
│  │                               │  │
│  │ 2. User Conduct               │  │
│  │    Content...                 │  │
│  │                               │  │
│  │ [More sections...]            │  │
│  └───────────────────────────────┘  │
│                                     │
│  [Back to Signup Button]            │
│                                     │
└─────────────────────────────────────┘
```

**Key Features:**
- Professional typography (proper headings, spacing)
- Readable font size (14-16px body text)
- Sectioned content with clear headings
- "Last Updated" date prominently displayed
- Back button in header AND bottom
- Scroll-friendly on mobile
- Dark mode support via Ionic variables

---

## Content Strategy

### Terms & Conditions Sections

1. **Acceptance of Terms** - Agreement to use service
2. **User Eligibility** - Age requirements (13+), geographic restrictions
3. **User Accounts** - Registration, account security, termination
4. **User Conduct** - Prohibited activities, fair play rules
5. **Prediction Rules** - Gameweek rules, joker system, scoring
6. **Group Admin Responsibilities** - Entry fees, prize distribution
7. **Intellectual Property** - Ownership of content, trademarks
8. **Liability Disclaimer** - No guarantees, use at own risk
9. **Termination** - Rights to suspend/ban accounts
10. **Changes to Terms** - Right to modify terms
11. **Governing Law** - Jurisdiction and dispute resolution
12. **Contact Information** - How to reach support

### Privacy Policy Sections (GDPR Compliant)

1. **Introduction** - Who we are, what this covers
2. **Data Controller** - Predict3 contact information
3. **Data We Collect**:
   - Account data (name, email, username)
   - Prediction data (match selections, scores)
   - Group data (memberships, admin status)
   - Usage data (analytics, performance)
   - Device data (platform, browser)
4. **How We Use Data**:
   - Provide prediction service
   - Calculate scores and leaderboards
   - Manage groups and competitions
   - Send notifications (opt-in)
   - Improve service
5. **Legal Basis (GDPR)**:
   - Consent (user signup)
   - Contract (provide service)
   - Legitimate interests (analytics)
6. **Data Sharing**:
   - Supabase (hosting provider)
   - Football API (match data)
   - No selling of data
7. **Data Retention** - How long we keep data
8. **Your Rights (GDPR)**:
   - Access your data
   - Correct inaccuracies
   - Delete account ("right to be forgotten")
   - Export data (portability)
   - Withdraw consent
9. **Cookies & Tracking** - What cookies we use
10. **Security** - How we protect data
11. **Children's Privacy** - Age restrictions
12. **International Transfers** - Data storage location
13. **Changes to Policy** - How we notify changes
14. **Contact & Complaints** - How to exercise rights, DPO contact

---

## Database Changes

**None required** - Static content pages, no database interaction

---

## Security Considerations

### Access Control
- ✅ **Public Pages**: No authentication required (anyone can view)
- ✅ **Read-Only**: No user input, no data modification
- ✅ **XSS Prevention**: Content is static HTML (not user-generated)

### GDPR Compliance Checklist
- ✅ Clear disclosure of data collection
- ✅ Explanation of data usage
- ✅ User rights clearly stated
- ✅ Contact information provided
- ✅ Right to withdraw consent
- ✅ Data retention policy
- ✅ Data portability explained
- ✅ Third-party services disclosed (Supabase, Football API)

### Content Security
- ✅ No external scripts or iframes
- ✅ No tracking pixels without disclosure
- ✅ No third-party cookies

---

## Testing Strategy

### Unit Tests

**File**: `terms.page.spec.ts`
```typescript
describe('TermsPage', () => {
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display last updated date', () => {
    expect(component.lastUpdated).toBeDefined();
  });

  it('should navigate back to signup on goBack()', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/signup']);
  });

  it('should display all required sections', () => {
    const sections = ['Acceptance', 'User Conduct', 'Liability'];
    // Check HTML contains all sections
  });
});
```

**File**: `privacy.page.spec.ts` - Similar structure

### Integration Tests

**File**: `signup.integration.spec.ts`
```typescript
it('should navigate to terms page when terms link clicked', () => {
  const termsLink = fixture.nativeElement.querySelector('a[href="#"]');
  termsLink.click();
  expect(router.navigate).toHaveBeenCalledWith(['/auth/terms']);
});

it('should navigate to privacy page when privacy link clicked', () => {
  const privacyLink = fixture.nativeElement.querySelectorAll('a[href="#"]')[1];
  privacyLink.click();
  expect(router.navigate).toHaveBeenCalledWith(['/auth/privacy']);
});
```

### Manual Testing Checklist
- [ ] Terms link works from player signup
- [ ] Privacy link works from player signup
- [ ] Terms link works from super-admin register
- [ ] Privacy link works from super-admin register
- [ ] Back button navigates to signup
- [ ] Content is readable on mobile (320px width)
- [ ] Content is readable on tablet (768px width)
- [ ] Content is readable on desktop (1920px width)
- [ ] Dark mode displays correctly
- [ ] All sections render properly
- [ ] Last updated date displays
- [ ] Scrolling works smoothly
- [ ] No console errors

---

## Deployment Plan

### Steps

1. **Create Files**:
   ```bash
   mkdir -p frontend/src/app/platforms/auth/pages/terms
   mkdir -p frontend/src/app/platforms/auth/pages/privacy
   ```

2. **Implement Components**:
   - Create `terms.page.ts`, `terms.page.html`, `terms.page.scss`
   - Create `privacy.page.ts`, `privacy.page.html`, `privacy.page.scss`

3. **Add Routes**:
   - Update `auth.routes.ts` with new routes

4. **Wire Up Navigation**:
   - Update `signup.page.ts` openTerms/openPrivacy methods
   - Update `super-admin/register.page.ts` (if it has similar links)

5. **Write Tests**:
   - Create unit tests for both pages
   - Update signup integration tests

6. **Build & Test**:
   ```bash
   npm run build
   npm test
   ```

7. **Commit**:
   ```bash
   git add .
   git commit -m "feat: add Terms & Conditions and Privacy Policy pages"
   ```

### Rollout
- Deploy to staging for review
- Legal team review (if available)
- Test on all platforms (web, iOS simulator, Android emulator)
- Deploy to production

---

## Risks & Mitigations

### Risk 1: Legal Content Accuracy
**Risk**: Terms/Privacy content may not be legally sufficient
**Likelihood**: Medium
**Impact**: High (legal liability)
**Mitigation**:
- Use industry-standard templates (Termly, TermsFeed)
- Have legal professional review before production
- Include disclaimer: "This is a sample app, consult lawyer for production"
- Clearly state data practices honestly

### Risk 2: Content Updates
**Risk**: Legal requirements change, content becomes outdated
**Likelihood**: Low (short-term)
**Impact**: Medium
**Mitigation**:
- Include "Last Updated" date prominently
- Set reminder to review annually
- Track regulatory changes (GDPR updates)
- Make content easily updatable (not hardcoded)

### Risk 3: Mobile Readability
**Risk**: Long legal text difficult to read on mobile
**Likelihood**: Low
**Impact**: Low (user experience)
**Mitigation**:
- Use collapsible sections (accordion)
- Ensure proper line height and font size
- Test on real devices
- Consider TL;DR summary at top

### Risk 4: Missing Content
**Risk**: Forget important legal disclosures
**Likelihood**: Low
**Impact**: Medium
**Mitigation**:
- Use comprehensive templates
- Cross-reference with Supabase privacy policy
- Include all third-party services
- Peer review before deployment

---

## Implementation Estimate

**Complexity**: Simple
**Time Estimate**: 2-4 hours

**Breakdown**:
- Create components: 30 min
- Write Terms content: 45 min
- Write Privacy content: 60 min
- Styling: 30 min
- Wire up navigation: 15 min
- Testing: 30 min
- Documentation: 30 min

**Dependencies**: None (standalone feature)

---

## Files to Create

```
frontend/src/app/platforms/auth/pages/
├── terms/
│   ├── terms.page.ts          [NEW]
│   ├── terms.page.html         [NEW]
│   ├── terms.page.scss         [NEW]
│   └── terms.page.spec.ts      [NEW]
│
└── privacy/
    ├── privacy.page.ts         [NEW]
    ├── privacy.page.html       [NEW]
    ├── privacy.page.scss       [NEW]
    └── privacy.page.spec.ts    [NEW]
```

## Files to Modify

```
frontend/src/app/platforms/auth/
├── auth.routes.ts                                  [MODIFY - add 2 routes]
├── pages/signup/signup.page.ts                     [MODIFY - implement methods]
└── pages/signup/signup.integration.spec.ts         [MODIFY - add tests]

frontend/src/app/platforms/super-admin/pages/
└── register/register.page.ts                       [MODIFY - implement methods if needed]
```

---

## Success Criteria

✅ Terms and Conditions page accessible at `/auth/terms`
✅ Privacy Policy page accessible at `/auth/privacy`
✅ Links work from player signup form
✅ Links work from super-admin register form
✅ Back navigation returns to signup
✅ Content is comprehensive and GDPR-compliant
✅ All sections render correctly
✅ Mobile responsive (320px - 1920px)
✅ Dark mode compatible
✅ No console errors
✅ Unit tests pass
✅ Integration tests pass
✅ Build succeeds

---

## Next Steps

1. **Review & Approve** this analysis
2. **Use `/implement`** to begin implementation
3. **Legal Review** (optional) - have lawyer review content before production
4. **Deploy** to staging for testing
5. **Announce** to users when deploying to production

---

## References

- **GDPR Guide**: https://gdpr.eu/privacy-notice/
- **Terms Template**: https://www.termsfeed.com/blog/sample-terms-and-conditions-template/
- **Privacy Template**: https://www.termsfeed.com/blog/sample-privacy-policy-template/
- **Ionic UI Patterns**: Existing `email-confirmed.page.ts`
- **Supabase Privacy**: https://supabase.com/privacy
- **App Store Requirements**: Apple App Store Review Guidelines 5.1.1

---

**Analyst**: Claude Sonnet 4.5
**Analysis Date**: 2026-01-04
**Document Version**: 1.0
