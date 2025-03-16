import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/useAxios";
import { editTaskDTO } from "./editTaskModal";

export interface Task {
  data: ITask[];
  pagination: Pagination;
}

export interface ITask {
  _id: string;
  title: string;
  statusTracker: StatusTracker[];
  status: string;
  description: string;
  user_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StatusTracker {
  status: string;
  updateAt: string;
  _id: string;
}

export interface Pagination {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const useGetAllTasks = (email?: { email?: string }) => {
  return useQuery({
    queryKey: ["use_fetch_task", email],
    queryFn: async () => {
      const response = await axios.get("/task", {
        params: {
          email,
        },
      });
      return response.data.data as Task;
    },
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateTask = () => {
  return useMutation({
    mutationKey: ["create-task"],
    mutationFn: async (payload: any) => {
      const response = await axios.post("/task", payload);

      return response.data.data as any;
    },
  });
};

export const useEditTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-task"],
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: editTaskDTO;
      id: string;
    }) => {
      const response = await axios.patch("/task/" + id, payload);
      return response.data.data as any;
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["use_fetch_task"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-task"],
    mutationFn: async (id: string) => {
      const response = await axios.delete("/task/" + id);
      return response.data.data as any;
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["use_fetch_task"] });
    },
  });
};
