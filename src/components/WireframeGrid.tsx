"use client";

import { motion, Variants } from "framer-motion";

const cards = [
    { label: "About" },
    { label: "Featured" },
    { label: "Archive" },
    { label: "Contact" },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function WireframeGrid() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16 md:my-24 w-full max-w-5xl px-6 z-10"
        >
            {cards.map((card, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    className="aspect-[3/4] bg-gray-50 border border-dashed border-gray-200 relative group cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                >
                    <span className="absolute bottom-4 right-4 text-[10px] md:text-xs font-helvetica uppercase tracking-widest text-gray-400 group-hover:text-gray-600 transition-colors">
                        {card.label}
                    </span>
                </motion.div>
            ))}
        </motion.div>
    );
}
