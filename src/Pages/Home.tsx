import Navbar from "../Compenents/Layouts/Navbar.tsx";
import Hero from "../Compenents/Layouts/HeroSection.tsx";


const Home = () => {
    return (
        <div className={"bg-background-light dark:bg-background-dark font-display text-[#0c141d] antialiased overflow-x-hidden"}>
            <Navbar/>
            <Hero/>

        </div>
    );
};

export default Home;