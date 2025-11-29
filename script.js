document.addEventListener("DOMContentLoaded", () => {
  // Все страницы альбома: 6 страниц, 10 фотографий
  const pages = [
    {
      heading: "Välkommen till din magiska bok, Oskar ✨",
      subheading: "September 2021 • sex månader",
      body:
        "Här börjar vår första fotosaga. Små händer, stora ögon och ett hjärta som fyller hela rummet. " +
        "Det här albumet samlar våra favoritögonblick från september 2021.",
      images: [
        {
          file: "IMG_20210924_105249.jpg",
          alt: "Oskar sitter med nalle i famnen",
          caption: "Första månaden i vår magiska saga."
        }
      ]
    },
    {
      heading: "Första leendet",
      subheading: "När världen svarar med ett leende tillbaka.",
      body:
        "Oskar tittar nyfiket in i kameran. Leendet är stilla men varmt – en liten hemlighet mellan oss och honom.",
      images: [
        {
          file: "IMG_20210924_104621.jpg",
          alt: "Oskar sitter och tittar uppåt",
          caption: "Ett stilla, nyfiket leende."
        }
      ]
    },
    {
      heading: "Värme hemma",
      subheading: "I famnen, i soffan, i hela rummet.",
      body:
        "Hemma är där vi håller om varandra. Varje bild känns som en mjuk filt runt familjen Sivakova.",
      images: [
        {
          file: "IMG_20210923_211119.jpg",
          alt: "Familjebild hemma",
          caption: "Kvällsmyset som vi alltid vill minnas."
        },
        {
          file: "IMG_20210924_103528.jpg",
          alt: "Närhet och värme hemma",
          caption: "Små kramar, stora känslor."
        }
      ]
    },
    {
      heading: "Små äventyr",
      subheading: "Ballonger, nalle och nya vinklar på världen.",
      body:
        "Ballonger, leksaker och mjuka filtar. Oskar upptäcker färger, former och ljud – varje dag ett nytt äventyr.",
      images: [
        {
          file: "IMG_20210924_104337.jpg",
          alt: "Oskar med ballonger och leksaker",
          caption: "Sexan i bakgrunden, framtiden framför oss."
        },
        {
          file: "IMG_20210924_104714.jpg",
          alt: "Oskar ligger mjukt bland leksaker",
          caption: "En liten paus mitt i leken."
        }
      ]
    },
    {
      heading: "Familjestund",
      subheading: "Tre hjärtan, en liten värld.",
      body:
        "Vi skrattar, pussas och håller om. I de här stunderna känns tiden långsam och hjärtat väldigt, väldigt fullt.",
      images: [
        {
          file: "IMG_20210924_104747.jpg",
          alt: "Familjebild med Oskar",
          caption: "Tillsammans är vi hemma."
        },
        {
          file: "IMG_20210924_104932.jpg",
          alt: "Närhet, famn och trygghet",
          caption: "Ett ögonblick av ren kärlek."
        }
      ]
    },
    {
      heading: "Tack-sida",
      subheading: "Tack för varje blick, leende och kram.",
      body:
        "Det här albumet är vår kärlekshälsning till dig, Oskar. Tack för att du kom med ljus, skratt och magi. " +
        "Vi längtar efter alla nästa kapitel tillsammans.",
      images: [
        {
          file: "IMG_20210924_105006.jpg",
          alt: "Oskar med leksaker runt omkring",
          caption: "Små steg mot en stor värld."
        },
        {
          file: "IMG_20210924_105105.jpg",
          alt: "Närbild på Oskar med mjuk blick",
          caption: "Vi älskar dig – mamma & pappa."
        }
      ]
    }
  ];

  let currentPage = 0;

  const frameEl = document.getElementById("photoFrame");
  const titleEl = document.getElementById("pageTitle");
  const subtitleEl = document.getElementById("pageSubtitle");
  const descEl = document.getElementById("pageDescription");
  const indicatorEl = document.getElementById("pageIndicator");
  const pageInnerEl = document.querySelector(".page-inner");
  const tabs = document.querySelectorAll("#pageTabs li");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  function renderPage(index, animate = true) {
    const page = pages[index];
    if (!page) return;

    // анимация перелистывания
    if (animate) {
      pageInnerEl.classList.remove("turning");
      // небольшая задержка, чтобы перезапустить animation
      void pageInnerEl.offsetWidth;
      pageInnerEl.classList.add("turning");
    }

    // настройка рамки под количество фото
    if (page.images.length === 1) {
      frameEl.className = "photo-frame single big";
    } else {
      frameEl.className = "photo-frame double";
    }

    // вставляем фото
    frameEl.innerHTML = "";
    page.images.forEach((imgInfo) => {
      const figure = document.createElement("figure");
      figure.className = "photo-slot";

      const img = document.createElement("img");
      img.src = "images/" + imgInfo.file;
      img.alt = imgInfo.alt || "";

      figure.appendChild(img);

      if (imgInfo.caption) {
        const cap = document.createElement("figcaption");
        cap.textContent = imgInfo.caption;
        figure.appendChild(cap);
      }

      frameEl.appendChild(figure);
    });

    // текст
    titleEl.textContent = page.heading;
    subtitleEl.textContent = page.subheading;
    descEl.textContent = page.body;

    // индикатор страниц
    indicatorEl.textContent = `${index + 1} / ${pages.length}`;

    // активная вкладка слева
    tabs.forEach((tab, i) => {
      tab.classList.toggle("active", i === index);
    });
  }

  // Кнопки
  prevBtn.addEventListener("click", () => {
    currentPage = (currentPage - 1 + pages.length) % pages.length;
    renderPage(currentPage);
  });

  nextBtn.addEventListener("click", () => {
    currentPage = (currentPage + 1) % pages.length;
    renderPage(currentPage);
  });

  // Клики по вкладкам слева
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      currentPage = index;
      renderPage(currentPage);
    });
  });

  // Первая загрузка без анимации
  renderPage(currentPage, false);
});
