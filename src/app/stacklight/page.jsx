import StackLightPanel from "./StackLightPanel";

export const metadata = {
  title: "Stack Light · Clay Nicholson",
  description: "Remote control for the stack light.",
  robots: { index: false, follow: false },
};

export default function StackLightPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-10">
      <StackLightPanel />
    </main>
  );
}
