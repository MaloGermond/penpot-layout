import "./style.css";

// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

document.querySelector("[data-handler='create-guides']")?.addEventListener("click", () => {
  // send message to plugin.ts
  parent.postMessage("create-guides", "*");
});

document.querySelector("[data-handler='clear-guides']")?.addEventListener("click", () => {
  // send message to plugin.ts
  parent.postMessage("clear-guides", "*");
});

document.querySelector("[data-handler='fill-horizontal']")?.addEventListener("click", () => {
  // send message to plugin.ts
  parent.postMessage("fill-horizontal", "*");
});

document.querySelector("[data-handler='fill-vertical']")?.addEventListener("click", () => {
  // send message to plugin.ts
  parent.postMessage("fill-vertical", "*");
});

document.querySelector("[data-handler='invert-colors']")?.addEventListener("click", () => {
  // send message to plugin.ts
  parent.postMessage("invert-colors", "*");
});



document.querySelector("[data-handler='fill-both']")?.addEventListener("click", () => {
  // send message to plugin.ts
  parent.postMessage("fill-both", "*");
});

document.querySelector("[data-handler='log-selection']")?.addEventListener("click", () => {
  // send message to plugin.ts
  parent.postMessage("log-selection", "*");
});

// Listen plugin.ts messages
window.addEventListener("message", (event) => {
  if (event.data.source === "penpot") {
    document.body.dataset.theme = event.data.theme;
  }
});
