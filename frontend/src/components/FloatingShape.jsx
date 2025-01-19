import { motion } from 'framer-motion'

const FloatingShape = (color, size, top, left, delay) => {
  return (
    <motion.div
        className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl ${top} ${left}`}
        animate={{ 
            y: ["0%", "100%", "0%"],
            x: ["0%", "100%", "0%"],
            rotate: [0, 360],
        }}
        transition={{ duration: 3, delay: delay, repeat: Infinity }}
    >FloatingShape</motion.div>
  )
}

export default FloatingShape