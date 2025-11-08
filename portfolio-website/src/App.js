import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio';
import ProjectDetail from './ProjectDetail';

function App() {
  return (
    <Router>
      {/* Disclaimer Banner */}
      <div className="fixed top-0 left-0 w-full bg-yellow-500 text-black text-center py-2 text-sm font-medium z-[60]">
        🚧 This website is a work in progress — some sections may not be finished.
      </div>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
