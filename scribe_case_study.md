# Case Study: Scribe (Personal Knowledge Graph)

## The Problem
Product managers and strategists often struggle to reconcile complex product roadmaps across numerous user interviews, technical constraints, and evolving design requirements. Traditional, linear documentation platforms (like Notion or Google Docs) inherently obscure these interdependencies. While you can interlink pages, the vital connections remain hidden, making it nearly impossible to track how a feature in a subsequent phase might violate constraints established earlier. I needed a solution to visually map complex logic and dependencies without devolving into an unreadable "hairball."

## Origin: The Product Evolution
Before Scribe became a focused spatial mapping tool for product strategy, it underwent three distinct MVP iterations—each revealing fundamental usability challenges and shaping the final architecture.

### MVP 1: AI Connection Map Generator
![MVP 1 Network Graphs](/projects/scribe/origin/mvp1-1.webp)
- **Concept**: Input raw notes and let AI generate a force-directed graph based on word associations and simple relationship logic.
- **User Feedback**: *"What do I use it for?"*, *"How do I read all this?"*, *"Okay... (confusion personifies)"*
- **Takeaway**: The graph looked visually intriguing, but without structural constraints, it created a chaotic "detective game" for users with high cognitive load.

### MVP 2: Qualitative Storytelling & Journey Maps
![MVP 2 Storytelling Canvas](/projects/scribe/origin/mvp2-1.webp)
- **Concept**: Applied the graph model to qualitative storytelling—mapping user interview transcripts and narrative arcs into visual clusters ("Story of the Little Match Girl").
- **User Feedback**: *"I am putting in more effort"*, *"What are you using it for?"*
- **Takeaway**: Better structure, but still lacked a clear, indispensable daily workflow. Visual gimmicks obscured value.

### MVP 3: Multi-Data Connection Analyzer for Decision Makers
![MVP 3 Analytical Clusters](/projects/scribe/origin/mvp3-1.webp)
- **Concept**: Shifted target users from creative writers to product managers and decision-makers, synthesizing complex 50+ page research papers into linked analytical node clusters.
- **Interview Feedback**:
  - **UX Professor**: *"Looks useful, but you need to find a better specific use case."*
  - **IBM Product Manager**: *"I'll use it if it saves time, but I'd rather use standard AI chats right now."*
  - **Automobile Designer**: *"I don't want to read all that. It didn't help me extract quick insights."*
- **The Pivot to Scribe**: Scrapped unstructured force-directed graphs entirely and replaced them with fixed hierarchical columns (Pillars → Clusters → Leaves) tailored specifically for strategic roadmap stress-testing.

## Context
Scribe is a local-first, visual note-taking environment engineered specifically to untangle this complexity. Developed as an independent project, the technology stack was chosen to facilitate rapid iteration and robust functionality without relying on heavy backend infrastructure. Key technologies include Next.js, Tailwind CSS, D3.js, and local IndexedDB storage.

![Scribe Interface Overview](/projects/scribe/scribe-after-context.webp)

## Key Decisions

**1. Structured Hierarchical Columns vs. Free-Form Graphs**
Most graph-based note-taking tools default to force-directed layouts. While visually impressive, they quickly become unnavigable "hairballs" at scale.
*Decision*: I constrained the D3.js physics engine, forcing nodes to snap into fixed, 300px columns dictated by their ontological hierarchy (Pillars -> Clusters -> Leaves).
*Trade-off*: Users trade the freedom of an infinite, unstructured canvas for guaranteed structural legibility, ensuring the graph remains organized and readable even with hundreds of interconnected nodes.

**2. Client-Side Storage vs. Cloud Infrastructure**
*Decision*: Scribe persists all data entirely within the browser using IndexedDB.
*Trade-off*: This approach sacrifices seamless, out-of-the-box multi-device synchronization. However, it bypassed complex authentication flows, drastically accelerated the shipping timeline, and—most crucially—guarantees 100% data privacy for users managing highly sensitive strategic information.

**3. Bring-Your-Own-Key (BYOK) for AI Integration**
*Decision*: Rather than imposing a subscription model for AI usage, users are required to supply their own OpenAI or Claude API keys, or connect to a locally hosted Ollama instance.
*Trade-off*: This introduces slight friction during onboarding. Conversely, it ensures the application remains entirely free to host and provides absolute assurance that user data is never intercepted or scraped by middleman servers.

![System Iteration Overview](/projects/scribe/before-what-didnt-work.webp)

## What Didn't Work First
My initial iteration of the "Oracle" view employed a standard physics simulation where notes dynamically repelled one another. This created significant usability issues; when users attempted to drag and group notes, the continuous physics simulation fought back, resulting in a constantly shifting, jittery canvas that broke concentration.

I resolved this by removing the continuous simulation. In its place, I engineered a custom collision-detection script that exclusively calculates physics during active node-drop events, rigidly snapping elements to a strict 40px grid.

## What I'd Reconsider
Currently, the application overlays DOM elements on top of the D3 canvas to render individual notes. While this performs adequately for ~200 nodes, dense graphs introduce noticeable lag during drag animations. If architecting the canvas layer today, I would transition entirely to WebGL or the Canvas API to guarantee a rigid 60fps performance at scale, regardless of node density.

## Reflection
Engineering a tool that fundamentally challenges established writing paradigms reinforced a crucial product lesson: "Ease of Use" shouldn't universally eclipse structural utility. Scribe intentionally presents a steeper learning curve than a blank text document. However, when mapping out deeply complex strategic architectures, that friction acts as a necessary forcing function for better, clearer thinking.
