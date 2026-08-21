import type { ToastManagerAddOptions } from "@base-ui/react/toast";
import { format } from "date-fns";

import { toast as defaultToast } from "@/components/ui/toast";

type Props = Omit<ToastManagerAddOptions<object>, "description">;

function toast(props: Props) {
  return defaultToast.add({
    ...props,
    description: format(new Date(), "PPP 'at' p"),
  });
}

export { toast };
