"use client";

import { useState, useCallback } from "react";
import Preloader from "./Preloader";
import { motion, AnimatePresence } from "framer-motion";


export default function ClientLayout({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    const handleComplete = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <>
            <Preloader onComplete={handleComplete} />
            <AnimatePresence>
                {!isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}