import Navigation from '@/components/Navigation.jsx';
import Hero from '@/components/Hero.jsx';
import Footer from '@/components/Footer.jsx';
import Mission from '@/components/Mission.jsx';
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Mission/>
      <Footer />
    </div>
  );
};

export default Index;
