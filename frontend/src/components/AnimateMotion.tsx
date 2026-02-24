import { motion } from "framer-motion";
import type React from "react";

function AnimateMotion({
  children,
  delay = 0.2,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: delay }}
    >
      {children}
    </motion.div>
  );
}

export default AnimateMotion;
