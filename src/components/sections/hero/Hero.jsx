import WobblyText from "@/components/ui/WobblyText";
import Lines from "./Lines";
import SchemeToggle from "./SchemeToggle";
import Time from "./Time";
import HeroScrollTransition from "@/components/sections/hero/HeroScrollTransition";

const Hero = () => {
    return (
        <HeroScrollTransition>
            <section className="h-dvh overflow-hidden flex flex-col">
                <Lines />
                <header className="flex justify-end p-16 text-md grow-0">
                    <div className="flex gap-8 items-center">
                        <Time />
                        <SchemeToggle />
                    </div>
                </header>
                <main className="text-primary font-light flex items-center justify-center flex-col h-full grow pb-64">
                <h1 className="text-4xl max-sm:text-3xl pb-5">Dmytro Piskun</h1>
<h2 className="text-3xl max-sm:text-2xl max-sm:px-12 text-center">Frontend Engineer</h2>
                    {/* <WobblyText/> */}
                </main>
            </section>
        </HeroScrollTransition>
    );
};

export default Hero;