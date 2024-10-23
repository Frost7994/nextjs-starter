import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function GlobalError() {
  return (
    <div>
      <h2>Not Found</h2>
      <Link href="/" className={buttonVariants()}>
        Go Home
      </Link>
    </div>
  );
}
