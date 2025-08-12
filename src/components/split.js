// components/split.js
export function createSplit({ children = [], ratio = "1:1", reverse = false, gap = "gap-8" } = {}) {
  const [leftNode, rightNode] = children;

  const ratioClasses = {
    "1:1": ["md:w-1/2", "md:w-1/2"],
    "2:1": ["md:w-2/3", "md:w-1/3"],
    "1:2": ["md:w-1/3", "md:w-2/3"],
    "3:2": ["md:w-3/5", "md:w-2/5"],
    "2:3": ["md:w-2/5", "md:w-3/5"],
  };
  const [leftW, rightW] = ratioClasses[ratio] || ratioClasses["1:1"];

  const section = document.createElement("section");
  section.className = [
    "w-full max-w-6xl mx-auto px-4",
    "flex flex-col md:flex-row",
    reverse ? "md:flex-row-reverse" : "",
    gap,
    "items-start",  // vertical align on desktop
    "text-left"     // override app's text-center inside this component
  ].join(" ").replace(/\s+/g," ").trim();

  const L = document.createElement("div");
  L.className = `${leftW} w-full md:px-4 mb-6 md:mb-0`;
  if (leftNode) L.appendChild(leftNode);

  const R = document.createElement("div");
  R.className = `${rightW} w-full md:px-4`;
  if (rightNode) R.appendChild(rightNode);

  section.append(L, R);
  return section;
}
