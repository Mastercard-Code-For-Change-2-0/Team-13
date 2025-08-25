import { motion } from "framer-motion";
import { Button } from "@/components/ui/button.jsx";
import { ArrowDown, ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import background from "@/assets/volunteer.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/admin');
  };

  const handleEventsClick = () => {
    navigate('/events');
  };

  

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={background}
          alt="tree"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content -*/}
      <div className="relative z-10 px-6 sm:px-8 lg:px-12 xl:px-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Main Heading */}
                <motion.h1
                className="text-hero size-70 font-serif font-semibold text-yellow-500 leading-[1.2] tracking-tight drop-shadow-lg "
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                >
                <span className="block ">Admin</span>
                <span className="block">Dashboard</span>
                
                </motion.h1>

                {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl text-white/95 max-w-2xl leading-relaxed font-light drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <span>Manage donations, review requests, and track transactions efficiently!</span>
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <Button variant="apple" size="xl" className="group" onClick={handleDashboardClick}>
              <span>Admin Dashboard</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button variant="appleSecondary" size="xl" className="group" onClick={handleEventsClick}>
              <span>View Donations Status</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </Button>

            
          </motion.div>
        </motion.div>

        {/* Floating Stats Cards 
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          {[
            { number: "number", label: "Text" },
            { number: "number", label: "Text" },
            { number: "number", label: "Text" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="card-luxury p-6 rounded-2xl text-center backdrop-blur-xl"
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 },
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.8 + index * 0.1,
                ease: "easeOut",
              }}
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-2 font-serif drop-shadow-sm">
                {stat.number}
              </div>
              <div className="text-sm text-white/90 font-light drop-shadow-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
        */}
      </div>
          
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
