import { motion } from "framer-motion";
import TextBlur from "@/components/ui/text-blur";
import AnimatedShinyText from "@/components/ui/shimmer-text";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function CTA() {
  return (
    <motion.div
      className="flex w-full max-w-2xl flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center">
          <div className="flex w-fit items-center justify-center rounded-full border border-black/20 bg-black/5 text-center">
            <AnimatedShinyText className="px-4 py-1 text-black/20">
              <span>Launching soon!</span>
            </AnimatedShinyText>
          </div>
        </div>
      </motion.div>

      <motion.img
        src="/hive-icon.svg"
        alt="HiveBuying logo"
        className="mx-auto h-32 w-32 sm:h-48 sm:w-48"
        variants={itemVariants}
      />

      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-3xl font-medium tracking-tighter sm:text-5xl"
          text="HiveBuying - Team Up, Pay Less!"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto max-w-[38rem] pt-1.5 text-center text-base sm:text-lg"
          text="The price of anything changes when people come together. Join HiveBuying today, form groups, buy smart, pay less together."
          duration={0.8}
        />
      </motion.div>
    </motion.div>
  );
}
