"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download,
  Filter
} from 'lucide-react';

export function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Simulated analytics data
  const metrics = {
    totalComplaints: 1247,
    resolvedComplaints: 987,
    avgResolutionTime: 18.5,
    satisfactionScore: 94.2,
    trendDirection: 'up',
    trendPercentage: 12
  };

  const complaintsByCategory = [
    { category: 'Cleanliness', count: 342, percentage: 27.4, trend: '+8%' },
    { category: 'Food Quality', count: 298, percentage: 23.9, trend: '+5%' },
    { category: 'AC Problems', count: 201, percentage: 16.1, trend: '-2%' },
    { category: 'Staff Behavior', count: 156, percentage: 12.5, trend: '+15%' },
    { category: 'Delays', count: 134, percentage: 10.7, trend: '-5%' },
    { category: 'Others', count: 116, percentage: 9.4, trend: '+3%' }
  ];

  const hourlyDistribution = [
    { hour: '6-8', complaints: 45, percentage: 15 },
    { hour: '8-10', complaints: 89, percentage: 30 },
    { hour: '10-12', complaints: 67, percentage: 22 },
    { hour: '12-14', complaints: 78, percentage: 26 },
    { hour: '14-16', complaints: 54, percentage: 18 },
    { hour: '16-18', complaints: 92, percentage: 31 },
    { hour: '18-20', complaints: 71, percentage: 24 },
    { hour: '20-22', complaints: 38, percentage: 13 }
  ];

  const regionalData = [
    { region: 'Northern Railway', complaints: 234, resolution: 92, avgTime: 16.2 },
    { region: 'Western Railway', complaints: 198, resolution: 95, avgTime: 15.8 },
    { region: 'Southern Railway', complaints: 187, resolution: 89, avgTime: 19.1 },
    { region: 'Eastern Railway', complaints: 156, resolution: 93, avgTime: 17.4 },
    { region: 'Central Railway', complaints: 145, resolution: 91, avgTime: 18.6 }
  ];

  const aiInsights = [
    {
      type: 'prediction',
      title: 'Peak Hour Prediction',
      content: 'Expected 40% increase in complaints during 8-10 AM tomorrow',
      severity: 'warning',
      confidence: 87
    },
    {
      type: 'sentiment',
      title: 'Sentiment Improvement',
      content: 'Positive sentiment increased by 15% this week',
      severity: 'success',
      confidence: 92
    },
    {
      type: 'pattern',
      title: 'Pattern Detected',
      content: 'AC-related complaints spike during afternoon hours',
      severity: 'info',
      confidence: 78
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Comprehensive insights and AI-powered analytics for railway complaint management
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex space-x-2">
        {['24h', '7d', '30d', '90d'].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange(range)}
          >
            {range}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Complaints</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                  {metrics.totalComplaints.toLocaleString()}
                </p>
              </div>
              <BarChart3 className="h-12 w-12 text-blue-600" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+{metrics.trendPercentage}%</span>
              <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Resolution Rate</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                  {((metrics.resolvedComplaints / metrics.totalComplaints) * 100).toFixed(1)}%
                </p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div className="mt-4">
              <Progress value={(metrics.resolvedComplaints / metrics.totalComplaints) * 100} className="h-2" />
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {metrics.resolvedComplaints} of {metrics.totalComplaints} resolved
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Avg Resolution Time</p>
                <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">
                  {metrics.avgResolutionTime}h
                </p>
              </div>
              <Clock className="h-12 w-12 text-yellow-600" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">-8%</span>
              <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Satisfaction Score</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                  {metrics.satisfactionScore}%
                </p>
              </div>
              <Users className="h-12 w-12 text-purple-600" />
            </div>
            <div className="mt-4">
              <Progress value={metrics.satisfactionScore} className="h-2" />
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Based on customer feedback</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Complaint Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Complaints by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complaintsByCategory.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">{item.count}</span>
                        <Badge variant={item.trend.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                          {item.trend}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hourly Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hourlyDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-16 text-sm font-medium text-slate-600 dark:text-slate-400">
                    {item.hour}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <Progress value={item.percentage} className="flex-1 h-3" />
                      <span className="ml-3 text-sm font-medium">{item.complaints}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance and AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Regional Performance */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Regional Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-2 font-medium text-slate-600 dark:text-slate-400">Region</th>
                      <th className="text-right py-2 font-medium text-slate-600 dark:text-slate-400">Complaints</th>
                      <th className="text-right py-2 font-medium text-slate-600 dark:text-slate-400">Resolution %</th>
                      <th className="text-right py-2 font-medium text-slate-600 dark:text-slate-400">Avg Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionalData.map((region, index) => (
                      <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 font-medium">{region.region}</td>
                        <td className="text-right py-3">{region.complaints}</td>
                        <td className="text-right py-3">
                          <Badge variant={region.resolution >= 92 ? 'default' : 'secondary'}>
                            {region.resolution}%
                          </Badge>
                        </td>
                        <td className="text-right py-3">{region.avgTime}h</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    insight.severity === 'warning' 
                      ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' :
                    insight.severity === 'success'
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                      'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    {insight.severity === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                    {insight.severity === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {insight.severity === 'info' && <Eye className="h-4 w-4 text-blue-600" />}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {insight.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Confidence: {insight.confidence}%
                    </span>
                    <Progress value={insight.confidence} className="w-16 h-1" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}