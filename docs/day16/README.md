# Day 16 – Server errors and validation on both sides
- Server: Bean Validation + exception handler (Day 7/10) return JSON errors with 400/404.
- Client: `utils/validate.js` mirrors the rules; `ErrorBanner.jsx` shows server/network errors with Retry.
- Evidence: `error-tests-output.txt` (invalid input, malformed JSON, unknown ids).
