#!/bin/bash
# Cross-platform fallback - use curl
ROOT="$(cd "$(dirname "$0")/../src/assets/images" && pwd)"
mkdir -p "$ROOT"/{logos,hero,trainers,gallery,backgrounds,icons}

download() {
  local url="$1" out="$2"
  if [ -f "$out" ] && [ -s "$out" ]; then
    echo "Skip: $out"
    return
  fi
  echo "Downloading: $out"
  curl -fsSL "$url" -o "$out"
}

download "https://i.postimg.cc/2btS89Zr/logo.png" "$ROOT/logos/logo.png"
download "https://i.postimg.cc/sOx2zC1t/title-logo.png" "$ROOT/logos/title-logo.png"
download "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" "$ROOT/hero/strength-training.jpg"
download "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80" "$ROOT/hero/hiit.jpg"
download "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80" "$ROOT/hero/yoga-mobility.jpg"
download "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80" "$ROOT/hero/crossfit.jpg"
download "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80" "$ROOT/hero/cardio-zone.jpg"
download "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80" "$ROOT/hero/personal-training.jpg"
download "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80" "$ROOT/trainers/arjun-rana.jpg"
download "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80" "$ROOT/trainers/kavya-sharma.jpg"
download "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80" "$ROOT/trainers/rohit-verma.jpg"
download "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80" "$ROOT/trainers/priya-iyer.jpg"
download "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80" "$ROOT/gallery/gym-01.jpg"
download "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80" "$ROOT/gallery/gym-02.jpg"
download "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900&q=80" "$ROOT/gallery/gym-03.jpg"
download "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900&q=80" "$ROOT/gallery/gym-04.jpg"
download "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80" "$ROOT/gallery/gym-05.jpg"
download "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=80" "$ROOT/gallery/gym-06.jpg"
download "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=900&q=80" "$ROOT/gallery/gym-07.jpg"
download "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=900&q=80" "$ROOT/gallery/gym-08.jpg"
download "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" "$ROOT/icons/testimonial-aditya.jpg"
download "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" "$ROOT/icons/testimonial-sneha.jpg"
download "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&q=80" "$ROOT/icons/testimonial-vikram.jpg"
download "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80" "$ROOT/icons/testimonial-meera.jpg"
echo "Done."
