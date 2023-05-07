import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({ label, content, search }) => {
  const [isOpen, setIsOpen] = useState(false);

  const highlightMatch = (text, search) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, index) => {
      if (part.toLowerCase() === search.toLowerCase()) {
        return <mark className=" bg-yellow-100" key={index}>{part}</mark>;
      } else {
        return part;
      }
    });
  };

  return (
    <motion.div>
      <motion.div
        key="label"
        className="rounded-tr-md relative z-20  rounded-br-md shadow-sm px-1 py-2 cursor-pointer font-open"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div className="text-gray-800 font-bold ml-1">
          {highlightMatch(label, search)}
        </motion.div>
      </motion.div>

      {isOpen && (
        <motion.div
          key="content"
          className="p-2 text-lg text-gray-700  border-b border-gray-500 bg-slate-100"
        >
          {content}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Accordion;
