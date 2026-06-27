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
  const { currentUser } = useContext(AssessmentContext);
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
        <CyberGrid />
        {renderContent()}
      </div>
    );
  }

  // Logged in layouts (sidebar + content workspace)
  return (
    <div className="app-layout" style={{ position: 'relative' }}>
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
