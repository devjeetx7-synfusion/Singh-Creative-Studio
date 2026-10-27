export type ProjectCategory = 'Graphic Design' | '3D Animation' | 'Motion Graphics' | 'Brand Identity'
export type Project = {
  id: string; title: string; category: ProjectCategory; number: string; description: string; visual: string; label: string; process: string
}

// These are original portfolio concept studies, not commissioned or client work.
export const projects: Project[] = [
  { id: 'form-study-01', title: 'Form Study No. 01', category: '3D Animation', number: '01', description: 'A study in balance, reflection and quiet movement. Polished metal forms meet an atmospheric field of light.', visual: 'orb', label: '3D / CONCEPT STUDY', process: 'An exploration of material, silhouette and light, designed as a still-frame concept for a future motion piece.' },
  { id: 'afterimage', title: 'Afterimage', category: 'Graphic Design', number: '02', description: 'A typographic experiment about the persistence of a fleeting thought.', visual: 'type', label: 'TYPE / CONCEPT STUDY', process: 'Expressive letterforms, paper-like grain and a limited palette bring an abstract idea into focus.' },
  { id: 'soft-geometry', title: 'Soft Geometry', category: 'Brand Identity', number: '03', description: 'A visual identity direction exploring the tension between precision and softness.', visual: 'geo', label: 'IDENTITY / CONCEPT STUDY', process: 'A flexible graphic language built from repeating forms, considered spacing and restrained colour.' },
  { id: 'light-matter', title: 'Light / Matter', category: 'Motion Graphics', number: '04', description: 'An imagined motion-design frame where light behaves like a sculptural material.', visual: 'light', label: 'MOTION / CONCEPT STUDY', process: 'A frame-by-frame visual study in contrast, luminous colour and dimensional composition.' },
  { id: 'object-05', title: 'Object in Orbit', category: '3D Animation', number: '05', description: 'A sculptural object suspended between industrial design and the impossible.', visual: 'orbit', label: '3D / CONCEPT STUDY', process: 'The object is staged as an exploratory CGI composition. This is a still concept image, not a video.' },
  { id: 'signal-form', title: 'Signal / Form', category: 'Graphic Design', number: '06', description: 'An editorial poster concept built around rhythm, signal and an unapologetic focal point.', visual: 'poster', label: 'POSTER / CONCEPT STUDY', process: 'Large-scale type and a vivid form create visual impact across a deliberately minimal layout.' },
]
