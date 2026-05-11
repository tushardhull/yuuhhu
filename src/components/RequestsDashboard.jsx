import React, { useState } from 'react';
import { SAMPLE_REQUESTS } from '../data/templates';

const STATS = [
  { label: 'Open requests',   value: '7',  sub: '↑ 2 this week',    subColor: 'var(--green)', filter: 'All' },
  { label: 'Pending approval',value: '3',  sub: 'avg 2.4 days',     subColor: 'var(--amber)', filter: 'Pending' },
  { label: 'In progress',     value: '12', sub: 'across 4 teams',   subColor: 'var(--green)', filter: 'Active' },
  { label: 'Filled Q2',       value: '5',  sub: 'goal: 8',          subColor: 'var(--amber)', filter: 'Filled' },
];

const FILTERS = ['All', 'Pending', 'Approved', 'Draft', 'Active', 'Filled'];

export default function RequestsDashboard({ onOpenRequest }) {
  const [filter, setFilter] = useState('All');

  const rows = filter === 'All'
    ? SAMPLE_REQUESTS
    : SAMPLE_REQUESTS.filter(r => r.status === filter);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 20 }}>
        {STATS.map(stat => (
          <div key={stat.label} onClick={() => setFilter(stat.filter)}
            style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r2)', padding: '14px 16px', cursor: 'pointer', transition: 'border-color .12s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--line2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
          >
            <div style={{ fontSize: 11, color: 'var(--ink3)', marginBottom: 6, fontWeight: 500, letterSpacing: '0.1px' }}>{stat.label}</div>
            <div style={{ fontSize: 26, fontWeight: 600, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-1px', fontFamily: 'var(--mono)' }}>{stat.value}</div>
            <div style={{ fontSize: 11, marginTop: 5, color: stat.subColor }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r2)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', flex: 1 }}>Hiring requests</div>
          <div style={{ display: 'flex', gap: 5 }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`chip${filter === f ? ' on' : ''}`}>{f}</button>
            ))}
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface2)' }}>
              {['Role', 'Department', 'Submitted', 'Status', 'Priority'].map(h => (
                <th key={h} style={{ padding: '9px 16px', fontSize: 10.5, color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, textAlign: 'left', borderBottom: '1px solid var(--line)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} onClick={() => onOpenRequest(r)}
                style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--line)' : 'none', cursor: 'pointer', transition: 'background .1s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                <td style={{ padding: '11px 16px' }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{r.role}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink3)', marginTop: 1 }}>{r.level} · {r.type}</div>
                </td>
                <td style={{ padding: '11px 16px' }}>
                  <span style={{ fontSize: 11, color: 'var(--ink3)', background: 'var(--surface3)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--line)' }}>{r.dept}</span>
                </td>
                <td style={{ padding: '11px 16px', fontSize: 12, color: 'var(--ink3)' }}>{r.date}</td>
                <td style={{ padding: '11px 16px' }}>
                  <span className={`pill ${r.status.toLowerCase()}`}><span className="pill-dot" />{r.status}</span>
                </td>
                <td style={{ padding: '11px 16px' }}>
                  <span className={`pill ${r.priority.toLowerCase()}`}>{r.priority}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
