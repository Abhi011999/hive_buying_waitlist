"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Footer from "@/components/footer";
import Particles from "@/components/ui/particles";

const faqs = [
  {
    id: 1,
    question: "Why do people save more when they buy together instead of waiting for sales?",
    answer: `In India, most people wait for discounts before buying something they want. It could be a phone, a home appliance, or even a pair of shoes. They wait for festivals, coupon codes, or special sale days to get a lower price. But the truth is, these discounts are controlled by brands and retailers, not by buyers.

HiveBuying changes this through a group buying platform that lets people take charge of the price. When people come together for the same product, the brand sees real demand building up. This creates an opportunity for everyone to buy in bulk instead of buying individually. Since brands prefer selling in volume, they are willing to give better prices to groups of buyers.

That is the simple power of buying in groups. When ten or fifty people want the same product, they can form a group on HiveBuying. The moment that group fills up, the price drops automatically. Everyone in that group gets the benefit of less price pay with bulk buying, without having to wait for any sale season or promo code.

It is a fair, people-driven way of saving money. Instead of waiting for brands to offer discounts, HiveBuying lets people create their own discount together.`
  },
  {
    id: 2,
    question: "How does HiveBuying make prices drop without discounts or promo codes?",
    answer: `HiveBuying works on a principle that has existed in business for decades: bulk buying. When someone buys in large quantities, the price per item always goes down. Retailers and wholesalers have used this advantage for years. HiveBuying brings that same logic to regular people through community buying.

Here is how it works. People interested in the same product join one group. When enough buyers come together, that group becomes a bulk order. The brand or seller then offers a lower price because they are selling multiple units at once. There are no coupon codes or seasonal offers involved. The drop in price happens naturally because the group creates a large order that benefits the seller too.

So instead of waiting for offers or negotiating prices alone, HiveBuying helps people buy in bulk with others and share the benefit. Everyone in the group pays less because the cost is reduced by collective demand. This is why buying in groups makes more sense today. It saves money, creates fairness, and puts the power of pricing back in people's hands.`
  },
  {
    id: 3,
    question: "What really happens when a group fills up on HiveBuying?",
    answer: `Every deal on HiveBuying begins with interest. When a few people show interest in a product, a group is created for that item. As more people join that group, the price of the product starts to drop gradually. Once the group reaches its target number of buyers, the deal is confirmed.

At this stage, HiveBuying connects the group directly to the brand or verified seller. The checkout process begins, payments are made securely through trusted gateways, and the bulk buying order is placed. Once completed, the brand ships the products directly to each member of that group.

This process is simple and transparent. The price drop is not because of any sale or festival but because people came together and created enough demand for the brand to sell directly. It is a smarter way of shopping where everyone benefits. The brand sells more at once, and buyers enjoy less price pay with bulk buying.`
  },
  {
    id: 4,
    question: "Why is group buying the smarter way to shop in India's price-sensitive market?",
    answer: `India is one of the most price-sensitive markets in the world. Even a small change in price can delay a buying decision. Many people wait for discounts or EMI options before making a purchase. HiveBuying addresses this very problem by introducing a group buying platform that allows buyers to create their own savings through unity.

When people come together for the same product, they form a community buying group. This group has the same power as a retailer who buys in bulk. The more people join, the lower the price gets. Instead of waiting for brands to reduce prices, people can now act early and buy the product at a fair price created by their collective demand.

It is not only about saving money. Buying in groups also creates a sense of shared trust. People can see others interested in the same product, which builds confidence that they are making a good decision. HiveBuying gives people a way to save together, buy smarter, and bring fairness to pricing in a market that often favors retailers.`
  },
  {
    id: 5,
    question: "How does HiveBuying ensure trust and transparency while buying together?",
    answer: `Trust is one of the biggest barriers in online shopping. People often see ads, reviews, and offers but still hesitate because they do not know what to believe. HiveBuying solves this through clear and open community buying practices.

When you join a group on HiveBuying, you can see how many others are interested in the same product. The progress of the group is visible, such as how close it is to filling up, how much the price has dropped, and when the deal will close. This transparency helps people feel confident about their decisions.

Payment is processed through secure, verified gateways. HiveBuying never stores sensitive card data, UPI PINs, or private information. Group data is encrypted and never shared publicly. This makes buying in groups both safe and reliable.

In short, people do not have to trust advertisements anymore. They can trust the activity they see, a growing group of buyers who want the same thing. That is how group buying platforms like HiveBuying rebuild trust in online shopping.`
  },
  {
    id: 6,
    question: "What are the biggest myths about collective buying and what's actually true?",
    answer: `Many people have heard about group buying platforms but are not sure how they really work. Some common myths often stop people from trying it.

Myth 1: Group buying is complicated.
Truth: HiveBuying makes it simple. You choose a product, answer two short questions (how soon and where), and the system finds a group that fits you best.

Myth 2: It takes too long to form a group.
Truth: In reality, groups fill up quickly because people are always searching for the same popular products.

Myth 3: Bulk buying is only for shops or wholesalers.
Truth: HiveBuying gives individuals the same advantage as retailers. By buying in bulk, people can enjoy wholesale prices without needing to buy huge quantities alone.

Myth 4: It's risky.
Truth: HiveBuying is transparent, safe, and uses secure payment systems. The entire process is visible, and users stay informed at every stage.

So what was once a business tactic, bulk buying, is now available to everyone. It is practical, easy, and built on trust.`
  },
  {
    id: 7,
    question: "How do brands benefit when people buy as a group on HiveBuying?",
    answer: `Brands benefit greatly from community buying. Traditionally, they spend heavily on marketing, discounts, and distribution to reach individual customers. But on HiveBuying, they sell directly to ready buyers, people already committed to purchasing.

When people come together to buy in bulk, brands receive a confirmed bulk order instead of hundreds of small ones. This reduces logistics costs, packaging waste, and storage overheads. It also shortens the sales cycle because deals happen faster.

At the same time, brands get to connect with genuine buyers instead of running expensive ad campaigns. It becomes a win-win model where brands sell more efficiently, and buyers pay less with bulk buying. HiveBuying is not just good for consumers; it is good for the entire retail ecosystem.`
  },
  {
    id: 8,
    question: "Is HiveBuying safe? How does it protect payments and personal data?",
    answer: `Safety is one of HiveBuying's top priorities. Every transaction made on the group buying platform is handled through trusted, encrypted gateways that meet PCI-DSS security standards. HiveBuying does not store card numbers, CVV codes, or UPI PINs.

User information such as name, phone number, and address is stored securely and used only for order processing. Group data, such as who joined and when, is protected and never shared publicly.

When users participate in buying in groups, they can see group progress, but no personal details of other members are visible. This balance of transparency and privacy keeps the platform safe. HiveBuying also uses SSL encryption and regular audits to maintain security standards.

So yes, HiveBuying is completely safe. It allows people to enjoy community buying and bulk buying benefits without any compromise on trust or data protection.`
  },
  {
    id: 9,
    question: "Can group buying change how Indians shop online?",
    answer: `Yes, it absolutely can. India's online shopping habits are built around waiting, waiting for discounts, offers, and price drops. But that system keeps people dependent on brands and retailers. Group buying platforms like HiveBuying give people control instead.

When people buy together, they create their own pricing advantage. The more who join, the less each one pays. It encourages early action and removes the need to wait for sales. It also builds trust because buyers can see that others want the same thing.

Over time, this idea of community buying can change how India shops. Instead of competing for discounts, people can collaborate to create them. That is a more inclusive, fair, and people-driven form of commerce.

HiveBuying is part of this shift, making shopping collective, social, and smarter through the power of buying in bulk.`
  },
  {
    id: 10,
    question: "What makes HiveBuying different from regular e-commerce platforms?",
    answer: `Regular e-commerce platforms are built for individual buyers. You browse, add items to your cart, wait for a discount, and buy when the price feels right. HiveBuying is different because it is built on the idea of buying together.

On HiveBuying, the discount is not set by the brand; it is created by people. When users show interest in the same product, they form a group. As the group grows, the price goes down. Once it reaches the target number, the brand sells directly to that group at the best rate possible.

This is the essence of community buying and bulk buying. It combines the convenience of online shopping with the power of shared demand. Instead of waiting for festive deals or coupon codes, buyers can simply come together and unlock better prices.

HiveBuying is not just another shopping site; it is a group buying platform that changes how people think about value. It brings people, technology, and brands together in one place to make buying fair for everyone.`
  }
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0], isOpen: boolean, onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-black/10"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-6 text-left hover:opacity-70 transition-opacity"
      >
        <span className="font-medium text-base sm:text-lg text-black pr-8">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown className="w-5 h-5 text-black" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-12 text-sm sm:text-base text-gray-700 whitespace-pre-line leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQsPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-clip">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-black mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-gray-600"
          >
            Everything you need to know about HiveBuying and group purchasing
          </motion.p>
        </div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl px-4 sm:px-6"
        >
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center rounded-xl p-8 sm:p-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6 text-base sm:text-lg">
            Join our waitlist to stay updated and be the first to know when we launch
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Join Waitlist
          </Link>
        </motion.div>
      </div>

      <Particles
        quantityDesktop={200}
        quantityMobile={80}
        ease={80}
        color={"#000000"}
        refresh
      />

      <Footer />
    </main>
  );
}

