export function createDivider(left, right, options = {}) {
  const wrapper = document.createElement("div");

  const isVertical = options.vertical ?? false;
  const dividerText = options.text ?? "";
  const alignment = options.alignment ?? "center";

  const colorOptions = [
    "", // default
    "divider-neutral",
    "divider-primary",
    "divider-secondary",
    "divider-accent",
    "divider-success",
    "divider-warning",
    "divider-info",
    "divider-error",
  ];

  const randomColor =
    colorOptions[Math.floor(Math.random() * colorOptions.length)];

  wrapper.className = isVertical
    ? "flex w-full items-center justify-center gap-4 my-6"
    : "flex w-full flex-col items-center gap-2 my-6";

  const divider = document.createElement("div");
  divider.className = [
    "divider",
    isVertical ? "divider-horizontal" : "",
    alignment !== "center" ? `divider-${alignment}` : "",
    randomColor,
  ]
    .join(" ")
    .trim();

  divider.textContent = dividerText;

  wrapper.appendChild(left);
  wrapper.appendChild(divider);
  wrapper.appendChild(right);

  return wrapper;
}
