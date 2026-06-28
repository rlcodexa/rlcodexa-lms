import React, { useState, useContext, useEffect } from 'react';
import { AssessmentContext, AssessmentProvider } from './context/AssessmentContext';
import CyberGrid from './components/CyberGrid';
import Sidebar from './components/Sidebar';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Coding from './pages/Coding';
import Evaluation from './pages/Evaluation';
import Certificate from './pages/Certificate';
import StaffPortal from './pages/StaffPortal';
import HodPortal from './pages/HodPortal';
import AdminPortal from './pages/AdminPortal';
import QuizHub from './pages/QuizHub';
import Aptitude from './pages/Aptitude';
import CodingMCQ from './pages/CodingMCQ';
import DatabaseSQL from './pages/DatabaseSQL';
import ComputerFundamentals from './pages/ComputerFundamentals';

const MainAppContent = () => {
  const { currentUser, globalLoading } = useContext(AssessmentContext);
  const [currentPage, setCurrentPage] = useState('login');

  // Handle routing redirects on authentication state change
  useEffect(() => {
    if (currentUser) {
      if (currentPage === 'login' || currentPage === 'register') {
        setCurrentPage('dashboard');
      }
    } else {
      if (currentPage !== 'login' && currentPage !== 'register') {
        setCurrentPage('login');
      }
    }
  }, [currentUser]);

  const renderContent = () => {
    switch (currentPage) {
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />;
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />;
      
      // Student Pages
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'quizhub':
        return <QuizHub setCurrentPage={setCurrentPage} />;
      case 'aptitude':
        return <Aptitude setCurrentPage={setCurrentPage} />;
      case 'coding-mcq':
        return <CodingMCQ setCurrentPage={setCurrentPage} />;
      case 'database-sql':
        return <DatabaseSQL setCurrentPage={setCurrentPage} />;
      case 'computer-fundamentals':
        return <ComputerFundamentals setCurrentPage={setCurrentPage} />;
      case 'quiz':
        return <Quiz setCurrentPage={setCurrentPage} />;
      case 'coding':
        return <Coding setCurrentPage={setCurrentPage} />;
      case 'evaluation':
        return <Evaluation />;
      case 'certificate':
        return <Certificate />;
      
      // Staff Pages
      case 'staff-directory':
        return <StaffPortal mode="directory" />;
      case 'staff-keys':
        return <StaffPortal mode="keys" />;
      
      // HOD Pages
      case 'hod-analytics':
        return <HodPortal mode="analytics" />;
      case 'hod-infractions':
        return <HodPortal mode="infractions" />;
      
      // Admin Pages
      case 'admin-whitelist':
        return <AdminPortal mode="admin-whitelist" />;
      case 'admin-logs':
        return <AdminPortal mode="admin-logs" />;
      
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  // Auth pages (no sidebar)
  if (!currentUser) {
    return (
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        {/* Global Loader Overlay */}
        {globalLoading && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(2, 8, 23, 0.9)',
            zIndex: 9999,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'all'
          }}>
            <div className="loader" style={{
              border: '4px solid rgba(0, 191, 255, 0.2)',
              borderTop: '4px solid var(--primary-blue)',
              borderRadius: '50%',
              width: '50px', height: '50px',
              animation: 'spin 1s linear infinite'
            }}></div>
            <div style={{ marginTop: '15px', color: 'var(--primary-blue)', fontWeight: 'bold', letterSpacing: '2px' }}>INITIALIZING SYSTEM...</div>
            <style>{`
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              body { pointer-events: ${globalLoading ? 'none' : 'auto'}; }
            `}</style>
          </div>
        )}
        <CyberGrid />
        {renderContent()}
      </div>
    );
  }

  // Logged in layouts (sidebar + content workspace)
  return (
    <div className="app-layout" style={{ position: 'relative' }}>
      {/* Global Loader Overlay */}
      {globalLoading && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(2, 8, 23, 0.9)',
          zIndex: 9999,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'all'
        }}>
          <div className="loader" style={{
            border: '4px solid rgba(0, 191, 255, 0.2)',
            borderTop: '4px solid var(--primary-blue)',
            borderRadius: '50%',
            width: '50px', height: '50px',
            animation: 'spin 1s linear infinite'
          }}></div>
          <div style={{ marginTop: '15px', color: 'var(--primary-blue)', fontWeight: 'bold', letterSpacing: '2px' }}>INITIALIZING SYSTEM...</div>
          <style>{`
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            body { pointer-events: ${globalLoading ? 'none' : 'auto'}; }
          `}</style>
        </div>
      )}
      <CyberGrid />
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AssessmentProvider>
      <MainAppContent />
    </AssessmentProvider>
  );
}

export default App;
