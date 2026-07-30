# 작업 기록 (포트폴리오 고도화)

마지막 업데이트: 2026-07-30

이 문서는 Claude Code와 함께 진행한 리팩토링/버그 수정 작업 기록입니다. 다음 작업 시작할 때 "완료" 항목은 건너뛰고 "미완료"부터 이어가면 됩니다.

## 루트 포트폴리오 (`index.html`)

- [x] `<!DOCTYPE html>` 누락 + `<html>` 태그 조기 종료 버그 수정
- [x] 네이버 카드 링크 절대경로 → 상대경로

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
- [ ] `design-review-request.md` (저장소 루트) — 이번 세션에서 의도적으로 만든 파일 아님, 정체 확인 후 삭제 여부 결정 필요

## 커밋 이력 (이번 세션)

1. `fix: 루트 포트폴리오 index.html 마크업 구조 버그 수정`
2. `fix: HanaTour 오타 및 깨진 링크 정리`
3. `perf: HanaTour 메인페이지 성능·접근성 개선`
4. `chore: HanaTour 미사용 백업 파일 및 스크립트 삭제`
5. `fix: developers.naver 스크립트 버그 수정 및 마크업·접근성 개선`
6. `fix: tiffany.Korean 죽은 슬라이더 코드로 인한 콘솔 에러 수정`
7. `fix: tiffany.Korean 마크업/오타 정리`
8. `fix: tiffany.Korean 반응형 레이아웃 버그 수정`

## 커리어 관련 메모

3년 6개월 경력 기준으로 HanaTour/developers.naver/tiffany.Korean 클론코딩 3개는 "학습용" 인상이 강해서, 대표 포트폴리오보다는 README의 "실무경험"(KT닷컴, 롯데그룹 등) 섹션을 앞으로 배치하는 걸 고려 중. 클론코딩 자체보다 "레거시 코드 분석 → 버그 수정 → 반응형 개선"한 이번 작업 과정 자체가 실무 스킬을 보여주는 소재로 더 유용할 수 있음.
