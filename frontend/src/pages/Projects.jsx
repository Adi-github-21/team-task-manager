import { useEffect, useState } from 'react';
import api from '../api/axios';
import { FolderKanban, X } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchProjects = () => {
    api.get('/projects')
      .then(({ data }) => setProjects(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', { name, description });
      setIsModalOpen(false);
      setName('');
      setDescription('');
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error("Failed to create project", error);
    }
  };

  if (loading) return <div className="text-gray-500">Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p className="text-gray-500 col-span-full">No projects yet. Create one!</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl p-6 shadow-soft border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <FolderKanban className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4 h-10 overflow-hidden">
                {project.description || "No description provided."}
              </p>
              <div className="border-t border-gray-100 pt-4">
                <span className="text-sm font-medium text-gray-600">
                  {project._count?.tasks || 0} Tasks
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input required type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                Create Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}