import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8] text-[#1A202C] font-sans">
      <header className="p-6 flex justify-center">
        <Image src="/logo.png" alt="Maven logo" width={120} height={40} priority />
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Answer 93% of customer support tickets autonomously
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Transform your customer experience with Maven&apos;s Generative AI without the complex
          setup.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://mavenagi.com"
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            Get Started
          </a>
          <a
            href="https://mavenagi.com"
            className="border border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white font-bold py-3 px-6 rounded-full transition-colors"
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
