"use client";

import React from "react";
import style from "./Footer.module.scss";
import Logo from "../logo";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("Footer");

  const navigation = [
    {
      id: "f1",
      label: t("links.community"),
      href: "#community",
    },
    {
      id: "f2",
      label: t("links.convert"),
      href: "#convert",
    },
    {
      id: "f3",
      label: t("links.contact"),
      href: "#contact",
    },
  ];

  return (
    <footer className={style.footer} id="contact">
      <div className={style.footer__wrapper}>
        <div className={style.footer__top}>
          <div className={style.footer__brand}>
            <Logo variant="light"/>

            <p>{t("description")}</p>
          </div>

          <div className={style.footer__links}>
            <div className={style.footer__group}>
              <span>{t("navigation")}</span>

              <ul>
                {navigation.map((item) => (
                  <li key={item.id}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={style.footer__group}>
              <span>{t("company")}</span>

              <ul>
                <li>
                  <Link href="/privacy-policy">
                    {t("links.privacy")}
                  </Link>
                </li>

                <li>
                  <Link href="/terms-of-service">
                    {t("links.terms")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className={style.footer__group}>
              <span>{t("socials")}</span>

              <ul>
                <li>
                  <a
                    href="https://x.com/clapfinance"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    X (Twitter)
                  </a>
                </li>

                <li>
                  <a
                    href="https://instagram.com/clapfinance"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>

                <li>
                  <a
                    href="mailto:hello@clapmoney.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    hello@clapmoney.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={style.footer__bottom}>
          <p>{t("copyright")}</p>

          <span>{t("built")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;