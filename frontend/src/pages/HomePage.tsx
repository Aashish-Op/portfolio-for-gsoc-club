import { HeroSection, AboutSection, ProjectsSection, ContactSection } from '../components/sections';
import { SkillsSection } from '../components/sections/SkillsSection';

export function HomePage() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
        </>
    );
}
