import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/registries';

export default function HomePage() {
    const totalApps = CATEGORIES.reduce((s, c) => s + c.apps.length, 0);
    return (
        <main>
            {/* Hero */}
            <div className="hero">
                <div className="hero-eye">⚡ Open Source Marketplace</div>
                <h1 className="hero-title">
                    Open source tools,<br />
                    <span className="hl">live in your browser</span>
                </h1>
                <p className="hero-sub">
                    Launch any Node.js app instantly — no install, no server, zero cost.
                    Runs entirely inside your browser tab.
                </p>
                <div className="hero-stats">
                    <div className="hero-stat">
                        <div className="hero-stat-val">{CATEGORIES.length}</div>
                        <div className="hero-stat-label">Categories</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-val">{totalApps}</div>
                        <div className="hero-stat-label">Apps</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-val">$0</div>
                        <div className="hero-stat-label">Server Cost</div>
                    </div>
                </div>
            </div>

            <div className="divider" />

            {/* Categories */}
            <div className="home-section" style={{ paddingTop: 36 }}>
                <h2 className="home-section-title">Browse categories</h2>
                <p className="home-section-sub">Click a category to explore apps</p>
                <div className="cat-grid">
                    {CATEGORIES.map(cat => (
                        <Link key={cat.slug} to={`/category/${cat.slug}`} className="cat-card">
                            <span className="cat-card-icon">{cat.icon}</span>
                            <div className="cat-card-label">{cat.label}</div>
                            <p className="cat-card-desc">{cat.description}</p>
                            <div className="cat-card-footer">
                                <span className="cat-card-count">{cat.apps.length} apps</span>
                                <ArrowRight size={13} className="cat-card-arrow" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="divider" style={{ margin: '8px 20px' }} />

            {/* How it works */}
            <div className="home-section" style={{ paddingTop: 32 }}>
                <h2 className="home-section-title">How it works</h2>
                <p className="home-section-sub" style={{ marginBottom: 16 }}>Four steps to go from repo to running app</p>
                <div className="how-grid">
                    {[
                        { n: '01', t: 'Browse', d: 'Find a tool or app in any category' },
                        { n: '02', t: 'Launch', d: 'Click Launch — boots in seconds' },
                        { n: '03', t: 'Run', d: 'Real Node.js server inside your browser tab' },
                        { n: '04', t: 'Submit', d: 'Bundle your app and open a PR to list it' },
                    ].map(s => (
                        <div key={s.n} className="how-card">
                            <div className="how-num">{s.n}</div>
                            <div className="how-title">{s.t}</div>
                            <div className="how-desc">{s.d}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="divider" style={{ margin: '0 20px' }} />

            {/* CTA */}
            <div className="cta-section">
                <h2>List your app</h2>
                <p>Bundle with <code style={{ color: 'var(--accent)', fontSize: 12 }}>gitnexus-bundler</code> and submit a PR.</p>
                <a href="https://github.com/GitNexus-Marketplace/gitnexus-marketplace" target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Get started →
                </a>
            </div>
        </main>
    );
}
