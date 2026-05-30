/**
 * Central image registry — import from "@/assets/images" only.
 * Vite resolves each file to a hashed production URL (Vercel-safe).
 *
 * If images are missing locally, run: npm run assets:download
 */
export { IMAGE_PLACEHOLDER } from "./placeholder";

/* Logos */
import logo from "./logos/logo.png";
import titleLogo from "./logos/title-logo.png";

/* Programs (hero folder) */
import strengthTraining from "./hero/strength-training.jpg";
import hiit from "./hero/hiit.jpg";
import yogaMobility from "./hero/yoga-mobility.jpg";
import crossfit from "./hero/crossfit.jpg";
import cardioZone from "./hero/cardio-zone.jpg";
import personalTraining from "./hero/personal-training.jpg";

/* Trainers */
import arjunRana from "./trainers/arjun-rana.jpg";
import kavyaSharma from "./trainers/kavya-sharma.jpg";
import rohitVerma from "./trainers/rohit-verma.jpg";
import priyaIyer from "./trainers/priya-iyer.jpg";

/* Gallery */
import gym01 from "./gallery/gym-01.jpg";
import gym02 from "./gallery/gym-02.jpg";
import gym03 from "./gallery/gym-03.jpg";
import gym04 from "./gallery/gym-04.jpg";
import gym05 from "./gallery/gym-05.jpg";
import gym06 from "./gallery/gym-06.jpg";
import gym07 from "./gallery/gym-07.jpg";
import gym08 from "./gallery/gym-08.jpg";

/* Testimonial avatars */
import testimonialAditya from "./icons/testimonial-aditya.jpg";
import testimonialSneha from "./icons/testimonial-sneha.jpg";
import testimonialVikram from "./icons/testimonial-vikram.jpg";
import testimonialMeera from "./icons/testimonial-meera.jpg";

/* Section backgrounds */
import heroBg from "./backgrounds/hero-bg.webp";
import transformationBg from "./backgrounds/transformation-bg.webp";
import ctaBg from "./backgrounds/cta-bg.webp";

/* Public URLs for &lt;head&gt; meta (favicon, og:image, preload) */
import logoUrl from "./logos/logo.png?url";
import titleLogoUrl from "./logos/title-logo.png?url";
import heroBgUrl from "./backgrounds/hero-bg.webp?url";

export {
  logo,
  titleLogo,
  heroBg,
  transformationBg,
  ctaBg,
  logoUrl,
  titleLogoUrl,
  heroBgUrl,
  strengthTraining,
  hiit,
  yogaMobility,
  crossfit,
  cardioZone,
  personalTraining,
  arjunRana,
  kavyaSharma,
  rohitVerma,
  priyaIyer,
  gym01,
  gym02,
  gym03,
  gym04,
  gym05,
  gym06,
  gym07,
  gym08,
  testimonialAditya,
  testimonialSneha,
  testimonialVikram,
  testimonialMeera,
};

export const images = {
  logos: { logo, titleLogo },
  hero: {
    strengthTraining,
    hiit,
    yogaMobility,
    crossfit,
    cardioZone,
    personalTraining,
  },
  trainers: { arjunRana, kavyaSharma, rohitVerma, priyaIyer },
  gallery: [gym01, gym02, gym03, gym04, gym05, gym06, gym07, gym08] as const,
  icons: {
    testimonialAditya,
    testimonialSneha,
    testimonialVikram,
    testimonialMeera,
  },
} as const;

export const programImages = [
  strengthTraining,
  hiit,
  yogaMobility,
  crossfit,
  cardioZone,
  personalTraining,
] as const;

export const trainerImages = [arjunRana, kavyaSharma, rohitVerma, priyaIyer] as const;

export const galleryImages = images.gallery;

export const testimonialAvatars = [
  testimonialAditya,
  testimonialSneha,
  testimonialVikram,
  testimonialMeera,
] as const;
