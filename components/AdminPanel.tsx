"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Settings, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  MessageSquare,
  Bot,
  Database,
  Activity,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('complaints');
  const [searchQuery, setSearchQuery] = useState('');

  const complaints = [
    {
      id: 'RC001',
      type: 'Cleanliness',
      description: 'Washroom not cleaned properly in coach B2',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'Team Lead 1',
      train: '12345 Rajdhani Express',
      passenger: 'John Doe',
      phone: '+91 98765 43210',
      createdAt: '2024-01-15 10:30 AM',
      aiScore: 0.89,
      sentiment: 'Negative'
    },
    {
      id: 'RC002',
      type: 'Food Quality',
      description: 'Food served was cold and tasteless',
      priority: 'Medium',
      status: 'Resolved',
      assignedTo: 'Team Lead 2',
      train: '56789 Shatabdi Express',
      passenger: 'Jane Smith',
      phone: '+91 87654 32109',
      createdAt: '2024-01-15 09:15 AM',
      aiScore: 0.76,
      sentiment: 'Negative'
    },
    {
      id: 'RC003',
      type: 'AC Problem',
      description: 'AC not working in coach A1',
      priority: 'High',
      status: 'Pending',
      assignedTo: 'Unassigned',
      train: '98765 Duronto Express',
      passenger: 'Mike Johnson',
      phone: '+91 76543 21098',
      createdAt: '2024-01-15 08:45 AM',
      aiScore: 0.92,
      sentiment: 'Very Negative'
    }
  ];

  const systemStats = {
    activeUsers: 1247,
    totalComplaints: 5489,
    resolvedToday: 89,
    aiAccuracy: 94.2,
    systemUptime: 99.8,
    avgResponseTime: 2.4
  };

  const aiMetrics = {
    classificationsToday: 156,
    accuracyRate: 94.2,
    falsePositives: 8,
    processingTime: 0.3,
    languagesDetected: 12,
    sentimentAnalyzed: 142
  };

  const tabs = [
    { id: 'complaints', label: 'Complaint Management', icon: MessageSquare },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'ai', label: 'AI Configuration', icon: Bot },
    { id: 'system', label: 'System Health', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

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

  const renderComplaintManagement = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search complaints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Complaints Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 font-medium">ID</th>
                  <th className="text-left py-3 font-medium">Type</th>
                  <th className="text-left py-3 font-medium">Priority</th>
                  <th className="text-left py-3 font-medium">Status</th>
                  <th className="text-left py-3 font-medium">Assigned To</th>
                  <th className="text-left py-3 font-medium">AI Score</th>
                  <th className="text-left py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-4 font-mono">{complaint.id}</td>
                    <td className="py-4">{complaint.type}</td>
                    <td className="py-4">
                      <Badge className={getPriorityColor(complaint.priority)}>
                        {complaint.priority}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Badge className={getStatusColor(complaint.status)}>
                        {complaint.status}
                      </Badge>
                    </td>
                    <td className="py-4">{complaint.assignedTo}</td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <div className={`h-2 w-2 rounded-full ${
                          complaint.aiScore > 0.8 ? 'bg-green-500' :
                          complaint.aiScore > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span>{(complaint.aiScore * 100).toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSystemHealth = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">System Uptime</p>
              <p className="text-2xl font-bold text-green-600">{systemStats.systemUptime}%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg Response Time</p>
              <p className="text-2xl font-bold text-blue-600">{systemStats.avgResponseTime}s</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">AI Accuracy</p>
              <p className="text-2xl font-bold text-purple-600">{systemStats.aiAccuracy}%</p>
            </div>
            <Bot className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>AI Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{aiMetrics.classificationsToday}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Classifications Today</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{aiMetrics.accuracyRate}%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{aiMetrics.falsePositives}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">False Positives</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{aiMetrics.processingTime}s</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Avg Processing Time</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">{aiMetrics.languagesDetected}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Languages Detected</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">{aiMetrics.sentimentAnalyzed}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sentiment Analyzed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Admin Control Center
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage system operations, monitor AI performance, and oversee complaint resolution
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'complaints' && renderComplaintManagement()}
        {activeTab === 'system' && renderSystemHealth()}
        {activeTab === 'users' && (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-slate-600 dark:text-slate-400">
                User management interface would be implemented here
              </p>
            </CardContent>
          </Card>
        )}
        {activeTab === 'ai' && (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-slate-600 dark:text-slate-400">
                AI configuration and model management interface would be implemented here
              </p>
            </CardContent>
          </Card>
        )}
        {activeTab === 'settings' && (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-slate-600 dark:text-slate-400">
                System settings and configuration options would be implemented here
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}