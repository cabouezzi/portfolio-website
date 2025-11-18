// Central location for all project data
// To add a new project, simply add a new object to this array
import ChessBoard from "../projects/ChessBoard";
import InteractiveWeather from "../projects/InteractiveWeather";
import Lira from "../projects/Lira";
import BeeKeeper from "../projects/BeeKeeper";
import Boids from "../projects/Boids";
import SmartAndoverApp from "../projects/SmartAndoverApp";
import MatchingCoco from "../projects/MatchingCoco";
import GPTViewer from "../projects/GPTViewer";

export const projectsData = [
  // Chess AI Project
  {
    slug: "chess-ai", // URL-friendly identifier for routing
    title: "Chess AI",
    description:
      "An intelligent chess engine with minimax algorithm and alpha-beta pruning. Features include move validation, checkmate detection, and adjustable difficulty levels.",
    image: "/chess/chess-screenshot.png", // Place your image in the public folder
    dateCreated: "2022-08",
    codeUrl: "https://github.com/cabouezzi/Chess-AI", // Add your GitHub repository URL
    productUrl: null,
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
      - Clean command-line interface for gameplay`,
  },
  // Interactive Weather Visualization Project
  {
    slug: "interactive-weather",
    title: "Interactive Weather",
    description:
      "A 3D visualization of global wind and temperature patterns using aggregated NOAA data, built in Unity with custom shaders.",
    image: "/weather/example.png",
    dateCreated: "2022-02",
    codeUrl: "https://github.com/cabouezzi/Interactive-Weather",
    productUrl: null,
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
    fullDescription: `Interactive Weather is a 3D visualization that depicts global wind and temperature patterns using NOAA atmospheric data aggregated from 2022. The project processes and averages the dataset into a single vector field representing global air movement and temperature distribution.

![Weather Visualization Example](/weather/example.png)

Built with Unity and ShaderLab, the visualization displays a rotating Earth with animated wind vectors and color-mapped temperature gradients, creating a scientific yet visually engaging representation of global climate behavior.

Key features include:
- 3D globe rendering with temperature coloration and wind vectors
- Data aggregated from NOAA's 2022 global atmospheric datasets
- Smooth shader-based animation of directional wind flows
- Emphasis on clarity, performance, and educational visualization`,
  },
  {
    slug: "lira-wasm-editor",
    title: "Lira Playground (WASM)",
    description:
      "A browser-based IDE for the Lira language using .NET WASM and React.",
    image: "/lira-editor-screenshot.png", // Optional: screenshot of the editor
    dateCreated: "2023-08",
    codeUrl: "https://github.com/cabouezzi/lira",
    productUrl: null,
    tags: [
      "C#",
      "Interpreters",
      "Abstract Syntax Tree",
      "Programming Languages",
      "Formal Language Syntax",
    ],
    featured: true,
    previewComponent: Lira,
    previewHeight: "600px",
    fullDescription: `Lira WASM Live Editor is an in-browser interactive environment for the Lira programming language. 
It leverages .NET WebAssembly for runtime execution, redirects output to a custom React console, and allows live coding without server dependencies.`,
  },
  {
    slug: "beekeeper",
    title: "BeeKeeper",
    description: "A beekeeping simulator iOS game, with a twist.",
    image: "/beekeeper/screenshot.png",
    dateCreated: "2018-01",
    codeUrl: "https://github.com/cabouezzi/BeeKeeper",
    productUrl:
      "https://apps.apple.com/us/app/beekeeper-apiary-game/id6747629982",
    tags: [
      "Swift",
      "Game Development",
      "Boids",
      "Software Design",
      "Blender",
      "Firebase",
      "Crashlytics",
      "iOS",
      "macOS",
      "SwiftUI",
      "UIKit",
      "SceneKit",
      "SpriteKit",
    ],
    featured: false,
    previewComponent: BeeKeeper,
    fullDescription: `Beekeeper is an iOS game and simulator that lets users manage a virtual apiary. Players can hatch new bees, genetically modify them, manage their role, and grow the apiary. This is my largest personal project, largely due to having worked on it, and was released partly as proof of how much I've learned from it, but mostly because Apple would not have let me release it after beginning my job 🤣. 
    
![Evolution Graph](/beekeeper/graph.png)
_Evolution view, showing bee upgrade paths that unlock both cosmetic and functional traits._
    
The app began as a hobby project, with no intention of release, and served more as a playground for implementing new topics of computer science, physics, and digital art. For example, any new Swift language feature I came across, I'd find a use case in the project simply for the sake of experimenting with the feature. Moreover, the game was an excuse for implementing some 3D modeling techniques while I learned how to use Blender: All 3D assets in the game were built from scratch by me, purposefully designed for a playful/vibrant style. (Some 2D assets were also built by me, but AI-generated symbols and icons were used to greatly accelerate art production.)

![3D Models](/beekeeper/models.png)
    
The project also includes many complex systems, including:
- Game ticker infrastructure that simulates production and event likelihoods
- Boids simulation algorithm for bee movement
- Topological graph verification for evolution paths
- Local data handling (Firebase used in the past and considering for the future)
- Various design patterns (MVC, MVVM, Singleton, Factory, Observer, Visitor, etc.)
    `,
  },

  {
    slug: "boids-ios",
    title: "Boids",
    description:
      "iOS/macOS simulation of flocking behavior using the classic Boids algorithm.",
    image: "/boids/screenshot.png",
    dateCreated: "2020-01",
    codeUrl: "https://github.com/cabouezzi/Boids",
    productUrl: null,
    tags: ["Swift", "iOS", "macOS", "Algorithms", "Simulation", "Graphics"],
    featured: false,
    previewComponent: Boids,
    fullDescription: `Boids is an iOS/macOS app implementing the Boids flocking algorithm to simulate bird-like swarm behavior.
It was built around 2020 as a spin-off from the work on BeeKeeper, inspired by building visual, agent-based simulations. Inspired by **[Sebastian Lague's video](https://www.youtube.com/watch?v=bqtqltqcQhw&pp=ygUVYm9pZHMgc2ViYXN0aWFuIGxhZ3Vl)**.`,
  },

  {
    slug: "smart-andover-app",
    title: "Smart Andover App",
    description:
      "iOS student utility app built over a few months starting in September 2021.",
    image: "/smart-andover-app/screenshot.png",
    dateCreated: "2021-09",
    codeUrl: "https://github.com/cabouezzi/Smart-Andover-App",
    productUrl: null,
    tags: ["SwiftUI", "Firebase", "iOS", "Swift"],
    featured: false,
    previewComponent: SmartAndoverApp,
    fullDescription: `Smart Andover App is an iOS application developed in a few months starting September 2021 for SmartAndover, a club at Phillips Academy Andover. It was one of three major projects of the club, aiming to gamify sustainable actions by awarding students with points for competition as well as redemption for on-campus purchases (gift store, dining, etc.). 
    
It works as follows:
1. Students must first log in or sign up using their school email.
2. Students may then submit photos as proof of a sustainable action. Images are compressed for storage efficiency.
3. SmartAndover board members are given access to an admin panel where they may accept/reject and give feedback to submissions
4. Accepted submissions award points to the student, which may be redeemed for on-campus purchases.
    
The app uses Firebase for backend data storage and authentication.`,
  },

  {
    slug: "matching-coco",
    title: "Matching Coco",
    description:
      "My first iOS app ever — a matching game featuring my cousin's dog Coco.",
    image: "/matching-coco/screenshot.png",
    dateCreated: "2017-06",
    codeUrl: "https://github.com/cabouezzi/Matching-Coco",
    productUrl: null,
    tags: ["Swift", "iOS", "Game", "Matching Game", "Personal Project"],
    featured: false,
    previewComponent: MatchingCoco,
    fullDescription: `Matching Coco was the very first iOS app I ever built, created in Summer 2017.
It follows a basic card-matching tutorial from Code With Chris, which I modified by replacing the images with photos of my cousin's dog, Coco.
Many beginner apps followed, but are now lost as I was unaware of git at the time. This one stayed, however, because I knew I would want to keep my first ever app.`,
  },
  {
    slug: "gpt",
    title: "Infinite Shakespeare Script Generator",
    description:
      "A GPT2 model cursed to forever generate Shakespeare scripts...",
    image: "/gpt/screenshot.png",
    dateCreated: "2025-01",
    codeUrl: "https://github.com/cabouezzi/gptscratch",
    productUrl: null,
    tags: ["PyTorch", "LLM", "Transformer", "Python", "NLP", "FastAPI"],
    featured: false,
    previewComponent: GPTViewer,
    fullDescription: `This project is a fully custom GPT-style model server built in Python using PyTorch and hosted with FastAPI. It streams generated tokens in real time with frontend controls to play, pause, and reset token generation live. It was trained on the aggregation of all of Shakespeare's works.
  
  This project is a character-level GPT transformer with 6 transformer layers, each with 6 attention heads, an embedding dimension of 384, and a context window (block size) of 256 characters. It supports streaming output for interactive demos and demonstrates hands-on experience with transformer architectures, attention mechanisms, and sequence modeling.

The associated React component displays the stream inside a styled scroll view, automatically wrapping text, auto-scrolling, and retaining only the most recent 50 lines. This setup allows lightweight experimentation with model inference loops, custom kernels, and streaming UX patterns similar to modern AI chat interfaces.`,
  },
];

export default projectsData;
