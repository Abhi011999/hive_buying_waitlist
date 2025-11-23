"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

const brands = [
  { name: "Royal Enfield", logo: "/brands/Royal_Enfield_logo_new.svg" },
  { name: "Tata", logo: "/brands/Tata_logo.svg" },
  { name: "Bajaj", logo: "/brands/Bajaj_auto_logo.svg" },
  { name: "Honda", logo: "/brands/Honda_Motorcycle_and_Scooter_India-Logo.wine.svg" },
  { name: "Mahindra", logo: "/brands/Mahindra_&_Mahindra-Logo.wine.svg" },
  { name: "Ola", logo: "/brands/Ola Consumer logo - Brandlogos.net.svg" },
  { name: "Yamaha", logo: "/brands/Yamaha_Motor_Company-Logo.wine.svg" },
  { name: "Suzuki", logo: "/brands/Suzuki_Motorcycle_India_Limited-Logo.wine.svg" },
  { name: "Hero", logo: "/brands/Hero_MotoCorp-Logo.wine.svg" },
  { name: "TVS", logo: "/brands/TVS_Motor_Company-Logo.wine.svg" },
  { name: "Blue Star", logo: "/brands/Blue_Star_Infotech-Logo.wine.svg" },
  { name: "Samsung", logo: "/brands/Samsung_Electronics-Logo.wine.svg" },
  { name: "LG", logo: "/brands/LG_Electronics-Logo.wine.svg" },
  { name: "OnePlus", logo: "/brands/OnePlus-Logo.wine.svg" },
  { name: "Oppo", logo: "/brands/Oppo-Logo.wine.svg" },
  { name: "Vivo", logo: "/brands/Vivo_(technology_company)-Logo.wine.svg" },
  { name: "Nokia", logo: "/brands/Nokia-Logo.wine.svg" },
  { name: "Redmi", logo: "/brands/Redmi_1S-Logo.wine.svg" },
  { name: "Dell", logo: "/brands/Dell-Logo.wine.svg" },
  { name: "HP", logo: "/brands/Hewlett-Packard-Logo.wine.svg" },
  { name: "KTM", logo: "/brands/KTM-Logo.wine.svg" },
  { name: "Triumph", logo: "/brands/Triumph_Motorcycles_Ltd-Logo.wine.svg" },
  { name: "Jawa", logo: "/brands/Jawa Moto logo - Brandlogos.net.svg" },
  { name: "Apple", logo: "/brands/Apple_Inc.-Logo.wine.svg" },
  { name: "Hyundai", logo: "/brands/hyundai-motor-company-2.svg" },
  { name: "Kia", logo: "/brands/Kia_Motors-Logo.wine.svg" },
  { name: "BMW", logo: "/brands/BMW-Logo.wine.svg" },
  { name: "Mercedes-Benz", logo: "/brands/Mercedes-Benz-Logo.wine.svg" },
  { name: "Audi", logo: "/brands/Audi-Logo.wine.svg" },
  { name: "Land Rover", logo: "/brands/Land_Rover-Logo.wine.svg" },
  { name: "Panasonic", logo: "/brands/Panasonic-Logo.wine.svg" },
  { name: "Daikin", logo: "/brands/Daikin-Logo.wine.svg" },
  { name: "Voltas", logo: "/brands/Voltas_logo.svg" },
  { name: "Haier", logo: "/brands/Haier-Logo.wine.svg" },
  { name: "TCL", logo: "/brands/TCL_Corporation-Logo.wine.svg" },
];

export function BrandLogos() {
  const [showAll, setShowAll] = useState(false);
  
  const mobileCols = 4;
  const desktopCols = 7;
  const initialVisibleCount = Math.min(brands.length, 14);
  const initialBrands = brands.slice(0, initialVisibleCount);
  const additionalBrands = brands.slice(initialVisibleCount);
  const visibleCount = showAll ? brands.length : initialVisibleCount;

  const renderBrandCell = (brand: typeof brands[0], index: number, totalCount: number) => {
    const isLastInRowMobile = (index + 1) % mobileCols === 0;
    const isLastInRowDesktop = (index + 1) % desktopCols === 0;
    const isLastRowMobile = index >= Math.floor(totalCount / mobileCols) * mobileCols;
    const isLastRowDesktop = index >= Math.floor(totalCount / desktopCols) * desktopCols;

    return (
      <div
        key={index}
        className={`flex items-center justify-center aspect-[16/9] p-1 sm:p-1.5 lg:p-2.5 border-gray-800 
        ${!isLastInRowMobile ? 'border-r' : 'border-r-0'} 
        ${!isLastRowMobile ? 'border-b' : 'border-b-0'} 
        ${!isLastInRowDesktop ? 'lg:border-r' : 'lg:border-r-0'} 
        ${!isLastRowDesktop ? 'lg:border-b' : 'lg:border-b-0'}`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={brand.logo}
            alt={brand.name}
            className="max-w-[70%] max-h-[70%] object-contain"
          />
        </div>
      </div>
    );
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 mb-12 sm:mb-16 lg:mb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-6xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
        className="border border-gray-800 rounded-lg overflow-hidden"
        >
          <div className="grid grid-cols-4 lg:grid-cols-7 gap-0">
            {initialBrands.map((brand, index) => renderBrandCell(brand, index, visibleCount))}
            
            <AnimatePresence>
              {showAll && additionalBrands.map((brand, index) => {
                const globalIndex = index + initialVisibleCount;
                const isLastInRowMobile = (globalIndex + 1) % mobileCols === 0;
                const isLastInRowDesktop = (globalIndex + 1) % desktopCols === 0;
                const isLastRowMobile = globalIndex >= Math.floor(brands.length / mobileCols) * mobileCols;
                const isLastRowDesktop = globalIndex >= Math.floor(brands.length / desktopCols) * desktopCols;
                
                return (
                  <motion.div
                    key={`additional-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={`flex items-center justify-center aspect-[16/9] p-1 sm:p-1.5 lg:p-2.5 border-gray-800 
                    ${!isLastInRowMobile ? 'border-r' : 'border-r-0'} 
                    ${!isLastRowMobile ? 'border-b' : 'border-b-0'} 
                    ${!isLastInRowDesktop ? 'lg:border-r' : 'lg:border-r-0'} 
                    ${!isLastRowDesktop ? 'lg:border-b' : 'lg:border-b-0'}`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-w-[70%] max-h-[70%] object-contain"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showAll ? (
            <motion.div
              key="view-more"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-6 flex justify-center"
            >
              <button
                onClick={() => setShowAll(true)}
                className="px-6 py-2.5 border border-gray-800 rounded-lg text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors duration-200"
              >
                View More Brands
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="view-less"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: 0.5 }}
              className="mt-6 flex justify-center"
            >
              <button
                onClick={() => setShowAll(false)}
                className="px-6 py-2.5 border border-gray-800 rounded-lg text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors duration-200"
              >
                View Less
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

