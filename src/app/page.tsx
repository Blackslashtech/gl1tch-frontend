import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SparklesCore } from "@/components/ui/sparkles";
import { Binary, Boxes, Terminal } from "lucide-react";
import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <main className="p-5 flex justify-center flex-col m-auto h-screen">
        <h1 className="font-audiowide text-7xl text-primary font-bold text-center">
          GL1TCH RANGE
        </h1>
        <div className="h-6"></div>
        <p className="text-foreground/50 text-center text-md max-w-xl mx-auto leading-7 ">
          Glitch Range is a unified cyber attack/defense range for deploying
          training, testing, and competitions. It supports a variety of existing
          attack/defense deployment frameworks, including FAUST, CINI, and
          SECCONF.
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
      <section className="grid grid-cols-3 gap-4 max-w-7xl mx-auto">
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
              We offer configurable scoring APIs and massively scalable
              environments, with full data capture and playback capabilities.
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
              Glitch Range offers full service support of competitions, ensuring
              that the range is operational and ready to go for the big day.
            </p>
          </CardContent>
        </Card>
      </section>
      <div className="h-12"></div>

      <div className="w-full absolute inset-0 h-screen -z-10">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.1}
          maxSize={0.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#888"
        />
      </div>
    </div>
  );
};

export default Home;
