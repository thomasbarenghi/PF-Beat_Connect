import { Hero } from "@/components";

type Props = {
  title: string;
};

export default function HeroSettings({ title }: Props) {
  return (
    <Hero
      className="min-h-[35vh] items-end bg-red-950 pb-8 lg:min-h-[30vh] justify-center "
      subClassName="flex flex-col h-full w-full justify-center padding-x-estilo2  gap-estilo3     items-start   "
      imageAlt="settings-hero"
    >
      <h1 className="text-titulo3-medium text-white">{title}</h1>
    </Hero>
  );
}
