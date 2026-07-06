export type Property = {
  id: number;
  type: string;
  title: string;
  description: string | null;
  images: string[] | null;
  operations: string[] | null;
  hidden: boolean;
  contact_phone: string | null;
  property_location_url: string | null;
  show_location_button: boolean;
};

export type PreviewFile = {
  id: string;
  file: File;
  url: string;
  type: "image" | "video";
};