"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Binary, Boxes, Terminal, ChevronRight, MessageSquare } from "lucide-react";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db, analytics } from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { logEvent, setUserProperties } from "firebase/analytics";
import { useSearchParams } from 'next/navigation';
import Header from "./components/Header";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Log page view
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_title: 'Home',
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }

    // Check for #beta-signup in the URL and scroll if present
    if (window.location.hash === '#beta-signup') {
      scrollToForm();
    }
  }, [searchParams]);

  const features = [
    { icon: Binary, title: "Train", content: "Access over 100 attack/defense services." },
    { icon: Terminal, title: "Test", content: "Configurable APIs and scalable environments." },
    { icon: Boxes, title: "Compete", content: "Full service support for competitions." },
  ];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const docRef = await addDoc(collection(db, "betaSignups"), {
        name,
        email,
        company,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer
      });

      // Log sign up event
      if (analytics) {
        logEvent(analytics, 'sign_up', {
          method: 'Beta Form',
          user_id: docRef.id
        });

        // Set user properties
        setUserProperties(analytics, {
          user_id: docRef.id,
          signup_date: new Date().toISOString(),
          company: company
        });
      }

      // Reset form fields
      setName("");
      setEmail("");
      setCompany("");

      alert("Thank you for signing up for the beta!");
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("There was an error submitting your form. Please try again.");
      
      // Log error event
      if (analytics) {
        logEvent(analytics, 'sign_up_error', {
          error_message: (error as Error).message
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Log scroll to form event
    if (analytics) {
      logEvent(analytics, 'scroll_to_form');
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
          {/* Hero Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              variants={itemVariants}
            >
              Cyber Attack/Defense Range
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
              variants={itemVariants}
            >
              Deploy, train, test, and compete in a unified cyber environment supporting multiple frameworks.
            </motion.p>
            <motion.div variants={itemVariants} className="flex justify-center space-x-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300" 
                onClick={() => {
                  scrollToForm();
                  logAnalyticsEvent('cta_click', { button_text: 'Sign Up for Beta' });
                }}
              >
                Sign Up for Beta <ChevronRight className="ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
                onClick={() => {
                  window.open('https://discord.gg/b8ntjcXhJG', '_blank');
                  logAnalyticsEvent('link_click', { link_type: 'discord' });
                }}
              >
                <MessageSquare className="mr-2 h-5 w-5" /> Join Our Discord
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title} 
                variants={itemVariants}
                onViewportEnter={() => logAnalyticsEvent('feature_view', { feature_title: feature.title })}
              >
                <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <feature.icon className="h-8 w-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Beta Signup Form Section */}
          <section ref={formRef} id="beta-signup" className="max-w-md mx-auto mb-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              onViewportEnter={() => logAnalyticsEvent('form_view')}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-center text-white mb-6">Sign Up for Beta</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          logAnalyticsEvent('form_field_interaction', { field_name: 'name' });
                        }}
                        required
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          logAnalyticsEvent('form_field_interaction', { field_name: 'email' });
                        }}
                        required
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Entity/Company (Optional)</Label>
                      <Input
                        id="company"
                        type="text"
                        value={company}
                        onChange={(e) => {
                          setCompany(e.target.value);
                          logAnalyticsEvent('form_field_interaction', { field_name: 'company' });
                        }}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Sign Up for Beta"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </section>
        </main>

        <footer className="container mx-auto py-8 text-center text-gray-400">
          <p>&copy; 2024 BLACKSLASH TECHNOLOGY INC. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;