import React, { useRef, useCallback, useEffect, useState } from 'react';

/* ─── Toolbar button definition ─────────────────────────────────── */
const TOOLBAR = [
  {
    group: 'history',
    items: [
      { cmd: 'undo', icon: '↩', title: 'Undo', type: 'cmd' },
      { cmd: 'redo', icon: '↪', title: 'Redo', type: 'cmd' },
    ],
  },

  {
    group: 'block',
    items: [
      { cmd: 'formatBlock', icon: 'H1', title: 'Heading 1', type: 'block', value: 'h1' },
      { cmd: 'formatBlock', icon: 'H2', title: 'Heading 2', type: 'block', value: 'h2' },
      { cmd: 'formatBlock', icon: 'H3', title: 'Heading 3', type: 'block', value: 'h3' },
      { cmd: 'formatBlock', icon: '¶', title: 'Paragraph', type: 'block', value: 'p' },
    ],
  },

  {
    group: 'inline',
    items: [
      {
        cmd: 'bold',
        icon: 'B',
        title: 'Bold',
        type: 'cmd',
        style: { fontWeight: 700 },
      },

      {
        cmd: 'italic',
        icon: 'I',
        title: 'Italic',
        type: 'cmd',
        style: { fontStyle: 'italic' },
      },

      {
        cmd: 'underline',
        icon: 'U',
        title: 'Underline',
        type: 'cmd',
        style: { textDecoration: 'underline' },
      },

      {
        cmd: 'strikeThrough',
        icon: 'S̶',
        title: 'Strikethrough',
        type: 'cmd',
        style: { textDecoration: 'line-through' },
      },
    ],
  },

  {
    group: 'list',
    items: [
      { cmd: 'insertUnorderedList', icon: '≡•', title: 'Bullet list', type: 'cmd' },
      { cmd: 'insertOrderedList', icon: '≡1', title: 'Numbered list', type: 'cmd' },
      { cmd: 'outdent', icon: '⇤', title: 'Outdent', type: 'cmd' },
      { cmd: 'indent', icon: '⇥', title: 'Indent', type: 'cmd' },
    ],
  },

  {
    group: 'align',
    items: [
      { cmd: 'justifyLeft', icon: '⫷', title: 'Align left', type: 'cmd' },
      { cmd: 'justifyCenter', icon: '≡', title: 'Align center', type: 'cmd' },
      { cmd: 'justifyRight', icon: '⫸', title: 'Align right', type: 'cmd' },
    ],
  },

  {
    group: 'misc',
    items: [
      { cmd: 'removeFormat', icon: 'Tx', title: 'Clear format', type: 'cmd' },
      { cmd: 'insertHorizontalRule', icon: '—', title: 'Divider', type: 'cmd' },
    ],
  },
];

/* ─── The Editor ─────────────────────────────────────────────────── */

export default function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Start writing…',
  minHeight = 160,
  readOnly = false,
  label,
}) {
  const editorRef = useRef(null);

  const [active, setActive] = useState({});
  const [wordCount, setWordCount] = useState(0);

  const lastHtml = useRef(value);

  /* sync external value */
  useEffect(() => {
    const el = editorRef.current;

    if (!el) return;

    if (value !== lastHtml.current && value !== el.innerHTML) {
      el.innerHTML = value;
      lastHtml.current = value;
    }
  }, [value]);

  /* active states */
  const refreshActive = useCallback(() => {
    const state = {};

    [
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'insertUnorderedList',
      'insertOrderedList',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
    ].forEach((cmd) => {
      try {
        state[cmd] = document.queryCommandState(cmd);
      } catch (_) {}
    });

    setActive(state);

    /* word count */
    const text = editorRef.current?.innerText || '';

    setWordCount(
      text.trim()
        ? text.trim().split(/\s+/).length
        : 0
    );
  }, []);

  useEffect(() => {
    document.addEventListener(
      'selectionchange',
      refreshActive
    );

    return () => {
      document.removeEventListener(
        'selectionchange',
        refreshActive
      );
    };
  }, [refreshActive]);

  /* handle input */
  const handleInput = () => {
    const el = editorRef.current;

    if (!el) return;

    const html = el.innerHTML;

    lastHtml.current = html;

    onChange?.(html);

    refreshActive();
  };

  /* exec commands */
  const exec = (cmd, value = null) => {
    editorRef.current?.focus();

    document.execCommand(cmd, false, value);

    handleInput();
  };

  /* better font size support */
  const applyFontSize = (size) => {
    editorRef.current?.focus();

    document.execCommand('styleWithCSS', false, true);

    document.execCommand('fontSize', false, 7);

    const fonts =
      editorRef.current.getElementsByTagName('font');

    for (let i = 0; i < fonts.length; i++) {
      if (fonts[i].size === '7') {
        fonts[i].removeAttribute('size');
        fonts[i].style.fontSize = size;
      }
    }

    handleInput();
  };

  /* keyboard shortcuts */
  const handleKeyDown = (e) => {
    /* Tab indent */
    if (e.key === 'Tab') {
      e.preventDefault();

      exec(e.shiftKey ? 'outdent' : 'indent');
    }

    /* CTRL+B */
    if (e.ctrlKey && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      exec('bold');
    }

    /* CTRL+I */
    if (e.ctrlKey && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      exec('italic');
    }

    /* CTRL+U */
    if (e.ctrlKey && e.key.toLowerCase() === 'u') {
      e.preventDefault();
      exec('underline');
    }
  };

  const isActive = (cmd) => !!active[cmd];

  /* readonly */
  if (readOnly) {
    return (
      <div
        className="rte-readonly"
        dangerouslySetInnerHTML={{
          __html:
            value ||
            `<p style="color:var(--ink4)">${placeholder}</p>`,
        }}
      />
    );
  }

  return (
    <div className="rte-wrap">
      {label && (
        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: 'var(--ink2)',
            marginBottom: 5,
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
          }}
        >
          {label}
        </div>
      )}

      {/* ── Toolbar ── */}

      <div className="rte-toolbar">
        {TOOLBAR.map((group, gi) => (
          <React.Fragment key={group.group}>
            {gi > 0 && <div className="rte-sep" />}

            {group.items.map((btn) => (
              <button
                key={btn.cmd + (btn.value || '')}
                title={btn.title}
                className={`rte-btn ${
                  isActive(btn.cmd)
                    ? 'rte-btn-on'
                    : ''
                }`}
                style={btn.style}
                onMouseDown={(e) => {
                  e.preventDefault();

                  if (btn.type === 'block') {
                    exec('formatBlock', btn.value);
                  } else {
                    exec(btn.cmd);
                  }
                }}
              >
                {btn.icon}
              </button>
            ))}
          </React.Fragment>
        ))}

        {/* font size */}

        <div className="rte-sep" />

        <select
          className="rte-select"
          title="Font size"
          defaultValue=""
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => {
            applyFontSize(
              [
                '8px',
                '10px',
                '12px',
                '14px',
                '18px',
                '24px',
                '36px',
              ][e.target.value - 1]
            );

            e.target.value = '';
          }}
        >
          <option value="" disabled>
            Size
          </option>

          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <option key={n} value={n}>
              {
                [
                  '8',
                  '10',
                  '12',
                  '14',
                  '18',
                  '24',
                  '36',
                ][n - 1]
              }
              px
            </option>
          ))}
        </select>

        {/* text color */}

        <div className="rte-sep" />

        <label
  title="Text color"
  className="rte-color-btn"
  style={{ position: 'relative' }}
>
  <span
    style={{
      fontSize: 12,
      color: 'var(--ink2)',
      userSelect: 'none',
    }}
  >
    A
  </span>

  <input
    type="color"
    style={{
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0,
    }}
    onChange={(e) => {
      editorRef.current?.focus();

      document.execCommand(
        'styleWithCSS',
        false,
        true
      );

      document.execCommand(
        'foreColor',
        false,
        e.target.value
      );

      window
        .getSelection()
        ?.removeAllRanges();

      handleInput();
    }}
  />
</label>

        {/* link */}

        <div className="rte-sep" />

        <button
          className="rte-btn"
          title="Insert link"
          onMouseDown={(e) => {
            e.preventDefault();

            const url = prompt(
              'Enter URL:',
              'https://'
            );

            if (url) exec('createLink', url);
          }}
        >
          🔗
        </button>

        <button
          className="rte-btn"
          title="Remove link"
          onMouseDown={(e) => {
            e.preventDefault();
            exec('unlink');
          }}
        >
          ⛓️‍💥
        </button>

        {/* word count */}

        <div
          style={{
            marginLeft: 'auto',
            fontSize: 10,
            color: 'var(--ink4)',
            padding: '0 8px',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'var(--mono)',
          }}
        >
          {wordCount}w
        </div>
      </div>

      {/* ── Editable area ── */}

      <div
        ref={editorRef}
        className="rte-body"
        contentEditable
        suppressContentEditableWarning
        style={{ minHeight }}
        data-placeholder={placeholder}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={refreshActive}
        onMouseUp={refreshActive}
      />
    </div>
  );
}