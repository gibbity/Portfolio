"use client";

import { motion } from "framer-motion";

export default function FooterHeadline() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            className="z-10 text-center px-4"
        >
            <h2 className="font-helvetica font-bold text-5xl md:text-7xl lg:text-[7rem] leading-none tracking-tight text-gray-900 pointer-events-none select-none">
                Research. Ux. Ui. AI assisted development. Code.
            </h2>
        </motion.div>
    );
}
