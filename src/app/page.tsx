import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F0F4F8] font-sans text-[#1A202C]">
      <header className="flex justify-center p-6">
        <Image src="/images/logo.png" alt="Maven logo" width={120} height={40} priority />
      </header>

      <main className="flex grow flex-col items-center justify-center p-8 text-center">
        <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
          Answer 93% of customer support tickets autonomously
        </h1>
        <p className="mb-8 max-w-2xl text-xl">
          Transform your customer experience with Maven&apos;s Generative AI without the complex
          setup.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="https://mavenagi.com"
            className="rounded-full bg-[#3B82F6] px-6 py-3 font-bold text-white transition-colors hover:bg-[#2563EB]"
          >
            Get Started
          </a>
          <a
            href="https://mavenagi.com"
            className="rounded-full border border-[#3B82F6] px-6 py-3 font-bold text-[#3B82F6] transition-colors hover:bg-[#3B82F6] hover:text-white"
          >
            Learn More
          </a>
        </div>
      </main>

      <footer className="p-6 text-center text-sm text-[#4A5568]">
        <p>&copy; 2024 Maven. All rights reserved.</p>
      </footer>
    </div>
  );
}
