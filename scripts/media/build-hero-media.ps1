#requires -Version 7
<#
    build-hero-media.ps1

    Deterministically derives the public landing-page hero media from the
    owner-supplied source clip. This is the ONLY supported way to regenerate
    public/media/certamaris-vessel-hero-* - do not hand-edit those files.

    Inputs
      -Source  path to the canonical .mov/.mp4 supplied by the owner
               (default: media-source/CertaMaris-vessel-hero-source-2026-09-26.mov)
      -Ffmpeg  path to ffmpeg.exe (default: resolves ffmpeg on PATH, then the
               imageio-ffmpeg user install)

    Outputs (all inside public/media/)
      certamaris-vessel-hero-2026-09.mp4          H.264, yuv420p, +faststart, no audio
      certamaris-vessel-hero-2026-09-mobile.mp4   narrow-viewport H.264 derivative (854x480)
      certamaris-vessel-hero-2026-09-poster.webp  poster/fallback still
      certamaris-vessel-hero-2026-09-poster.jpg   poster/fallback still (fallback encoder)

    Loop strategy
      The source is a single continuous 43.56 s aerial orbit. The last 1.5 s is
      cross-faded into the first 1.5 s with xfade, then concatenated ahead of the
      untouched middle. The result starts and ends on the same frame, so the hero
      loops without a visible cut and nothing is re-ordered or misrepresented.

    Poster frame
      t = 40.5 s of the ORIGINAL source (dark open water, vessel mid-frame) so the
      still reads well on its own under prefers-reduced-motion / autoplay blocked.
#>
[CmdletBinding()]
param(
    [string]$Source = "",
    [string]$Ffmpeg = "",
    [double]$CrossfadeSeconds = 1.5,
    [double]$SourceSeconds = 43.56,
    [int]$Crf = 26,
    [int]$MobileCrf = 27,
    [int]$MobileWidth = 854,
    [double]$PosterAt = 40.5,
    [int]$Fps = 25
)

$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
if ([string]::IsNullOrWhiteSpace($Source)) {
    $Source = Join-Path $repoRoot "media-source\CertaMaris-vessel-hero-source-2026-09-26.mov"
}
if (-not (Test-Path -LiteralPath $Source)) {
    throw "Source clip not found: $Source"
}

if ([string]::IsNullOrWhiteSpace($Ffmpeg)) {
    $cmd = Get-Command ffmpeg -ErrorAction SilentlyContinue
    if ($cmd) {
        $Ffmpeg = $cmd.Source
    } else {
        $candidate = Get-ChildItem -Path (Join-Path $env:APPDATA "Python") -Recurse -Filter "ffmpeg-*.exe" -File -ErrorAction SilentlyContinue |
            Select-Object -First 1 -ExpandProperty FullName
        if ($candidate) { $Ffmpeg = $candidate }
    }
}
if ([string]::IsNullOrWhiteSpace($Ffmpeg) -or -not (Test-Path -LiteralPath $Ffmpeg)) {
    throw "ffmpeg not found. Pass -Ffmpeg <path>."
}

$outDir = Join-Path $repoRoot "public\media"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$mp4 = Join-Path $outDir "certamaris-vessel-hero-2026-09.mp4"
$mobileMp4 = Join-Path $outDir "certamaris-vessel-hero-2026-09-mobile.mp4"
$webp = Join-Path $outDir "certamaris-vessel-hero-2026-09-poster.webp"
$jpg = Join-Path $outDir "certamaris-vessel-hero-2026-09-poster.jpg"

$midEnd = [Math]::Round($SourceSeconds - $CrossfadeSeconds, 3)
# The source is full-range yuvj420p (deprecated). Normalise to limited-range
# yuv420p and pin a constant frame rate so xfade/concat can splice cleanly.
$filter = @(
    "[0:v]scale=in_range=full:out_range=tv,format=yuv420p,settb=AVTB,split=3[s1][s2][s3]",
    "[s1]trim=start=0:end=${CrossfadeSeconds},setpts=PTS-STARTPTS,fps=${Fps}[head]",
    "[s2]trim=start=${CrossfadeSeconds}:end=${midEnd},setpts=PTS-STARTPTS,fps=${Fps}[mid]",
    "[s3]trim=start=${midEnd}:end=${SourceSeconds},setpts=PTS-STARTPTS,fps=${Fps}[tail]",
    "[tail][head]xfade=transition=fade:duration=${CrossfadeSeconds}:offset=0,fps=${Fps}[loopend]",
    "[mid][loopend]concat=n=2:v=1:a=0[vout]"
) -join ";"

function Invoke-HeroEncode {
    param([string]$Target, [int]$Quality, [string]$ScaleFilter)

    $chain = if ([string]::IsNullOrWhiteSpace($ScaleFilter)) { $filter } else { "$filter;[vout]$ScaleFilter[vscaled]" }
    $map = if ([string]::IsNullOrWhiteSpace($ScaleFilter)) { "[vout]" } else { "[vscaled]" }

    Write-Host "Encoding $([System.IO.Path]::GetFileName($Target)) (crf $Quality$([string]::IsNullOrWhiteSpace($ScaleFilter) ? '' : ", $ScaleFilter")) ..."
    & $Ffmpeg -y -hide_banner -loglevel warning -i $Source `
        -filter_complex $chain -map $map -an `
        -c:v libx264 -preset slow -crf $Quality -profile:v high -level 4.0 -pix_fmt yuv420p `
        -x264-params "keyint=50:min-keyint=25:scenecut=0:ref=4:bframes=3" `
        -r $Fps `
        -movflags +faststart -map_metadata -1 `
        -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv `
        $Target
    if ($LASTEXITCODE -ne 0) { throw "ffmpeg encode failed for $Target ($LASTEXITCODE)" }
}

Invoke-HeroEncode -Target $mp4 -Quality $Crf -ScaleFilter ""

$mobileHeight = [int]([Math]::Round($MobileWidth * 720 / 1280 / 2) * 2)
Invoke-HeroEncode -Target $mobileMp4 -Quality $MobileCrf -ScaleFilter "scale=${MobileWidth}:${mobileHeight}:flags=lanczos"

Write-Host "Extracting poster frame at ${PosterAt}s ..."
& $Ffmpeg -y -hide_banner -loglevel warning -ss $PosterAt -i $Source -frames:v 1 `
    -sws_flags lanczos -vf "scale=1280:720:flags=lanczos" -map_metadata -1 -c:v libwebp -quality 84 $webp
if ($LASTEXITCODE -ne 0) { throw "ffmpeg webp poster failed ($LASTEXITCODE)" }

& $Ffmpeg -y -hide_banner -loglevel warning -ss $PosterAt -i $Source -frames:v 1 -update 1 `
    -sws_flags lanczos -vf "scale=1280:720:flags=lanczos" -map_metadata -1 -q:v 3 $jpg
if ($LASTEXITCODE -ne 0) { throw "ffmpeg jpg poster failed ($LASTEXITCODE)" }

Get-ChildItem -LiteralPath $mp4, $mobileMp4, $webp, $jpg |
    Select-Object Name, Length, @{ n = "SHA256"; e = { (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash } } |
    Format-Table -AutoSize
