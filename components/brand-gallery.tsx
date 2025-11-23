"use client";

import { motion } from "framer-motion";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

const photos = [
  {
    src: "/gallery/Generated Image November 22, 2025 - 5_31PM.webp",
    width: 1344,
    height: 768,
    alt: "Brand collaboration 1",
  },
  {
    src: "/gallery/Generated Image November 22, 2025 - 5_35PM.webp",
    width: 1344,
    height: 768,
    alt: "Brand collaboration 2",
  },
  {
    src: "/gallery/Generated Image November 22, 2025 - 8_38PM.webp",
    width: 1344,
    height: 768,
    alt: "Brand collaboration 3",
  },
  {
    src: "/gallery/IMG_6614.webp",
    width: 3946,
    height: 2218,
    alt: "Brand collaboration 4",
  },
  {
    src: "/gallery/IMG_6618.webp",
    width: 8064,
    height: 4536,
    alt: "Brand collaboration 5",
  },
  {
    src: "/gallery/IMG_6619.webp",
    width: 3209,
    height: 3973,
    alt: "Brand collaboration 6",
  },
  {
    src: "/gallery/IMG_6620.webp",
    width: 5704,
    height: 3209,
    alt: "Brand collaboration 7",
  },
  {
    src: "/gallery/IMG_6621.webp",
    width: 5398,
    height: 5533,
    alt: "Brand collaboration 8",
  },
  {
    src: "/gallery/IMG_6622.webp",
    width: 4847,
    height: 6142,
    alt: "Brand collaboration 9",
  },
  {
    src: "/gallery/IMG_6642.webp",
    width: 5577,
    height: 3137,
    alt: "Brand collaboration 10",
  },
  {
    src: "/gallery/IMG_6646.webp",
    width: 5246,
    height: 2951,
    alt: "Brand collaboration 11",
  },
  {
    src: "/gallery/IMG_6648.webp",
    width: 5712,
    height: 3213,
    alt: "Brand collaboration 12",
  },
  {
    src: "/gallery/IMG_6651.webp",
    width: 2268,
    height: 4032,
    alt: "Brand collaboration 13",
  },
  {
    src: "/gallery/IMG_6654.webp",
    width: 4032,
    height: 2268,
    alt: "Brand collaboration 14",
  },
  {
    src: "/gallery/IMG_6655.webp",
    width: 2268,
    height: 4032,
    alt: "Brand collaboration 15",
  },
  {
    src: "/gallery/IMG_6681.webp",
    width: 4032,
    height: 2268,
    alt: "Brand collaboration 16",
  },
  {
    src: "/gallery/IMG_6685.webp",
    width: 4032,
    height: 2268,
    alt: "Brand collaboration 17",
  },
  {
    src: "/gallery/IMG_6687.webp",
    width: 4032,
    height: 2268,
    alt: "Brand collaboration 18",
  },
  {
    src: "/gallery/IMG_6689.webp",
    width: 4032,
    height: 2268,
    alt: "Brand collaboration 19",
  },
  {
    src: "/gallery/IMG_6692.webp",
    width: 4032,
    height: 2268,
    alt: "Brand collaboration 20",
  },
  {
    src: "/gallery/IMG_6693.webp",
    width: 4032,
    height: 2268,
    alt: "Brand collaboration 21",
  },
  {
    src: "/gallery/IMG_6695.webp",
    width: 4032,
    height: 2268,
    alt: "Brand collaboration 22",
  },
  {
    src: "/gallery/IMG_6696.webp",
    width: 4032,
    height: 2268,
    alt: "Brand collaboration 23",
  },
  {
    src: "/gallery/IMG_6701.webp",
    width: 4032,
    height: 2268,
    alt: "Brand collaboration 24",
  },
  {
    src: "/gallery/IMG_6704.webp",
    width: 4032,
    height: 2268,
    alt: "Brand collaboration 25",
  },
  {
    src: "/gallery/IMG_6709.webp",
    width: 5712,
    height: 4284,
    alt: "Brand collaboration 26",
  },
  {
    src: "/gallery/IMG_6711.webp",
    width: 4032,
    height: 3024,
    alt: "Brand collaboration 27",
  },
  {
    src: "/gallery/IMG_6713.webp",
    width: 4032,
    height: 3024,
    alt: "Brand collaboration 28",
  },
  {
    src: "/gallery/IMG_6721.webp",
    width: 5712,
    height: 4284,
    alt: "Brand collaboration 29",
  },
  {
    src: "/gallery/WhatsApp Image 2025-11-22 at 10.58.17 PM (2).webp",
    width: 1206,
    height: 689,
    alt: "Brand collaboration 30",
  },
  {
    src: "/gallery/WhatsApp Image 2025-11-22 at 10.58.43 PM (1).webp",
    width: 914,
    height: 637,
    alt: "Brand collaboration 31",
  },
  {
    src: "/gallery/image.webp",
    width: 1024,
    height: 1024,
    alt: "Brand collaboration 32",
  },
];

export function BrandGallery() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-semibold mb-3">
            Partnered With India's Most Trusted Brands
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            See our collaborations and partnerships across the nation
          </p>
        </motion.div>

        {/* Photo Album */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <RowsPhotoAlbum
            photos={photos}
            targetRowHeight={100}
            spacing={6}
            rowConstraints={{ maxPhotos: 5 }}
          />
        </motion.div>
      </div>
    </section>
  );
}

