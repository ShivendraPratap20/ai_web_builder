import Navbar from "../component/HomePageComponent/NavBar"
import HeroSection from "../component/HomePageComponent/HeroSection"
import AboutSection from "../component/HomePageComponent/AboutSection"
import ShowcaseAndProofSection from "../component/HomePageComponent/ShowCaseSection"
import Footer from "../component/HomePageComponent/Footer"


function Home() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <AboutSection />
            <ShowcaseAndProofSection />
            <Footer />
        </>
    )
}

export default Home;