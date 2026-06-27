import React, { useEffect, useContext } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { ShieldAlert } from 'lucide-react';

const SecureMonitor = ({ active }) => {
  const { addInfraction, securityOverlay, clearSecurityOverlay } = useContext(AssessmentContext);

  useEffect(() => {
    if (!active) return;

    // Prevent Copy-Paste
    const handleCopy = (e) => {
      e.preventDefault();
      addInfraction("Copy-Paste Blocked", "Attempted to copy content from the assessment interface.");
    };

    const handlePaste = (e) => {
      e.preventDefault();
      addInfraction("Copy-Paste Blocked", "Attempted to paste code/text into the assessment editor.");
    };

    // Detect Tab Switch
    const handleVisibilityChange = () => {
      if (document.hidden) {
        addInfraction("Tab Switch Detected", "Switched tabs or navigated away from the exam screen.");
      }
    };

    // Detect Window Resize / Loss of focus
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    const handleResize = () => {
      const widthDiff = Math.abs(window.innerWidth - lastWidth);
      const heightDiff = Math.abs(window.innerHeight - lastHeight);

      if (widthDiff > 100 || heightDiff > 100) {
        addInfraction("Window Resize / Minimize", "Browser window was resized or minimized.");
        lastWidth = window.innerWidth;
        lastHeight = window.innerHeight;
      }
    };

    const handleBlur = () => {
      addInfraction("Window Focus Lost", "Lost browser window focus. Clicking outside exam area.");
    };

    // Attach listeners
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('blur', handleBlur);
    };
  }, [active, addInfraction]);

  if (!securityOverlay) return null;

  return (
    <div className="security-alert-overlay">
      <div className="security-alert-box">
        <div className="security-alert-icon">
          <ShieldAlert size={64} />
        </div>
        <h2 className="security-alert-title">SECURITY WARNING</h2>
        <div className="cyber-badge" style={{ marginBottom: '15px', borderColor: '#ef4444', color: '#ef4444', background: 'rgba(239,68,68,0.1)' }}>
          {securityOverlay.type}
        </div>
        <p className="security-alert-text">
          {securityOverlay.message}
        </p>
        <p className="security-alert-text" style={{ fontSize: '13px', color: '#ef4444', fontWeight: '500' }}>
          This activity has been recorded. Tab switching, resizing, and copy-pasting are strictly prohibited.
          Continuous violations will lead to direct disqualification and assessment termination.
        </p>
        <button className="btn-neon" style={{ background: '#ef4444', color: '#fff', boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)' }} onClick={clearSecurityOverlay}>
          Acknowledge & Resume Test
        </button>
      </div>
    </div>
  );
};

export default SecureMonitor;
