import { useParams, useNavigate } from 'react-router-dom';

const chapters = [
  { name: "Chapter 1 - Alphabet", progress: 50 },
  { name: "Chapter 2 - Greetings", progress: 0 },
  { name: "Chapter 3 - Verbs", progress: 100 }
];

export default function Chapters() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const handleChapterClick = (chapterName) => {
    navigate(`/module/${encodeURIComponent(moduleId)}/${encodeURIComponent(chapterName)}`);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">📚 {decodeURIComponent(moduleId)}</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chap, index) => (
          <div
            key={index}
            onClick={() => handleChapterClick(chap.name)}
            className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
          >
            <h3 className="text-lg font-semibold mb-2">{chap.name}</h3>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${chap.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{chap.progress}% complete</p>
          </div>
        ))}
      </div>
    </div>
  );
}
