export interface NodeData {
  id: string;
  label: string;
  type?: 'root' | 'category' | 'project';
  image?: string;
  video?: string;
  lottie?: string;
  description?: string;
  url?: string;
  children?: NodeData[];
  // New visual properties for geometric schematic style
  shape?: 'hexagon' | 'square' | 'triangle' | 'circle' | 'asterisk' | 'pentagon' | 'diamond' | 'circle-outline';
  innerContent?: string | 'dot';
  lineStyle?: 'solid' | 'dashed';
  pathStyle?: 'straight' | 'elbow' | 'fanned';
  subtitle?: string;
  category_type?: string;
  color?: string;
}

export const portfolioData: NodeData = {
  id: 'root',
  label: 'Shresth Kushwaha',
  type: 'root',
  shape: 'asterisk',
  children: [
    {
      id: 'about',
      label: 'About',
      type: 'category',
      shape: 'square',
      innerContent: 'dot',
      lineStyle: 'dashed',
      description: 'Product Designer specializing in high-fidelity interaction design and spatial user interfaces.',
      children: [
        { id: 'about-intro', label: 'Intro', type: 'category', shape: 'square', innerContent: 'dot', description: 'Deeply focused on the intersection of human cognitive patterns and interactive machines. Currently based in VIT, pursuing Industrial Design with a focus on UX and Generative UI workflows.' },
        { id: 'about-skills', label: 'Skills', type: 'category', shape: 'square', innerContent: 'dot', description: 'Core technical stack: React, TypeScript, Next.js, D3.js, Framer Motion, Three.js, and specialized AI-integrated design systems. Proficient in strategic intelligence spatialization.' },
        { id: 'about-work', label: 'Work history', type: 'category', shape: 'square', innerContent: 'dot', description: 'Experience in building non-linear strategic intelligence platforms (Scribe) and forensic geospatial systems (Campus Trace).' },
        { id: 'about-panel', label: '', type: 'project', shape: 'square' } 
      ]
    },
    {
      id: 'projects',
      label: 'Projects',
      type: 'category',
      shape: 'hexagon',
      innerContent: 'dot',
      pathStyle: 'elbow',
      children: [
        {
          id: 'scribe',
          label: 'Scribe',
          type: 'project',
          shape: 'hexagon',
          innerContent: '1',
          image: '/projects/scribe/Scribe- home- dark.png',
          video: '/projects/scribe/preview.mp4',
          url: '/projects/scribe',
          description: 'Non-linear strategic intelligence platform for dissolving context-collapse through hierarchical spatialization.'
        },
        {
          id: 'campus-trace',
          label: 'Campus Trace',
          type: 'project',
          shape: 'hexagon',
          innerContent: '2',
          image: '/projects/campus-trace/hero.png',
          video: '/projects/campus-trace/preview.mp4',
          url: '/projects/campus-trace',
          description: 'Forensic geospatial provenance system for real-time incident archival and thematic cluster analysis.'
        },
        {
          id: 'open-design-studio',
          label: 'Open Design Studio',
          type: 'project',
          shape: 'hexagon',
          innerContent: '3',
          image: '/projects/open-design-studio/hero.png',
          video: '/projects/open-design-studio/open-component-main-video-3x4.mp4',
          url: '/projects/open-design-studio',
          description: 'Web-native, local-first AI prototyping environment for enterprise design privacy and speed.'
        }
      ]
    },
    {
      id: 'contact',
      label: 'Contact',
      type: 'category',
      shape: 'circle',
      innerContent: 'dot',
      children: [
        { id: 'contact-mail', label: 'kshresth2151@gmail.com', type: 'category', shape: 'circle', url: 'mailto:kshresth2151@gmail.com' },
        { id: 'contact-phone', label: '6290168861', type: 'category', shape: 'circle', url: 'tel:6290168861' },
        { id: 'contact-linkedin', label: 'LinkedIn', type: 'category', shape: 'circle', url: 'https://linkedin.com/in/shresth-kushwaha-b67660277' },
        { id: 'contact-github', label: 'GitHub', type: 'category', shape: 'circle', url: 'https://github.com/shresthkushwaha' },
      ]
    },
    {
      id: 'cv',
      label: 'Resume',
      type: 'category',
      shape: 'triangle',
      innerContent: 'dot',
      lineStyle: 'dashed',
      children: [
        {
          id: 'cv-panel',
          label: '',
          type: 'project',
          shape: 'triangle',
          image: '/resume-preview.jpg',
          url: 'https://drive.google.com/file/d/1M-Vv8jiUz4WKqM2yksYqWPbD6Lb_2Br4/view?usp=sharing',
          description: 'High-fidelity product design resume highlighting specialized work in UX and AI instrumentation.'
        }
      ]
    },
    { 
      id: 'designer', 
      label: 'Product designer', 
      type: 'category', 
      shape: 'pentagon',
      innerContent: 'dot',
      children: [
        { id: 'st-vit', label: 'VIT (Industrial Design)', type: 'category', shape: 'circle', innerContent: 'dot', category_type: 'edu' },
        { id: 'st-grad', label: 'Class of 2027', type: 'category', shape: 'circle', innerContent: 'dot', category_type: 'edu' },
        { id: 'st-ux', label: 'UX Research', type: 'category', shape: 'triangle', category_type: 'skill' },
        { id: 'st-ds', label: 'Design Systems', type: 'category', shape: 'triangle', category_type: 'skill' },
        { id: 'st-motion', label: 'Interaction & Motion', type: 'category', shape: 'triangle', category_type: 'skill' },
        { id: 'st-genai', label: 'Generative UI', type: 'category', shape: 'triangle', category_type: 'skill' },
        { id: 'st-workflow', label: 'AI Workflows', type: 'category', shape: 'triangle', category_type: 'skill' },
        { id: 'st-unifyd', label: 'Unifyd BI', type: 'category', shape: 'square', category_type: 'work' },
        { id: 'st-simplicity', label: 'Simplifying Complexity', type: 'category', shape: 'hexagon', category_type: 'style' },
        { id: 'st-bridge', label: 'Bridging Tech & UI', type: 'category', shape: 'hexagon', category_type: 'style' }
      ] 
    }
  ]
};
