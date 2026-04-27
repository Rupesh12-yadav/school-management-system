# Code Review Report

## Scope
Quick static review of backend authentication, server bootstrap, and repository hygiene.

## Findings

### 1) Critical: Sensitive secrets and auth data are being logged
- `backend/server.js` prints `JWT_SECRET` directly to stdout.
- `backend/middlewares/authMiddleware.js` logs token fragments and decoded token payload.
- `backend/controllers/adminController.js` logs login flow details including whether password matched.

**Impact:** Secrets and auth metadata can leak into logs/observability systems and become accessible to operators or attackers with log access.

**Recommendation:**
- Remove secret/token logging completely.
- Use structured logs with request ids only.
- Keep authentication failures generic without exposing internal details.

---

### 2) High: Insecure fallback JWT secret in production path
- `backend/utils/generateToken.js` and `backend/middlewares/authMiddleware.js` use `process.env.JWT_SECRET || "supersecretkey123"`.

**Impact:** If env configuration is missing/misconfigured, system falls back to a predictable hardcoded secret, enabling token forgery.

**Recommendation:**
- Fail fast during startup when `JWT_SECRET` is missing.
- Remove all hardcoded fallback secrets.

---

### 3) Medium: Login error response leaks internal details
- `backend/controllers/adminController.js` returns `error: error.message` in `loginAdmin` 500 response.

**Impact:** Internal error messages can reveal implementation details useful for attackers.

**Recommendation:**
- Return a generic 500 message to clients.
- Log detailed errors only server-side.

---

### 4) Medium: Public admin registration route appears open
- `backend/routes/adminRoutes.js` exposes `POST /register` without authentication/authorization.

**Impact:** Anyone with network access can create admin accounts unless external controls exist.

**Recommendation:**
- Restrict bootstrap/admin creation flow (one-time setup token, allowlist, or admin-only creation route).

---

### 5) Medium: Repository hygiene issue — dependencies tracked in git
- `backend/node_modules` is tracked and currently has a large set of modified files.
- Repository lacks a root/backend `.gitignore` for `node_modules`.

**Impact:** Noisy diffs, merge conflicts, large repository size, and accidental dependency drift.

**Recommendation:**
- Add `.gitignore` entries for dependency directories.
- Remove tracked dependency artifacts from version control.
- Keep lockfiles (`package-lock.json`) committed, but not installed modules.

## Suggested next steps
1. Fix Findings 1 and 2 before next release (security-critical).
2. Lock down registration route and sanitize error responses.
3. Clean repository tracking rules and remove `node_modules` from git.
