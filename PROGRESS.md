# 작업 기록 (포트폴리오 고도화)

마지막 업데이트: 2026-07-30

이 문서는 Claude Code와 함께 진행한 리팩토링/버그 수정 작업 기록입니다. 다음 작업 시작할 때 "완료" 항목은 건너뛰고 "미완료"부터 이어가면 됩니다.

## ⚠️ 브랜치 상태

- `codex/renewal` → `main`으로 병합 완료 (커밋 `1b8b090`). 이제 `main` 브랜치 기준으로 작업하면 됨
- 병합 전 안전장치로 `main-backup-20260730` 브랜치를 남겨둠 (병합 전 main 상태, 문제 생기면 여기로 복구 가능)
- 병합 중 발견한 것: `main`의 자체 "Add publishing guide project" 커밋이 옛 마크업 구조로 06번 카드를 추가해뒀는데, 이미 재배치된 새 디자인 카드와 별개로 **중복 삽입**된 걸 발견해서 옛 구조 카드 전체 삭제함 (자동 병합만으로는 못 잡는 종류의 충돌이라, 병합 후 항상 렌더링/카드 개수 재확인 필요)
- 히어로 이미지가 사용자가 새로 준비한 `intro_2026.png`/`intro_mb_2026.png`로 교체됨 (기존 "2022~2024" 박제 문구 문제 해결됨)
- `src/image/add_project_bg-6.png`, `add_project-6.svg`는 06→02번으로 재배치된 "퍼블리싱 컨벤션+가이드" 카드의 정식 이미지 자산으로 확인됨 (미확인 파일 아니었음)

## 루트 포트폴리오 (`index.html`) — 1차 버그 수정 (구조/재배치 이전)

- [x] `<!DOCTYPE html>` 누락 + `<html>` 태그 조기 종료 버그 수정
- [x] 네이버 카드 링크 절대경로 → 상대경로
- [x] `<meta name="description">` 추가, alt 텍스트 복붙 오류 수정, 죽은 CSS 셀렉터 정리

## 루트 포트폴리오 — 2차 대규모 리뉴얼 (Codex 작업 + 이어서 진행)

작업 중 `portfolio-renewal-notes.md`를 발견해서, 다른 AI 툴(Codex)이 `codex/renewal` 브랜치에서 커밋 안 된 채로 대규모 리뉴얼을 진행해둔 걸 확인함. 그걸 커밋하고 그 위에 계속 다듬는 방식으로 진행했음.

### Codex가 만든 기반 (그대로 유지)
- 상단 nav(`Intro`/`Skills`/`Portfolio`) 신설
- "퍼블리셔로서의 역량" 섹션 신설 — **사용자가 이 섹션 내용/카드는 건들이지 말라고 지시함, 계속 유지할 것**
- 프로젝트 카드를 뱃지+상세카드 구조로 전면 개편
- `src/public/` → `src/css`(CSS+JS) / `src/image` / `src/fonts`(Pretendard 로컬 폰트)로 폴더 재구성
- 06번 "퍼블리싱 컨벤션 + 가이드" 프로젝트 카드 추가 (css-token-publishing 프로젝트 연결)

### 이어서 진행한 것 (완료)
- [x] `src/css/script.js` 한글 주석 인코딩 손상(mojibake) 복구
- [x] 프로젝트 순서 재배치: GSAP(01) → 퍼블리싱가이드(02) → 하나투어(03) → 네이버(04) → 티파니앤코(05) → Tving(06)
- [x] 하나투어/네이버 뱃지 "실무 프로젝트" → "사이드 프로젝트"로 수정 (전부 사이드 프로젝트라는 사용자 확인)
- [x] "기술 개선 포인트" / "기술 개선" 문구 혼용 → "기술 개선"으로 통일
- [x] `project-role`(담당) 표기 6곳 전부 삭제 (마크업+CSS 다 정리, 죽은 코드 없음)
- [x] 죽은 `<h3>`/`.mobile-title` 마크업 6곳 + 관련 죽은 CSS 정리 (실제로는 `.project-detail-card__title`이 타이틀 역할 전담 중이었음)
- [x] `script.js` 위치 `src/css/` → `src/js/`로 이동, 빈 파일 `main.scss` 삭제
- [x] 전체 컨텐츠 배경 `#eef1f6`, 프로젝트 카드 배경 `#fff`로 통일 (기존엔 카드 배경이 홀/짝 교차였음)
- [x] 컨테이너 너비 축소 (`--container-width` 80rem→72rem 등), 여백 확대
- [x] 카드 간 옅은 그림자 + 여백 분리 추가 (카드가 다 흰색이라 구분감 보완, 장식 이미지 겹침 때문에 `overflow:hidden`/둥근테두리는 안 씀)
- [x] 헤더 영역 폰트 사이즈 정리: "Portfolio" 50px→34px, eyebrow 16px→12px (위 섹션과 통일), "N Projects" 20px→14px, 설명문구 18px→15px
- [x] "Portfolio"와 "N Projects" 사이 간격 축소, 위 섹션과의 간격 154px→80px로 축소
- [x] 뱃지(`project-badges`) 폰트 15px→13px
- [x] 카드 내부 요소 간격(뱃지-제목-설명-태그) 및 본문 line-height 전반 축소, 아코디언 위 여백도 축소
- [x] **버그**: 프로젝트 번호(01~06)가 화면 폭에 따라 장식 배경(`sub-img`)보다 왼쪽으로 밀려나 흰 배경과 겹쳐 안 보이던 문제 → `.add-icon`에 `padding-left` 추가로 수정 (1201~1920px 전 구간 검증)
- [x] 이미지 좌측 상단 위치를 제목(`project-detail-card__title`) 상단과 정렬 (기존엔 뱃지 줄과 맞춰져 있었음)
- [x] 이미지-콘텐츠 간격이 홀수 카드는 0px, 짝수 카드는 64px로 불균형하던 것 → `comm-inner`에 `gap`으로 통일
- [x] 아코디언: "주요 개발내용"이 카드별 기본 펼침 상태로 로드되도록 변경, "기술 개선" 클릭 시 그 카드만 전환(다른 카드 영향 없음)되도록 JS 스코프 수정 (기존엔 페이지 전체 기준으로 닫혀서 다른 카드까지 닫히는 버그가 있었음)
- [x] `.tech-stack li`/`.tech-stack li span`/`.tech-stack strong`의 px 하드코딩 → rem 변환

### 디자인 토큰(`global.css :root`) 정리 (완료)
- [x] 미사용 토큰 5개 삭제 (`--color-bg-muted`, `--color-bg-section`, `--color-surface-subtle`, `--space-107`, `--space-74`)
- [x] 같은 값·다른 이름 중복 토큰 4쌍 통합 (`--color-link`→`--color-body`, `--color-accordion-border`→`--color-border`, `--color-surface`→`--color-white`, `--color-surface-subtle` 삭제)
- [x] 프로젝트 뱃지 하드코딩 색상 8개 → `--color-badge-{purple,green,teal,pink}-{bg,text}` 토큰화
- [x] `--space-*` 스케일 20개 → 14개로 정리, 전부 4px 배수로 통일(8/12/16/20/24/28/32/40/44/48/52/60/64/80). 반올림 여파로 이미지-제목 정렬이 2px 어긋난 것도 재보정 완료

### 완료 (병합 후 추가)
- [x] 히어로 이미지 "2022~2024" 표기 문제 — 사용자가 새 이미지(`intro_2026.png`) 준비, 실제 연도와 일치하도록 교체 완료
- [x] `main` 브랜치와 병합 완료 (`1b8b090`), 병합 중 발견된 06번 카드 중복 삽입 버그도 수정
- [x] `add_project_bg-6.png` 용도 확인 — 미확인 파일 아니라 02번 카드(퍼블리싱 컨벤션+가이드)의 정식 자산이었음

### 미완료 / 참고사항
- [ ] `src/image/oder/`(구 `src/public/oder/`) — 예전부터 미사용으로 확인된 폴더, 리뉴얼 때 삭제 안 되고 이름만 이동됨. 여전히 미사용
- [ ] 그리드+모달 형태로 프로젝트 리스트 재구성하는 안은 검토 후 **보류 결정함** (6개 규모에서는 클릭 유도가 오히려 정보 노출을 줄인다고 판단) — 재검토 원하면 대화 참고

## HanaTour

### 완료
- [x] `index.html` DOCTYPE/`<html>` 구조 버그 수정
- [x] 오타 정리: `acitve`, `actvie` → `active` (HTML/CSS/JS 전반)
- [x] 깨진 `javascript:void(0); m` 링크 정리
- [x] `script.js` `.btn_closed` 핸들러 중복 죽은 코드 제거
- [x] 성능: 미사용 `jquery-ui.js`(18,705줄) 제거, jQuery 버전 고정(3.7.1), 스크립트 3개 `defer`
- [x] 이미지 71개 `loading="lazy"` 적용 (히어로 슬라이드 7개 제외)
- [x] 파비콘 `rel`/경로 수정
- [x] 접근성: `h1`/`main` 랜드마크 추가, `btn_play`/input 6개 `aria-label` 추가
- [x] 중복 `id="tableCalendar"` 제거 (class 기반으로 전환)
- [x] 미사용 백업 파일 삭제: `header copy.html`, `main copy.html`

### 미완료 (건너뛰기로 결정한 항목, 필요시 재논의)
- [ ] 미사용 이미지 33개 (11.45MB) — 중복본/UUID 파일명/한글 초안 파일 등
- [ ] 죽은 CSS 셀렉터 83개 — 테마 선택기 클러스터, 프로필/사이트메뉴 클러스터, 날짜선택기 클러스터, 고립 규칙 17개. 렌더링에는 영향 없어서 우선순위 낮음
- [ ] `.bnt_ri`/`.hotel` 토글 로직 — 코드상 이상해 보이지만 브라우저 직접 확인 전이라 보류

## developers.naver

### 완료
- [x] `applyGreenFilter()`가 페이지 전체 `<li>`(24개)에 이벤트를 걸어 hover할 때마다 콘솔 에러 나던 버그 → `.cont2 li`로 스코프 수정
- [x] `lang="en"` → `"ko"`, `<h1 class="blind">` 추가, `<main>` 랜드마크 추가
- [x] `ait="CLOVA"`(오타 4곳), `<a alt="...">`(오용 7곳) → `title` 속성으로 정리
- [x] `target="_blank"` 2곳에 `rel="noopener noreferrer"` 추가
- [x] 검색 input, 배너 이전/다음/페이지네이션 버튼, 로고 링크에 `aria-label` 추가 (페이지네이션은 `aria-current` 동기화)
- [x] `broadMenu` 죽은 포커스 요소(CSS/JS 어디서도 미사용) 삭제

## tiffany.Korean

### 완료
- [x] 죽은 슬라이더 코드(`app.js` 28~147줄, ~120줄) 삭제 — 페이지 로드마다 무조건 콘솔 에러 나던 것 해결 (Swiper로 대체된 후 안 지워진 옛 코드)
- [x] `class="black"` 오타 4곳 → `block`
- [x] 파비콘 절대경로 → 상대경로
- [x] footer 로고 링크 `href="/"` → `./index.html`, SFCC 데모 원본 문구 → "티파니앤코 홈"
- [x] footer `<p>` 안에 `<p>` 중첩된 잘못된 마크업 → 안쪽을 `<span>`으로 교체
- [x] "아이코닉 기프트" 섹션: 텍스트가 이미지 위에 겹쳐 안 보이던 문제 → xl 이상에서 반투명 배경 패널 추가
- [x] 같은 섹션 텍스트 위치가 화면 폭 따라 계속 어긋나던 것(`pl-[38rem]` 고정값) → `justify-center`로 통일해 항상 중앙 고정
- [x] "카테고리별로 보기" 섹션이 1280px 미만에서 통째로 숨겨지던 것 → grid 반응형으로 모바일/태블릿 노출
- [x] nav 메뉴가 1024px 미만에서 대체 UI 없이 사라지던 것 → `flex-wrap`으로 항상 노출
- [x] 고정 헤더 높이 변화에 안 맞던 히어로 배너 여백을 JS로 실측 동기화 (`syncBannerOffset`)
- [x] `#logo.hidden`이 1024px 이하에서 `display:block`으로 덮어써져 스크롤해도 로고 안 사라지던 CSS 버그 수정

### 미완료 / 참고사항
- [ ] README에 "Swiper.js 사용 안 함"이라고 적혀있는데 실제로는 `.productSlider`/`.topBanner`에서 사용 중 — 사실과 다름, 수정 필요
- [ ] Tailwind CDN(`cdn.tailwindcss.com`) 프로덕션 비권장 경고 — 실제 콘솔에서도 확인됨. 제대로 고치려면 Tailwind CLI/빌드 파이프라인 구성 필요 (`tailwind-config.js`는 이미 있음). 단순 코드 수정이 아니라 별도 작업으로 판단, 착수 여부 결정 필요

## 커밋 이력 (`codex/renewal` 브랜치, `main`과 공통인 `cee9581`부터)

1. `fix: 루트 포트폴리오 index.html 마크업 구조 버그 수정`
2. `fix: HanaTour 오타 및 깨진 링크 정리`
3. `perf: HanaTour 메인페이지 성능·접근성 개선`
4. `chore: HanaTour 미사용 백업 파일 및 스크립트 삭제`
5. `fix: developers.naver 스크립트 버그 수정 및 마크업·접근성 개선`
6. `fix: tiffany.Korean 죽은 슬라이더 코드로 인한 콘솔 에러 수정`
7. `fix: tiffany.Korean 마크업/오타 정리`
8. `fix: tiffany.Korean 반응형 레이아웃 버그 수정`
9. `docs: 작업 기록 PROGRESS.md 추가`
10. `docs: 루트 README 구조 재배치 및 유지보수 내역 반영`
11. `docs: 메인 포트폴리오 디자인 리뷰 요청 문서 추가`
12. `Add publishing guide project` (Codex)
13. `Clean up portfolio mobile title styles` (Codex)
14. `fix: 루트 포트폴리오 마무리 정리 및 버그 수정` (Codex 리뉴얼 커밋 + 인코딩/구조 정리)
15. *(미커밋)* 재배치/뱃지/너비·배경/간격/그림자/폰트/아코디언/토큰 정리 등 이번 세션 후반부 전체

## 커리어 관련 메모

3년 6개월 경력 기준으로 HanaTour/developers.naver/tiffany.Korean 클론코딩 3개는 "학습용" 인상이 강해서, 대표 포트폴리오보다는 README의 "실무경험"(KT닷컴, 롯데그룹 등) 섹션을 앞으로 배치함 (이미 반영됨). 클론코딩 자체보다 "레거시 코드 분석 → 버그 수정 → 반응형 개선"한 이번 작업 과정 자체가 실무 스킬을 보여주는 소재로 더 유용할 수 있음. 루트 포트폴리오 디자인 리뷰 요청(`design-review-request.md`)도 같은 맥락에서 진행 중.
