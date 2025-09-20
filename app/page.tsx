"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Dashboard } from '@/components/Dashboard';
import { ComplaintForm } from '@/components/ComplaintForm';
import { ChatBot } from '@/components/ChatBot';
import { Analytics } from '@/components/Analytics';
import { AdminPanel } from '@/components/AdminPanel';

export default function Home() {
  const [currentView, setCurrentView] = useState('home');  // <-- yahi badla
  const [userRole, setUserRole] = useState<'passenger' | 'admin' | 'supervisor'>('passenger');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-950">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        userRole={userRole}
        setUserRole={setUserRole}
      />
      
      <main className="transition-all duration-500 ease-in-out">
        {currentView === 'home' && <Hero setCurrentView={setCurrentView} />}
        {currentView === 'dashboard' && <Dashboard userRole={userRole} />}
        {currentView === 'complaint' && <ComplaintForm />}
        {currentView === 'analytics' && <Analytics />}
        {currentView === 'admin' && userRole === 'admin' && <AdminPanel />}
      </main>
      
      <ChatBot />
    </div>
  );   
}
