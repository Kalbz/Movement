export function createSpacer({
  direction = "vertical",
  size = "0",
  background = "",
  grow = true
} = {}) {
  const spacer = document.createElement("div");

  const heightClass = direction === "vertical" ? `h-${size}` : "h-full";
  const widthClass = direction === "horizontal" ? `w-${size}` : "w-full";
  const growClass = grow ? "flex-grow" : "";

  const className = `${widthClass} ${heightClass} ${background} ${growClass}`;


  spacer.className = className;
  return spacer;
}
