import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo">
                    <span className="navbar-logo-accent">Git</span>Nexus
                    <span className="navbar-badge">MARKETPLACE</span>
                </Link>
                <div className="navbar-search">
                    <Search size={13} className="navbar-search-icon" />
                    <input placeholder="Search apps..." />
                </div>
            </div>
        </nav>
    );
}
