"use client";

import { useState } from "react";
import styles from "./LanguagePopover.module.scss";
import { Global } from "iconsax-reactjs";
import Modal from "../common/modal";
import { MdGTranslate } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const LanguagePopover = () => {
  const t = useTranslations("Translation");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", label: t("english") },
    { code: "fr", label: t("french") },
    { code: "sw", label: t("swahili") },
  ];

 const switchLocale = (newLocale: string) => {
  router.replace(pathname, { locale: newLocale });
  router.refresh();
  setOpen(false);
};

  return (
    <div className={styles.nations_wrapper}>
      <button
        className={styles.openBtn}
        onClick={() => setOpen(true)}
        popoverTarget="mypopover"
      >
        <Global size="20" color="#1c1c1c" variant="TwoTone" />
        {currentLocale.toUpperCase()}
      </button>

      <Modal id="mypopover">
        <div className={styles.languages}>
          <div className={styles.header}>
            <span>Select your language</span>
          </div>

          <ul className={styles.tabs}>
            {languages.map((lang) => (
              <li
                key={lang.code}
                className={currentLocale === lang.code ? styles.active : ""}
                onClick={() => switchLocale(lang.code)}
              >
                <MdGTranslate />
                <span>{lang.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default LanguagePopover;