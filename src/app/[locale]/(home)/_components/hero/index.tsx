import { useTranslations } from "next-intl";
import styles from "./styles/Hero.module.scss";
import Button from "@/components/common/button";

const HeroSection = () => {
  const t = useTranslations("HomePage");
  return (
    <section className={styles.hero}>
      <div className={styles.hero_wrapper}>
        {" "}
        <div className={styles.border_round}>
          <div className={styles.hero_content}>
            <div className={styles.hero_content_left}>
              <div className={styles.hero_content_left_top}>
                <h1>{t("heroSection.title")}</h1>
                <p>{t("heroSection.description")}</p>
              </div>
              <Button variant={"secondary"}>{t("heroSection.cta")}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
