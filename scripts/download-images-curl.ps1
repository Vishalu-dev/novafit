$ErrorActionPreference = "Stop"
$root = Join-Path $PSScriptRoot "..\src\assets\images"

$downloads = @(
  @{ Url = "https://i.postimg.cc/2btS89Zr/logo.png"; Out = "logos\logo.png" },
  @{ Url = "https://i.postimg.cc/sOx2zC1t/title-logo.png"; Out = "logos\title-logo.png" },
  @{ Url = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"; Out = "hero\strength-training.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"; Out = "hero\hiit.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80"; Out = "hero\yoga-mobility.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"; Out = "hero\crossfit.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80"; Out = "hero\cardio-zone.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80"; Out = "hero\personal-training.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80"; Out = "trainers\arjun-rana.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80"; Out = "trainers\kavya-sharma.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80"; Out = "trainers\rohit-verma.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80"; Out = "trainers\priya-iyer.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80"; Out = "gallery\gym-01.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80"; Out = "gallery\gym-02.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900&q=80"; Out = "gallery\gym-03.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900&q=80"; Out = "gallery\gym-04.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80"; Out = "gallery\gym-05.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=80"; Out = "gallery\gym-06.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=900&q=80"; Out = "gallery\gym-07.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=900&q=80"; Out = "gallery\gym-08.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"; Out = "icons\testimonial-aditya.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"; Out = "icons\testimonial-sneha.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&q=80"; Out = "icons\testimonial-vikram.jpg" },
  @{ Url = "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80"; Out = "icons\testimonial-meera.jpg" }
)

foreach ($item in $downloads) {
  $dest = Join-Path $root $item.Out
  if ((Test-Path $dest) -and ((Get-Item $dest).Length -gt 500)) {
    Write-Host "Skip: $($item.Out)"
    continue
  }
  Write-Host "Downloading: $($item.Out)"
  & curl.exe -fsSL $item.Url -o $dest
  if ($LASTEXITCODE -ne 0) { throw "Failed: $($item.Out)" }
}
Write-Host "Done."
