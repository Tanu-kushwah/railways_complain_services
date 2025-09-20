"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  Train,
  Zap,
  MessageSquare,
  BarChart3,
  Activity
} from 'lucide-react';

interface DashboardProps {
  userRole: 'passenger' | 'admin' | 'supervisor';
}

export function Dashboard({ userRole }: DashboardProps) {
  const [stats, setStats] = useState({
    totalComplaints: 1247,
    resolved: 987,
    pending: 203,
    inProgress: 57,
    avgResolutionTime: 18,
    satisfactionRate: 94
  });

  const [recentComplaints, setRecentComplaints] = useState([
    { id: 'RC001', type: 'Cleanliness', status: 'In Progress', priority: 'High', time: '2 hrs ago', train: '12345 Rajdhani Express' },
    { id: 'RC002', type: 'Food Quality', status: 'Resolved', priority: 'Medium', time: '4 hrs ago', train: '56789 Shatabdi Express' },
    { id: 'RC003', type: 'AC Problem', status: 'Pending', priority: 'High', time: '6 hrs ago', train: '98765 Duronto Express' },
    { id: 'RC004', type: 'Staff Behavior', status: 'Resolved', priority: 'Low', time: '1 day ago', train: '11223 Garib Rath' },
  ]);

  const [realTimeUpdates, setRealTimeUpdates] = useState([
    { message: "New complaint received: AC malfunction in Coach B2", time: "Just now", type: "new" },
    { message: "Complaint RC001 status updated to 'In Progress'", time: "2 min ago", type: "update" },
    { message: "AI classified complaint as 'High Priority'", time: "5 min ago", type: "ai" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      const newUpdate = {
        message: `AI processed complaint batch - ${Math.floor(Math.random() * 10) + 1} complaints classified`,
        time: "Just now",
        type: "ai"
      };
      setRealTimeUpdates(prev => [newUpdate, ...prev.slice(0, 4)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {userRole === 'passenger' ? 'My Complaints' : 'Command Center'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {userRole === 'passenger' 
              ? 'Track your complaints and get real-time updates'
              : 'Monitor and manage all railway complaints with AI insights'
            }
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Live</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Complaints</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.totalComplaints.toLocaleString()}</p>
              </div>
              <MessageSquare className="h-12 w-12 text-blue-600" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">+12%</span>
              <span className="text-slate-600 dark:text-slate-400 ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Resolved</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div className="mt-4">
              <Progress value={(stats.resolved / stats.totalComplaints) * 100} className="h-2" />
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {((stats.resolved / stats.totalComplaints) * 100).toFixed(1)}% resolution rate
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Avg Resolution</p>
                <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">{stats.avgResolutionTime}h</p>
              </div>
              <Clock className="h-12 w-12 text-yellow-600" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Activity className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-blue-600">-8%</span>
              <span className="text-slate-600 dark:text-slate-400 ml-2">improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Satisfaction</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.satisfactionRate}%</p>
              </div>
              <Users className="h-12 w-12 text-purple-600" />
            </div>
            <div className="mt-4">
              <Progress value={stats.satisfactionRate} className="h-2" />
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Customer satisfaction score</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Complaints */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Recent Complaints
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-hidden">
                {recentComplaints.map((complaint, index) => (
                  <div
                    key={complaint.id}
                    className="p-6 border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="font-mono">{complaint.id}</Badge>
                        <span className="font-medium">{complaint.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(complaint.priority)}>
                          {complaint.priority}
                        </Badge>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span className="flex items-center">
                        <Train className="h-4 w-4 mr-1" />
                        {complaint.train}
                      </span>
                      <span>{complaint.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50">
                <Button variant="outline" className="w-full">
                  View All Complaints
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Updates */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Real-time Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4 p-6">
                {realTimeUpdates.map((update, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 animate-in slide-in-from-right duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`h-2 w-2 mt-2 rounded-full ${
                      update.type === 'new' ? 'bg-green-500' :
                      update.type === 'update' ? 'bg-blue-500' : 'bg-purple-500'
                    } animate-pulse`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {update.message}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {update.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200">
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-400">
                    Peak complaint hours detected
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-500 mt-1">
                    Consider increasing staff during 8-10 AM
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-400">
                    Sentiment analysis improving
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">
                    +15% positive feedback this week
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}