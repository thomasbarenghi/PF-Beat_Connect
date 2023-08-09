import { BeatsClass } from "@/types";
import Image from "next/image";
import { useTranslation } from "react-i18next";

type BeatImageProps = {
  beat: BeatsClass;
  height: number;
  width: number;
  tapVisible?: boolean;
};

const BeatImage = ({
  beat,
  height,
  width,
  tapVisible = false,
}: BeatImageProps) => {
  const [t] = useTranslation("global");

  return (
    <div
      className="relative aspect-square rounded-md object-cover"
      style={{ height: height, width: width }}
    >
      <Image
        src={beat.image}
        alt={beat.name}
        layout="fill"
        className="rounded-xl object-cover"
      />
      {tapVisible && (
        <p className="text-sm-regular absolute left-1/2 top-1/2 z-10 w-max -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[#000000b3] px-3 py-1 text-center text-white lg:hidden">
          {t("beatCar.tap")}
        </p>
      )}
    </div>
  );
};

export default BeatImage;