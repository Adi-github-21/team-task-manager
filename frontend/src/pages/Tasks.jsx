import { useEffect, useState } from 'react';
import api from '../api/axios';
import { format } from 'date-fns';
import { CheckCircle, Circle, Clock, X } from 'lucide-react';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const [priority, setPriority] = useState('MEDIUM');

  const fetchData = async () => {
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        api.get('/tasks'),
        api.get('/projects')
      ]);
      setTasks(tasksRes.data);
      setProjects(projectsRes.data);
      if (projectsRes.data.length > 0) setProjectId(projectsRes.data[0].id);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'DONE' ? 'TODO' : 'DONE';
    try {
      await api.patch(`/tasks/${taskId}/status`, { status: newStatus });
      fetchData(); 
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { title, projectId, priority });
      setIsModalOpen(false);
      setTitle('');
      fetchData(); // Refresh list
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading tasks...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          + New Task
        </button>
      </div>

      <div className="bg-white shadow-soft rounded-xl border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {tasks.length === 0 ? (
            <li className="p-8 text-center text-gray-500">No tasks found. Enjoy your day!</li>
          ) : (
            tasks.map((task) => (
              <li key={task.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button onClick={() => toggleStatus(task.id, task.status)} className="text-gray-400 hover:text-indigo-600 transition-colors">
                    {task.status === 'DONE' ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : task.status === 'IN_PROGRESS' ? (
                      <Clock className="h-6 w-6 text-yellow-500" />
                    ) : (
                      <Circle className="h-6 w-6" />
                    )}
                  </button>
                  <div>
                    <p className={`text-sm font-medium ${task.status === 'DONE' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        task.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                        task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                      {task.project && (
                        <span className="text-xs text-gray-500">• {task.project.name}</span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Create Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Create New Task</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {projects.length === 0 ? (
              <p className="text-red-500 text-sm mb-4">You must create a project first!</p>
            ) : (
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Task Title</label>
                  <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project</label>
                  <select value={projectId} onChange={(e) => setProjectId(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500">
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500">
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Create Task
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}