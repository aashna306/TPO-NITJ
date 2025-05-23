import React, { useState } from "react";
import {
  Share2,
  BarChart2,
  Users,
  Grid,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Award,
  Briefcase,
  Book,
  Rocket,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const WhyRecruit = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const stats = [
    {
      title: "Alumni Network",
      icon: <Share2 className="w-8 h-8 text-custom-ck" />,
      description: "Our alumni hold senior positions globally, showcasing our education quality.",
      expanded:
        "Spanning Fortune 500 companies, research institutions, and startups, our alumni have leadership roles, groundbreaking research, and entrepreneurial success stories.",
    },
    {
      title: "National Ranking",
      icon: <BarChart2 className="w-8 h-8 text-custom-ck" />,
      description: "Ranked 52nd in Engineering, NIRF 2022; 2nd in Punjab among Govt. Engineering Institutes.",
      expanded:
        "Our consistent rankings improvement highlights academic excellence, research output, and industry collaboration, earning multiple awards for innovation.",
    },
    {
      title: "Rigorous Selection",
      icon: <Users className="w-8 h-8 text-custom-ck" />,
      description: "Admissions through JEE MAINS, GATE, ensuring top-tier talent for recruiters.",
      expanded:
        "High cutoff ranks ensure a competitive peer group. Special provisions for international students promote campus diversity.",
    },
    {
      title: "Holistic Development",
      icon: <Grid className="w-8 h-8 text-custom-ck" />,
      description: "15 departments and 10 student clubs for technical and soft skills development.",
      expanded:
        "Workshops, leadership programs, and competitions develop skills. State-of-the-art labs foster hands-on learning.",
    },
  ];

  const achievements = [
    { icon: Briefcase, text: "Placement rate for graduating students", value: 90 },
    { icon: Book, text: "Research papers published annually", value: 50 },
    { icon: Award, text: "Patents filed in the last 5 years", value: 20 },
    { icon: Share2, text: "Industry collaborations", value: 100 },
    { icon: Rocket, text: "Startups incubated on campus", value: 30 },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Why Recruit From <span className="text-custom-ck">NIT Jalandhar?</span>
          </h1>
          <p className="text-md mt-8 font-normal text-gray-600 mx-auto leading-relaxed text-base sm:text-sm lg:text-lg">
            Since 1987, NIT Jalandhar has been shaping the future of technology and innovation.
            Our alumni are driving advancements globally.
          </p>
        </motion.div>

        {/* Tabs Section */}
        <Tabs defaultValue="stats" className="mb-16 ">
          <TabsList className="w-full bg-transparent">
            <TabsTrigger
              value="stats"
              className="z-10 ring-transparent ring-offset-transparent hover:text-black	lg:text-2xl text-xl text-gray-500 data-[state=active]:text-black transition data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:underline"
            >
              Key Statistics
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="z-10 ring-transparent ring-offset-transparent hover:text-black	lg:text-2xl text-xl  text-gray-500 data-[state=active]:text-black outline-none transition data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:underline"
            >
              Our Achievements
            </TabsTrigger>
          </TabsList>

          {/* Key Statistics Tab */}
          <TabsContent value="stats">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="grid md:grid-cols-2 gap-8 mt-8 bg-white p-12 shadow-md"
  >
    {stats.map((stat, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{easings:"easeOut", stiffness: 600,damping:100 }}
        className="overflow-hidden transition-all duration-300 bg-white rounded-lg"
      >
        <Card>
          <div className="hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">{stat.description}</CardDescription>
            <AnimatePresence>
              {expandedSection === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mt-4 text-sm text-gray-500">{stat.expanded}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="ghost"
              className="z-10 mt-4 w-full justify-between"
              onClick={() => setExpandedSection(expandedSection === index ? null : index)}
            >
              {expandedSection === index ? "Show Less" : "Learn More"}
              {expandedSection === index ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </CardContent>
          </div>
        </Card>
      </motion.div>
    ))}
  </motion.div>
</TabsContent>


          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8 bg-white p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-6 text-custom-ck">Our Excellence</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Distinguished faculty, substantial government funding, and top-tier research.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 600,damping:20 }}
                    className="bg-gradient-to-r from-custom-blue to-blue-800 p-6 rounded-lg shadow-md"
                  >
                    <div className="flex items-center mb-4">
                      <achievement.icon className="w-8 h-8 text-white mr-4" />
                      <span className="font-semibold text-lg text-white">{achievement.text}</span>
                    </div>
                    <div className="flex items-center">
                      <Progress value={achievement.value} className="flex-grow h-2 bg-white" />
                      <span className="ml-4 text-2xl font-bold text-white">{achievement.value}+</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16 text-center bg-white p-8 shadow-xl"
        >
          <h2 className="text-4xl font-bold text-custom-ck mb-6">Ready to Recruit Top Talent?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join leading companies who have found their star performers at NIT Jalandhar.
          </p>
          <div className="w-full flex justify-center items-center">
            <button
              className="flex justify-center items-center button dark text-white font-medium p-3 rounded-md z-0 border-[1.5px] border-[#205781]"
            >
              Get in Touch <ArrowRight className="ml-2 w-6 h-6" />
            </button>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyRecruit;
