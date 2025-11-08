// Central location for all project data
// To add a new project, simply add a new object to this array

const projectsData = [
  {
    id: 1,
    slug: "chess-ai", // URL-friendly identifier for routing
    title: "Chess AI",
    description: "An intelligent chess engine with minimax algorithm and alpha-beta pruning. Features include move validation, checkmate detection, and adjustable difficulty levels.",
    image: "/chess-screenshot.png", // Place your image in the public folder
    dateCreated: "2022-08",
    liveUrl: "", // Add your live demo URL
    codeUrl: "", // Add your GitHub repository URL
    tags: ["Python", "AI", "Minimax Algorithm", "Game Development", "Data Structures"],
    featured: true,
    // Preview component configuration
    previewComponent: "ChessBoard", // Name of the component to render as preview
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
      "Balancing AI difficulty to make it challenging but not impossible"
    ],
    learnings: [
      "Deep understanding of game tree algorithms",
      "Importance of optimization in AI/ML applications",
      "Chess strategy and position evaluation techniques"
    ]
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
