export function showView(id) {
  document.querySelectorAll("main section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}
