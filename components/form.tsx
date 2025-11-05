import { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { FaArrowRightLong } from "react-icons/fa6";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

interface FormProps {
  name: string;
  mobile: string;
  product: string;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMobileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleProductChange: (value: string) => void;
  handleSubmit: () => void;
  loading: boolean;
}

const productCategories = [
  "Phones",
  "Laptops/Ipads",
  "Gadgets",
  "Scooty/Bike",
  "Cars",
  "Others",
];

export default function Form({
  name,
  mobile,
  product,
  handleNameChange,
  handleMobileChange,
  handleProductChange,
  handleSubmit,
  loading,
}: FormProps) {
  return (
    <motion.div
      className="mt-4 flex w-full max-w-[20rem] sm:mt-6 sm:max-w-[24rem] flex-col gap-1.5 sm:gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <Input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
          className="h-10 text-sm sm:h-11 sm:text-base"
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={handleMobileChange}
          maxLength={10}
          className="h-10 text-sm sm:h-11 sm:text-base"
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Select value={product} onValueChange={handleProductChange} disabled={loading}>
          <SelectTrigger className="h-10 text-sm sm:h-11 sm:text-base">
            <SelectValue placeholder="Select Product Category" />
          </SelectTrigger>
          <SelectContent>
            {productCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
      <motion.div variants={itemVariants}>
        <EnhancedButton
          variant="expandIcon"
          Icon={FaArrowRightLong}
          onClick={handleSubmit}
          iconPlacement="right"
          className="mt-1 h-10 text-sm sm:mt-2 sm:h-11 sm:text-base w-full"
          disabled={loading}>
          {loading ? "Submitting..." : "Join for Updates & Group Buys"}
        </EnhancedButton>
      </motion.div>
    </motion.div>
  );
}
