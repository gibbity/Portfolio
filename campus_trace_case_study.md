# Campus Trace: A Live Map to Report Broken Things on Campus

## The Origin Story (Mobility Design Studio)
During a Mobility Design studio at VIT Vellore, our brief was straightforward: identify pedestrian and transit friction across campus to propose a new mobility solution. Like any standard design project, we began with traditional user research—conducting structured 1-on-1 student interviews and shadowing classmates on their daily walks.

Very quickly, it became obvious that something fundamental was missing from that methodology:
1. **Recall Bias in Interviews:** When sitting comfortably in a design studio, students forget about the cracked pavement slab, the unlit stairwell, or the waterlogged ramp they skirted around two days earlier. Friction is felt acutely in the moment, but fades from memory within minutes of reaching your destination.
2. **Scale Limits of Shadowing:** Shadowing gave rich empathy for two specific student commutes, but zero visibility into emergent systemic bottlenecks. On a massive 350-acre campus with 10-minute passing bells, bottlenecks form dynamically across dozens of corridors simultaneously. A single researcher with a notepad cannot observe an entire campus.

**The Realization:** Research had to be situated, continuous, and spatial. Instead of asking students to recall problems after the fact, what if we gave them a tool to drop a pin the exact second they encountered a physical barrier? That gap in design methodology is what sparked CampusTrace.

---

## Context & Scope
- **Role:** Product Designer & Full-Stack Developer (Solo)
- **Pilot Scope:** 48-Hour Controlled Run · Engineering Academic Quad · ~40 Student Testers
- **Stack:** React 18, MapLibre GL, Supabase, Google Gemini 3.1 Flash Lite, Tailwind CSS

---

## The Core Tension
Standard university portals require students to navigate deep classification trees (e.g., `Facilities > Exterior > Electrical > Fixture ID`) before reporting an issue. In hallway testing with 6 students on the existing portal, 5 abandoned the form midway. To capture friction during 5-minute passing breaks, reporting had to drop to seconds: tap the map, drag to verify, and type one sentence.

For administration, the problem was the inverse: receiving 100 isolated points of "broken light" produces triage fatigue. Naive geometric radius clustering groups unrelated issues (e.g., an exposed wire and an overflowing bin within 20 meters) into meaningless circular blobs. Coordinators needed semantic grouping: identifying which complaints reflect the same underlying structural failure and which require urgent dispatch.

---

## Key Decisions
1. **Two-Step Drag-and-Confirm Pinning & Neo-Brutalist Visuals:** Replaced instant-tap submissions with a two-step gesture: dropping a provisional marker, dragging fluidly to calibrate exact spatial placement, and tapping to confirm with a single optional description. Paired with high-contrast tactile styling to make the interface feel approachable on mobile.
   - *Rationale & Evidence:* In hallway testing with 6 students, average completion dropped from ~90 seconds on the university's 8-field form to under 15 seconds on CampusTrace, with zero misplaced submissions from errant finger taps.
   - *Trade-off:* The two-step confirmation adds an intentional extra click, and custom styling required custom SVG offsets and heavier CSS classes.
2. **Client-Side Vector Cartography via MapLibre GL:** Stripped complex commercial map tiles down to a custom high-contrast monochrome canvas (white pedestrian ways, muted building outlines, zero commercial clutter) rendered entirely in client-side WebGL.
   - *Rationale:* Handled pin clustering and viewport transformations on the client GPU, ensuring buttery 60fps exploration without querying Supabase on every pan or zoom during campus rush hours.
   - *Trade-off:* Offloading geometry calculations to the client increased the initial JavaScript bundle and raised GPU memory consumption on budget student Android devices.
3. **Organic Enclosures via 2D Convex Hull:** Implemented a 2D Graham Scan Convex Hull algorithm to wrap clustered reports in organic bounding polygons matching actual campus pathways.
   - *Rationale:* University infrastructure is linear and irregular—covered corridors, paved ramps, and courtyards follow physical architectural contours. Circular buffers spill into adjacent lawns; organic hulls show coordinators the true spatial footprint of the issue.
   - *Trade-off:* Requires at least 3 spatial points to calculate an organic polygon; fallback geometry (circles for 1 report, line capsules for 2 reports) still had to be maintained for sparse data.
4. **Auditable AI (The Ground-Truth Verification Layer):** Designed an administrative verification bridge where AI-synthesized hotspots are never treated as unassailable facts. Every synthesized hotspot card displays the exact underlying report count and direct backlinks to raw student submissions.
   - *Rationale:* Facilities coordinators cannot dispatch maintenance crews on generative prose alone. If the LLM groups reports inaccurately or hallucinates an urgent hazard, the coordinator must have the tools to audit raw student text, adjust boundaries, merge clusters, or dismiss erroneous reports before signing off on work orders.
   - *Trade-off:* Human-in-the-loop verification introduces review friction—coordinators must actively validate synthesis before action—and LLM inference introduces a 2–3 second latency when generating synthesized hotspots.

---

## Admin Experience & Visual Duality
The product required two completely different design languages for its two user groups:
- **Student Experience (Tactile Neo-Brutalism):** Uses soft pastel category chips, thick offset borders, and friendly microcopy. Students are reporting between classes; any hint of a corporate form creates friction. The aesthetic lowers perceived stakes and invites quick participation.
- **Administrative Cockpit (High-Density Monospace Dashboard):** Shifted to a disciplined dark-mode operations console with monospace coordinate tags, severity rank badges, and structured audit tables. Coordinators manage physical labor, budget allocation, and safety liabilities; a playful aesthetic here would undermine credibility and slow down rapid data scanning.

---

## What Didn't Work: Design Failures & Pivots
1. **The Cascading Dropdown Trap (Reporting Flow):** Initial prototypes forced students to pick Category > Subcategory > Urgency before unlocking the map pin. Testers frequently miscategorized ambiguous issues (e.g., is a broken curb "Pavement" or "Accessibility"?) and dropped off. I eliminated the upfront form entirely, cutting the flow down to a single map-drop and letting backend AI extract categories from freeform text.
2. **The "Global Confetti" Overload (Information Architecture):** The first build rendered all active campus pins immediately upon loading. With even 20 pins, the central pedestrian walkway turned into visual confetti; students couldn't distinguish their own pending submissions from existing issues. I inverted the default state to a clean personal view showing only the user's reports, adding an explicit "Global View" toggle.
3. **The Flat Admin Map (Triage Hierarchy):** The initial coordinator interface was an unfiltered map with colored dots. Facilities coordinators found it unusable because it lacked a clear starting point—they had to click individual pins across campus to guess severity. I redesigned the admin experience into a split cockpit: prioritized list of clusters on the left, synchronized spatial hull focus on the right.

---

## Outcome & Honest Reflections
During the 48-hour pilot, the app captured 33 individual friction reports, which Gemini synthesized into 25 hotspots. Here is the candid reality of what the data revealed:
- **Too Sparse for Heavy Compression:** 33 reports becoming 25 hotspots means the AI achieved near 1:1 grouping (~1.3:1 ratio). In a small 48-hour pilot distributed across a 400m quad, issues were largely isolated. The AI accurately merged directly overlapping reports (e.g., broken path lighting at the pedestrian underpass), but high data density is a prerequisite for clustering to provide transformative value.
- **Artificial Output Quotas:** To prevent Gemini from over-consolidating all campus issues into 2 or 3 generic buckets, the system prompt programmatically targeted 25 granular bottlenecks. While effective at forcing specificity, this artificial quota inflated the hotspot count when total report volume was low.
- **The Digital-to-SLA Disconnect:** While the pilot proved students would report issues when forms were eliminated, zero reports were officially actioned by university facilities during the trial. Campus maintenance operates on paper work orders and central registrar sign-offs; without direct SLA integration into their existing maintenance workflow, a digital dashboard remains an isolated silo.

---

## Deep UX & Product Reflections
1. **Mobile Viewport Gesture Collisions (Design Learning):** Testing on sub-6-inch mobile screens revealed severe gesture conflict: simultaneous overlays of floating telemetry cards, bottom issue sheets, and map controls caused user gestures to collide. Attempting to drag the map frequently dragged open the report bottom sheet instead. Spatial mobile experiences cannot stack persistent exploration and detailed inspection simultaneously; they require strict modal separation between map exploration and issue inspection.
2. **The Institution Is the Real Design Problem (Product Learning):** Building a responsive WebGL map and hooking up an LLM was the straightforward half of the challenge. The real design problem is organizational: university facilities teams do not sit in front of interactive web dashboards. In any future deployment, the highest-leverage design decision would not be a better map, but an automated dispatch bot that converts approved hotspots into WhatsApp or SMS work orders directly sent to on-duty ground maintenance crews.
