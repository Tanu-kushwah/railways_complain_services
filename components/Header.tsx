"use client";

import { useState, useCallback } from 'react';
import { Train, Menu, X, User, Bell, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  userRole: 'passenger' | 'admin' | 'supervisor';
  setUserRole: (role: 'passenger' | 'admin' | 'supervisor') => void;
}

export function Header({ currentView, setCurrentView, userRole, setUserRole }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);  // Dark mode state
  const [notificationsCount, setNotificationsCount] = useState(0); // Replace with actual notification count

  const menuItems = [
    { id: 'home', label: 'Home', roles: ['passenger', 'admin', 'supervisor'] },
    { id: 'dashboard', label: 'Dashboard', roles: ['passenger', 'admin', 'supervisor'] },
    { id: 'complaint', label: 'File Complaint', roles: ['passenger'] },
    { id: 'analytics', label: 'Analytics', roles: ['admin', 'supervisor'] },
    { id: 'admin', label: 'Admin Panel', roles: ['admin'] },
  ];

  const visibleMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  }, []);

  const switchRole = useCallback(() => {
    const roles: ('passenger' | 'admin' | 'supervisor')[] = ['passenger', 'admin', 'supervisor'];
    const currentIndex = roles.indexOf(userRole);
    const nextRole = roles[(currentIndex + 1) % roles.length];
    setUserRole(nextRole);
  }, [userRole, setUserRole]);

  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-blue-200/50 dark:border-blue-800/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Train className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                RailSahayak
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">AI-Powered Railway Assistant</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {visibleMenuItems.map(item => (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                onClick={() => setCurrentView(item.id)}
                className={`relative px-4 py-2 rounded-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  currentView === item.id ? 'border-b-2 border-blue-600' : ''
                }`}
                aria-current={currentView === item.id ? 'page' : undefined}
              >
                {item.label}
                {item.id === 'dashboard' && notificationsCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                    aria-label={`${notificationsCount} new notifications`}
                  >
                    {notificationsCount}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
            </Button>

            {/* Notifications */}
            <div className="hidden sm:flex items-center space-x-2 cursor-pointer" title="Notifications">
              <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              {notificationsCount > 0 ? (
                <Badge variant="destructive" className="cursor-pointer">{notificationsCount}</Badge>
              ) : (
                <Badge variant="outline">0</Badge>
              )}
            </div>

            {/* Role Switcher */}
            <Button
              variant="outline"
              size="sm"
              onClick={switchRole}
              className="hidden sm:inline-flex items-center space-x-1"
              aria-label="Switch User Role"
            >
              <User className="h-4 w-4" />
              <span>{userRole}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-2">
              {visibleMenuItems.map(item => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  onClick={() => {
                    setCurrentView(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="justify-start"
                  aria-current={currentView === item.id ? 'page' : undefined}
                >
                  {item.label}
                </Button>
              ))}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button
                  variant="outline"
                  onClick={switchRole}
                  className="w-full justify-start"
                  aria-label="Switch User Role"
                >
                  <User className="h-4 w-4 mr-2" />
                  Switch Role: {userRole}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
