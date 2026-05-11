import React, { useState } from 'react';
import { JOB_TEMPLATES } from '../data/templates';
import RichTextEditor from './RichTextEditor';

const ADDABLE = ['Work style', 'Team context', 'Competencies', 'D&I', 'Notes', 'Onboarding plan'];

export default function TemplateBuilder({ activeJob, isHR }) {
  const [sections, setSections]       = useState(() => [...(JOB_TEMPLATES[activeJob]?.sections || [])]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [collapsed, setCollapsed]     = useState({});
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('text');
  const [richText, setRichText]       = useState({});   // { [sectionId]: boolean }
  const [richValues, setRichValues]   = useState({});   // { [sectionId]: html }

  const toggle     = id => setCollapsed(p => ({ ...p, [id]: !p[id] }));
  const toggleRich = (id, e) => { e.stopPropagation(); setRichText(p => ({ ...p, [id]: !p[id] })); };

  const move = (i, d) => {
    const arr = [...sections]; const ni = i + d;
    if (ni < 0 || ni >= arr.length) return;
    [arr[i], arr[ni]] = [arr[ni], arr[i]];
    setSections(arr);
  };
  const remove = id => setSections(s => s.filter(x => x.id !== id));
  const addSection = name => {
    setSections(s => [...s, { id: 'c' + Date.now(), name, tag: 'Manager', tagClass: 'mgr', locked: false, fields: [{ id: 'f0', label: 'Details', type: 'textarea', placeholder: 'Add details...' }] }]);
  };
  const addField = () => {
    if (!newFieldName.trim()) return;
    setSections(s => s.map((sec, i) => i === selectedIdx
      ? { ...sec, fields: [...sec.fields, { id: 'f' + Date.now(), label: newFieldName.trim(), type: newFieldType, placeholder: newFieldName.trim() }] }
      : sec));
    setNewFieldName('');
  };

  const sel = sections[selectedIdx];

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

      {/* ── Palette ────────────────────────────────────────────── */}
      <div style={{ width: 180, background: 'var(--surface)', borderRight: '1px solid var(--line)', padding: 12, overflowY: 'auto', flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Add section</div>
        {ADDABLE.map(name => (
          <div key={name} onClick={() => isHR && addSection(name)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--surface2)', border: '1px solid var(--line)', borderRadius: 'var(--r)', marginBottom: 5, cursor: isHR ? 'pointer' : 'not-allowed', fontSize: 12, color: isHR ? 'var(--ink2)' : 'var(--ink4)', transition: 'all .12s', opacity: isHR ? 1 : 0.5 }}
            onMouseEnter={e => { if (isHR) { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)'; e.currentTarget.style.background = 'var(--blue-s)'; } }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = isHR ? 'var(--ink2)' : 'var(--ink4)'; e.currentTarget.style.background = 'var(--surface2)'; }}
          >
            <span>{name}</span>
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
          </div>
        ))}

        <div style={{ marginTop: 14, padding: '10px', background: 'var(--blue-s)', border: '1px solid rgba(27,95,168,0.15)', borderRadius: 'var(--r)', fontSize: 11, color: 'var(--blue-d)', lineHeight: 1.5 }}>
          <div style={{ fontWeight: 600, marginBottom: 3 }}>✦ Rich text</div>
          Click the <strong>✦ Rich</strong> button on any section to activate the full formatting editor for that section.
        </div>
      </div>

      {/* ── Canvas ─────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {!isHR && (
          <div style={{ padding: '8px 12px', background: 'var(--amber-s)', border: '1px solid rgba(122,74,8,0.2)', borderRadius: 'var(--r)', fontSize: 12, color: 'var(--amber)', marginBottom: 14 }}>
            Switch to HR Admin to edit templates. You're in read-only view.
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{activeJob} template</div>
            <div style={{ fontSize: 11, color: 'var(--ink3)', marginTop: 2 }}>
              {sections.length} sections · {Object.values(richText).filter(Boolean).length} with rich text
            </div>
          </div>
        </div>

        {sections.map((sec, i) => {
          const isOpen  = !collapsed[sec.id];
          const isRich  = !!richText[sec.id];
          const richVal = richValues[sec.id] || '';
          const pairs   = [];
          for (let j = 0; j < sec.fields.length; j += 2) pairs.push(sec.fields.slice(j, j + 2));

          return (
            <div key={sec.id} onClick={() => setSelectedIdx(i)}
              style={{ background: 'var(--surface)', border: `1px solid ${selectedIdx === i ? 'var(--blue)' : 'var(--line)'}`, borderRadius: 'var(--r2)', marginBottom: 10, overflow: 'hidden', transition: 'border-color .15s' }}>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--surface2)', cursor: 'pointer', borderBottom: isOpen ? '1px solid var(--line)' : 'none', userSelect: 'none' }}
                onClick={() => toggle(sec.id)}>
                <span className={`sec-tag ${sec.tagClass}`}>{sec.tag}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', flex: 1 }}>{sec.name}</span>
                {sec.locked && <span style={{ fontSize: 10, background: 'var(--surface3)', color: 'var(--ink3)', padding: '2px 7px', borderRadius: 4, border: '1px solid var(--line)' }}>Locked</span>}

                {/* ✦ Rich text toggle */}
                {isHR && (
                  <button
                    title={isRich ? 'Switch back to structured fields' : 'Enable rich text editor for this section'}
                    onClick={e => toggleRich(sec.id, e)}
                    style={{
                      padding: '2px 9px', fontSize: 10.5, borderRadius: 20, cursor: 'pointer',
                      fontFamily: 'var(--font)', fontWeight: 600, transition: 'all .15s',
                      border: '1px solid var(--blue)',
                      background: isRich ? 'var(--blue)' : 'transparent',
                      color:      isRich ? '#fff'       : 'var(--blue)',
                    }}
                  >
                    ✦ Rich
                  </button>
                )}

                {isHR && (
                  <div style={{ display: 'flex', gap: 3 }} onClick={e => e.stopPropagation()}>
                    <button className="btn" style={{ padding: '2px 7px', fontSize: 11 }} onClick={() => move(i, -1)}>↑</button>
                    <button className="btn" style={{ padding: '2px 7px', fontSize: 11 }} onClick={() => move(i, 1)}>↓</button>
                    <button className="btn danger" style={{ padding: '2px 7px', fontSize: 11 }} onClick={() => remove(sec.id)}>Remove</button>
                  </div>
                )}
                <span style={{ fontSize: 11, color: 'var(--ink3)', transition: 'transform .2s', transform: isOpen ? 'rotate(90deg)' : '', display: 'inline-block', marginLeft: 4 }}>›</span>
              </div>

              {/* Body */}
              {isOpen && (
                <div style={{ padding: '14px 14px' }}>
                  {isRich ? (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--blue)', background: 'var(--blue-s)', border: '1px solid rgba(27,95,168,0.15)', borderRadius: 'var(--r)', padding: '5px 10px', marginBottom: 10 }}>
                        <span>✦</span>
                        <span>Rich text mode — use the toolbar to format content. Managers will see it fully rendered.</span>
                      </div>
                      <RichTextEditor
                        value={richVal}
                        onChange={html => setRichValues(p => ({ ...p, [sec.id]: html }))}
                        placeholder={`Write rich content for "${sec.name}"…`}
                        minHeight={200}
                        readOnly={sec.locked || !isHR}
                      />
                    </div>
                  ) : (
                    pairs.map((pair, pi) => (
                      <div key={pi} style={{ display: 'grid', gridTemplateColumns: (pair.length === 1 || ['textarea', 'checkboxes'].includes(pair[0].type)) ? '1fr' : '1fr 1fr', gap: 10, marginBottom: pi < pairs.length - 1 ? 10 : 0 }}>
                        {pair.map(f => (
                          <div key={f.id}>
                            <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink2)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{f.label}</div>
                            {f.type === 'textarea'   ? <textarea className="f-textarea" placeholder={f.placeholder} disabled={sec.locked} /> :
                             f.type === 'checkboxes' ? <div className="f-input" style={{ color: 'var(--ink3)', cursor: 'default', fontSize: 12 }}>Checkbox group ({(f.options || []).length} options)</div> :
                             f.type === 'select'     ? <select className="f-select"><option>— Select —</option></select> :
                                                       <input type={f.type === 'number' ? 'number' : 'text'} className="f-input" placeholder={f.placeholder} disabled={sec.locked} />}
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

      {/* ── Properties panel ───────────────────────────────────── */}
      <div style={{ width: 200, background: 'var(--surface)', borderLeft: '1px solid var(--line)', overflowY: 'auto', flexShrink: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink2)', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px 14px 8px', borderBottom: '1px solid var(--line)' }}>
          Section settings
        </div>

        {/* Content mode card */}
        {sel && (
          <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)', background: richText[sel.id] ? 'var(--blue-s)' : 'transparent', transition: 'background .2s' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: richText[sel.id] ? 'var(--blue)' : 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 5 }}>Content mode</div>
            <div style={{ fontSize: 12, color: richText[sel.id] ? 'var(--blue-d)' : 'var(--ink2)', marginBottom: 8 }}>
              {richText[sel.id] ? '✦ Rich text editor' : '≡ Structured fields'}
            </div>
            {isHR && (
              <button className="btn" style={{ width: '100%', justifyContent: 'center', fontSize: 11, ...(richText[sel.id] ? { background: 'var(--blue)', color: '#fff', borderColor: 'var(--blue)' } : {}) }}
                onClick={() => setRichText(p => ({ ...p, [sel.id]: !p[sel.id] }))}>
                {richText[sel.id] ? 'Switch to fields' : 'Enable rich text'}
              </button>
            )}
          </div>
        )}

        <PropGroup label="Display">
          {['Collapsible', 'Show to manager', 'Required', 'Manager editable'].map(l => (
            <MiniTogRow key={l} label={l} defaultOn={l !== 'Required'} disabled={!isHR} />
          ))}
        </PropGroup>

        <PropGroup label={`Fields in "${sel?.name || ''}"`}>
          {richText[sel?.id] ? (
            <div style={{ fontSize: 11, color: 'var(--blue-d)', background: 'var(--blue-s)', padding: '6px 8px', borderRadius: 'var(--r)', border: '1px solid rgba(27,95,168,0.15)' }}>
              Rich text mode. The editor is the field.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {(sel?.fields || []).map(f => (
                <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', fontSize: 11, background: 'var(--surface2)', border: '1px solid var(--line)', borderRadius: 'var(--r)', color: 'var(--ink2)' }}>
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.label}</span>
                  <span style={{ fontSize: 10, background: 'var(--surface3)', padding: '1px 5px', borderRadius: 20, color: 'var(--ink3)', flexShrink: 0 }}>{f.type}</span>
                </div>
              ))}
            </div>
          )}
        </PropGroup>

        {isHR && !richText[sel?.id] && (
          <PropGroup label="Add field">
            <input value={newFieldName} onChange={e => setNewFieldName(e.target.value)} placeholder="Field label" className="f-input" style={{ fontSize: 11, marginBottom: 5 }} />
            <select value={newFieldType} onChange={e => setNewFieldType(e.target.value)} className="f-select" style={{ fontSize: 11, marginBottom: 6 }}>
              {['text', 'textarea', 'select', 'checkboxes', 'number', 'date'].map(t => <option key={t}>{t}</option>)}
            </select>
            <button className="btn" style={{ width: '100%', justifyContent: 'center', fontSize: 11 }} onClick={addField}>+ Add field</button>
          </PropGroup>
        )}
      </div>
    </div>
  );
}

function PropGroup({ label, children }) {
  return (
    <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  );
}

function MiniTogRow({ label, defaultOn, disabled }) {
  const [on, setOn] = React.useState(defaultOn);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, fontSize: 12, color: 'var(--ink2)' }}>
      {label}
      <button className={`mini-toggle ${on ? 'on' : 'off'}`} onClick={() => !disabled && setOn(!on)}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }} />
    </div>
  );
}
