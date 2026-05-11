import React from 'react';

export default function Topbar({ breadcrumbs, actions }) {
  return (
    <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)', padding: '0 20px', height: 52, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
        {breadcrumbs.map((bc, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color: 'var(--ink4)', fontSize: 11 }}>›</span>}
            <span
              onClick={bc.onClick}
              style={{ fontSize: 12.5, color: bc.onClick ? 'var(--ink3)' : 'var(--ink)', fontWeight: bc.onClick ? 400 : 500, cursor: bc.onClick ? 'pointer' : 'default', whiteSpace: 'nowrap', transition: 'color .12s' }}
              onMouseEnter={e => { if (bc.onClick) e.currentTarget.style.color = 'var(--ink)'; }}
              onMouseLeave={e => { if (bc.onClick) e.currentTarget.style.color = 'var(--ink3)'; }}
            >
              {bc.label}
            </span>
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {actions}
      </div>
    </header>
  );
}
