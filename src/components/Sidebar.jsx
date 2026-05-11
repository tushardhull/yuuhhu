import React from 'react';
import { ROLES } from '../data/templates';

const NAV_ITEMS = [
  { id: 'dashboard',   label: 'Dashboard',        icon: '◫', badge: 7 },
  { id: 'builder',     label: 'Template builder', icon: '⊞' },
  { id: 'permissions', label: 'Role permissions', icon: '⊙' },
];
const JOB_COUNTS = { Engineering: 5, Finance: 4, Sales: 4, Marketing: 3, Operations: 4 };

export default function Sidebar({ activeTab, onTab, activeJob, onJob, roleIdx, onCycleRole, onNewRequest }) {
  const user = ROLES[roleIdx];
  return (
    <nav style={{ width: 220, background: 'var(--sb)', display: 'flex', flexDirection: 'column', flexShrink: 0, height: '100vh', overflow: 'hidden' }}>

      {/* Logo */}
      <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', gap: 9, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: 28, height: 28, background: 'var(--blue)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#fff', flexShrink: 0 }}>H</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--sb-text)', letterSpacing: '-0.3px' }}>Horizon</div>
          <div style={{ fontSize: 10, color: 'var(--sb-text3)', fontFamily: 'var(--mono)', marginTop: 1 }}>v2.0-beta</div>
        </div>
      </div>

      {/* User — click to cycle role */}
      <div onClick={onCycleRole} style={{ padding: '9px 12px', margin: 8, background: 'var(--sb2)', borderRadius: 'var(--r2)', display: 'flex', alignItems: 'center', gap: 9, border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: user.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#fff', flexShrink: 0 }}>{user.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--sb-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
          <div style={{ fontSize: 10, color: 'var(--sb-text2)' }}>{user.role}</div>
        </div>
        <div style={{ color: 'var(--sb-text3)', fontSize: 10, flexShrink: 0 }}>⇅</div>
      </div>

      {/* Nav */}
      <div style={{ padding: '8px 16px 4px', fontSize: 10, color: 'var(--sb-text3)', letterSpacing: '0.7px', textTransform: 'uppercase', fontWeight: 500 }}>Workspace</div>
      {NAV_ITEMS.map(n => {
        const active = activeTab === n.id;
        return (
          <div key={n.id} onClick={() => onTab(n.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 12px', margin: '1px 8px', borderRadius: 'var(--r)', fontSize: 12.5, color: active ? '#fff' : 'var(--sb-text2)', cursor: 'pointer', position: 'relative', background: active ? 'var(--sb2)' : 'transparent', transition: 'all .12s' }}
          >
            {active && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 16, background: 'var(--blue)', borderRadius: '0 2px 2px 0' }} />}
            <span style={{ fontSize: 13, opacity: active ? 1 : 0.7, flexShrink: 0 }}>{n.icon}</span>
            {n.label}
            {n.badge && <span style={{ marginLeft: 'auto', background: 'var(--blue)', color: '#fff', fontSize: 9, fontWeight: 600, padding: '1px 5px', borderRadius: 10, fontFamily: 'var(--mono)' }}>{n.badge}</span>}
          </div>
        );
      })}

      {/* Job templates */}
      <div style={{ padding: '10px 16px 4px', fontSize: 10, color: 'var(--sb-text3)', letterSpacing: '0.7px', textTransform: 'uppercase', fontWeight: 500 }}>Job templates</div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
        {Object.keys(JOB_COUNTS).map(job => {
          const active = activeJob === job;
          return (
            <div key={job} onClick={() => onJob(job)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', margin: '0 8px 1px', borderRadius: 'var(--r)', cursor: 'pointer', fontSize: 12, color: active ? '#fff' : 'var(--sb-text2)', background: active ? 'var(--sb3)' : 'transparent', transition: 'all .12s' }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: active ? 'var(--blue)' : 'currentColor', opacity: active ? 1 : 0.4, flexShrink: 0 }} />
              {job}
              <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--sb-text3)', fontFamily: 'var(--mono)' }}>{JOB_COUNTS[job]}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={onNewRequest} style={{ width: '100%', padding: 8, background: 'rgba(27,95,168,0.15)', border: '1px solid rgba(27,95,168,0.3)', borderRadius: 'var(--r)', color: '#6BA8E5', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontWeight: 500 }}>
          + New request
        </button>
      </div>
    </nav>
  );
}
