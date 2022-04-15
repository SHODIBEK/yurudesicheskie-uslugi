const navLink = document.querySelectorAll('.m_scrollspy ul .nav-link');


for (let i = 0; i < navLink.length; i++) {
    navLink[i].onclick = () => {
        // Удаляем класс у всех
        navLink.forEach(function(el) {
            el.classList.remove('active');
        });
        //Добавляем класс выбранному
        if (!navLink[i].classList.contains('active')) {
            navLink[i].classList.add('active')
        }
    }
}