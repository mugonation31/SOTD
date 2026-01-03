# SOTD Documentation

This directory contains all project documentation organized by category.

## Directory Structure

### `/analysis`
Feature analysis, technical research, and decision documentation.
- Feature requirement analysis
- Technical feasibility studies
- Decision records (ADRs)
- Performance analysis

### `/architecture`
System architecture, design patterns, and technical diagrams.
- Architecture diagrams
- System design documents
- API specifications
- Database schemas
- Integration patterns

### `/design-system`
UI/UX design system, component library, and style guides.
- Design tokens (colors, typography, spacing)
- Component specifications
- Icon library
- Accessibility guidelines
- Brand guidelines

### `/devops`
DevOps practices, deployment, and infrastructure documentation.
- CI/CD pipeline setup
- Deployment procedures
- Infrastructure as Code
- Monitoring and alerting
- Disaster recovery plans

### `/features`
Detailed feature specifications and user stories.
- Feature specifications
- User stories and acceptance criteria
- Feature roadmap
- Release notes

### `/frontend`
Frontend-specific documentation.
- Component documentation
- State management patterns
- Routing structure
- Performance optimization
- Build configuration

### `/integrations`
Third-party integrations and API documentation.
- Supabase integration
- Capacitor plugins
- Analytics integration
- Payment providers (if applicable)
- External APIs

### `/product`
Product management, strategy, and user-facing documentation.
- Product roadmap
- User personas
- Market research
- Competitive analysis
- User documentation

### `/ux`
User experience research, flows, and testing.
- User flows and journeys
- Wireframes
- Prototypes
- Usability testing results
- User research findings

## Documentation Standards

### File Naming
- Use kebab-case: `feature-name.md`
- Be descriptive: `user-authentication-flow.md` not `auth.md`
- Include dates for time-sensitive docs: `2026-01-analytics-review.md`

### Document Structure
All documents should include:
```markdown
# Title

**Author:** [Name]
**Date:** [YYYY-MM-DD]
**Status:** [Draft | Review | Approved | Deprecated]

## Overview
[Brief summary]

## [Main Content Sections]

## References
[Links to related docs, external resources]

---
_Last Updated: [YYYY-MM-DD]_
```

### Diagrams
- Use Mermaid for diagrams (supported in Markdown)
- Include both source and rendered images
- Keep diagrams simple and focused

### Code Examples
- Use syntax highlighting
- Include complete, runnable examples
- Add comments explaining key points

## Quick Links

- [Project GLOSSARY](../GLOSSARY.md)
- [TODO / Task Tracking](../TODO.md)
- [Main README](../README.md)

## Contributing

When adding new documentation:
1. Choose the appropriate directory
2. Follow naming conventions
3. Use the standard document structure
4. Update this README if adding new categories
5. Cross-reference related documents

---

_Last Updated: 2026-01-03_
