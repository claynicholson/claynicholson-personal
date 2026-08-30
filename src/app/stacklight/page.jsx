import StackLightPanel from "./StackLightPanel";

export const metadata = {
  title: "Stack light",
  description: "Remote control for the stack light.",
  robots: { index: false, follow: false },
};

// Full-bleed: the panel paints its own dark surface, since a light source can
// only be rendered convincingly against a dark one.
export default function StackLightPage() {
  return (
    <main>
      <StackLightPanel />
    </main>
  );
}
