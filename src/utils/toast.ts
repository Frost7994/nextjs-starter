import { format } from "date-fns";
import { toast as sonner } from "sonner";

export const toast = (message: string) => {
  return sonner(message, {
    description: format(new Date(), "PPPP 'at' p"),
  });
};
