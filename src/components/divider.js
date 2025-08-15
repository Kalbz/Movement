import { getColorFromTheme } from "../generators/colorImageGenerator";
import { getCurrentTheme } from "../generators/colorImageGenerator";


export function createDivider(left, right, options = {}) {
  const wrapper = document.createElement("div");

  const isVertical = options.vertical ?? false;
  const dividerText = options.text ?? "";
  const alignment = options.alignment ?? "center";
  const themeName = options.themeName || getCurrentTheme();

  const themeColor = getColorFromTheme(themeName);

  wrapper.className = isVertical
    ? "flex w-full items-center justify-center gap-4 my-6"
    : "flex w-full flex-col items-center gap-2 my-6";

  const divider = document.createElement("div");
  divider.className = [
    "divider",
    isVertical ? "divider-horizontal" : "",
    alignment !== "center" ? `divider-${alignment}` : "",
  ]
    .join(" ")
    .trim();

  divider.textContent = dividerText;

  divider.style.setProperty("--tw-border-opacity", "1");
  divider.style.borderColor = themeColor;
  divider.style.color = themeColor;

  wrapper.appendChild(left);
  wrapper.appendChild(divider);
  wrapper.appendChild(right);

  console.log("Dividererrrrrrrrr");

  return wrapper;
}