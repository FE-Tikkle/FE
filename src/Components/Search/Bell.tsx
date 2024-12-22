import { motion } from "framer-motion"

const Bell = () => {
  return (
    <motion.div
    whileHover={{
        scale: 1.2,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}>
      <img src="img/bell.svg" alt="bell" />
    </motion.div>
  )
}

export default Bell
