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
const tabItems = Array.from(document.querySelectorAll('.analys-companies-item'));
const contentItems = Array.from(document.querySelectorAll('.analys-content'));

const clearActiveClass = (element, className = 'is-active') => {
    element.find(item => item.classList.remove(`${className}`))
}

const addActiveClass = (element, index, className = 'is-active') => {
    element[index].classList.add(`${className}`)
}
const checkoutTabs = (item, index) => {
    item.addEventListener('click', () => {
        clearActiveClass(tabItems)
        clearActiveClass(contentItems)

        addActiveClass(tabItems, index)
        addActiveClass(contentItems, index)
    })
}

tabItems.forEach(checkoutTabs)

