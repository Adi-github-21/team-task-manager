import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { ClipboardList, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, overdue: 0 });

  useEffect(() => {
    // In a full implementation, you'd fetch real stats from a /api/dashboard endpoint
    // Simulating data fetch for the dashboard
    api.get('/tasks').then(({ data }) => {
      setStats({
        total: data.length,
        pending: data.filter(t => t.status !== 'DONE').length,
        completed: data.filter(t => t.status === 'DONE').length,
        overdue: data.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'DONE').length,
      });
    });
  }, []);

  const statCards = [
    { title: 'Total Tasks', value: stats.total, icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'In Progress', value: stats.pending, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { title: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Overdue', value: stats.overdue, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
        <p className="text-gray-500 mt-1">Here is what's happening with your projects today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}