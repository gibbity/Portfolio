# CampusTrace: Crowdsourced Issue Resolution at VIT Vellore

## The Hook
When a broken streetlight or a blocked pathway goes unreported on a massive campus like VIT Vellore, the friction compounds daily. Students complain locally, but administration lacks visibility into the aggregate data to fix systemic problems. CampusTrace was built to bridge this gap by allowing students to drop location-based pins for immediate issues, while using AI to synthesize hundreds of individual complaints into actionable administrative hotspots.

## Context
**Role:** Full-stack Developer / Designer
**Timeline:** Solo build
**Stack:** React, Vite, Tailwind CSS, MapLibre GL, Supabase, Google Gemini 3.1 Flash Lite

## The Real Problem
The underlying issue wasn't that students didn't care about reporting problems; it was that standard reporting forms felt like screaming into a void. To get students to engage, the reporting mechanism needed to be as frictionless as dropping a pin on a map. For administration, the problem was the opposite: sorting through a hundred individual reports of "broken light" is overwhelming. They needed a way to see the systemic failure, not just the symptoms.

## Key Decisions
- **Neo-brutalist "Toon" Aesthetic:** Chose a minimal, high-contrast visual style (thick borders, offset shadows, pastel accents) over a standard corporate dashboard. *Why:* It makes the platform feel approachable and less intimidating for students, encouraging faster reporting.
- **Client-Side Clustering with MapLibre:** Handled the heavy lifting of map rendering and pin clustering directly on the client. *Why:* Allowed for a snappy, interactive map experience without constantly querying the database for every pan and zoom, reducing backend load on Supabase.
- **LLM-Driven Synthesis over Simple Aggregation:** Used Gemini 3.1 Flash Lite to process raw reports into thematic "Hotspots" instead of just grouping pins by radius. *Why:* A simple radius cluster can't tell the difference between a broken pipe and a security concern occurring in the same 50-meter area. The LLM extracts the actual friction from the text and groups logically.

## What Didn't Work First
- **Tech-Heavy Landing Page:** The first iteration of the landing page relied heavily on standard SaaS marketing tropes (gradients, complex feature grids). It felt completely disconnected from the minimal, playful aesthetic of the actual web app. I had to scrap the design and rewrite it to match the app's neo-brutalist style, which immediately made the brand feel cohesive.
- **Narrow AI Scoping:** Initially, the AI analysis was strictly prompted to act as a "Mobility Design" analyst, looking only for transportation and mobility friction. This resulted in the AI ignoring critical infrastructure or maintenance reports that didn't fit the mobility constraint. I had to pivot the prompt to a general "Campus Problem" analyst to ensure all systemic issues were captured.
- **Vercel Build Limits:** During deployment, the application hit Vercel's chunk size limits due to heavy dependencies like MapLibre and Supabase. I had to introduce route-level lazy loading with React `Suspense` and configure manual chunking in Vite to split vendor libraries, stabilizing the build process.

## Outcome
The platform successfully provides a dual experience: a highly tactile, frictionless reporting interface for students, and an AI-synthesized dashboard for administrators that groups individual noise into actionable maintenance targets. During the initial data run, the platform captured 33 individual friction reports—ranging from broken lighting to unsafe pedestrian crossings. The AI engine successfully synthesized these into 25 discrete administrative hotspots, proving its ability to identify complex, overlapping systemic issues (like shared tunnel congestion) that simple radius clustering would have missed.

## What I'd Reconsider
If I were to build this again, I would reconsider relying entirely on the LLM for spatial bounding. Currently, the AI groups the reports, and the app calculates a rough radius based on the grouped coordinates. This works for simple clusters but fails to accurately represent linear issues (like a long stretch of unlit pathway). A more robust geospatial clustering algorithm (like DBSCAN) applied *before* feeding the clusters to the LLM might yield more accurate physical boundaries.
