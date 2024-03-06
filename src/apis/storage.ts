import { ApiRoutes } from "@/constants";
import { usePostForm, usePostFormData } from ".";
import { toUrl } from "@/utils";

interface UploadResponse {
  filepath: string;
  mimetype: string;
  mtime: string;
  newFilename: string;
  originalFilename: string;
  size: number;
}

export const usePostImg = () => {
  return usePostFormData(ApiRoutes.Image);
};

export const useUploadImg = () => {
  return usePostForm<unknown, FormData, { [key: string]: UploadResponse[] }>(
    toUrl(ApiRoutes.Image)
  );
};
