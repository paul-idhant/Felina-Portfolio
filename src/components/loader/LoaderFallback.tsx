interface LoaderFallbackProps { onFinish: () => void }
export function LoaderFallback({ onFinish }: LoaderFallbackProps) {
  return <div className="loader-fallback">
    <img src="/assets/laptop/classic-laptop-fallback.png" alt="A classic beige laptop on a dark background" />
    <p>Archive ready.</p>
    <button type="button" onClick={onFinish}>Continue →</button>
  </div>
}
