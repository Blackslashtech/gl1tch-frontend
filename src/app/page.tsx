"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Binary, Boxes, Terminal } from "lucide-react";
import type { NextPage } from "next";

const globeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const sampleArcs = [
  { order: 1, startLat: 39.7392, startLng: -104.9903, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.3, color: "#06b6d4" },
  { order: 2, startLat: 51.5074, startLng: -0.1278, endLat: 38.9072, endLng: -77.0369, arcAlt: 0.3, color: "#3b82f6" },
  { order: 3, startLat: 38.9072, startLng: -77.0369, endLat: 30.3960, endLng: -88.8853, arcAlt: 0.3, color: "#6366f1" },
  { order: 4, startLat: 30.3960, startLng: -88.8853, endLat: 37.4419, endLng: -122.1430, arcAlt: 0.3, color: "#06b6d4" },
  { order: 5, startLat: 37.4419, startLng: -122.1430, endLat: 29.4241, endLng: -98.4936, arcAlt: 0.3, color: "#3b82f6" },
  { order: 6, startLat: 29.4241, startLng: -98.4936, endLat: 52.5200, endLng: 13.4050, arcAlt: 0.3, color: "#6366f1" },
  { order: 7, startLat: 52.5200, startLng: 13.4050, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.3, color: "#06b6d4" },
  { order: 8, startLat: 48.8566, startLng: 2.3522, endLat: 55.7558, endLng: 37.6173, arcAlt: 0.3, color: "#3b82f6" },
  { order: 9, startLat: 55.7558, startLng: 37.6173, endLat: 39.9042, endLng: 116.4074, arcAlt: 0.3, color: "#6366f1" },
  { order: 10, startLat: 39.9042, startLng: 116.4074, endLat: 39.0089, endLng: -104.8917, arcAlt: 0.3, color: "#06b6d4" },
  { order: 11, startLat: 39.0089, startLng: -104.8917, endLat: 33.4484, endLng: -112.0740, arcAlt: 0.3, color: "#3b82f6" },
];

const Home: NextPage = () => {
  return (
    <div>
      <main className="p-5 flex justify-center flex-col m-auto h-screen">
        <h1 className="font-audiowide text-7xl text-primary font-bold text-center">
          GL1TCH RANGE
        </h1>
        <div className="h-6"></div>
        <p className="text-foreground/50 text-center text-md max-w-xl mx-auto leading-7 ">
          Glitch Range is a unified cyber attack/defense range for deploying training, testing, and competitions. It supports a variety of existing attack/defense deployment frameworks, including FAUST, CINI, and SECCONF.
        </p>
        <div className="h-12"></div>
        <div className="flex flex-row justify-center mx-auto">
          <Button variant="outline" size="lg">
            Learn more
          </Button>
          <div className="w-4"></div>
          <Button size="lg">Get started</Button>
        </div>
      </main>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
        <Card className="p-6">
          <CardHeader className="flex flex-row items-center pb-5">
            <div className="flex items-center space-x-2">
              <Binary className="h-6 w-6" />
              <h2 className="text-xl font-bold leading-none">Train</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-6">
              Our membership grants access to over 100 attack/defense services.
            </p>
          </CardContent>
        </Card>
        <Card className="p-6">
          <CardHeader className="flex flex-row items-center pb-5">
            <div className="flex items-center space-x-2">
              <Terminal className="h-6 w-6" />
              <h2 className="text-xl font-bold leading-none">Test</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-6">
              We offer configurable scoring APIs and massively scalable environments, with full data capture and playback capabilities.
            </p>
          </CardContent>
        </Card>
        <Card className="p-6">
          <CardHeader className="flex flex-row items-center pb-5">
            <div className="flex items-center space-x-2">
              <Boxes className="h-6 w-6" />
              <h2 className="text-xl font-bold leading-none">Compete</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-6">
              Glitch Range offers full service support of competitions, ensuring that the range is operational and ready to go for the big day.
            </p>
          </CardContent>
        </Card>
      </section>
      <div className="h-12"></div>
      <div className="w-full absolute inset-0 h-screen -z-10">
      </div>
    </div>
  );
};

export default Home;