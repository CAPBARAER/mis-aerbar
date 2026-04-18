// Este archivo NO es un servidor real.
// Solo actúa como endpoint de notificaciones de GitHub Pages.

let last = Date.now();

// Cuando recibe ?nueva=true, actualiza timestamp
if (location.search.includes("nueva=true")) {
  localStorage.setItem("notif-" + new URL(location.href).searchParams.get("capilla"), Date.now());
}

// SSE artificial
if (typeof EventSource === "undefined") {
  // Navegador incompatible
} else {
  setInterval(() => {
    const capilla = new URL(location.href).searchParams.get("capilla");
    const t = localStorage.getItem("notif-" + capilla);
    if (t && t > last) {
      last = parseInt(t);
      parent.postMessage("new", "*");
    }
  }, 1000);
}
