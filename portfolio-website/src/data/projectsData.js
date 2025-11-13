// Central location for all project data
// To add a new project, simply add a new object to this array
import ChessBoard from "../projects/ChessBoard";
import InteractiveWeather from "../projects/InteractiveWeather";
import Lira from "../projects/Lira";
import BeeKeeper from "../projects/BeeKeeper";
import Boids from "../projects/Boids";
import SmartAndoverApp from "../projects/SmartAndoverApp";
import MatchingCoco from "../projects/MatchingCoco"; 

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
  {
  id: 4,
  slug: "beekeeper",
  title: "BeeKeeper",
  description: "macOS/iOS app for managing hive inspections, hive health, and apiary data.",
  image: "/beekeeper/screenshot.png",
  dateCreated: "2018-01",
  codeUrl: "https://github.com/cabouezzi/BeeKeeper",
  productUrl: "https://apps.apple.com/us/app/beekeeper-apiary-game/id6747629982",
  tags: ["Swift", "iOS", "macOS", "Beekeeping", "Data Management", "Hive Analytics"],
  featured: false,
  previewComponent: BeeKeeper,
  previewHeight: "600px",
  fullDescription: `BeeKeeper is a native macOS and iOS application for managing hive inspections, tracking hive health, and analyzing long-term apiary data.
The app began as an experimental project back in 2018 and later underwent a serious rewrite around 2022 with the goal of releasing a polished, production-quality version.`,
  challenges: [
    "Designing a multi-platform UI that works well across macOS and iOS",
    "Structuring inspection and hive-health data for long-term analytics",
    "Refactoring and modernizing a large, early-era codebase from 2018"
  ],
  learnings: [
    "Cross-platform Swift development using shared models & logic",
    "Designing effective data schemas for time-series tracking",
    "Managing and modernizing a multi-year legacy project"
  ],
},

{
  id: 5,
  slug: "boids-ios",
  title: "Boids",
  description: "iOS/macOS simulation of flocking behavior using the classic Boids algorithm.",
  image: "/boids/screenshot.png",
  dateCreated: "2020-01",
  codeUrl: "https://github.com/cabouezzi/Boids",
  tags: ["Swift", "iOS", "macOS", "Algorithms", "Simulation", "Graphics"],
  featured: false,
  previewComponent: Boids,
  previewHeight: "600px",
  fullDescription: `Boids is an iOS/macOS app implementing the Boids flocking algorithm to simulate bird-like swarm behavior.
It was built around 2020 as a spin-off from your work on BeeKeeper, inspired by building visual, agent-based simulations.`,
  challenges: [
    "Implementing efficient agent-based behavior in Swift",
    "Rendering smooth animations with many entities simultaneously",
    "Building input models for both macOS (mouse) and iOS (touch)"
  ],
  learnings: [
    "Performance tuning in Swift for continuous simulations",
    "Applying real mathematical algorithms to interactive UI",
    "Adapting simulations for multiple Apple platforms"
  ],
},

{
  id: 6,
  slug: "smart-andover-app",
  title: "Smart Andover App",
  description: "iOS student utility app built over a few months starting in September 2021.",
  image: "/smart-andover-app/screenshot.png",
  dateCreated: "2021-09",
  codeUrl: "https://github.com/cabouezzi/Smart-Andover-App",
  tags: ["Swift", "iOS", "Education", "Student Tools", "Mobile App"],
  featured: false,
  previewComponent: SmartAndoverApp,
  previewHeight: "600px",
  fullDescription: `Smart Andover App is an iOS application developed in a few months starting September 2021.
It was designed to give students quick access to tools, schedules, and school resources in a streamlined mobile interface.`,
  challenges: [
    "Building a complete student utility app under a tight timeline",
    "Designing a simple, intuitive UI for quick daily use",
    "Debugging and testing across many iPhone device sizes"
  ],
  learnings: [
    "Iterative app development and fast prototyping",
    "Working with real user needs for educational apps",
    "Deploying and testing on physical devices"
  ],
},

{
  id: 7,
  slug: "matching-coco",
  title: "Matching Coco",
  description: "My first iOS app ever — a matching game featuring my cousin’s dog Coco.",
  image: "/matching-coco/screenshot.png",
  dateCreated: "2017-06",
  codeUrl: "https://github.com/cabouezzi/Matching-Coco",
  productUrl: null,
  tags: ["Swift", "iOS", "Game", "Matching Game", "Personal Project"],
  featured: false,
  previewComponent: MatchingCoco,
  previewHeight: "600px",
  fullDescription: `Matching Coco was the very first iOS app I ever built, created in Summer 2017.
It follows a basic card-matching tutorial from Code With Chris, which I modified by replacing the images with photos of my cousin’s dog, Coco.
Although many beginner apps followed, this one stayed — and it predates my use of Git, which is why only a few early apps survive today.`,
  challenges: [
    "Learning iOS development completely from scratch",
    "Replacing tutorial assets with custom images of Coco",
    "Building an app before knowing about version control"
  ],
  learnings: [
    "Basic Swift and UIKit development",
    "State management and basic game logic",
    "Understanding project structure and eventually the value of Git"
  ],
}
];

export default projectsData;
