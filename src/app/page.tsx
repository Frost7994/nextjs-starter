import type { Metadata } from "next";

// meta
export const metadata: Metadata = {
  title: "Mediqly | Home",
  description: "A platform for medical students to learn and practice medical knowledge",
};

export default function HomePage() {
  return (
    <div>
      <p>Home Page</p>
    </div>
  );
}
