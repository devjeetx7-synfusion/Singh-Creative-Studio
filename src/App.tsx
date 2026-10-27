import { useEffect, useRef, useState, type FormEvent } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, AudioLines, Menu, MoveUpRight, X } from 'lucide-react'
import { projects, type Project } from './data/projects'
import { studioConfig } from './config'

gsap.registerPlugin(ScrollTrigger)
const filters = ['All Projects', 'Graphic Design', '3D Animation', 'Motion Graphics', 'Brand Identity'] as const

function ThreeArtwork({ mode = 'hero' }: { mode?: 'hero' | 'portal' }) {
  const mount = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const host = mount.current
    if (!host) return
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { setActive(true); observer.disconnect() } }, { rootMargin: '300px' })
    observer.observe(host)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!active) return
    const host = mount.current
    if (!host) return
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: window.innerWidth > 700, powerPreference: 'low-power' })
    } catch { host.classList.add('webgl-fallback'); return }
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, .1, 100)
    camera.position.set(0, 0, mode === 'portal' ? 8 : 7.5)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.35 : 1.8))
    renderer.setSize(host.clientWidth, host.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25
    host.appendChild(renderer.domElement)
    const group = new THREE.Group(); scene.add(group)
    scene.add(new THREE.HemisphereLight(0xb8c3ff, 0x171018, 1.15))
    const key = new THREE.PointLight(0xf6f0ff, 90, 18); key.position.set(3, 3, 4); scene.add(key)
    const violet = new THREE.PointLight(0x7544ff, 65, 14); violet.position.set(-4, -1, 1); scene.add(violet)
    const warm = new THREE.PointLight(0xffcba7, 34, 12); warm.position.set(0, -4, 3); scene.add(warm)
    const material = new THREE.MeshPhysicalMaterial({ color: 0xbfc4d1, metalness: .92, roughness: .19, clearcoat: 1, clearcoatRoughness: .08 })
    if (mode === 'portal') {
      for (let i = 0; i < 5; i++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25 + i * .18, .025 + (4 - i) * .004, 10, 120), new THREE.MeshStandardMaterial({ color: i % 2 ? 0xafa5c2 : 0xe8e8f0, metalness: .86, roughness: .25, emissive: i === 2 ? 0x251044 : 0x000000, emissiveIntensity: .7 }))
        ring.position.z = -i * .25; ring.scale.set(1, 1.38, 1); group.add(ring)
      }
      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(.6, 2), material); core.position.z = -1; group.add(core)
    } else {
      const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.05, .28, 220, 24, 2, 3), material); group.add(knot)
      const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(.46, 2), new THREE.MeshPhysicalMaterial({ color: 0x77718e, metalness: .8, roughness: .25, wireframe: true, emissive: 0x11081f })); group.add(inner)
      for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8 + i * .18, .008, 6, 160), new THREE.MeshBasicMaterial({ color: i === 1 ? 0x9070df : 0xd6d4df, transparent: true, opacity: .45 - i * .09 }))
        ring.rotation.set(.8 + i * .46, .22 + i * .3, i * .45); group.add(ring)
      }
    }
    const count = window.innerWidth < 700 ? 450 : 1000
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) { positions[i * 3] = (Math.random() - .5) * 13; positions[i * 3 + 1] = (Math.random() - .5) * 9; positions[i * 3 + 2] = (Math.random() - .5) * 9 }
    const particleGeo = new THREE.BufferGeometry(); particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({ color: 0xc9c1df, size: .012, transparent: true, opacity: .7 })); scene.add(particles)
    const pointer = { x: 0, y: 0 }, target = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => { const r = host.getBoundingClientRect(); target.x = (e.clientX - r.left) / r.width - .5; target.y = (e.clientY - r.top) / r.height - .5 }
    host.addEventListener('pointermove', onMove)
    const resize = () => { if (!host.clientWidth) return; camera.aspect = host.clientWidth / host.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(host.clientWidth, host.clientHeight) }
    const observer = new ResizeObserver(resize); observer.observe(host)
    let frame = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animate = () => {
      if (!reduced) frame = requestAnimationFrame(animate)
      pointer.x += (target.x - pointer.x) * .035; pointer.y += (target.y - pointer.y) * .035
      if (!reduced) { group.rotation.y = pointer.x * .3 + Math.sin(performance.now() * .00019) * .12; group.rotation.x = -pointer.y * .22 + Math.sin(performance.now() * .00023) * .07; particles.rotation.y += .00012 }
      renderer.render(scene, camera)
    }
    animate()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); host.removeEventListener('pointermove', onMove); scene.traverse(o => { if (o instanceof THREE.Mesh || o instanceof THREE.Points) { o.geometry.dispose(); const m = o.material; Array.isArray(m) ? m.forEach(v => v.dispose()) : m.dispose() } }); renderer.dispose(); renderer.domElement.remove() }
  }, [mode, active])
  return <div className={`three-artwork ${mode}`} ref={mount} aria-hidden="true"><div className="fallback-orb" /></div>
}

function useReveal() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = gsap.utils.toArray<HTMLElement>('[data-reveal]')
    els.forEach(el => gsap.fromTo(el, { y: reduced ? 0 : 30, opacity: reduced ? 1 : 0 }, { y: 0, opacity: 1, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }))
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); gsap.killTweensOf(els) }
  }, [])
}

function ProjectArtwork({ project }: { project: Project }) {
  return <div className={`project-art art-${project.visual}`} aria-label={`${project.title} ${project.label}`} role="img">
    {project.visual === 'orb' && <div className="art-orb" />}
    {project.visual === 'type' && <><span className="art-type-word">AFTER<br/>IMAGE</span><i className="art-type-mark">///</i></>}
    {project.visual === 'geo' && <><div className="geo-ring"/><div className="geo-block"/><span className="geo-caption">FORM FOLLOWS FEELING</span></>}
    {project.visual === 'light' && <><div className="light-shape"/><span className="light-label">LIGHT / MATTER</span></>}
    {project.visual === 'orbit' && <><div className="orbit-shape"/><div className="orbit-line"/></>}
    {project.visual === 'poster' && <><span className="poster-signal">SIGNAL<br/>/ FORM</span><div className="poster-sun"/></>}
    <span className="art-label">{project.label}</span>
  </div>
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => { const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }; window.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'; return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' } }, [onClose])
  return <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}><article className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="icon-button modal-close" onClick={onClose} aria-label="Close project"><X/></button><div className="modal-art"><ProjectArtwork project={project}/></div><div className="modal-content"><div className="eyebrow">{project.category} <span>—</span> DEMONSTRATION CONCEPT</div><h2 id="modal-title">{project.title}</h2><p>{project.description}</p><div className="process-block"><span className="eyebrow">THE STUDY</span><p>{project.process}</p></div><button className="text-link" onClick={onClose}>BACK TO SELECTED WORK <ArrowRight size={16}/></button></div></article></div>
}

function AmbientSound() {
  const [on, setOn] = useState(false)
  const ctx = useRef<AudioContext | null>(null)
  const nodes = useRef<{ oscillators: OscillatorNode[]; gain: GainNode } | null>(null)
  const toggle = async () => {
    if (on) { if (nodes.current) { nodes.current.gain.gain.setTargetAtTime(0, ctx.current!.currentTime, .25); nodes.current.oscillators.forEach(o => setTimeout(() => { try { o.stop() } catch {} }, 900)); nodes.current = null } setOn(false); return }
    const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return
    ctx.current ??= new Ctx(); await ctx.current.resume()
    const gain = ctx.current.createGain(); gain.gain.value = .0001; gain.connect(ctx.current.destination); gain.gain.setTargetAtTime(.012, ctx.current.currentTime, 1.5)
    const oscillators = [55, 82.4].map((frequency, i) => { const o = ctx.current!.createOscillator(); o.type = i ? 'sine' : 'triangle'; o.frequency.value = frequency; o.connect(gain); o.start(); return o })
    nodes.current = { oscillators, gain }; setOn(true)
  }
  useEffect(() => () => { nodes.current?.oscillators.forEach(o => { try { o.stop() } catch {} }); void ctx.current?.close() }, [])
  return <button className={`sound-toggle ${on ? 'is-on' : ''}`} onClick={toggle} aria-label={on ? 'Mute ambient sound' : 'Enable ambient sound'} aria-pressed={on}><AudioLines size={14}/><span>{on ? 'SOUND ON' : 'SOUND OFF'}</span><i className="sound-state"/></button>
}

function ContactForm() {
  const [notice, setNotice] = useState('')
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setNotice('')
    const form = e.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const lines = [`Hello ${studioConfig.founder}, I'd like to start a project.`, '', `Name: ${data.get('name')}`, `Email: ${data.get('email')}`, `Project type: ${data.get('type')}`, `Budget range: ${data.get('budget')}`, '', `Project details: ${data.get('description')}`]
    if (!studioConfig.whatsappNumber) { setNotice('WhatsApp is not configured yet. Add your number in src/config.ts to enable enquiries. Your form details have not been sent.'); return }
    window.open(`https://wa.me/${studioConfig.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer')
    setNotice('Your enquiry is ready in WhatsApp. Review and send it there to complete your request.')
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-grid"><label>Your name<input required name="name" placeholder="How should we address you?" autoComplete="name" maxLength={100}/></label><label>Email address<input required type="email" name="email" placeholder="you@example.com" autoComplete="email" maxLength={150}/></label>
      <label>Project type<select required name="type" defaultValue=""><option value="" disabled>Select a discipline</option><option>Brand identity</option><option>Graphic design</option><option>3D animation</option><option>Motion graphics</option><option>Product visualization</option><option>Something else</option></select></label><label>Budget range<select required name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>To be discussed</option><option>Under ₹25,000</option><option>₹25,000 – ₹75,000</option><option>₹75,000 – ₹2,00,000</option><option>₹2,00,000+</option></select></label></div>
    <label>Tell us about your idea<textarea required name="description" placeholder="A little about the project, what you're imagining, and when you need it…" rows={4} maxLength={2000}/></label>
    <div className="form-footer"><p className="form-notice" aria-live="polite">{notice}</p><button className="button button-light" type="submit">START A PROJECT <ArrowUpRight size={15}/></button></div>
  </form>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState<typeof filters[number]>('All Projects')
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [progress, setProgress] = useState(0)
  useReveal()
  useEffect(() => { const update = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? window.scrollY / max * 100 : 0) }; window.addEventListener('scroll', update, { passive: true }); update(); return () => window.removeEventListener('scroll', update) }, [])
  const shown = filter === 'All Projects' ? projects : projects.filter(p => p.category === filter)
  const closeMenu = () => setMenuOpen(false)
  return <>
    <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }}/>
    <header className="site-header"><a className="wordmark" href="#top" aria-label="Singh Creative Studio home"><span className="wordmark-icon">S<span>.</span></span><span className="wordmark-type">SINGH CREATIVE<br/>STUDIO</span></a>
      <a className="mobile-skip" href="#work">SKIP INTRO <ArrowDown size={12}/></a><button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation"><a href="#work" onClick={closeMenu}>WORK</a><a href="#motion" onClick={closeMenu}>3D & MOTION</a><a href="#about" onClick={closeMenu}>ABOUT</a><a href="#contact" onClick={closeMenu}>CONTACT <MoveUpRight size={12}/></a><a className="skip-intro" href="#work" onClick={closeMenu}>SKIP INTRO <ArrowDown size={12}/></a><AmbientSound/></nav>
    </header>
    <main id="top">
      <section className="hero story-scene" aria-labelledby="hero-title"><div className="hero-grain"/><div className="hero-topline"><span><i className="live-dot"/> INDEPENDENT CREATIVE STUDIO</span><span>PATNA, INDIA · AVAILABLE WORLDWIDE</span></div><ThreeArtwork/>
        <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span>AN OPENING NOTE</span><span>01 — 08</span></p><h1 id="hero-title"><span>BEFORE EVERY</span><span>MASTERPIECE<span className="period">,</span></span><em>there was an imagination.</em></h1><div className="hero-bottom"><p>We don't just create.<br/><strong>We bring imagination to life.</strong></p><a href="#awakening" className="begin-button"><span className="begin-icon"><ArrowDownRight size={17}/></span><span>BEGIN THE JOURNEY</span></a></div></div>
        <span className="hero-vertical">CREATIVE WORLDS / EST. IN POSSIBILITY</span><div className="hero-index">SCROLL TO DISCOVER <span>↓</span></div>
      </section>
      <section id="awakening" className="awakening story-scene"><div className="section-inner awakening-inner"><div className="awakening-art"><div className="awakening-orbit orbit-a"/><div className="awakening-orbit orbit-b"/><div className="awakening-core"/><div className="awakening-cross">✳</div><span className="micro-note note-top">AN IDEA<br/>TAKES SHAPE</span><span className="micro-note note-bottom">FORM · ENERGY · INTENT</span></div><div className="awakening-copy" data-reveal><p className="eyebrow"><span>SCENE 02</span> — THE AWAKENING</p><h2>EVERY IDEA HAS THE POWER TO BECOME <em>something extraordinary.</em></h2><p>From the first flicker of a thought to the final frame, we shape raw possibility into visual worlds with feeling, form and purpose.</p><a className="text-link" href="#design">DISCOVER OUR CRAFT <ArrowRight size={16}/></a></div></div><div className="side-note">A THOUGHT, MADE TANGIBLE <span>↗</span></div></section>
      <section className="portal-section story-scene"><div className="portal-halo"/><ThreeArtwork mode="portal"/><div className="portal-caption" data-reveal><p className="eyebrow">SCENE 03 — ENTER THE CREATIVE WORLD</p><h2>SINGH<br/><span>CREATIVE STUDIO</span></h2><p>WHERE IMAGINATION BECOMES REALITY.</p><a className="round-link" href="#work" aria-label="Explore selected works"><ArrowDown size={18}/></a></div><span className="portal-side">STEP INTO THE UNKNOWN</span></section>
      <section id="design" className="design-section story-scene"><div className="section-head" data-reveal><div><p className="eyebrow"><span>SCENE 04</span> — THE ART OF GRAPHIC DESIGN</p><h2>IDEAS, GIVEN<br/><em>a visual language.</em></h2></div><p className="section-intro">Identity. Image. Type. Graphic design is how a feeling becomes something you can see, hold and remember.</p></div><div className="discipline-row"><span>BRAND IDENTITY</span><span>LOGO DESIGN</span><span>POSTER DESIGN</span><span>SOCIAL CREATIVES</span><span>TYPOGRAPHY</span><span>VISUAL COMMUNICATION</span></div><div className="feature-grid" data-reveal><button className="feature feature-large" onClick={() => setActiveProject(projects[1])}><ProjectArtwork project={projects[1]}/><span className="feature-meta"><b>01 / TYPE IN MOTION</b><span>AN EXPLORATION IN VISUAL VOICE <ArrowUpRight size={15}/></span></span></button><button className="feature feature-small" onClick={() => setActiveProject(projects[2])}><ProjectArtwork project={projects[2]}/><span className="feature-meta"><b>02 / SOFT GEOMETRY</b><span>IDENTITY STUDY <ArrowUpRight size={15}/></span></span></button></div><div className="section-endnote"><span>SELECTED EXPERIMENTS</span><a href="#work">VIEW ALL WORK <ArrowRight size={14}/></a></div></section>
      <section id="motion" className="dimension-section story-scene"><div className="dimension-copy" data-reveal><p className="eyebrow"><span>SCENE 05</span> — BEYOND THE DIMENSION</p><h2>WHY CREATE<br/>WHAT ALREADY<br/><em>exists...</em></h2><h3>WHEN YOU CAN IMAGINE WHAT COMES NEXT?</h3><p>Material, light and motion become a language of their own. We explore the impossible, one considered frame at a time.</p><div className="discipline-pills"><span>3D PRODUCT ANIMATION</span><span>MOTION DESIGN</span><span>ABSTRACT 3D ART</span><span>LOGO ANIMATION</span><span>PRODUCT VISUALIZATION</span><span>EXPERIMENTAL CGI</span></div></div><div className="dimension-render"><ThreeArtwork mode="portal"/><span className="render-caption">STUDIES IN DEPTH, LIGHT & FORM <i>INTERACTIVE CGI STUDY</i></span></div></section>
      <section id="about" className="founder-section story-scene"><div className="founder-visual" data-reveal><div className="founder-photo-placeholder"><span className="placeholder-frame">PORTRAIT<br/>TO COME</span><div className="founder-silhouette"><div className="silhouette-head"/><div className="silhouette-body"/></div><span className="photo-label">AN OPEN CANVAS — PORTRAIT PLACEHOLDER</span></div><span className="founder-side-index">THE CREATOR / 01</span></div><div className="founder-copy" data-reveal><p className="eyebrow"><span>SCENE 06</span> — MEET THE CREATOR</p><h2>MUKESH<br/><em>SINGH</em></h2><p className="founder-role">FOUNDER &amp; CREATIVE ARTIST</p><p className="founder-intro">Driven by imagination and a passion for visual storytelling, Mukesh Singh creates visual experiences that bring ideas to life.</p><div className="founder-divider"/><div className="founder-detail"><span>THE APPROACH</span><p>Curiosity first. Make with intention. Leave room for the unexpected.</p></div><div className="founder-detail"><span>CREATIVE PRACTICE</span><p>Visual storytelling · Design exploration · 3D & motion experiments</p></div><p className="editable-note">A living introduction — personal details and skills can be added as the studio grows.</p></div></section>
      <section id="work" className="work-section story-scene"><div className="work-heading" data-reveal><div><p className="eyebrow"><span>SCENE 07</span> — SELECTED WORKS</p><h2>MADE OF<br/><em>possibility.</em></h2></div><p>Original concept studies.<br/>A glimpse into the worlds we love to make.</p></div><div className="filters" role="group" aria-label="Filter projects">{filters.map(f => <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)} aria-pressed={filter === f}>{f}</button>)}</div><div className="project-grid">{shown.map((project, i) => <button key={project.id} className={`project-card card-${i % 2 ? 'offset' : 'normal'}`} onClick={() => setActiveProject(project)} aria-label={`View ${project.title}, ${project.category}`}><ProjectArtwork project={project}/><div className="project-meta"><div><span className="project-number">{project.number} / {project.category.toUpperCase()}</span><h3>{project.title}</h3></div><span className="project-open"><ArrowUpRight size={17}/></span></div><span className="concept-flag">CONCEPT STUDY</span></button>)}</div><div className="honesty-note"><span className="honesty-dot"/><p>These are original demonstration concepts, not commissioned client projects. No client work or animation reels have been supplied yet.</p></div></section>
      <section id="contact" className="contact-section story-scene"><div className="contact-orb"><div/><i/><b/></div><div className="contact-heading" data-reveal><p className="eyebrow"><span>SCENE 08</span> — THE NEXT CHAPTER</p><h2>EVERY GREAT PROJECT<br/>STARTS WITH AN <em>idea.</em></h2><h3>LET'S BRING YOURS TO LIFE.</h3></div><div className="contact-content"><div className="contact-aside"><p>Tell us what's on your mind. The best work begins with a good conversation.</p><div className="availability"><span className="live-dot"/> OPEN TO NEW IDEAS</div><div className="contact-signoff">SINGH CREATIVE STUDIO<br/>PATNA, INDIA · WORKING EVERYWHERE</div></div><ContactForm/></div><footer className="site-footer"><a href="#top" className="footer-brand">SINGH CREATIVE STUDIO<span>®</span></a><span>INDEPENDENT BY NATURE. IMAGINATIVE BY DESIGN.</span><a href="#top">BACK TO THE BEGINNING ↑</a><span>© {new Date().getFullYear()} — MUKESH SINGH</span></footer></section>
    </main>
    {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)}/>}
  </>
}
