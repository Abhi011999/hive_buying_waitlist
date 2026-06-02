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
  },
  {
    id: 11,
    question: "I like the idea of buying together, but how does it actually work from start to finish on Hivebuying?",
    answer: `Hivebuying is built on a simple idea. People should not have to buy expensive products alone. Group buying works when people come together, and Hivebuying makes that process easy and structured.

On the Hivebuying group buying platform, the journey starts when a user selects a category such as cars, bikes, laptops, or home appliances. Hivebuying is designed as a community buying platform, so the focus is not on instant checkout but on collective intent.

Once a category is selected, Hivebuying shows sub categories and specific products. For example, in community buying for cars, users may choose SUVs, sedans, or electric cars. Each product has a clear option to team up and buy.

When a user clicks team up to buy on Hivebuying, they are asked a simple question about how soon they are planning to buy. This helps Hivebuying understand buyer intent and group people correctly. This step is important in group buying India because timing matters as much as price.

After answering the question, the user is added to a Hivebuying group. This group includes people interested in the same product. This is where community buying begins. Users can see how many people are interested, which builds confidence and clarity.

Hivebuying does not force users to buy immediately. The group grows naturally. As more people join, Hivebuying shows stronger demand to sellers. This is the core strength of a group buying platform.

Once the group reaches a target number, Hivebuying moves the group closer to an actual deal. Sellers now see real demand, not random inquiries. This allows Hivebuying to unlock better pricing for the group.

From start to finish, Hivebuying focuses on transparency, patience, and trust. Group buying on Hivebuying feels calm, not rushed. Community buying India works best when buyers feel supported, and Hivebuying is built exactly for that.`
  },
  {
    id: 12,
    question: "Will I really end up paying less, or is Hivebuying just another offer that sounds good at first?",
    answer: `This is one of the most important questions people ask about group buying India. Many users have seen fake discounts and confusing offers. Hivebuying takes a different approach.

Hivebuying is not an offer based platform. It is a group buying platform where prices improve because demand improves. This is a key difference.

In Hivebuying group buying, sellers agree to better pricing when they see real buying intent from multiple people. This is community buying in its pure form. Sellers save money on advertising, sales calls, and negotiations. That saving is shared with buyers.

Community buying India works especially well for high value products. Community buying for cars allows dealers to plan inventory better. Community buying bikes helps brands move stock efficiently. Hivebuying brings these buyers together in one place.

Hivebuying does not promise discounts upfront. Instead, it shows how group size affects pricing. This builds honesty and trust. Buyers can see progress instead of being pushed into urgency.

Group buying platforms like Hivebuying succeed because they remove noise from the buying process. When people buy together, sellers respond differently.

So yes, users often pay less on Hivebuying. But more importantly, they pay fair. Hivebuying makes buying feel transparent instead of manipulative.`
  },
  {
    id: 13,
    question: "What happens if I join a Hivebuying group but not enough people sign up to buy?",
    answer: `This is a genuine concern, and Hivebuying is designed to handle it safely.

Joining a group on Hivebuying does not mean you are locked in. Hivebuying understands that community buying India must feel flexible to build trust.

If a group does not reach the required number, Hivebuying does not force any purchase. There is no penalty. There is no pressure. The group may stay open longer, merge with similar interest groups, or close naturally.

Hivebuying uses this data to understand demand patterns. This helps improve future group buying experiences.

In community buying for cars and community buying bikes, timelines can vary. Hivebuying respects this reality. Buyers are informed clearly and can choose what works for them.

Group buying platforms fail when they punish users. Hivebuying grows by protecting users.

Even if a group does not fill, users walk away with clarity and confidence, not frustration. That is what makes Hivebuying a trusted group buying platform in India.`
  },
  {
    id: 14,
    question: "Is it safe to buy expensive products like cars or laptops through Hivebuying?",
    answer: `Safety is critical in group buying India, especially for big purchases. Hivebuying is designed to support safety, not bypass it.

Hivebuying does not replace sellers or brands. It connects buyers and sellers in a structured way. Final transactions still happen through authorized dealers or trusted sellers.

In community buying for cars, buyers still complete paperwork, payments, and delivery as per standard processes. Hivebuying only helps with collective pricing and demand coordination.

For laptops and electronics, Hivebuying works with verified sellers. Warranty, invoices, and service remain unchanged.

Community buying India becomes safer when people move together. Buyers learn from each other. Questions get answered. Decisions feel less lonely.

Hivebuying builds trust by keeping everything visible and simple. There are no hidden steps. There is no pressure to skip verification.

Group buying platforms succeed when they slow things down and improve decision quality. Hivebuying does exactly that.`
  },
  {
    id: 15,
    question: "Why do brands and sellers agree to Hivebuying and community buying discounts?",
    answer: `This question explains why Hivebuying works as a business model.

Brands want three things. Predictable demand. Lower marketing costs. Faster decision cycles.

Hivebuying delivers all three through group buying.

In traditional selling, brands spend heavily to attract individual buyers. In Hivebuying community buying, buyers come pre-organized. This reduces cost and effort.

Community buying India helps sellers plan inventory better. Community buying for cars helps dealers move stock with confidence. Community buying bikes allows brands to scale faster.

Hivebuying is not asking sellers to reduce prices blindly. It offers them volume, certainty, and efficiency.

Group buying platforms like Hivebuying align incentives. Buyers get better prices. Sellers get reliable demand.

That balance is why Hivebuying is sustainable, not a gimmick.`
  },
  {
    id: 16,
    question: "Why was HiveBuying created and what problem does it solve?",
    answer: `The way people buy products is changing. Customers today are more informed, more price conscious, and more willing to explore smarter ways of purchasing expensive products. Whether someone is buying a car, a bike, a television, a laptop, or a home appliance, the buying journey has become longer and more research driven. Customers compare prices across stores, wait for offers, and often delay purchases because they feel they may not be getting the best value.

HiveBuying was created to solve this problem through a simple but powerful idea. Instead of buying alone, people can buy together. When multiple buyers come together with similar purchase intent, sellers become more open to creating stronger pricing and better offers because they receive higher purchase volume and more serious buyers.

HiveBuying is built around the belief that customers should not feel like they are negotiating alone. Traditional retail and ecommerce models focus on serving individuals one at a time, but HiveBuying introduces collective demand. As a group buying platform India can adopt at scale, HiveBuying creates opportunities for buyers and sellers to benefit together. Customers gain access to better value while stores and dealers receive more qualified demand and improved conversion rates.`
  },
  {
    id: 17,
    question: "Which product categories does HiveBuying support beyond automobiles?",
    answer: `HiveBuying began with a strong focus on the automobile sector because buying vehicles is one of the largest purchasing decisions people make. Customers often spend months researching cars and bikes before making a decision. They visit dealerships, compare models, wait for festive offers, and still wonder whether they received the best deal. HiveBuying identified an opportunity to simplify this process through group buying.

As customer interest grew, HiveBuying started seeing increasing demand outside automobiles. Customers began asking for support in categories such as electronics, gadgets, and home appliances. People purchasing laptops, televisions, refrigerators, washing machines, air conditioners, and smartphones often experience the same challenge. They spend time comparing multiple stores and waiting for discounts before making a final decision.

Today HiveBuying works across automobiles, home appliances, and gadgets with the same mission of helping customers buy better through collective demand. Home appliances have become one of the strongest opportunities for group buying because households frequently make large purchases. Families compare stores, wait for seasonal offers, and postpone purchases because they want stronger value. The electronics and gadgets category has also shown strong demand, as customers are constantly searching for laptops, televisions, gaming devices, smartphones, and smart home products. All categories share the same reality: customers are looking for better ways to buy.`
  },
  {
    id: 18,
    question: "What is HiveBuying's vision for the future of buying?",
    answer: `HiveBuying is not trying to become another marketplace. It is not a listing website and it is not trying to compete with ecommerce giants. Instead, HiveBuying focuses on becoming a trusted layer between customers and sellers. By understanding purchase intent and organizing buyer communities, HiveBuying aims to create outcomes that traditional models often miss.

The idea of a community buying platform extends beyond pricing. It also creates transparency and confidence. Customers often feel uncertain when making expensive purchases. They wonder whether they selected the right product, paid the right amount, or missed a better opportunity elsewhere. When customers buy as part of a larger community, decisions become easier and more informed.

Looking ahead, HiveBuying sees enormous potential across automobiles, home appliances, and gadgets. All these categories share one thing in common: customers are looking for better ways to buy. HiveBuying believes that the next generation of buying will be powered by communities. As a community buying platform and an emerging group buying platform India customers can rely on, HiveBuying is creating a model where customers no longer need to purchase alone. Whether someone is buying a car, upgrading home appliances, or selecting their next gadget, the opportunity to buy together creates stronger outcomes. The future of buying is becoming smarter, more connected, and more community driven.`
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0], isOpen: boolean, onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-border"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-6 text-left hover:opacity-70 transition-opacity"
      >
        <span className="font-medium text-base sm:text-lg text-foreground pr-8">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown className="w-5 h-5 text-foreground" />
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
            <div className="pb-6 pr-12 text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
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
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-muted-foreground"
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
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Still have questions?
          </h2>
          <p className="text-muted-foreground mb-6 text-base sm:text-lg">
            Join our waitlist to stay updated and be the first to know when we launch
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg border-2 border-primary hover:bg-background hover:text-primary transition-colors font-medium"
          >
            Join Waitlist
          </Link>
        </motion.div>
      </div>

      <Particles
        quantityDesktop={200}
        quantityMobile={80}
        ease={80}
        color={"#1a2226"}
        refresh
      />

      <Footer />
    </main>
  );
}

