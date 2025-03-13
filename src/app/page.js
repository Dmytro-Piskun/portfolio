
import Contacts from "@/components/sections/contact/Contact";
import Hero from "@/components/sections/hero/Hero";
import Skills from "@/components/sections/skills/Skills";
import Projects from "@/components/sections/projects/Projects";
import BackgroundNoize from "@/components/global-components/BackgroundNoize";
import Experience from "@/components/sections/experience/Experience";

export default function Home() {
  return (
    <main className="bg-background transition-colors  duration-75">
      {/* <BackgroundNoize> */}
      <Hero/>
      {/* <Skills/> */}
      {/* <Experience/> */}
      <h1 className="w-full -mt-[90vh] text-center text-6xl"></h1>
      <Projects/>
      <h1 className="w-full -mt-[180vh] text-center text-6xl"></h1>
      <Contacts/>
      {/* </BackgroundNoize> */}
    </main>
  );
}
