export default function ErrorBanner({ message, onRetry }) {
  if (!message) return null;
  return (
    <div role="alert" className="error-banner">
      <span>{message}</span>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  );
}
