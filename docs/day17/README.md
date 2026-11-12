# Day 17 – CORS, state refresh, responsive
- CORS: `CorsConfig.java` allows http://localhost:5173 for /api/** (GET/POST/PUT/DELETE/OPTIONS). Evidence: `cors-preflight-output.txt`.
- State refresh: after create/update/delete, call `refetch()` from `useTasks` instead of patching local state.
- Responsive: `styles/responsive.css` (breakpoints 768px / 480px), checked in browser devtools device mode.
