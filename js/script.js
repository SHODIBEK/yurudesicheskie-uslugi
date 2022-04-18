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

const questions = [{
        question: "Сфера деятельности вашей компании",
        choices: [
            "Банковская сфера",
            " Авиация",
            "Военно-промышленный комплекс",
            "Торговля",
            "Другое",
        ],
    },
    {
        question: "Каким образом санкции повлияли на вашу финансово-хозяйственную деятельность?",
        choices: [
            "Банковская сфера",
            " Авиация",
            "Военно-промышленный комплекс",
            "Торговля",
            "Другое",
        ],
    },
    {
        question: "Государсивенное участие в компании?",
        choices: ["Да", "Нет", "Другое"],
    },
    {
        question: "Под действие санкции каких стран попала ваша компания?",
        choices: [
            "Компания не попала под санкции напрямую",
            "Украина",
            "Европа",
            "США",
            "Другие страны",
        ],
    },
    {
        question: "Есть ли заблокированные счета за рубежом?",
        choices: ["Да", "Нет", "Заблокированы счета в Российской Федерации "],
    },
];

let count = 0;
const __labels = Array.from(document.querySelectorAll(".quez__item label"));
const __lastBtn = document.querySelector(".last__ques");

const createElements = (elem) => {
    const __labels = Array.from(document.querySelectorAll(".quez__item label"));
    document.querySelector(".quez__items .title").textContent = `${count + 1}. ${
    elem[count].question
  }`;
    for (let i = 0; i < __labels.length; i++) {
        __labels[i].textContent = elem[count].choices[i];
        if (__labels[i].textContent === "") __labels[i].parentElement.remove();
    }
    if (count > 0) {
        __lastBtn.style.display = "block";
    }
};

createElements(questions);

let k = 5;
const onPrev = () => {
    count--;
    i++;
    if (i >= 4) {
        __lastBtn.style.display = "none";
        k -= 1;
        last.textContent = k;
    }
    last.textContent = i;
    progress.value -= 20;

    createElements(questions);
};
__lastBtn.addEventListener("click", onPrev);

const __btn = document.querySelector(".btn");
let i = questions.length;
last.textContent = i;

const onModal = (e) => {
    e.preventDefault();
    const elems = Array.from(document.querySelector(".quez").childNodes);
    elems.forEach((el) => el.remove());
    const h = document.createElement("h2");
    h.textContent =
        "Спасибо, мы получили всю необходимую информацию. План вывода компании из кризиса будет направлен вам по указанному адресу.";
    h.classList.add("title");
    h.classList.add("thanks");
    document.querySelector(".quez").append(h);
    const btnEl = document.createElement("button");
    btnEl.type = "button";
    btnEl.classList.add("btn__again");
    btnEl.textContent = "Пройти заново";
    document.querySelector(".quez").append(btnEl);
    document.querySelector(".btn__again").onclick = () => {
        window.location.reload();
    };
};

const contacts = () => {
    document.querySelector(".title__main").textContent = "Ваши контактные данные";
    __labels.forEach((el) => {
        el.parentElement.remove();
    });
    const list = ["Как к вам обращаться", "Ваш номер телефона", "Ваш E-mail*"];
    for (let i = 0; i < 3; i += 1) {
        const inp = document.createElement("input");
        inp.type = "text";
        inp.classList.add("qeuz__input");
        inp.classList.add("inps");
        inp.required = true;
        inp.placeholder = list[i];
        document.querySelector(".quez__form").appendChild(inp);
    }
    __btn.remove();
    const butEl = document.createElement("button");
    butEl.type = "submit";
    butEl.textContent = "Отправить";
    butEl.classList.add("btn__sub");
    butEl.style.order = 1;

    butEl.addEventListener("click", onModal);
    __lastBtn.style.order = 2;
    document.querySelector(".btn__group").append(butEl);
    document.querySelector(".btn__group").style.order = 2;
};

const onNext = (e) => {
    e.preventDefault();
    i -= 1;
    count++;
    last.textContent = i;
    if (i === 0) i = 5;
    progress.value += 20;
    if (count >= 5) {
        contacts();
        return;
    }
    createElements(questions);
};
__btn.addEventListener("click", onNext);