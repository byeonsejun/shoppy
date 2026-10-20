# Lighthouse 측정 기록

## 측정 조건

| 항목 | 값 |
| --- | --- |
| 측정일 | 2026-10-20 |
| Lighthouse | 12.8.2 (`npx lighthouse@12.8.2`) |
| 프리셋 | `--preset=desktop` (headless Chrome) |
| 대상 | `npm run build` 결과물을 `npx serve@14.2.4 -s build` 로 로컬 서빙 (`http://localhost:5050`) |
| 페이지 | 홈 `/`, 상품 목록 `/shop` |

> 상품 목록 페이지의 실제 라우트는 `/shop` (`src/pages/AllProducts.jsx`) 입니다. 라우터에 `/products` 경로는 없어 NotFound가 렌더링되므로, 상품 목록은 `/shop`으로 측정했습니다.

## 개선 전

| 페이지 | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | SI |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 홈 `/` | 60 | 96 | 100 | 100 | 3.7 s | 4.2 s | 0 ms | 0 | 3.7 s |
| 상품 목록 `/shop` | 78 | 91 | 100 | 100 | 0.6 s | 4.1 s | 0 ms | 0 | 1.0 s |

## 개선 후

같은 조건으로 페이지당 3회 측정했고, 아래 표는 Performance 중앙값 회차의 값입니다 (홈 100/100/100, 상품 목록 97/98/98).

| 페이지 | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | SI |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 홈 `/` | 100 | 96 | 100 | 100 | 0.2 s | 0.6 s | 0 ms | 0 | 0.5 s |
| 상품 목록 `/shop` | 98 | 96 | 100 | 100 | 0.3 s | 1.1 s | 0 ms | 0 | 0.4 s |

## 원인과 조치

| 원인 (측정 근거) | 조치 | 파일 |
| --- | --- | --- |
| `index.css` 의 웹폰트 `@import` 2개가 렌더 블로킹 → 홈 FCP 3.7 s, render-blocking 예상 절감 3,390 ms | `@import` 를 제거하고 `index.html` 에서 preconnect + `media="print" onload` 비동기 로드로 변경 (폰트 종류·웨이트는 동일) | `src/index.css`, `public/index.html` |
| Pretendard static CSS가 한글 전체 글리프 woff2를 웨이트당 약 760 KB씩 5개, 총 3.8 MB 다운로드 → 시뮬레이션 대역폭을 점유해 /shop LCP 3.8 s | 같은 v1.3.9의 `pretendard-dynamic-subset.css` 로 교체 (family 이름 `Pretendard` 동일, unicode-range로 필요한 글리프만 로드). /shop 총 전송량 4,235 KB → 787 KB | `public/index.html` |
| /shop LCP 이미지(첫 상품 카드)가 `loading="lazy"`, `http://` URL | 첫 8개 카드에 `loading="eager"` + `fetchpriority="high"`, Cloudinary URL을 `https://` 로 정규화 | `src/components/ProductCard.jsx`, `src/components/Products.jsx`, `src/components/js/util.js` |
| /shop 상품 데이터 요청이 JS 번들 → lazy 청크 실행 이후에야 시작 | `/shop*` 경로에서 `shop.json` 을 `<link rel="preload" as="fetch">` 로 번들과 병렬 요청, Firebase DB origin preconnect | `public/index.html` |
| 홈 배너 이미지 preload가 모든 경로에서 실행 (/shop에서도 1920px 배너 다운로드) | 경로별 인라인 스크립트로 홈(`/`)에서만 preload | `public/index.html` |
| a11y: 정렬 `<select>` 라벨 없음, `h1` → `h3` 헤딩 건너뜀, 버튼 aria-label이 보이는 텍스트와 불일치 (Login/Logout/SEARCH) | sr-only 라벨 "상품 정렬", sr-only `h2` "상품 목록" 추가, 불일치 aria-label 제거 (보이는 텍스트가 접근 가능한 이름이 됨) | `src/components/Products.jsx`, `src/components/Navbar.jsx` |

## 남은 항목

- **color-contrast (두 페이지 공통)**: `muted #8A857E` on `paper #F7F6F4` (3.38:1), 로그인 버튼 `#FFFFFF` on `accent #FF4D2E` (3.3:1). 디자인 토큰 값이라 이번 작업에서는 변경하지 않았습니다. 해결하려면 토큰 조정이 필요합니다.
- **unused-javascript**: `main.js` 에 약 66–84 KB 미사용 코드 (Swiper, Firebase Auth 등). 현재 점수에는 영향이 작습니다.
- ~~**CSP**: `public/_headers` 의 CSP `style-src`/`font-src` 에 `cdn.jsdelivr.net`, `fonts.googleapis.com`, `fonts.gstatic.com` 이 없어 Netlify 배포 환경에서는 웹폰트가 차단됩니다.~~ **해결됨**: `style-src` 에 `https://cdn.jsdelivr.net https://fonts.googleapis.com`, `font-src` 에 `https://cdn.jsdelivr.net https://fonts.gstatic.com` 추가 (다른 지시어는 변경 없음). 로컬 측정에는 `_headers` 가 적용되지 않으므로 위 점수에는 영향이 없습니다.
