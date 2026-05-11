import React, { useState } from 'react';
import { ROLES } from '../data/templates';

const PERMS = {
  hr:        [['Manage templates', true], ['Edit compensation', true], ['Lock sections', true], ['Approve requests', true], ['View all teams', true]],
  manager:   [['View all sections', true], ['Edit job details', true], ['Edit compensation', false], ['Submit request', true], ['Add custom sections', true]],
  recruiter: [['View approved reqs', true], ['Edit compensation', false], ['Add recruiter notes', true], ['Update status', true], ['Create templates', false]],
  exec:      [['Dashboard view only', true], ['Final approval', true], ['Edit anything', false], ['Export reports', true], ['Manage roles', false]],
};

function MiniTogRow({ label, defaultOn, canEdit }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7, fontSize: 12, color: 'var(--ink2)' }}>
      <span>{label}</span>
      {canEdit
        ? <button className={`mini-toggle ${on ? 'on' : 'off'}`} onClick={() => setOn(!on)} />
        : <span className={`pill ${on ? 'approved' : 'draft'}`} style={{ fontSize: 10 }}>{on ? 'On' : 'Off'}</span>
      }
    </div>
  );
}

export default function RolePermissions({ roleIdx }) {
  const isHR = ROLES[roleIdx].role === 'HR Admin';

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
      {!isHR && (
        <div style={{ padding: '9px 14px', background: 'var(--amber-s)', border: '1px solid rgba(122,74,8,0.2)', borderRadius: 'var(--r)', fontSize: 12, color: 'var(--amber)', marginBottom: 16 }}>
          You're viewing as <strong>{ROLES[roleIdx].role}</strong>. Switch to HR Admin to edit permissions.
        </div>
      )}

      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.4px', marginBottom: 3 }}>Role permissions</div>
        <div style={{ fontSize: 12.5, color: 'var(--ink2)' }}>Control what each role can view, edit, and manage across all templates.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {ROLES.map(r => (
          <div key={r.key} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r2)', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingBottom: 12, borderBottom: '1px solid var(--line)', marginBottom: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#fff', flexShrink: 0 }}>{r.initials}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{r.role}</div>
                <div style={{ fontSize: 11, color: 'var(--ink3)' }}>{r.name}</div>
              </div>
            </div>
            {(PERMS[r.key] || []).map(([label, on]) => (
              <MiniTogRow key={label} label={label} defaultOn={on} canEdit={isHR} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
