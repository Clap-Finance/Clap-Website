import Image from "next/image";
import Link from "next/link";
import LogoImage from "@/assets/logo_adaptations/full.png";
import LogoLightImage from "@/assets/logo_adaptations/full_white.png";

const Logo = ({ variant = "dark" }: { variant?: "light" | "dark" }) => {
  return (
    <Link href={"/"} className="flex items-center gap-1">
      <Image
        src={variant == "dark" ? LogoImage : LogoLightImage}
        alt="Logo"
        className="w-20 md:w-22"
      />
    </Link>
  );
};

export default Logo;
