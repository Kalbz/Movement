export function createDivider(left, right, options = {}) {
  const wrapper = document.createElement("div");

  const isVertical = options.vertical ?? false;
  const dividerText = options.text ?? "";
  const alignment = options.alignment ?? "center"; // 'start' | 'center' | 'end'

  // 🟡 Define possible daisyUI colors
  const colorOptions = [
    "", // default
    "divider-neutral",
    "divider-primary",
    "divider-secondary",
    "divider-accent",
    "divider-success",
    "divider-warning",
    "divider-info",
    "divider-error"
  ];

  // 🔀 Randomly choose one
  const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];

  // Set wrapper layout
  wrapper.className = isVertical ? "flex w-full items-center gap-4 my-6" : "flex w-full flex-col gap-2 my-6";

  // Create divider
  const divider = document.createElement("div");
  divider.className = [
    "divider",
    isVertical ? "divider-horizontal" : "",
    alignment !== "center" ? `divider-${alignment}` : "",
    randomColor
  ].join(" ").trim();

  divider.textContent = dividerText;

  // Append elements
  wrapper.appendChild(left);
  wrapper.appendChild(divider);
  wrapper.appendChild(right);

  return wrapper;
}
