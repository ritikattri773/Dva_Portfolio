import { contactInfo, profileInfo, skills } from '../data.js'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <img
        src={profileInfo.avatar}
        alt="Profile"
        className="sidebar-avatar"
      />
      <h1 className="sidebar-name">{profileInfo.name}</h1>
      <p className="sidebar-username">{profileInfo.username}</p>
      <p className="sidebar-bio">
        {profileInfo.bio}
      </p>

      <a
        href={contactInfo.resume}
        target="_blank"
        rel="noreferrer"
        className="sidebar-follow-btn"
      >
        View Resume
      </a>
      <div className="sidebar-socials">
        <a
          href={contactInfo.github}
          target="_blank"
          rel="noreferrer"
          className="sidebar-social-btn"
        >
          GitHub
        </a>
        <a
          href={contactInfo.linkedin}
          target="_blank"
          rel="noreferrer"
          className="sidebar-social-btn"
        >
          LinkedIn
        </a>
      </div>

      <div className="sidebar-info">
        <div className="sidebar-info-item">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="#8b949e">
            <path d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
          <span>{profileInfo.location}</span>
        </div>
        <div className="sidebar-info-item">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="#8b949e">
            <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25v-8.5C0 2.784.784 2 1.75 2zM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809v6.442zm13-8.181v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88z" />
          </svg>
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </div>
        <div className="sidebar-info-item">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="#8b949e">
            <path d="M2 1h12a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1zm0 1v12h12V2H2zm5.5 8h1v3h-1v-3zm0-5h1v4h-1V5z" />
          </svg>
          <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
        </div>
      </div>

      <div className="sidebar-achievements">
        <h3 className="sidebar-orgs-title">Achievements</h3>
        <div className="achievement-badges">
          <img
            src="https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png"
            alt="Pair Extraordinaire"
            className="achievement-badge"
            title="Pair Extraordinaire"
          />
          <img
            src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png"
            alt="Quickdraw"
            className="achievement-badge"
            title="Quickdraw"
          />
          <img
            src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png"
            alt="Pull Shark"
            className="achievement-badge"
            title="Pull Shark"
          />
        </div>
      </div>

      <div className="sidebar-orgs">
        <h3 className="sidebar-orgs-title">Skills</h3>
        <div className="sidebar-orgs-list">
          {skills.map((skill) => (
            <span key={skill} className="org-pill">{skill}</span>
          ))}
        </div>
      </div>


    </aside>
  )
}
