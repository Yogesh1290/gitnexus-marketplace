import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCategoryBySlug, type App } from '../data/registries';

const GITNEXUS_BASE_URL = 'http://localhost:5173';
const PAGE_SIZE = 50;

function AppCard({ app, activeTag, onTagClick }: { app: App; activeTag: string; onTagClick: (t: string) => void }) {
    const repoPath = app.repo.replace(/^https?:\/\//, '');
    const launchUrl = `${GITNEXUS_BASE_URL}/${repoPath}`;
    return (
        <div className="app-card">
            <div className="app-card-top">
                <div>
                    <div className="app-name">{app.name}</div>
                    <div className="app-author">@{app.author}</div>
                </div>
            </div>
            <p className="app-desc">{app.description}</p>
            <div className="app-tags">
                {app.tags.map(t => (
                    <button
                        key={t}
                        className={`app-tag${activeTag === t ? ' active-filter' : ''}`}
                        onClick={() => onTagClick(activeTag === t ? '' : t)}
                        style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
                    >
                        {t}
                    </button>
                ))}
            </div>
            <div className="app-actions">
                <a href={launchUrl} target="_blank" rel="noopener noreferrer" className="btn-launch">
                    <ExternalLink size={11} /> Launch
                </a>
                <a href={app.repo} target="_blank" rel="noopener noreferrer" className="btn-github">
                    <Github size={13} />
                </a>
            </div>
        </div>
    );
}

export default function CategoryPage() {
    const { slug } = useParams<{ slug: string }>();
    const category = getCategoryBySlug(slug ?? '');

    const [search, setSearch] = useState('');
    const [activeTag, setActiveTag] = useState('');
    const [page, setPage] = useState(1);

    // Collect all unique tags with counts
    const allTags = useMemo(() => {
        if (!category) return [];
        const counts: Record<string, number> = {};
        category.apps.forEach(app => app.tags.forEach(t => { counts[t] = (counts[t] || 0) + 1; }));
        return Object.entries(counts).sort((a, b) => b[1] - a[1]);
    }, [category]);

    // Filter apps
    const filtered = useMemo(() => {
        if (!category) return [];
        return category.apps.filter(app => {
            const matchTag = !activeTag || app.tags.includes(activeTag);
            const q = search.toLowerCase();
            const matchSearch = !q || app.name.toLowerCase().includes(q) || app.description.toLowerCase().includes(q) || app.author.toLowerCase().includes(q) || app.tags.some(t => t.includes(q));
            return matchTag && matchSearch;
        });
    }, [category, search, activeTag]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleTag = (t: string) => { setActiveTag(t); setPage(1); };
    const handleSearch = (v: string) => { setSearch(v); setPage(1); };

    if (!category) return (
        <div style={{ padding: '60px 24px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-3)', marginBottom: 16 }}>Category not found.</p>
            <Link to="/" className="btn-primary">← Back</Link>
        </div>
    );

    return (
        <div className="cat-page">
            {/* ── Sidebar ── */}
            <aside className="sidebar">
                <div className="sidebar-title">Filter by tag</div>
                <button className={`filter-btn${!activeTag ? ' active' : ''}`} onClick={() => handleTag('')}>
                    All <span className="filter-count">{category.apps.length}</span>
                </button>
                {allTags.map(([tag, count]) => (
                    <button key={tag} className={`filter-btn${activeTag === tag ? ' active' : ''}`} onClick={() => handleTag(tag)}>
                        {tag} <span className="filter-count">{count}</span>
                    </button>
                ))}
            </aside>

            {/* ── Main ── */}
            <main className="cat-main">
                {/* Header */}
                <div className="cat-header">
                    <div className="cat-header-left">
                        <div className="cat-breadcrumb">
                            <Link to="/">Marketplace</Link>
                            <span className="cat-breadcrumb-sep">›</span>
                            <span>{category.label}</span>
                        </div>
                        <div className="cat-title-row">
                            <span className="cat-title-icon">{category.icon}</span>
                            <h1 className="cat-title">{category.label}</h1>
                        </div>
                        <div className="cat-subtitle">{category.description}</div>
                        <div className="cat-meta">{category.apps.length} apps · soft cap 500</div>
                    </div>

                    {/* Search */}
                    <div className="cat-header-right">
                        <div className="search-box-wrap">
                            <Search size={13} className="search-box-icon" />
                            <input
                                className="search-box"
                                placeholder="Search apps..."
                                value={search}
                                onChange={e => handleSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Result bar */}
                <div className="result-bar">
                    <span><strong>{filtered.length}</strong> {filtered.length === 1 ? 'app' : 'apps'} found{activeTag && <> · tag: <strong>{activeTag}</strong></>}{search && <> · "{search}"</>}</span>
                    {totalPages > 1 && <span>Page {page} of {totalPages}</span>}
                </div>

                {/* App grid */}
                {paginated.length > 0 ? (
                    <div className="app-grid">
                        {paginated.map(app => (
                            <AppCard key={app.id} app={app} activeTag={activeTag} onTagClick={handleTag} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <div className="empty-icon">📭</div>
                        <div className="empty-title">
                            {search || activeTag ? 'No apps match your filters' : `No apps in ${category.label} yet`}
                        </div>
                        <p className="empty-desc">
                            {search || activeTag
                                ? 'Try clearing the search or selecting a different tag.'
                                : 'Be the first! Bundle your Node.js app and submit a PR.'}
                        </p>
                        {(!search && !activeTag) && (
                            <a href="https://github.com/Yogesh1290/gitnexus-bundler#readme" target="_blank" rel="noopener noreferrer" className="empty-link">
                                How to submit →
                            </a>
                        )}
                        {(search || activeTag) && (
                            <button className="empty-link" onClick={() => { setSearch(''); setActiveTag(''); }} style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                                Clear filters
                            </button>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                            <ChevronLeft size={14} />
                        </button>
                        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                            const p = totalPages <= 7 ? i + 1 : page <= 4 ? i + 1 : page >= totalPages - 3 ? totalPages - 6 + i : page - 3 + i;
                            return (
                                <button key={p} className={`page-btn${p === page ? ' active' : ''}`} onClick={() => setPage(p)}>
                                    {p}
                                </button>
                            );
                        })}
                        <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                            <ChevronRight size={14} />
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
