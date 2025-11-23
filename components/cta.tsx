import { motion } from "framer-motion";
import TextBlur from "@/components/ui/text-blur";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function CTA() {
  return (
    <motion.div
      className="flex w-full max-w-2xl flex-col gap-1 sm:gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible">

      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center lg:text-left text-2xl font-medium tracking-tighter sm:text-4xl md:text-5xl"
          text="Team Up & Pay Less!"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto lg:mx-0 max-w-[38rem] px-4 lg:px-0 pt-1 text-center lg:text-left text-sm sm:pt-1.5 sm:text-base md:text-lg"
          text="We help you pay less by not buying alone."
          duration={0.8}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto lg:mx-0 max-w-[38rem] px-4 lg:px-0 pt-1 text-center lg:text-left text-sm sm:pt-1.5 sm:text-base md:text-lg"
          text="When people who want the same product come together and buy as a group, everyone gets a better price than buying alone."
          duration={0.8}
        />
      </motion.div>
    </motion.div>
  );
}
