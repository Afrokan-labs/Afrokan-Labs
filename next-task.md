Read CLAUDE.md and docs/BUILD_PLAN.md. Find the first unchecked task outside Phase 0.

1. State which task you're doing and restate its acceptance criteria.
2. Check that every doc the task depends on exists. If one is missing, stop and tell me what's missing.
3. Plan briefly, then implement.
4. Run `pnpm typecheck && pnpm lint && pnpm content:validate && pnpm build`, and check the task's acceptance criteria. Fix any failures.
5. Tick the task's checkbox in BUILD_PLAN.md and commit with a conventional message.
6. Report what you did, anything you couldn't verify, and anything I need to do by hand.

Do only this one task.
