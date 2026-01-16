import Hero from "../sections/Hero";
import QuoteSection from "../sections/QuoteSection";
import ProductSection from "../sections/ProductSection";
import FlavorSection from "../sections/FlavorSection";
import FooterSection from "../sections/FooterSection";

const Home = () => {
  return (
    <div className="bg-[#FFF3E6] w-full h-full overflow-x-hidden">
      <Hero />
      <QuoteSection />
      <ProductSection />
      <FlavorSection />
      <FooterSection />
    </div>
  );
};

export default Home;
