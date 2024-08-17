import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import { cvPoolQueries } from "./queries";
import { useRef } from "react";
import { CommentType } from "@/type";

export const useGetDetailCvPool = (id?: string) => {
  return useQuery({
    queryKey: ["cv", id],
    queryFn: id ? () => cvPoolQueries.getDetailsCv(id) : skipToken,
  });
};

export const useGetAllComments = (id?: string) => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: id ? () => cvPoolQueries.getAllComments(id) : skipToken,
  });
};

export const usePostComment = ({
  onSuccess,
  onMutate,
  onError,
}: {
  onSuccess?: () => void;
  onMutate?: () => void;
  onError?: (error: unknown) => void;
}) => {
  const toastRef = useRef<string | null>(null);
  return useMutation({
    mutationFn: async (body: CommentType) => cvPoolQueries.postComment(body),
    onMutate: () => {
      onMutate?.();
    },
    onSuccess: () => {
      toastRef.current = null;
      onSuccess?.();
    },
    onError: (error) => {
      toastRef.current = null;
      onError?.(error);
    },
  });
};
