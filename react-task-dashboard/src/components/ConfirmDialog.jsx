export default function ConfirmDialog({ title, message, onConfirm, onCancel, busy }) {
  return (
    <div role="dialog" aria-modal="true" style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,.4)",
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", color: "#222", padding: 24, borderRadius: 8, maxWidth: 360 }}>
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onCancel} disabled={busy}>Cancel</button>{" "}
        <button onClick={onConfirm} disabled={busy} style={{ background: "#c0392b", color: "#fff" }}>
          {busy ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
