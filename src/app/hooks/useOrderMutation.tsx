import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrdertsService, updateOrderStatusService } from "@/app/services/orderService";
import { updateUserService, updateUserStatusService } from "../services/userService";

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOrdertsService,
    onSuccess: () => {
      // refetch danh sách orders
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatusService,
    onSuccess: (_, variables) => {
      // refetch order detail + danh sách
      queryClient.invalidateQueries({ queryKey: ["order", variables.reference] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
/** customer mutate */
export const useUpdateUserStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserStatusService,
    onSuccess: (_, variables) => {
      // refetch order detail + danh sách
      queryClient.invalidateQueries({ queryKey: ["customer", variables.customerId] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserService,
    onSuccess: (_, variables) => {
      // refetch order detail + danh sách
      queryClient.invalidateQueries({ queryKey: ["customer", variables.customerId] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};
// export const useCancelOrderMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: cancelOrderService,
//     onSuccess: (_, reference) => {
//       queryClient.invalidateQueries({ queryKey: ["orders"] });
//       queryClient.invalidateQueries({ queryKey: ["order", reference] });
//     },
//   });
// };
