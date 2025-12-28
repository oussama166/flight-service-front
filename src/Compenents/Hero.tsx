import SearchSection from "./SearchSection.tsx";

const Hero = () => (
    <div
        className="relative min-h-[95vh] flex flex-col items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-primary">
        {/*// <!-- Background Image -->*/}
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10"></div>
            <div
                className="absolute inset-0 bg-gradient-to-top from-primary/80 via-transparent to-transparent z-10"></div>
            <div
                className={"w-full h-full bg-[url('assets/airplane_hero.png')] bg-cover bg-center bg-no-repeat transform scale-100"}
                data-alt="Airplane wing view above fluffy clouds during sunset"
            >
            </div>
        </div>
        <div className="relative z-20 w-full max-w-7xl flex flex-col items-center gap-8 text-center mt-10">
            <div className="max-w-3xl space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
                    Explore the World with Ease
                </h1>
                <p className="text-lg sm:text-xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-md">
                    Discover affordable flights to over 500 destinations worldwide. Your next adventure starts here.
                </p>
            </div>
            <SearchSection/>
        </div>
    </div>
);

export default Hero;