import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

const testimonials = [
  {
    name: "Vishal Maurya",
    product: "Scooty",
    quote: "I honestly came just to check prices. Ended up buying my scooty with people I don't even know, haha.",
    avatar: "/face-1.webp",
  },
  {
    name: "Sanya",
    product: "Laptop",
    quote: "I joined out of curiosity more than intent. There was no rush, no spam, just a group slowly forming. Watching the price change as people joined was kind of satisfying.",
    avatar: "/face-3.webp",
  },
  {
    name: "Abhiuday Singh",
    product: "Car",
    quote: "I was honestly confused and tired of the whole car-buying process. Too many calls, too many opinions. Joining this group slowed things down for me in a good way. I didn't feel rushed or pushed.",
    avatar: "/face-2.webp",
  },
];

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <img
              src="/hive-buying-black-logo.svg"
              alt="HiveBuying logo"
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AuthForm mode="signup" />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-foreground lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="max-w-md space-y-8">
          <h2 className="text-2xl font-bold text-white">
            What our buyers say
          </h2>
          <div className="space-y-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm"
              >
                <p className="text-sm leading-relaxed text-white/90">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/60">{t.product} Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
