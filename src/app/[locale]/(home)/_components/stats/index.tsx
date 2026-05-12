"use client";

import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import styles from "./styles/Stats.module.scss";
import { Global, Moneys, Profile2User } from "iconsax-reactjs";

interface CountryStat {
  country: string;
  signups: number;
}

interface WaitlistStatsResponse {
  success: boolean;
  type: string;
  message: string;
  data?: {
    total_signups: number;
    total_countries: number;
    countries: CountryStat[];
  };
}

const Stats = () => {
  const [stats, setStats] = useState<WaitlistStatsResponse["data"] | null>(
    null,
  );

  const [displayValues, setDisplayValues] = useState({
    signups: 0,
    countries: 0,
    topCountry: 0,
  });

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/waitlist/stats");

        const data: WaitlistStatsResponse = await res.json();

        if (data.success && data.data) {
          setStats(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (!stats) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDisplayValues({
            signups: stats.total_signups,
            countries: stats.total_countries,
            topCountry: stats.countries[0]?.signups ?? 0,
          });

          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [stats]);

  return (
    <div className={styles.stats} ref={sectionRef}>
      <div className={styles.stats__container}>
        <div className={styles.stats__card}>
          <div>
            <Profile2User size="32" color="#555555" variant="TwoTone" />
          </div>

          <div>
            <NumberFlow
              className={styles.stats__card_number}
              value={displayValues.signups}
            />

            <h3>
              People on <br /> the waitlist
            </h3>
          </div>
        </div>

        <div className={styles.stats__card}>
          <div>
            <Global size="32" color="#555555" variant="TwoTone" />
          </div>

          <div>
            <NumberFlow
              className={styles.stats__card_number}
              value={displayValues.countries}
            />

            <h3>
              Countries with <br /> early signups
            </h3>
          </div>
        </div>

        <div className={styles.stats__card}>
          <div>
            <Moneys size="32" color="#555555" variant="TwoTone" />
          </div>

          <div>
            <NumberFlow
              className={styles.stats__card_number}
              value={displayValues.topCountry}
            />

            <h3>
              Top <br /> Country
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;