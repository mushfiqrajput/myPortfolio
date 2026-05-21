import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Panel from "./components/Panel";
import WorkPanel from "./components/WorkPanel";
import ProjectsGrid from "./components/ProjectsGrid";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Statement from "./components/Statement";
import Contact from "./components/Contact";
import PanelScroll from "./components/PanelScroll";
import PanelIndicator from "./components/PanelIndicator";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import { professionalWork, personalProjects } from "./data/projects";

export default function Home() {
  return (
    <>
      <PanelScroll />
      <PanelIndicator />
      <Cursor />
      <ScrollProgress />
      <div className="grain" aria-hidden />
      <Nav />
      <main className="flex-1">
        <div id="panel-track" className="panel-track">
          <Hero />

          {professionalWork.map((p, i) => (
            <WorkPanel
              key={p.slug}
              project={p}
              index={i}
              total={professionalWork.length}
            />
          ))}

          <Panel id="projects" eyebrow="Open source · Personal" title="Things I've built to learn." glow="top-right">
            <ProjectsGrid projects={personalProjects} />
          </Panel>

          <Panel id="about" eyebrow="About" title="I sweat the details so you don't have to." glow="bottom-left">
            <Statement />
          </Panel>

          <Panel id="skills" eyebrow="Stack" title="Tools I reach for." glow="center-right">
            <Skills />
          </Panel>

          <Panel id="experience" eyebrow="Experience" title="The road so far." glow="bottom-right">
            <Experience />
          </Panel>

          <Panel id="contact" eyebrow="Contact" title="Let's build something." glow="center-left">
            <Contact />
          </Panel>
        </div>
      </main>
      <div className="md:hidden">
        <Footer />
      </div>
    </>
  );
}
