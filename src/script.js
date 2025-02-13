// 1. Lucide 아이콘 초기화
// Lucide 라이브러리의 아이콘들을 페이지에 렌더링
lucide.createIcons();

// 아코디언 코드도 요소 존재 여부 확인
const accordionButtons = document.querySelectorAll('.accordion-button');
if (accordionButtons.length > 0) {
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            if (!content) return; // content가 없으면 실행하지 않음

            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                }
            });

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
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