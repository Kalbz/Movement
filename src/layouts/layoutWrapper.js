export function wrapWithLayout(component, { align = "center", padding = "py-4", maxWidth = "w-full", background = "" } = {}) {
  const wrapper = document.createElement("div");

  const alignClass = {
    left: "flex justify-start",
    center: "flex justify-center",
    right: "flex justify-end",
    stretch: "flex justify-stretch"
  }[align] || "flex justify-center";

  wrapper.className = `${alignClass} ${padding} ${background}`;
  
  const inner = document.createElement("div");
  inner.className = maxWidth;

  inner.appendChild(component);
  wrapper.appendChild(inner);

  return wrapper;
}
