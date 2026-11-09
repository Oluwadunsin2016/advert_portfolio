import type { Metadata } from "next";
import { OrientationPage } from "@/components/orientation-page";

export const metadata: Metadata = {
  title: "Landscape Work",
  description: "All landscape AI advert videos.",
};

export default function LandscapeWorkPage() {
  return <OrientationPage orientation="landscape" />;
}
