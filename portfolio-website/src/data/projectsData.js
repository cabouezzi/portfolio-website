// Central location for all project data
// To add a new project, simply add a new object to this array
import ChessBoard from "../projects/ChessBoard";
import InteractiveWeather from "../projects/InteractiveWeather";
import Lira from "../projects/Lira";

export const projectsData = [
  // Chess AI Project
  {
    id: 1,
    slug: "chess-ai", // URL-friendly identifier for routing
    title: "Chess AI",
    description:
      "An intelligent chess engine with minimax algorithm and alpha-beta pruning. Features include move validation, checkmate detection, and adjustable difficulty levels.",
    image: "/chess/chess-screenshot.png", // Place your image in the public folder
    dateCreated: "2022-08",
    codeUrl: "https://github.com/cabouezzi/Chess-AI", // Add your GitHub repository URL
    tags: [
      "Python",
      "Game Theory",
      "Data Structures",
      "Algorithms",
      "Game Development",
    ],
    featured: true,
    // Preview component configuration
    previewComponent: ChessBoard, // Name of the component to render as preview
    previewHeight: "600px", // Height of the preview window
    // Full project details for project page
    fullDescription: `
      This Chess AI project implements a sophisticated chess engine capable of playing against human opponents at various difficulty levels.
      
      The engine uses the minimax algorithm with alpha-beta pruning to efficiently evaluate potential moves and select the best strategy. The AI can look several moves ahead and make strategic decisions based on position evaluation.
      
      Key features include:
      - Full chess rules implementation including castling, en passant, and pawn promotion
      - Adjustable difficulty levels (1-5) that control search depth
      - Move validation and legal move generation
      - Checkmate and stalemate detection
      - Position evaluation using piece values and board control metrics
      - Clean command-line interface for gameplay
    `,
    challenges: [
      "Optimizing the minimax algorithm to search deeper without timeout",
      "Implementing all special chess moves correctly (castling, en passant)",
      "Balancing AI difficulty to make it challenging but not impossible",
    ],
    learnings: [
      "Deep understanding of game tree algorithms",
      "Importance of optimization in AI/ML applications",
      "Chess strategy and position evaluation techniques",
    ],
  },
  // Interactive Weather Visualization Project
  {
    id: 2,
    slug: "interactive-weather",
    title: "Interactive Weather",
    description:
      "A 3D visualization of global wind and temperature patterns using aggregated NOAA data, built in Unity with custom shaders.",
    image: "/weather/example.png",
    dateCreated: "2022-02",
    codeUrl: "https://github.com/cabouezzi/Interactive-Weather",
    tags: [
      "Unity",
      "C#",
      "Data Visualization",
      "3D Visualization",
      "ShaderLab",
    ],
    featured: false,
    previewComponent: InteractiveWeather,
    previewHeight: "500px",
    fullDescription: `
    Interactive Weather is a 3D visualization that depicts global wind and temperature patterns
    using NOAA atmospheric data aggregated from 2022. The project processes and averages the 
    dataset into a single vector field representing global air movement and temperature distribution.

    Built with Unity and ShaderLab, the visualization displays a rotating Earth with animated wind 
    vectors and color-mapped temperature gradients, creating a scientific yet visually engaging 
    representation of global climate behavior.

    Key features include:
    - 3D globe rendering with temperature coloration and wind vectors
    - Data aggregated from NOAA’s 2022 global atmospheric datasets
    - Smooth shader-based animation of directional wind flows
    - Emphasis on clarity, performance, and educational visualization
  `,
    challenges: [
      "Processing and averaging large meteorological datasets into a manageable vector field",
      "Achieving smooth, visually coherent wind animations without live data streams",
      "Designing shaders that effectively represent both direction and magnitude information",
    ],
    learnings: [
      "Integrating scientific data into visual experiences",
      "Efficient shader and rendering optimization in Unity",
      "Creating educational visualizations from complex datasets",
    ],
  },
  {
    id: 3,
    slug: "lira-wasm-editor",
    title: "Lira Playground (WASM)",
    description:
      "A browser-based IDE for the Lira language using .NET WASM and React.",
    image: "/lira-editor-screenshot.png", // Optional: screenshot of the editor
    dateCreated: "2025-11",
    codeUrl: "https://github.com/cabouezzi/lira",
    tags: ["C#", "Interpreters", "Abstract Syntax Tree", "Programming Languages", "Formal Language Syntax"],
    featured: true,
    previewComponent: Lira,
    previewHeight: "600px",
    fullDescription: `Lira WASM Live Editor is an in-browser interactive environment for the Lira programming language. 
It leverages .NET WebAssembly for runtime execution, redirects output to a custom React console, and allows live coding without server dependencies.`,
    challenges: [
      "Integrating .NET WASM runtime with React",
      "Redirecting Console.WriteLine output to a custom UI console",
      "Managing asynchronous loading of the runtime and assembly exports",
    ],
    learnings: [
      "Working with .NET 8 WASM outside of Blazor",
      "Bridging C# and JS via JSHost and module imports",
      "Advanced React state management for streaming logs",
    ],
  },
  // Add more projects here following this structure:
  // {
  //   id: 2,
  //   slug: "project-name",
  //   title: "Project Title",
  //   description: "Brief description of the project",
  //   image: "/project-image.png",
  //   dateCreated: "2024-11",
  //   liveUrl: "https://...",
  //   codeUrl: "https://github.com/...",
  //   tags: ["React", "Node.js", "MongoDB"],
  //   featured: false,
  //   previewComponent: null, // Set to component name or null for no preview
  //   previewHeight: "500px",
  //   fullDescription: "Detailed description...",
  //   challenges: [...],
  //   learnings: [...]
  // }
];

export default projectsData;
