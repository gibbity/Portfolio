"use client";

import { motion } from "framer-motion";

export default function HeroHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center z-10"
        >
            <h1 className="font-helvetica font-bold text-3xl md:text-4xl text-gray-900">
                Shresth Kushwaha
            </h1>
            <p className="font-helvetica font-bold text-gray-500 mt-2 text-lg">
                Product Designer
            </p>
        </motion.div>
    );
}
