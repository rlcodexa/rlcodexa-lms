import React, { useContext } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { 
  LayoutDashboard, 
  HelpCircle, 
  Code2, 
  Award, 
  ShieldCheck, 
  LogOut, 
  User, 
  Terminal,
  BookOpen,
  Users,
  Compass,
  FileCheck,
  ClipboardList
} from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const { currentUser, logoutStudent, students, isOnline } = useContext(AssessmentContext);

  if (!currentUser) return null;

  const getMenuItems = () => {
    const certActive = currentUser.weeklyCertIssued;
    switch (currentUser.role) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'quiz', label: 'Daily Quiz', icon: HelpCircle, disabled: currentUser.completedQuiz, badge: currentUser.completedQuiz ? 'Done' : 'Active' },
          { id: 'coding', label: 'Code Sandbox', icon: Code2, disabled: currentUser.completedCoding, badge: currentUser.completedCoding ? 'Done' : 'Active' },
          { id: 'evaluation', label: 'My Analytics', icon: Award },
          { id: 'certificate', label: 'Certificate', icon: FileCheck, disabled: !certActive, badge: certActive ? 'Ready' : 'Locked' }
        ];
      case 'staff':
        return [
          { id: 'dashboard', label: 'Staff Dashboard', icon: LayoutDashboard },
          { id: 'staff-directory', label: 'Student Directory', icon: Users },
          { id: 'staff-keys', label: 'Teaching Answer Key', icon: BookOpen }
        ];
      case 'hod':
        return [
          { id: 'dashboard', label: 'HOD Overview', icon: LayoutDashboard },
          { id: 'hod-analytics', label: 'Dept Performance', icon: Compass },
          { id: 'hod-infractions', label: 'Security Flags', icon: ShieldCheck }
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Admin Terminal', icon: LayoutDashboard },
          { id: 'admin-whitelist', label: 'Whitelist Control', icon: ClipboardList },
          { id: 'admin-logs', label: 'Realtime Syslogs', icon: Terminal }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();
  const registeredCount = students.filter(s => s.registered).length;

  const handleLogout = () => {
    logoutStudent();
    setCurrentPage('login');
  };

  const getRoleBadgeColor = () => {
    switch (currentUser.role) {
      case 'admin': return 'rgba(239, 68, 68, 0.15)'; // red
      case 'staff': return 'rgba(245, 158, 11, 0.15)'; // amber
      case 'hod': return 'rgba(16, 185, 129, 0.15)'; // green
      default: return 'rgba(0, 191, 255, 0.1)'; // cyan
    }
  };

  const getRoleTextColor = () => {
    switch (currentUser.role) {
      case 'admin': return '#ef4444';
      case 'staff': return '#f59e0b';
      case 'hod': return '#10b981';
      default: return 'var(--primary-blue)';
    }
  };

  return (
    <div className="glass-panel" style={{
      width: '280px',
      height: '100vh',
      borderRadius: '0',
      borderTop: 'none',
      borderBottom: 'none',
      borderLeft: 'none',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 20px',
      flexShrink: 0
    }}>
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px', padding: '0 8px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, var(--primary-blue), var(--secondary-cyan))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(0, 191, 255, 0.4)'
        }}>
          <Terminal size={20} color="#000" strokeWidth={2.5} />
        </div>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '0.5px', background: 'linear-gradient(90deg, #fff, var(--primary-blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            CODE<span style={{ color: 'var(--secondary-cyan)' }}>GATE</span>
          </h1>
          <div style={{ fontSize: '10px', color: 'var(--secondary-cyan)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '700', marginTop: '-3px' }}>
            Assessment OS
          </div>
        </div>
      </div>

      {/* Database Connection Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '11px',
        color: isOnline ? '#10b981' : '#f59e0b',
        fontWeight: '700',
        padding: '0 8px',
        marginBottom: '20px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: isOnline ? '#10b981' : '#f59e0b',
          boxShadow: isOnline ? '0 0 10px #10b981' : '0 0 10px #f59e0b',
          display: 'inline-block'
        }}></span>
        {isOnline ? 'MongoDB Connected' : 'Sandbox (Offline)'}
      </div>

      {/* Role Indicator Banner */}
      <div style={{
        background: getRoleBadgeColor(),
        border: `1px solid ${getRoleTextColor()}40`,
        borderRadius: '6px',
        padding: '8px 12px',
        marginBottom: '25px',
        fontSize: '11px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: getRoleTextColor(),
        textAlign: 'center'
      }}>
        {currentUser.role} PORTAL
      </div>

      {/* Navigation menu */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
        <div className="cyber-label" style={{ paddingLeft: '8px', fontSize: '11px' }}>Portal Navigation</div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                if (!item.disabled) setCurrentPage(item.id);
              }}
              disabled={item.disabled}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: isActive ? 'rgba(0, 191, 255, 0.08)' : 'transparent',
                border: '1px solid',
                borderColor: isActive ? 'rgba(0, 191, 255, 0.25)' : 'transparent',
                borderRadius: '8px',
                color: item.disabled ? 'var(--text-muted)80' : (isActive ? 'var(--primary-blue)' : 'var(--text-muted)'),
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-cyber)',
                fontWeight: isActive ? '600' : '400',
                position: 'relative',
                opacity: item.disabled ? 0.5 : 1
              }}
            >
              <Icon size={18} />
              <span style={{ fontSize: '14px' }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '100px',
                  background: item.badge === 'Done' ? 'rgba(16, 185, 129, 0.1)' : (item.badge === 'Ready' ? 'rgba(0, 191, 255, 0.1)' : 'rgba(245, 158, 11, 0.1)'),
                  border: '1px solid',
                  borderColor: item.badge === 'Done' ? 'rgba(16, 185, 129, 0.2)' : (item.badge === 'Ready' ? 'rgba(0, 191, 255, 0.2)' : 'rgba(245, 158, 11, 0.2)'),
                  color: item.badge === 'Done' ? '#10b981' : (item.badge === 'Ready' ? 'var(--primary-blue)' : '#f59e0b')
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* User profile section at the bottom */}
      <div style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(0, 191, 255, 0.1)',
            border: '1px solid rgba(0, 191, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(0, 191, 255, 0.1)'
          }}>
            <User size={20} color="var(--primary-blue)" />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {currentUser.role === 'student' ? currentUser.id : currentUser.email}
            </div>
          </div>
        </div>

        {/* Global registry stats (visible to all but customized) */}
        {currentUser.role === 'student' ? (
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '10px 12px',
            fontSize: '11px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Profile Score:</span>
              <span style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>{currentUser.points} pts</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Developer Level:</span>
              <span style={{ color: 'var(--secondary-cyan)', fontWeight: 'bold' }}>{currentUser.level}</span>
            </div>
          </div>
        ) : (
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '10px 12px',
            fontSize: '11px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Whitelisted Cohort:</span>
              <span style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>{registeredCount}/50 Active</span>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px',
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '8px',
            color: '#ef4444',
            cursor: 'pointer',
            fontFamily: 'var(--font-cyber)',
            fontSize: '13px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
            e.currentTarget.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <LogOut size={14} />
          Terminate Session
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
