---
name: Always run full review cycle
description: User wants code review + security scan run for every task, not just risky ones
type: feedback
---

Always run the full dev cycle (TDD → Code Review → Security Scan) for every task before committing.

**Why:** User caught that skipping review phases led to bugs (dashboard crash, undefined toast, localStorage auth bypass). Running reviews caught 4 bugs in Task 1.3 that would have broken the app.

**How to apply:** After TDD completes, always run code review and security scan before committing. Fix all blocking issues found. Don't skip phases even for "simple rewiring" tasks.
