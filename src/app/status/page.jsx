import StatusBoard from "./StatusBoard";

export const metadata = {
  title: "Status · Clay Nicholson",
  description: "Live status and uptime of claynicholson.com services.",
};

export default function StatusPage() {
  return (
    <main className="status-page">
      <nav className="site-header">
        <a href="/">Home</a>
        <a href="/blog">Blog</a>
      </nav>
      <StatusBoard />
    </main>
  );
}
