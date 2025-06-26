import { useParams } from 'react-router-dom';
import { useState } from 'react';

const videoList = [
  "aula1.mp4",
  "aula2.mp4",
  "aula3.mp4"
];

export default function VideoPlayer() {
  const { moduleId, chapterId } = useParams();
  const [currentVideo, setCurrentVideo] = useState(videoList[0]);
  const [completed, setCompleted] = useState([]);

  const handleToggle = (video) => {
    setCompleted((prev) =>
      prev.includes(video)
        ? prev.filter((v) => v !== video)
        : [...prev, video]
    );
  };

  const progress = Math.floor((completed.length / videoList.length) * 100);

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-2">
          🎬 {decodeURIComponent(chapterId)}
        </h2>
        <video
          src={`/videos/${moduleId}/${chapterId}/${currentVideo}`} // 🔧 ajuste conforme estrutura
          controls
          className="w-full h-auto bg-black rounded-lg"
        />
        <label className="mt-4 block">
          <input
            type="checkbox"
            className="mr-2"
            checked={completed.includes(currentVideo)}
            onChange={() => handleToggle(currentVideo)}
          />
          Marcar como concluído
        </label>
        <div className="mt-4">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{progress}% completo</p>
        </div>
      </div>

      <div className="w-full md:w-64 border-l border-gray-300 pl-4">
        <h3 className="font-semibold mb-2">📂 Aulas</h3>
        <ul className="space-y-1">
          {videoList.map((video, index) => (
            <li
              key={index}
              className={`cursor-pointer hover:underline ${
                completed.includes(video) ? "text-green-600 font-semibold" : ""
              }`}
              onClick={() => setCurrentVideo(video)}
            >
              {video}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
