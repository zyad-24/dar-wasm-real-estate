export type Property = {
  id: number;
  type: string;
  title: string;
  description: string | null;
  images: string[] | null;
  operations: string[] | null;
  hidden: boolean;
};

export type PreviewFile = {
  id: string;
  file: File;
  url: string;
  type: "image" | "video";
};