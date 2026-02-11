import { motion } from "framer-motion";
import { Search, Users, ShoppingCart } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

const timelineSteps = [
  {
    id: 1,
    icon: Search,
    title: "Search what you want",
    description: "Find the product you're looking for phones, bikes, anything you love.",
  },
  {
    id: 2,
    icon: Users,
    title: "Join the group",
    description: "Join a group with people who want the same product.",
  },
  {
    id: 3,
    icon: ShoppingCart,
    title: "Buy Together, Save More",
    description: "Once the group fills, the deal starts directly with the brand.",
  },
];

export default function HowItWorks() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-10 w-full max-w-5xl px-4"
    >
      <motion.h2 
        variants={itemVariants}
        className="mb-6 text-center text-4xl font-semibold tracking-tight sm:text-5xl"
      >
        How It Works
      </motion.h2>
      
      <div className="relative mx-auto w-full">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
          {timelineSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon container */}
                <div className="relative z-10 mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-card shadow-lg transition-all duration-300 hover:scale-110 hover:border-accent hover:shadow-xl">
                  {/* Step number background */}
                  <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {step.id}
                  </div>
                  
                  {/* Icon */}
                  <Icon className="h-6 w-6 text-foreground" strokeWidth={2.5} />
                </div>
                
                {/* Horizontal connecting line between icons - desktop only */}
                {index < timelineSteps.length - 1 && (
                  <div className="absolute left-[50%] top-7 hidden h-0.5 w-[calc(100%+1rem)] bg-border sm:block" />
                )}
                
                {/* Vertical line from circle to content box */}
                <div className="absolute left-1/2 top-14 h-3 w-0.5 -translate-x-1/2 bg-border" />
                
                {/* Content */}
                <div className="w-full rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md">
                  <h3 className="mb-1.5 text-sm font-semibold tracking-tight text-foreground sm:text-base">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-foreground/70 sm:text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

