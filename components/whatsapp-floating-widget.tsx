import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

export default function WhatsappFloatingWidget() {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      <Link
        href="https://wa.link/psnvgp"
        rel="noopener noreferrer"
        target="_blank"
        className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-300 ease-linear shadow-lg hover:shadow-xl hover:scale-110"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
      </Link>
      <div className="flex flex-col">
        <p className="text-xs sm:text-sm font-medium text-gray-700">For any queries</p>
      </div>
    </div>
  );
}

