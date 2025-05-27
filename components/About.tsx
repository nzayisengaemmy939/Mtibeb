import React, { useEffect, useRef, useState } from 'react'
import { Ripple } from '@/app/page';
import { ButtonProps } from '@/app/page';
import { GlassmorphismCard } from '@/app/page';

import { ParallaxSection  } from '@/app/page';
import { InteractiveButton  } from '@/app/page';



type ParallaxProps = {
  children: React.ReactNode;
  offset?: number;
  delay?: number; 
  className?: string;
};





  
 

const About = () => {
  return (
     <section className="relative py-24 overflow-hidden mt-52">
          <div className="absolute inset-0 bg-gradient-to-br from-[#A6CCFF] via-[#92aed3] to-[#A6CCFF]" />
          <ParallaxSection className="absolute inset-0" offset={0.4}>
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </ParallaxSection>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-6xl font-black text-gray-600 leading-tight">
                  Our Story
                  <span className="block text-4xl font-light mt-2">
                    Crafted with Purpose
                  </span>
                </h2>

                <div className="space-y-6 text-lg text-gray-600/90 leading-relaxed">
                  <p>
                    Miti Tibeb blends the elegance of woodwork with African
                    artistic heritage. Each piece we craft carries a story
                    rooted in culture, sustainability, and care.
                  </p>
                  <p>
                    We collaborate with skilled artisans who bring generations
                    of woodworking knowledge, creating pieces that are not just
                    furniture, but heirlooms that connect you to nature and
                    tradition.
                  </p>
                  <p>
                    Our interior design samples showcase our partners' expertise
                    in both manufacturing and installation, ensuring harmony and
                    peace in your space.
                  </p>
                </div>

                <InteractiveButton variant="secondary">
                  📖 Learn More About Us
                </InteractiveButton>
              </div>

              <div className="relative">
                <GlassmorphismCard className="p-8">
                  <div className="aspect-video  bg-[#d15229] rounded-2xl flex items-center justify-center">
                    <div className="text-center text-white space-y-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-2xl">▶️</span>
                      </div>
                      <p className="text-sm opacity-80">Watch Our Story</p>
                    </div>
                  </div>
                </GlassmorphismCard>
              </div>
            </div>
          </div>
        </section>
  )
}

export default About
