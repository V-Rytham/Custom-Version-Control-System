import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  useEffect(() => {
    const closePanels = () => {
      setIsLeftPanelOpen(false);
      setIsRightPanelOpen(false);
    };

    window.addEventListener("resize", closePanels);
    return () => window.removeEventListener("resize", closePanels);
  }, []);

  const toggleLeftPanel = () => {
    setIsLeftPanelOpen((prev) => !prev);
    setIsRightPanelOpen(false);
  };

  const toggleRightPanel = () => {
    setIsRightPanelOpen((prev) => !prev);
    setIsLeftPanelOpen(false);
  };

  return (
    <>
      <nav className="gh-navbar">
        <div className="gh-navbar-left">
          <button className="icon-btn" onClick={toggleLeftPanel} aria-label="Open menu">
            ☰
          </button>
          <Link to="/" className="brand-link">
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub Logo"
            />
          </Link>
          <div className="top-links">
            <Link to="/">Dashboard</Link>
            <Link to="/create">New Repository</Link>
            <Link to="/issues/new">New Issue</Link>
          </div>
        </div>

        <div className="gh-navbar-right">
          <button className="profile-btn" onClick={toggleRightPanel} aria-label="Open profile menu">
            <span>P</span>
          </button>
        </div>
      </nav>

      {isLeftPanelOpen && <div className="overlay" onClick={() => setIsLeftPanelOpen(false)}></div>}
      <aside className={`side-panel left ${isLeftPanelOpen ? "open" : ""}`}>
        <h4>Navigation</h4>
        <Link to="/" onClick={() => setIsLeftPanelOpen(false)}>Home</Link>
        <Link to="/create" onClick={() => setIsLeftPanelOpen(false)}>Create repository</Link>
        <Link to="/issues/new" onClick={() => setIsLeftPanelOpen(false)}>Create issue</Link>
        <Link to="/profile" onClick={() => setIsLeftPanelOpen(false)}>Your profile</Link>
      </aside>

      {isRightPanelOpen && <div className="overlay" onClick={() => setIsRightPanelOpen(false)}></div>}
      <aside className={`side-panel right ${isRightPanelOpen ? "open" : ""}`}>
        <h4>Profile</h4>
        <Link to="/profile" onClick={() => setIsRightPanelOpen(false)}>View profile</Link>
        <Link to="/create" onClick={() => setIsRightPanelOpen(false)}>New repository</Link>
        <button
          type="button"
          className="logout-inline"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            window.location.href = "/auth";
          }}
        >
          Sign out
        </button>
      </aside>
    </>
  );
};

export default Navbar;
