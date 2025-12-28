const Navbar = () => {
    return (
        <nav className="absolute top-0 w-full z-50 glass-nav">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    <div className="flex items-center gap-3">
                        <div className="size-8 bg-accent-500 rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-xl">flight_takeoff</span>
                        </div>
                        <span className="text-white text-xl font-bold tracking-tight">FlyEasy</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a className="text-white/90 hover:text-white text-sm font-medium transition-colors"
                           href="#">Flights</a>
                        <a className="text-white/90 hover:text-white text-sm font-medium transition-colors"
                           href="#">Hotels</a>
                        <a className="text-white/90 hover:text-white text-sm font-medium transition-colors"
                           href="#">Deals</a>
                        <a className="text-white/90 hover:text-white text-sm font-medium transition-colors"
                           href="#">Support</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            className="text-white hover:text-accent font-medium text-sm hidden sm:block transition-colors cursor-pointer">Sign
                            In
                        </button>
                        <button
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold transition-all border border-white/20 cursor-pointer">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;