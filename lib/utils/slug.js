export function toSlug(str) {
  if (!str) return "mi-proyecto";
  return (
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")   // quita acentos
      .replace(/[^a-z0-9\s-]/g, "")      // sólo alfanumérico
      .replace(/\s+/g, "-")              // espacios → guiones
      .replace(/-+/g, "-")               // colapsa guiones dobles
      .trim() || "mi-proyecto"
  );
}
