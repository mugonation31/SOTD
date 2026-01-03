# DevOps Documentation

Deployment, infrastructure, and operational procedures for SOTD.

## Contents

### CI/CD
- Build pipeline configuration
- Test automation
- Deployment automation
- Release process

### Environments
- Development
- Staging
- Production

### Monitoring
- Error tracking (Sentry, etc.)
- Analytics
- Performance monitoring
- Uptime monitoring

### Infrastructure
- Hosting setup
- CDN configuration
- Database backups
- Disaster recovery

## Current Setup

### Development Environment
- **Local:** `npm start` → http://localhost:8100
- **Hot Reload:** Enabled
- **Source Maps:** Enabled
- **Mock Data:** Available via MockDataService

### Build Process

```bash
# Development build
npm run build

# Production build
npm run build:prod

# Run tests
npm test

# Run linter
npm run lint
```

### Deployment Checklist

**Pre-Deployment:**
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build:prod`)
- [ ] Manual testing completed
- [ ] Changelog updated
- [ ] Version bumped

**Deployment:**
- [ ] Deploy to staging
- [ ] Smoke test critical paths
- [ ] Monitor error rates
- [ ] Deploy to production
- [ ] Verify production deployment
- [ ] Monitor for 1 hour

**Post-Deployment:**
- [ ] Tag release in git
- [ ] Update documentation
- [ ] Notify stakeholders
- [ ] Monitor for 24 hours

### Monitoring

**Key Metrics:**
- Error rate
- Response time
- User sessions
- API call volume
- Database query performance

**Alerts:**
- Error rate > 1%
- Response time > 3s
- Database connection failures
- Auth service downtime

### Backup Strategy

**Database:**
- Automatic daily backups via Supabase
- Point-in-time recovery available
- Test restoration quarterly

**Code:**
- Git repository (primary source of truth)
- Multiple remote backups

### Incident Response

**Severity Levels:**
1. **Critical:** Site down, auth broken
2. **High:** Major feature broken
3. **Medium:** Minor feature issue
4. **Low:** Cosmetic issue

**Response Times:**
- Critical: Immediate (< 15 min)
- High: < 2 hours
- Medium: < 1 day
- Low: < 1 week

### Rollback Procedure

If deployment fails:
1. Immediately roll back to previous version
2. Investigate root cause
3. Fix in development
4. Re-deploy with fix

---

_Last Updated: 2026-01-03_
