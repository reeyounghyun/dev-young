// 1. Lucide 아이콘 초기화
// Lucide 라이브러리의 아이콘들을 페이지에 렌더링
lucide.createIcons();

// 아코디언 코드도 요소 존재 여부 확인
const accordionButtons = document.querySelectorAll('.accordion-button');
if (accordionButtons.length > 0) {
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            if (!content) return;
            const accordionItem = button.closest('.accordion-item');
            const accordionGroup = button.closest('.accordion');

            (accordionGroup ?? document).querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.closest('.accordion-item')?.classList.remove('active');
                }
            });

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                accordionItem?.classList.remove('active');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                accordionItem?.classList.add('active');
            }
        });
    });

    // 카드별 첫 번째 아코디언(주요 개발내용)은 기본 펼침 상태로 초기화
    document.querySelectorAll('.accordion').forEach(group => {
        const firstItem = group.querySelector('.accordion-item');
        if (!firstItem) return;
        const firstContent = firstItem.querySelector('.accordion-content');
        if (!firstContent) return;
        firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        firstItem.classList.add('active');
    });
}

const btnTop = document.querySelector('.btn_top');

if (btnTop) {
    // 초기 상태는 이미 CSS에서 visibility: hidden으로 설정되어 있음

    window.addEventListener('scroll', () => {
        if (window.scrollY > 1170) {
            btnTop.style.visibility = 'visible';
        } else {
            btnTop.style.visibility = 'hidden';
        }
    });

    btnTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
