"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/common/button";
import CustomInput from "@/components/common/input";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles/Waitlist.module.scss";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface WaitlistFields {
  email: string;
  full_name: string;
  device_type: string;
  country: string;
  referral_source: string;
  campaign_source: string;
  time_on_page: number;
  terms: boolean;
}

const WaitlistForm = () => {
  const t = useTranslations("WaitListFormSection");
  const pageStartTime = useRef(Date.now());

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFields>();

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) {
      setValue("device_type", "Mobile");
    } else if (/tablet/i.test(ua)) {
      setValue("device_type", "Tablet");
    } else {
      setValue("device_type", "Desktop");
    }
  }, [setValue]);

  useEffect(() => {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const detectedCountry = locale.split("-")[1] || "Unknown";
    setValue("country", detectedCountry);
  }, [setValue]);

  useEffect(() => {
    const urlParams = new URLSearchParams(globalThis.location.search);
    const referral = document.referrer || "Direct";
    const campaign =
      urlParams.get("utm_source") || urlParams.get("campaign") || "Organic";
    setValue("referral_source", referral);
    setValue("campaign_source", campaign);
  }, [setValue]);

  const onSubmit: SubmitHandler<WaitlistFields> = async (data) => {
    try {
      const timeSpent = Math.floor((Date.now() - pageStartTime.current) / 1000);

      const payload = {
        ...data,
        time_on_page: timeSpent,
      };

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        reset();
        (
          document.getElementById("success_waitlist") as HTMLElement
        )?.showPopover();
        return;
      }

      if (result.type === "EMAIL_EXISTS") {
        setError("email", {
          type: "manual",
          message: "This email is already on the waitlist",
        });
        return;
      }

      alert(result.message || "Something went wrong");
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.waitlist}
      noValidate
    >
      <header>
        <h4>{t("title")}</h4>
        <p>{t("description")}</p>
      </header>

      <CustomInput
        label={t("inputFeilds.fullName.label")}
        placeholder="Adesua Kwame"
        type="text"
        fullWidth
        error={errors.full_name?.message}
        {...register("full_name", {
          required: `${t("inputFeilds.fullName.error")}`,
        })}
      />

      <CustomInput
        label={t("inputFeilds.email.label")}
        placeholder="you@example.com"
        type="email"
        fullWidth
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: `${t("inputFeilds.email.error")}`,
          },
        })}
      />

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          {...register("terms", {
            required: "You must accept the terms",
          })}
        />
        <span>
          I agree to the <Link href={"/"}>Privacy Policy</Link> and{" "}
          <Link href={"/"}>Terms of Use.</Link>
        </span>
      </label>

      {errors.terms && (
        <small className={styles.error}>{errors.terms.message}</small>
      )}

      <input type="hidden" {...register("device_type")} />
      <input type="hidden" {...register("country")} />
      <input type="hidden" {...register("referral_source")} />
      <input type="hidden" {...register("campaign_source")} />
      <input type="hidden" {...register("time_on_page")} />

      <Button type="submit" fullWidth loading={isSubmitting}>
        {t("cta")}
      </Button>
    </form>
  );
};

export default WaitlistForm;
