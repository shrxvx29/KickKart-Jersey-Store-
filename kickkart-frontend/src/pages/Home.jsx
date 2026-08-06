import FeaturedCollections from '../components/home/FeaturedCollection';
import Hero from '../components/home/Hero';
import Testimonials from '../components/home/Testimonials';
import WhyUs from '../components/home/WhyUs';

function Home() {
    return (
        <div>
            <Hero />
            <FeaturedCollections />
            <WhyUs/>
            <Testimonials/>
        </div>
    );
}

export default Home;