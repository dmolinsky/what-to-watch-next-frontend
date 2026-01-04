import "../styles/pages/start-page.css";

export function StartPage() {
  return (
    <main className="start-page">
      <div className="container start-page-content">
        <header className="start-header">
          <h1 className="display start-title">What to watch next?</h1>
          <p className="start-lead">
            Discover your next favorite movie or series based on what you've
            enjoyed before.
          </p>
        </header>

        <section className="start-card">
          <p className="start-body">
            This is a minimal start page to test typography and color tokens.
            Body text uses <strong>Inter</strong>, while the headline uses{" "}
            <strong>Chewy</strong>.
          </p>
        </section>
      </div>
    </main>
  );
}