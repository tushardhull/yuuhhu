export const JOB_TEMPLATES = {
  Engineering: {
    sections: [
      {
        id: 'eng-summary', name: 'Job summary', tag: 'Core', tagClass: 'core', locked: false,
        fields: [
          { id: 'title',    label: 'Job title',       type: 'text',   required: true,  placeholder: 'e.g. Senior Frontend Engineer' },
          { id: 'dept',     label: 'Department',      type: 'select', required: false, options: ['Engineering','Platform','Infrastructure','Data'] },
          { id: 'level',    label: 'Level / band',    type: 'select', required: true,  options: ['','IC2','IC3','IC4','IC5','M1','M2','M3'] },
          { id: 'emptype',  label: 'Employment type', type: 'select', required: false, options: ['Full-time','Part-time','Contract'] },
          { id: 'location', label: 'Location',        type: 'text',   required: false, placeholder: 'Remote / City' },
        ],
      },
      {
        id: 'eng-skills', name: 'Skills & competencies', tag: 'Manager', tagClass: 'mgr', locked: false,
        fields: [
          { id: 'must_skills', label: 'Must-have skills',    type: 'text',     required: true,  placeholder: 'e.g. React, TypeScript, Node.js' },
          { id: 'nice_skills', label: 'Nice-to-have skills', type: 'text',     required: false, placeholder: 'e.g. GraphQL, AWS' },
          { id: 'seniority',   label: 'Seniority level',     type: 'select',   required: false, options: ['','Mid-level','Senior','Staff','Principal'] },
          { id: 'exp_years',   label: 'Years of experience', type: 'select',   required: true,  options: ['','0–2 yrs','3–5 yrs','5–8 yrs','8+ yrs'] },
          { id: 'description', label: 'Role description',    type: 'textarea', required: false, placeholder: 'Describe day-to-day responsibilities and expected impact...' },
        ],
      },
      {
        id: 'eng-exp', name: 'Experience & background', tag: 'Manager', tagClass: 'mgr', locked: false,
        fields: [
          { id: 'min_exp',   label: 'Minimum experience (yrs)', type: 'number',     required: true,  placeholder: '0' },
          { id: 'education', label: 'Education requirement',    type: 'select',     required: false, options: ["No preference","Bachelor's or equivalent","Master's preferred","PhD"] },
          { id: 'domain',    label: 'Domain / industry',        type: 'textarea',   required: false, placeholder: 'Any specific background helpful for this role...' },
          { id: 'prev',      label: 'Previous role types',      type: 'checkboxes', required: false, options: ['Startup / scale-up','Enterprise / large org','Open source contributor','People management'] },
        ],
      },
      {
        id: 'eng-comp', name: 'Compensation', tag: 'HR only', tagClass: 'hr', locked: true,
        fields: [
          { id: 'sal_min',     label: 'Salary min',    type: 'text', required: false, defaultValue: '$90,000' },
          { id: 'sal_max',     label: 'Salary max',    type: 'text', required: false, defaultValue: '$140,000' },
          { id: 'budget_code', label: 'Budget code',   type: 'text', required: false, defaultValue: 'BU-2025-ENG' },
          { id: 'equity',      label: 'Equity',        type: 'text', required: false, defaultValue: '0.05%–0.15%' },
          { id: 'bonus',       label: 'Bonus eligible',type: 'text', required: false, defaultValue: 'Yes' },
        ],
      },
      {
        id: 'eng-approval', name: 'Approval chain', tag: 'HR only', tagClass: 'hr', locked: true,
        fields: [
          { id: 'l1',      label: 'L1 approver',     type: 'text', required: false, defaultValue: 'Direct Manager' },
          { id: 'l2',      label: 'L2 approver',     type: 'text', required: false, defaultValue: 'VP Engineering' },
          { id: 'finance', label: 'Finance sign-off', type: 'text', required: false, defaultValue: 'Required' },
        ],
      },
    ],
  },
  Finance: {
    sections: [
      {
        id: 'fin-summary', name: 'Job summary', tag: 'Core', tagClass: 'core', locked: false,
        fields: [
          { id: 'title',     label: 'Job title',    type: 'text',   required: true,  placeholder: 'e.g. Financial Analyst' },
          { id: 'dept',      label: 'Department',   type: 'select', required: false, options: ['Finance','Accounting','Treasury','FP&A'] },
          { id: 'reporting', label: 'Reporting to', type: 'text',   required: false, placeholder: 'e.g. CFO, Finance Manager' },
          { id: 'location',  label: 'Location',     type: 'text',   required: false, placeholder: 'Remote / City' },
        ],
      },
      {
        id: 'fin-skills', name: 'Skills & competencies', tag: 'Manager', tagClass: 'mgr', locked: false,
        fields: [
          { id: 'tools',      label: 'Financial tools',    type: 'text',       required: true,  placeholder: 'e.g. Excel, SAP, NetSuite' },
          { id: 'analytical', label: 'Analytical skills',  type: 'textarea',   required: false, placeholder: 'Describe analytical requirements...' },
          { id: 'certs',      label: 'Certifications',     type: 'checkboxes', required: false, options: ['CPA','CFA','CA','ACCA','None required'] },
        ],
      },
      {
        id: 'fin-exp', name: 'Experience & background', tag: 'Manager', tagClass: 'mgr', locked: false,
        fields: [
          { id: 'min_exp',  label: 'Minimum experience (yrs)', type: 'number',     required: true,  placeholder: '0' },
          { id: 'industry', label: 'Industry experience',      type: 'text',       required: false, placeholder: 'e.g. SaaS, Banking, Manufacturing' },
          { id: 'audit',    label: 'Audit background',         type: 'checkboxes', required: false, options: ['Internal audit','External audit','Big 4 experience','SOX compliance'] },
        ],
      },
      {
        id: 'fin-comp', name: 'Compensation', tag: 'HR only', tagClass: 'hr', locked: true,
        fields: [
          { id: 'sal_range', label: 'Salary range',   type: 'text', required: false, defaultValue: '$70,000–$110,000' },
          { id: 'bonus',     label: 'Bonus structure', type: 'text', required: false, defaultValue: '10–15% annual' },
          { id: 'budget',    label: 'Budget code',     type: 'text', required: false, defaultValue: 'BU-2025-FIN' },
        ],
      },
    ],
  },
  Sales: {
    sections: [
      {
        id: 'sal-summary', name: 'Job summary', tag: 'Core', tagClass: 'core', locked: false,
        fields: [
          { id: 'title',     label: 'Job title',       type: 'text',   required: true,  placeholder: 'e.g. Account Executive' },
          { id: 'territory', label: 'Territory',        type: 'text',   required: false, placeholder: 'e.g. APAC, North America' },
          { id: 'quota',     label: 'Quota target ($)', type: 'number', required: false, placeholder: '500000' },
          { id: 'emptype',   label: 'Employment type',  type: 'select', required: false, options: ['Full-time','Contract'] },
        ],
      },
      {
        id: 'sal-skills', name: 'Skills & competencies', tag: 'Manager', tagClass: 'mgr', locked: false,
        fields: [
          { id: 'methodology',  label: 'Sales methodology',  type: 'select',   required: true,  options: ['','MEDDIC','Challenger','SPIN','Sandler','Solution selling'] },
          { id: 'crm',          label: 'CRM experience',     type: 'text',     required: false, placeholder: 'e.g. Salesforce, HubSpot' },
          { id: 'negotiation',  label: 'Negotiation skills', type: 'textarea', required: false, placeholder: 'Describe required negotiation experience...' },
        ],
      },
      {
        id: 'sal-exp', name: 'Experience & background', tag: 'Manager', tagClass: 'mgr', locked: false,
        fields: [
          { id: 'min_exp',   label: 'Minimum experience (yrs)', type: 'number',     required: true,  placeholder: '0' },
          { id: 'deal_size', label: 'Avg deal size',            type: 'text',       required: false, placeholder: 'e.g. $50K–$500K' },
          { id: 'exp_type',  label: 'Sales experience type',    type: 'checkboxes', required: false, options: ['Enterprise sales','SMB / mid-market','PLG / product-led','Channel / partnerships'] },
        ],
      },
      {
        id: 'sal-comp', name: 'Compensation', tag: 'HR only', tagClass: 'hr', locked: true,
        fields: [
          { id: 'base',        label: 'Base salary',  type: 'text', required: false, defaultValue: '$80,000' },
          { id: 'commission',  label: 'Commission',   type: 'text', required: false, defaultValue: '10% of ARR' },
          { id: 'accelerator', label: 'Accelerators', type: 'text', required: false, defaultValue: '1.5x above 100% quota' },
        ],
      },
    ],
  },
  Marketing: {
    sections: [
      {
        id: 'mkt-summary', name: 'Job summary', tag: 'Core', tagClass: 'core', locked: false,
        fields: [
          { id: 'title', label: 'Job title',      type: 'text',   required: true,  placeholder: 'e.g. Growth Marketing Manager' },
          { id: 'spec',  label: 'Specialization', type: 'select', required: false, options: ['Growth','Brand','Content','Performance','Product Marketing','Events'] },
          { id: 'team',  label: 'Team',            type: 'text',   required: false, placeholder: 'e.g. Demand Gen, Brand' },
        ],
      },
      {
        id: 'mkt-skills', name: 'Skills & competencies', tag: 'Manager', tagClass: 'mgr', locked: false,
        fields: [
          { id: 'tools',       label: 'Core tools',          type: 'text',       required: true,  placeholder: 'e.g. HubSpot, GA4, Figma' },
          { id: 'campaign',    label: 'Campaign experience',  type: 'textarea',   required: false, placeholder: 'Types of campaigns they should have run...' },
          { id: 'capabilities',label: 'Capabilities',        type: 'checkboxes', required: false, options: ['Data-driven / analytics','A/B testing','SEO / SEM','Paid media','Email marketing'] },
        ],
      },
      {
        id: 'mkt-comp', name: 'Compensation', tag: 'HR only', tagClass: 'hr', locked: true,
        fields: [
          { id: 'sal_range', label: 'Salary range', type: 'text', required: false, defaultValue: '$75,000–$120,000' },
          { id: 'budget',    label: 'Budget code',  type: 'text', required: false, defaultValue: 'BU-2025-MKT' },
        ],
      },
    ],
  },
  Operations: {
    sections: [
      {
        id: 'ops-summary', name: 'Job summary', tag: 'Core', tagClass: 'core', locked: false,
        fields: [
          { id: 'title',    label: 'Job title',   type: 'text',   required: true,  placeholder: 'e.g. Operations Manager' },
          { id: 'dept',     label: 'Department',  type: 'select', required: false, options: ['Operations','Supply Chain','Logistics','Facilities'] },
          { id: 'shift',    label: 'Shift',       type: 'select', required: false, options: ['Day','Night','Rotating','Flexible'] },
          { id: 'location', label: 'Location',    type: 'text',   required: false, placeholder: 'Office / Warehouse / Remote' },
        ],
      },
      {
        id: 'ops-skills', name: 'Skills & competencies', tag: 'Manager', tagClass: 'mgr', locked: false,
        fields: [
          { id: 'process',  label: 'Process knowledge',   type: 'textarea',   required: true,  placeholder: 'Key processes this person must know...' },
          { id: 'certs',    label: 'Certifications',      type: 'text',       required: false, placeholder: 'e.g. Six Sigma, PMP, APICS' },
          { id: 'software', label: 'Software proficiency', type: 'text',      required: false, placeholder: 'e.g. SAP, Oracle, Jira' },
        ],
      },
      {
        id: 'ops-exp', name: 'Experience & background', tag: 'Manager', tagClass: 'mgr', locked: false,
        fields: [
          { id: 'min_exp',   label: 'Minimum experience (yrs)', type: 'number',     required: true,  placeholder: '0' },
          { id: 'team_size', label: 'Team size managed',        type: 'number',     required: false, placeholder: '0' },
          { id: 'bg',        label: 'Background',               type: 'checkboxes', required: false, options: ['Supply chain','Lean / Six Sigma','International operations','Crisis management'] },
        ],
      },
      {
        id: 'ops-comp', name: 'Compensation', tag: 'HR only', tagClass: 'hr', locked: true,
        fields: [
          { id: 'sal_min', label: 'Salary min',  type: 'text', required: false, defaultValue: '$65,000' },
          { id: 'sal_max', label: 'Salary max',  type: 'text', required: false, defaultValue: '$100,000' },
          { id: 'budget',  label: 'Budget code', type: 'text', required: false, defaultValue: 'BU-2025-OPS' },
        ],
      },
    ],
  },
};

export const ROLES = [
  { key: 'hr',        initials: 'PR', name: 'Priya Reddy',  role: 'HR Admin',       color: '#2563EB' },
  { key: 'manager',   initials: 'JD', name: 'Jordan Davis', role: 'Hiring Manager', color: '#059669' },
  { key: 'recruiter', initials: 'ML', name: 'Marcus Lee',   role: 'Recruiter',      color: '#D97706' },
  { key: 'exec',      initials: 'DC', name: 'Diana Chen',   role: 'VP People',      color: '#7C3AED' },
];

export const SAMPLE_REQUESTS = [
  { id: 1, role: 'Senior Frontend Engineer', dept: 'Engineering', level: 'IC4', type: 'Full-time', date: 'Apr 28', status: 'Pending',  priority: 'High' },
  { id: 2, role: 'Product Designer',         dept: 'Design',      level: 'IC3', type: 'Full-time', date: 'Apr 22', status: 'Approved', priority: 'Medium' },
  { id: 3, role: 'Data Analyst',             dept: 'Analytics',   level: 'IC2', type: 'Contract',  date: 'Apr 15', status: 'Draft',    priority: 'Low' },
  { id: 4, role: 'Engineering Manager',      dept: 'Engineering', level: 'M3',  type: 'Full-time', date: 'Apr 10', status: 'Active',   priority: 'High' },
  { id: 5, role: 'Marketing Coordinator',    dept: 'Marketing',   level: 'IC1', type: 'Full-time', date: 'Mar 30', status: 'Filled',   priority: 'Medium' },
  { id: 6, role: 'Financial Analyst',        dept: 'Finance',     level: 'IC2', type: 'Full-time', date: 'Mar 20', status: 'Approved', priority: 'Medium' },
  { id: 7, role: 'Sales Account Executive',  dept: 'Sales',       level: 'IC3', type: 'Full-time', date: 'Mar 15', status: 'Active',   priority: 'High' },
];
