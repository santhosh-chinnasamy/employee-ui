export function filterParams() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  params.set("limit", params.get("limit") || 25);
  params.set("page", params.get("page") || 1);

  return params.toString();
}
