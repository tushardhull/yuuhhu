import React, { useState } from 'react';
import { JOB_TEMPLATES } from '../data/templates';
import RichTextEditor from './RichTextEditor';

function FieldControl({ field, locked, values, onChange }) {
  const val = values[field.id] !== undefined ? values[field.id] : (field.defaultValue || '');
  if (locked) return <input className="f-input" value={val} disabled />;
  if (field.type === 'textarea')   return <textarea className="f-textarea" value={val} placeholder={field.placeholder} onChange={e => onChange(field.id, e.target.value)} />;
  if (field.type === 'select')     return (
    <select className="f-select" value={val} onChange={e => onChange(field.id, e.target.value)}>
      {(field.options || []).map(o => <option key={o} value={o}>{o || '— Select —'}</option>)}
    </select>
  );
  if (field.type === 'number')     return <input type="number" className="f-input" value={val} placeholder={field.placeholder} min="0" onChange={e => onChange(field.id, e.target.value)} />;
  if (field.type === 'checkboxes') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {(field.options || []).map(o => (
        <label key={o} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink)', cursor: 'pointer' }}>
          <input type="checkbox" style={{ accentColor: 'var(--blue)', width: 13, height: 13 }} /> {o}
        </label>
      ))}
    </div>
  );
  return <input type="text" className="f-input" value={val} placeholder={field.placeholder} onChange={e => onChange(field.id, e.target.value)} />;
}

const APPROVAL_STEPS = [
  { label: 'Manager submits', sub: 'Step 1 — You',       color: 'var(--blue)',   done: true  },
  { label: 'HR reviews',      sub: 'Step 2 — HR Admin',  color: 'var(--amber)',  done: false },
  { label: 'Finance sign-off',sub: 'Step 3 — CFO',       color: 'var(--purple)', done: false },
  { label: 'Approved & posted',sub:'Step 4 — Automatic', color: 'var(--green)',  done: false },
];

export default function ManagerPreview({ activeJob, requestData, onBack, richTextSections = {}, richTextValues = {} }) {
  const tpl       = JOB_TEMPLATES[activeJob] || JOB_TEMPLATES.Engineering;
  const sections  = tpl.sections;
  const [collapsed, setCollapsed] = useState({});
  const [values, setValues]       = useState({});
  const [richVals, setRichVals]   = useState(richTextValues);
  const [submitted, setSubmitted] = useState(false);

  const managerSecs = sections.filter(s => !s.locked);
  const filled = managerSecs.filter(s => {
    if (richTextSections[s.id]) return !!richVals[s.id];
    return s.fields.some(f => values[f.id] && values[f.id] !== '');
  }).length;
  const pct = managerSecs.length ? Math.round((filled / managerSecs.length) * 100) : 0;

  const toggle = id => setCollapsed(p => ({ ...p, [id]: !p[id] }));
  const handleChange = (id, val) => setValues(p => ({ ...p, [id]: val }));

  if (submitted) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={{ textAlign: 'center', maxWidth: 380 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--green-s)', border: '2px solid rgba(45,106,15,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 22 }}>✓</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.5px', marginBottom: 8 }}>Request submitted</div>
        <div style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.7, marginBottom: 24 }}>
          Your {activeJob} hiring request is now with HR for review. You'll get an email when it moves through the approval flow.
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button className="btn" onClick={onBack}>← Back to dashboard</button>
          <button className="btn primary" onClick={() => { setSubmitted(false); setValues({}); setRichVals({}); }}>New request</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>

      {/* Header card */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r2)', padding: '18px 20px', marginBottom: 14, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--blue-s)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>📋</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.5px' }}>{activeJob} — New hiring request</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
            {[activeJob, 'Template v2.1', `${sections.length} sections`].map(t => (
              <span key={t} style={{ fontSize: 11.5, color: 'var(--ink2)' }}>{t}</span>
            ))}
            <span className="pill draft">Draft</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--ink2)', marginBottom: 5 }}>
          <span>{filled} of {managerSecs.length} manager sections filled</span>
          <span style={{ fontFamily: 'var(--mono)', fontWeight: 500 }}>{pct}%</span>
        </div>
        <div style={{ height: 4, background: 'var(--surface3)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--blue)', width: `${pct}%`, transition: 'width .4s cubic-bezier(.4,0,.2,1)', borderRadius: 2 }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 14 }}>

        {/* Sections */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r2)', overflow: 'hidden' }}>
          {sections.map((sec, si) => {
            const isOpen = !collapsed[sec.id];
            const isRich = !!richTextSections[sec.id];
            const fieldPairs = [];
            for (let i = 0; i < sec.fields.length; i += 2) fieldPairs.push(sec.fields.slice(i, i + 2));

            return (
              <div key={sec.id} style={{ borderBottom: si < sections.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <div onClick={() => toggle(sec.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', cursor: 'pointer', background: 'var(--surface)', transition: 'background .12s', userSelect: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
                >
                  <span className={`sec-tag ${sec.tagClass}`}>{sec.tag}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', flex: 1 }}>{sec.name}</span>
                  {isRich && <span style={{ fontSize: 10, background: 'var(--blue-s)', color: 'var(--blue)', padding: '2px 7px', borderRadius: 4, fontWeight: 600 }}>✦ Rich</span>}
                  {sec.locked && <span style={{ fontSize: 10, background: 'var(--surface3)', color: 'var(--ink3)', padding: '2px 7px', borderRadius: 4, border: '1px solid var(--line)' }}>Locked</span>}
                  <span style={{ fontSize: 11, color: 'var(--ink3)', transition: 'transform .2s', transform: isOpen ? 'rotate(90deg)' : '', display: 'inline-block' }}>›</span>
                </div>

                {isOpen && (
                  <div style={{ padding: '14px 16px', borderTop: '1px solid var(--line)' }}>
                    {sec.locked && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 10px', background: 'var(--surface3)', borderRadius: 'var(--r)', marginBottom: 12, fontSize: 11.5, color: 'var(--ink2)', border: '1px solid var(--line)' }}>
                        🔒 This section is managed by HR and is read-only.
                      </div>
                    )}

                    {isRich ? (
                      /* Rich text mode — manager fills in their own content */
                      sec.locked ? (
                        <RichTextEditor value={richVals[sec.id] || ''} readOnly placeholder="HR will fill this section." />
                      ) : (
                        <RichTextEditor
                          value={richVals[sec.id] || ''}
                          onChange={html => setRichVals(p => ({ ...p, [sec.id]: html }))}
                          placeholder={`Write your ${sec.name.toLowerCase()} here…`}
                          minHeight={180}
                        />
                      )
                    ) : (
                      /* Structured fields mode */
                      fieldPairs.map((pair, pi) => (
                        <div key={pi} style={{ display: 'grid', gridTemplateColumns: (pair.length === 1 || ['textarea','checkboxes'].includes(pair[0].type)) ? '1fr' : '1fr 1fr', gap: 10, marginBottom: pi < fieldPairs.length - 1 ? 10 : 0 }}>
                          {pair.map(f => (
                            <div key={f.id}>
                              <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink2)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.3px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                {f.label} {f.required && !sec.locked && <span style={{ color: 'var(--red)', fontSize: 10 }}>*</span>}
                              </div>
                              <FieldControl field={f} locked={sec.locked} values={values} onChange={handleChange} />
                            </div>
                          ))}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r2)', padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Request details</div>
            {[['Job type', activeJob], ['Template', 'v2.1'], ['Sections', sections.length], ['Created', 'Today']].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: 12 }}>
                <span style={{ color: 'var(--ink3)' }}>{k}</span>
                <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: 'var(--ink3)' }}>Status</span>
              <span className="pill draft">Draft</span>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r2)', padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Approval flow</div>
            {APPROVAL_STEPS.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, position: 'relative', paddingBottom: i < APPROVAL_STEPS.length - 1 ? 12 : 0 }}>
                {i < APPROVAL_STEPS.length - 1 && <div style={{ position: 'absolute', left: 7, top: 18, bottom: 0, width: 1, background: 'var(--line)' }} />}
                <div style={{ width: 15, height: 15, borderRadius: '50%', border: `2px solid ${step.color}`, background: step.done ? step.color : 'var(--surface)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{step.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink3)', marginTop: 1 }}>{step.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r2)', padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>SuccessFactors</div>
            {['Auto-sync on publish', 'Map to SF fields'].map(label => <MiniToggleRow key={label} label={label} defaultOn />)}
            <div style={{ fontSize: 11, color: 'var(--ink3)', marginTop: 8 }}>Last sync: Today 10:42 AM</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginTop: 16, borderTop: '1px solid var(--line)' }}>
        <span style={{ fontSize: 11.5, color: pct >= 100 ? 'var(--green)' : 'var(--ink3)' }}>
          {pct >= 100 ? '✓ Ready to submit' : 'Fill required fields to submit'}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={onBack}>← Back</button>
          <button className="btn">Save draft</button>
          <button className="btn success" onClick={() => setSubmitted(true)}>Submit request</button>
        </div>
      </div>
    </div>
  );
}

function MiniToggleRow({ label, defaultOn }) {
  const [on, setOn] = React.useState(defaultOn);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7, fontSize: 12, color: 'var(--ink2)' }}>
      {label}
      <button className={`mini-toggle ${on ? 'on' : 'off'}`} onClick={() => setOn(!on)} />
    </div>
  );
}
