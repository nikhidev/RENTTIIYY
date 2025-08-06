import React from "react";
import HeroSection from "./HeroSection";
import FeaturedSection from "./featuredSection";
import DiscoverSection from "./DiscoverSection";
import CallToAction from "./CallToAction";
import FooterSection from "./footerSection";

const Landing = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <DiscoverSection />
      <CallToAction />
      <FooterSection />
    </div>
  );
};

export default Landing;