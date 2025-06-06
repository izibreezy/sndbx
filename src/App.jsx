import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SilentTemple() {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState("");
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const audio = new Audio("/ambient.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(() => {});
    return () => audio.pause();
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newEntry = input;
    setEntries((prev) => [...prev, newEntry]);
    setInput("");
    setFade(true);
    setTimeout(() => {
      setEntries([]);
      setFade(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="animate-flicker w-96 h-96 bg-gradient-radial from-yellow-100/20 to-transparent rounded-full blur-3xl mx-auto mt-20" />
      </div>

      <div className="text-center mb-8 z-10">
        <h1 className="text-2xl md:text-4xl font-light tracking-wider mb-2">
          Молчаливый храм
        </h1>
        <p className="text-sm md:text-base opacity-50">
          Оставь свою мысль — и она исчезнет навсегда
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col items-center z-10"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напиши что-то..."
          className="bg-transparent border-b border-white focus:outline-none text-center text-lg py-2 w-full placeholder-gray-500"
        />
      </form>

      <AnimatePresence>
        {fade && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="mt-8 text-center z-10"
          >
            <p className="text-md opacity-50 italic">мысль растворилась...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 text-xs text-gray-600 z-10">
        Тишина глубже, чем кажется
      </div>
    </div>
  );
}
