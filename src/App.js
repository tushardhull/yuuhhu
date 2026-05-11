import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import RequestsDashboard from './components/RequestsDashboard';
import ManagerPreview from './components/ManagerPreview';
import TemplateBuilder from './components/TemplateBuilder';
import RolePermissions from './components/RolePermissions';
import { ROLES, JOB_TEMPLATES } from './data/templates';

const JOBS = Object.keys(JOB_TEMPLATES);

export default function App() {
  const [tab, setTab]         = useState('dashboard');   // dashboard | builder | permissions | form
  const [activeJob, setJob]   = useState('Engineering');
  const [roleIdx, setRoleIdx] = useState(0);
  const [openReq, setOpenReq] = useState(null);          // selected request row

  const isHR = ROLES[roleIdx].role === 'HR Admin';

  // ── navigation helpers ─────────────────────────────
  const goTo = (view) => {
    setTab(view);
    if (view !== 'form') setOpenReq(null);
  };

  const openRequest = (req) => {
    setOpenReq(req);
    setTab('form');
  };

  const openNewRequest = () => {
    setOpenReq(null);
    setTab('form');
  };

  const cycleRole = () => setRoleIdx(i => (i + 1) % ROLES.length);

  const handleJobSelect = (job) => {
    setJob(job);
    if (tab === 'dashboard') setTab('builder');
  };

  // ── breadcrumbs ────────────────────────────────────
  const getBreadcrumbs = () => {
    const root = { label: 'Horizon', onClick: () => goTo('dashboard') };
    if (tab === 'dashboard')   return [root, { label: 'Dashboard' }];
    if (tab === 'builder')     return [root, { label: 'Template builder' }, { label: activeJob }];
    if (tab === 'permissions') return [root, { label: 'Role permissions' }];
    if (tab === 'form')        return [root, { label: 'Requests', onClick: () => goTo('dashboard') }, { label: openReq ? openReq.role : `New ${activeJob} request` }];
    return [root];
  };

  // ── topbar action buttons ─────────────────────────
  const getActions = () => {
    if (tab === 'dashboard') return (
      <>
        <button className="btn" onClick={() => goTo('permissions')}>Permissions</button>
        <button className="btn primary" onClick={openNewRequest}>+ New request</button>
      </>
    );
    if (tab === 'builder') return (
      <>
        <button className="btn" onClick={() => goTo('dashboard')}>← Back</button>
        <button className="btn primary">Publish template</button>
      </>
    );
    if (tab === 'permissions') return (
      <>
        <button className="btn" onClick={() => goTo('dashboard')}>← Back</button>
        {isHR && <button className="btn primary">Save changes</button>}
      </>
    );
    if (tab === 'form') return (
      <>
        <button className="btn" onClick={() => goTo('dashboard')}>← Back</button>
        <button className="btn">Save draft</button>
        <button className="btn success">Submit request</button>
      </>
    );
    return null;
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar
        activeTab={tab}
        onTab={goTo}
        activeJob={activeJob}
        onJob={handleJobSelect}
        roleIdx={roleIdx}
        onCycleRole={cycleRole}
        onNewRequest={openNewRequest}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--canvas)' }}>
        <Topbar breadcrumbs={getBreadcrumbs()} actions={getActions()} />

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {tab === 'dashboard' && (
            <RequestsDashboard onOpenRequest={openRequest} />
          )}
          {tab === 'builder' && (
            <TemplateBuilder activeJob={activeJob} isHR={isHR} />
          )}
          {tab === 'permissions' && (
            <RolePermissions roleIdx={roleIdx} />
          )}
          {tab === 'form' && (
            <ManagerPreview
              activeJob={openReq?.dept || activeJob}
              requestData={openReq}
              onBack={() => goTo('dashboard')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
