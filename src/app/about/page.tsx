"use client";

import React, { useEffect } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop, Cloud, Users, Github, ExternalLink, MessageSquare } from "lucide-react";
import { analytics } from "@/utils/firebase";
import { logEvent } from "firebase/analytics";
import Link from "next/link";

const AboutPage: React.FC = () => {
  useEffect(() => {
    // Log page view
    logAnalyticsEvent('page_view', {
      page_title: 'About',
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const logAnalyticsEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      <BackgroundBeams />
      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center pt-16"
            onViewportEnter={() => logAnalyticsEvent('section_view', { section_name: 'hero' })}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              variants={itemVariants}
            >
              Attack Defense. For Everyone.
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
              variants={itemVariants}
            >
              Infrastructure. That just works.
            </motion.p>
            <motion.p
              className="text-lg text-gray-400 max-w-3xl mx-auto mb-16"
              variants={itemVariants}
            >
              No more faulty checkers and broken NAT. Spend more time breaking things the things you're supposed to break, and less time fixing the things you're not.
            </motion.p>
          </motion.div>

          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
            onViewportEnter={() => logAnalyticsEvent('section_view', { section_name: 'our_model' })}
          >
            <motion.h2
              className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              variants={itemVariants}
            >
              Our Model
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                variants={itemVariants}
                onViewportEnter={() => logAnalyticsEvent('model_view', { model_type: 'self_hosted' })}
              >
                <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Laptop className="h-12 w-12 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Self Hosted</h3>
                    <p className="text-gray-300 mb-4 flex-grow">Looking to experiment with attack-defense, or just have fun with friends? Our code is open source, licensed for non-commercial use!</p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        window.open('https://github.com/Blackslashtech/glitch', '_blank');
                        logAnalyticsEvent('link_click', { link_type: 'github' });
                      }}
                    >
                      <Github className="mr-2 h-4 w-4" /> View on GitHub
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                variants={itemVariants}
                onViewportEnter={() => logAnalyticsEvent('model_view', { model_type: 'cloud_range' })}
              >
                <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Cloud className="h-12 w-12 text-purple-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Cloud Range</h3>
                    <p className="text-gray-300 mb-4 flex-grow">Expand your range globally using our cloud environment. With a library of over pre-built 100 attack defense challenges, deploy training ranges or competition platforms for up to 50 teams within minutes.</p>
                    <Link href="/#beta-signup" passHref>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          logAnalyticsEvent('link_click', { link_type: 'beta_signup' });
                        }}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" /> Sign up for Beta
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                variants={itemVariants}
                onViewportEnter={() => logAnalyticsEvent('model_view', { model_type: 'onsite_support' })}
              >
                <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Users className="h-12 w-12 text-green-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Onsite Support</h3>
                    <p className="text-gray-300 mb-4 flex-grow">Planning a big cyber competition and want to make sure everything runs smoothly? We can help. Reach out and we'll work with you to provide a custom solution!</p>
                    <div className="bg-gray-700 p-4 rounded-md text-center">
                      <p className="text-lg font-semibold text-white mb-2">Contact Us:</p>
                      <p className="text-xl text-blue-400 break-all">js@blackslashtech.com</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
            onViewportEnter={() => logAnalyticsEvent('section_view', { section_name: 'deploy_anywhere' })}
          >
            <motion.h2
              className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              variants={itemVariants}
            >
              Deploy anywhere. In minutes.
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 max-w-3xl mx-auto mb-10 text-center"
              variants={itemVariants}
            >
              Run a full-blown attack-defense range from your laptop. Or use our cloud hosting to scale it to dozens of teams. If it can run Docker, it can run Glitch Range.
            </motion.p>
          </motion.section>

          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
            onViewportEnter={() => logAnalyticsEvent('section_view', { section_name: 'join_discord' })}
          >
            <motion.h2
              className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              variants={itemVariants}
            >
              Join Our Community
            </motion.h2>
            <motion.div
              className="flex justify-center"
              variants={itemVariants}
            >
              <Button 
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => {
                  window.open('https://discord.gg/b8ntjcXhJG', '_blank');
                  logAnalyticsEvent('link_click', { link_type: 'discord' });
                }}
              >
                <MessageSquare className="mr-2 h-5 w-5" /> Join Our Discord
              </Button>
            </motion.div>
          </motion.section>

        </main>

        <footer className="container mx-auto py-8 text-center text-gray-400">
          <p>&copy; 2024 BLACKSLASH TECHNOLOGY INC. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;