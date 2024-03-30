import { ApiRoutes } from "@/constants";
import { usePostFormData } from ".";

interface UploadResponse {
  filepath: string;
  mimetype: string;
  mtime: string;
  newFilename: string;
  originalFilename: string;
  size: number;
}

export const usePostImg = () => {
  return usePostFormData<FormData, string>(ApiRoutes.Image);
};

// export const useUploadImg = () => {
//   return usePostForm<unknown, FormData, { [key: string]: UploadResponse[] }>(
//     toUrl(ApiRoutes.Image)
//   );
// };
