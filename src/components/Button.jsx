export default function Button({ text, href }) {
  return (
    <a
      href={href}
      className="rounded-full bg-[#3B82F6] px-6 py-3 font-bold text-white transition-colors hover:bg-[#2563EB]"
    >
      {text}
    </a>
  );
}
