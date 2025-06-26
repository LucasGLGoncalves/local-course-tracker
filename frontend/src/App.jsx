import React, { useContext, useState } from 'react';
import { RootContext } from './RootContext';
import { useNavigate } from 'react-router-dom';

const modules = [
  { name: "Module 1 - Basic English", progress: 33 },
  { name: "Module 2 - Everyday Phrases", progress: 0 },
  { name: "Module 3 - Listening Practice", progress: 75 },
];

export default function App() {
  const { setAndSyncRoot } = useContext(RootContext); // ✅ MOVIDO PRA CÁ
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const handleModuleClick = (moduleName) => {
    navigate(`/module/${encodeURIComponent(moduleName)}`);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📘 English Course</h1>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          ⚙️ Settings
        </button>
      </div>

      {showSettings && (
        <div className="bg-gray-100 rounded-xl p-4 shadow space-y-4">
          <h2 className="font-semibold">Configurações</h2>

          <div>
            <label className="block text-sm mb-1">Diretório Raiz</label>
            <input
              type="text"
              placeholder="/curso"
              className="border rounded p-2 w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") setAndSyncRoot(e.target.value);
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              Pressione Enter para confirmar
            </p>
          </div>

          <button className="border p-2 rounded w-full">Usuário</button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod, index) => (
          <div
            key={index}
            className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => handleModuleClick(mod.name)}
          >
            <h3 className="text-lg font-semibold mb-2">{mod.name}</h3>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${mod.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {mod.progress}% complete
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
