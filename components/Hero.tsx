"use client";

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Train, Zap, Shield, Globe, ArrowRight, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface HeroProps {
  setCurrentView: (view: string) => void;
}

export function Hero({ setCurrentView }: HeroProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Define features with strong typing and memoize for performance
  const features = useMemo(() => [
    { icon: Zap as LucideIcon, title: "AI-Powered Classification", desc: "Instant complaint analysis & routing" },
    { icon: Globe as LucideIcon, title: "Multilingual Support", desc: "English, Hindi & Regional Languages" },
    { icon: Shield as LucideIcon, title: "Enterprise Security", desc: "End-to-end encryption & compliance" },
    { icon: Train as LucideIcon, title: "Real-time Tracking", desc: "Live complaint status updates" }
  ], []);

  // Auto slide logic with pause on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, features.length]);

  return (
    <div className="relative overflow-hidden" aria-label="Hero section introducing Rail Sahayak features">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <div
              className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium"
              aria-label="Ministry of Railways badge"
            >
              <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" />
              Ministry of Railways
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Rail Sahayak
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Next-generation AI-powered complaint management system revolutionizing Indian Railways customer service
            </p>
          </div>

          {/* Feature Showcase */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
            role="list"
            aria-label="Key features of Rail Sahayak"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className={`p-6 transition-all duration-500 transform hover:scale-105 ${
                    currentFeature === index
                      ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-300 shadow-xl'
                      : 'hover:shadow-lg'
                  }`}
                  role="listitem"
                  tabIndex={0}
                  aria-current={currentFeature === index ? 'true' : undefined}
                >
                  <Icon
                    className={`h-12 w-12 mx-auto mb-4 ${
                      currentFeature === index ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'
                    }`}
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
                </Card>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-12">
            <Button
              size="lg"
              onClick={() => setCurrentView('dashboard')}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              aria-label="Launch Dashboard"
            >
              Launch Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentView('complaint')}
              className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-blue-300 hover:border-blue-400 transition-all duration-300"
              aria-label="File Complaint"
            >
              File Complaint
            </Button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-slate-200 dark:border-slate-700"
            aria-label="Statistics"
          >
            {[
              { label: "Complaints Resolved", value: "50K+" },
              { label: "Response Time", value: "<2 Min" },
              { label: "Languages Supported", value: "15+" },
              { label: "Satisfaction Rate", value: "95%" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
