import { useState, useRef, useEffect } from "react";

const Accordion = ({ label, content, search }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      contentRef.current.style.height = `${140}px`;
    } else {
      contentRef.current.style.height = "0px";
    }
  }, [isOpen]);

  const highlightMatch = (text, search) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, index) => {
      if (part.toLowerCase() === search.toLowerCase()) {
        return <mark className="bg-yellow-100" key={index}>{part}</mark>;
      } else {
        return part;
      }
    });
  };

  return (
    <div className="">
      <div
        key="label"
        className="rounded-tr-md relative z-20  rounded-br-md shadow-sm px-1 py-2 cursor-pointer font-open"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-gray-800 font-bold ml-1">
          {highlightMatch(label, search)}
        </div>
      </div>

      <div
        key="content"
        className="text-lg text-gray-700 border-b border-gray-500 bg-slate-100"
        style={{ overflow: "hidden", position: "relative" }}
      >
        <div
          ref={contentRef}
          className="transition-height duration-300"
          style={{ height: "0px" }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
