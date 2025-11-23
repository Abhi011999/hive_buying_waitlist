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
import { PRODUCT_CATEGORIES, LOCATIONS } from "@/lib/constants";

interface FormProps {
  name: string;
  mobile: string;
  product: string;
  location: string;
  note: string;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMobileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleProductChange: (value: string) => void;
  handleLocationChange: (value: string) => void;
  handleNoteChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  loading: boolean;
  submitted: boolean;
}

export default function Form({
  name,
  mobile,
  product,
  location,
  note,
  handleNameChange,
  handleMobileChange,
  handleProductChange,
  handleLocationChange,
  handleNoteChange,
  handleSubmit,
  loading,
  submitted,
}: FormProps) {
  return (
    <motion.div
      className="mt-4 flex w-full max-w-[28rem] sm:mt-6 flex-col gap-3 sm:gap-4 p-6 sm:p-8"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: '3rem',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25), 0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">
          {submitted ? "Thanks for being Awesome!" : "Join for Updates & Group Buys"}
        </h2>
      </motion.div>
      
      {!submitted && (
        <>
          <motion.div variants={itemVariants}>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={handleNameChange}
              className="h-10 text-sm sm:h-11 sm:text-base bg-transparent border-black/30"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={handleMobileChange}
              maxLength={10}
              className="h-10 text-sm sm:h-11 sm:text-base bg-transparent border-black/30"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Select value={product} onValueChange={handleProductChange} disabled={loading}>
              <SelectTrigger className="h-10 text-sm sm:h-11 sm:text-base bg-transparent border-black/30">
                <SelectValue placeholder="Select Product Category" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Select value={location} onValueChange={handleLocationChange} disabled={loading}>
              <SelectTrigger className="h-10 text-sm sm:h-11 sm:text-base bg-transparent border-black/30">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div variants={itemVariants}>
            <textarea
              placeholder="Your Note (Optional)"
              value={note}
              onChange={handleNoteChange}
              rows={2}
              className="w-full text-sm sm:text-base bg-transparent border border-black/30 rounded-md px-3 py-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <EnhancedButton
              variant="expandIcon"
              Icon={FaArrowRightLong}
              onClick={handleSubmit}
              iconPlacement="right"
              className="mt-1 h-10 text-sm sm:mt-2 sm:h-11 sm:text-base w-full"
              disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </EnhancedButton>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
