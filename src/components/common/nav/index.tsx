"use client";

import { useState, useEffect } from "react";
import Logo from "../logo";
import style from "./Nav.module.scss";
import Button from "../button";
import LanguagePopover from "@/components/utils/LanguagePopover";
import { useTranslations } from "next-intl";
import { HamburgerMenu, CloseCircle } from "iconsax-reactjs";
import Modal from "../modal";
import WaitlistFOrm from "@/app/[locale]/(home)/_components/form/Waitlist";

const Nav = () => {
  const t = useTranslations("Navigation");
  const hero = useTranslations("HomePage");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { id: "n1", label: t("community"), href: "#community" },
    { id: "n2", label: t("convert"), href: "#convert" },
    { id: "n3", label: t("contact"), href: "#contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <div className={style.nav}>
        <div className={style.nav__wrapper}>
          <div className={style.links}>
            <Logo />
            <ul className={style.nav__links}>
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={style.nav__cta}>
            <LanguagePopover />

            <Button className={style.nav__ctaButton}  popoverTarget="join_waitlist">
              {hero("heroSection.cta")}
            </Button>

            <button
              className={style.nav__hamburger}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <HamburgerMenu size={24} variant="TwoTone" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${style.nav__backdrop} ${menuOpen ? style["nav__backdrop--open"] : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        className={`${style.nav__drawer} ${menuOpen ? style["nav__drawer--open"] : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className={style.nav__drawerHeader}>
          <Logo />
          <button
            className={style.nav__close}
            onClick={close}
            aria-label="Close menu"
          >
            <CloseCircle size={28} variant="TwoTone" />
          </button>
        </div>

        <ul className={style.nav__drawerLinks}>
          {navigation.map((item) => (
            <li key={item.id}>
              <a href={item.href} onClick={close}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={style.nav__drawerCta}>
          <Button>{hero("heroSection.cta")}</Button>
        </div>
      </div>

      <Modal id={"join_waitlist"}>
        <WaitlistFOrm/>
      </Modal>
    </>
  );
};

export default Nav;
