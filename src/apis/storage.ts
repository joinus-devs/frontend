import { ApiRoutes } from "@/constants";
import { usePostFormData } from ".";
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
