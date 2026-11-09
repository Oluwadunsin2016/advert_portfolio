import type { Metadata } from "next";
import { OrientationPage } from "@/components/orientation-page";

export const metadata: Metadata = {
  title: "Portrait Work",
  description: "All portrait AI advert videos.",
};

export default function PortraitWorkPage() {
  return <OrientationPage orientation="portrait" />;
}
