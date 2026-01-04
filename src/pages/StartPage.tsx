import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import "../styles/pages/start-page.css";

export function StartPage() {
  const [lastQuery, setLastQuery] = useState<string | null>(null);

  return (
    <main className="start-page">
      <div className="container start-page-content">
        <header className="start-header">
          <h1 className="start-title">What to watch next?</h1>
          <p className="start-lead">
            Discover your next favorite movie or series based on what you've
            enjoyed before.
          </p>

          <SearchBar onSearch={(q) => setLastQuery(q)} />
        </header>

        {lastQuery && (
          <section className="start-card">
            <p className="start-body">
              You searched for: <strong>{lastQuery}</strong>
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
