"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Binary, Boxes, Terminal, ChevronRight } from "lucide-react";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SparklesCore } from "@/components/ui/sparkles";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db, analytics } from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { logEvent, setUserProperties, Analytics } from "firebase/analytics";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Log page view
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_title: 'Home',
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }, []);

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
        <header className="py-6">
          {/* Header content */}
        </header>

        <main className="container mx-auto px-4 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              variants={itemVariants}
            >
              Cyber Attack/Defense Range
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
              variants={itemVariants}
            >
              Deploy, train, test, and compete in a unified cyber environment supporting multiple frameworks.
            </motion.p>
            <motion.div variants={itemVariants}>
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
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
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
                  <CardHeader className="flex flex-row items-center pb-2">
                    <feature.icon className="h-6 w-6 text-blue-400 mr-2" />
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{feature.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </main>

        <section className="container mx-auto px-4 py-20" ref={formRef}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-md mx-auto"
            onViewportEnter={() => logAnalyticsEvent('form_view')}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <h3 className="text-2xl font-bold text-center text-white">Sign Up for Beta</h3>
              </CardHeader>
              <CardContent>
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

        <footer className="container mx-auto py-8 text-center text-gray-400">
          <p>&copy; 2024 GL1TCH RANGE. All rights reserved.</p>
        </footer>
      </div>

      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full fixed inset-0 -z-10"
        particleColor="#FFFFFF"
      />
    </div>
  );
};

export default Home;