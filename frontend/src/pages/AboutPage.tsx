import { AboutSection } from '../components/sections';
import { SkillsSection } from '../components/sections/SkillsSection';

export function AboutPage() {
    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <AboutSection />
            <SkillsSection />
        </div>
    );
}
