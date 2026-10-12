export function getYoutubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    let id = "";
    if (u.hostname.includes("youtu.be")) {
      id = u.pathname.slice(1);
    } else if (u.searchParams.has("v")) {
      id = u.searchParams.get("v")!;
    } else if (u.pathname.startsWith("/embed/")) {
      id = u.pathname.replace("/embed/", "");
    }
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null;
  }
}
