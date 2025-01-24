document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const cardFront = card.querySelector('.card-front');
    const cardBack = card.querySelector('.card-back');
    const prevButton = document.getElementById('prev-card');
    const nextButton = document.getElementById('next-card');
    const categoryLinks = document.querySelectorAll('#category-menu a');

    let currentCategory = null;
    let currentCardIndex = 0;
    let currentCategoryData = [];

    const etymologyData = {
        "A_AN": [
            { front: "Ablepsia", back: "vista" },
            { front: "Abulia", back: "voluntad" },
            { front: "Acilia", back: "pestaña" },
            { front: "Adipsia", back: "sed" },
            { front: "Afasia", back: "palabras, habla" },
            { front: "Agrafia", back: "escribir" },
            { front: "Alexia", back: "lectura" },
            { front: "Alopecia", back: "cabello" },
            { front: "Anafia", back: "tacto" },
            { front: "Anodinia", back: "dolor" },
            { front: "Anosmia", back: "olfato" },
            { front: "Anuro", back: "cola" },
            { front: "Asepsia", back: "putrefacción" },
            { front: "Atimia", back: "conocimiento" },
            { front: "Atrofia", back: "crecimiento" }
        ],
        "ALGIA": [
            { front: "Adenalgia", back: "glándulas" },
            { front: "Cefalalgia", back: "cabeza" },
            { front: "Cistalgia", back: "vejiga" },
            { front: "Dermalgia", back: "piel" },
            { front: "Enteralgia", back: "intestinos" },
            { front: "Gastralgia", back: "estómago" },
            { front: "Glosalgia", back: "lengua" },
            { front: "Gonalgia", back: "rodilla" },
            { front: "Mialgia", back: "músculos" },
            { front: "Neuralgia", back: "nervios" },
            { front: "Odontalgia", back: "diente" },
            { front: "Omalgia", back: "espalda" },
            { front: "Podalgia", back: "pie" },
            { front: "Rinalgia", back: "nariz" },
            { front: "Ulalgia", back: "encía" }
        ],
        "ARQUIA_CRACIA": [
            { front: "Anarquía, Acracia", back: "sin" },
            { front: "Aristocracia", back: "nobleza" },
            { front: "Burocracia", back: "empleados públicos" },
            { front: "Dasocracia", back: "montes y cultivos" },
            { front: "Democracia", back: "pueblo" },
            { front: "Diarquía", back: "dos" },
            { front: "Factocracia", back: "golpe Estado" },
            { front: "Hierocracia", back: "sacerdotes" },
            { front: "Mesocracia", back: "clase media" },
            { front: "Monarquía", back: "uno" },
            { front: "Oligarquía", back: "pocos" },
            { front: "Oclocracia", back: "multitud" },
            { front: "Plutocracia", back: "ricos" },
            { front: "Tecnocracia", back: "técnicos, especialistas" },
            { front: "Triarquía", back: "tres" }
        ],
        "CIDA": [
            { front: "Acaricida", back: "ácaros, sarna" },
            { front: "Docericida", back: "docente" },
            { front: "Filicida", back: "hijo" },
            { front: "Fratricida", back: "hermano" },
            { front: "Fungicida", back: "hongo" },
            { front: "Genocida", back: "multitud" },
            { front: "Homicida", back: "semejante" },
            { front: "Magnicida", back: "magnate" },
            { front: "Matricida", back: "madre" },
            { front: "Paidocida", back: "niño" },
            { front: "Parricida", back: "padre" },
            { front: "Regicida", back: "rey" },
            { front: "Suicida", back: "a sí mismo" },
            { front: "Uxoricida", back: "cónyuge, esposa" },
            { front: "Viricida", back: "esposo" }
        ],
        "FAGO_VORO": [
            { front: "Antófago", back: "flores" },
            { front: "Antropófago", back: "carne humana" },
            { front: "Carpófago", back: "frutos" },
            { front: "Fitófago", back: "plantas, vegetales" },
            { front: "Hipófago", back: "caballo" },
            { front: "Insectívoro", back: "insectos" },
            { front: "Lactívoro", back: "leche" },
            { front: "Omnívoro", back: "todo" },
            { front: "Onicófago", back: "uñas" },
            { front: "Oófago, ovívoro", back: "huevos" },
            { front: "Piscívoro", back: "peces" },
            { front: "Pterófago", back: "alas" },
            { front: "Rizófago", back: "raíz" },
            { front: "Vermívoro", back: "gusanos" },
            { front: "Xilófago", back: "madera" }
        ],
        "FILIA": [
            { front: "Acluofilia", back: "oscuridad" },
            { front: "Anemofilia", back: "viento" },
            { front: "Bromatofilia", back: "alimentos" },
            { front: "Cinofilia", back: "perros" },
            { front: "Dikiefilia", back: "justicia" },
            { front: "Entomofilia", back: "insectos" },
            { front: "Farmacofilia", back: "medicamentos" },
            { front: "Gerontofilia", back: "ancianos" },
            { front: "Halofilia", back: "sal" },
            { front: "Helmintoﬁlia", back: "gusanos" },
            { front: "Iconofilia", back: "imágenes" },
            { front: "Nosofilia", back: "enfermedades" },
            { front: "Paidofilia", back: "niños" },
            { front: "Tanatofilia", back: "muerte" },
            { front: "Xicofilia", back: "venenos" }
        ],
        "FOBIA": [
            { front: "Acrofobia", back: "altura" },
            { front: "Brontofobia", back: "truenos" },
            { front: "Claustrofobia", back: "encierros" },
            { front: "Dermatofobia", back: "enfermedades cutáneas" },
            { front: "Enofobia", back: "vino (licor)" },
            { front: "Fotofobia", back: "luz" },
            { front: "Galactofobia", back: "leche" },
            { front: "Hematofobia", back: "sangre" },
            { front: "Ictiofobia", back: "peces" },
            { front: "Lupofobia", back: "lobos" },
            { front: "Mitofobia", back: "mentiras" },
            { front: "Necrofobia", back: "cadáveres" },
            { front: "Oclofobia", back: "multitud" },
            { front: "Queirofobia", back: "tormentas" },
            { front: "Talasofobia", back: "mar" }
        ],
        "ITIS": [
            { front: "Artritis", back: "articulaciones" },
            { front: "Blefaritis", back: "párpados" },
            { front: "Cistitis", back: "vejiga" },
            { front: "Enteritis", back: "intestinos" },
            { front: "Flebitis", back: "venas" },
            { front: "Gingivitis", back: "encías" },
            { front: "Hepatitis", back: "hígado" },
            { front: "Mastitis", back: "mamas" },
            { front: "Neuritis", back: "nervios" },
            { front: "Orquitis", back: "testículos" },
            { front: "Osteitis", back: "huesos" },
            { front: "Otitis", back: "oído" },
            { front: "Peritonitis", back: "peritoneo" },
            { front: "Queratitis", back: "córnea" },
            { front: "Rinitis", back: "nariz" }
        ],
        "LOGO": [
            { front: "Arqueólogo", back: "ruinas, antigüedad" },
            { front: "Cardiólogo", back: "corazón" },
            { front: "Endocrinólogo", back: "secreciones internas" },
            { front: "Entomólogo", back: "insectos" },
            { front: "Espeleólogo", back: "cavernas" },
            { front: "Etnólogo", back: "costumbres, razas" },
            { front: "Filólogo", back: "lenguaje" },
            { front: "Geólogo", back: "tierra" },
            { front: "Grafólogo", back: "escritura" },
            { front: "Hematólogo", back: "sangre" },
            { front: "Ictiólogo", back: "peces" },
            { front: "Nefrólogo", back: "riñón" },
            { front: "Ornitólogo", back: "aves, pájaros" },
            { front: "Paleólogo", back: "escrituras antiguas" },
            { front: "Paleontólogo", back: "restos fósiles" }
        ],
        "MANIA": [
            { front: "Ablutomanía", back: "bañarse" },
            { front: "Cleptomanía", back: "robo" },
            { front: "Dipsomanía", back: "bebidas alcohólicas" },
            { front: "Doxomanía", back: "gloria" },
            { front: "Ergasiomanía", back: "trabajo" },
            { front: "Fagomanía", back: "comer" },
            { front: "Ginemanía", back: "mujeres" },
            { front: "Lalomanía", back: "hablar" },
            { front: "Megalomanía", back: "delirio de grandeza" },
            { front: "Melomanía", back: "música" },
            { front: "Mitomanía", back: "fábulas, leyendas" },
            { front: "Nictomanía", back: "noche" },
            { front: "Piromanía", back: "altas temperaturas" },
            { front: "Queromanía", back: "estar alegre" },
            { front: "Tanatomanía", back: "muerte" }
        ],
        "METRO": [
            { front: "Aerómetro", back: "aire" },
            { front: "Altímetro", back: "altitud" },
            { front: "Amperímetro", back: "intensidad electricidad" },
            { front: "Anemómetro", back: "viento" },
            { front: "Areómetro", back: "densidad líquidos" },
            { front: "Barómetro", back: "presión atmosférica" },
            { front: "Cursómetro", back: "velocidad del tren" },
            { front: "Dinamómetro", back: "fuerza" },
            { front: "Espirómetro", back: "capacidad respiratoria" },
            { front: "Hidrómetro", back: "agua" },
            { front: "Higrómetro", back: "humedad" },
            { front: "Odómetro", back: "distancia" },
            { front: "Pirómetro", back: "altas temperaturas" },
            { front: "Pluviómetro", back: "lluvias" },
            { front: "Tensiómetro", back: "tensión" }
        ],
        "TECA": [
            { front: "Dactiloteca", back: "aros, anillos" },
            { front: "Discoteca", back: "discos" },
            { front: "Filmoteca", back: "películas" },
            { front: "Gipsoteca", back: "estatuas, yeso" },
            { front: "Gliptoteca", back: "piedras grabadas" },
            { front: "Hemeroteca", back: "periódicos, revistas" },
            { front: "Iconoteca", back: "imágenes" },
            { front: "Ludoteca", back: "juegos" },
            { front: "Miroteca", back: "perfumes" },
            { front: "Oploteca", back: "armas y escudos" },
            { front: "Osteoteca", back: "huesos" },
            { front: "Pinacoteca", back: "pinturas, cuadros" },
            { front: "Quiroteca", back: "guantes" },
            { front: "Toxicoteca", back: "venenos" },
            { front: "Xiloteca", back: "madera" }
        ]
    };


    function loadCategory(categoryName) {
        if (etymologyData[categoryName]) {
            currentCategory = categoryName;
            currentCategoryData = etymologyData[categoryName];
            currentCardIndex = 0;
            updateCard();
        }
    }

    function updateCard() {
        if (currentCategoryData.length > 0) {
            cardFront.textContent = currentCategoryData[currentCardIndex].front;
            cardBack.textContent = currentCategoryData[currentCardIndex].back;
        } else {
            cardFront.textContent = "Categoría vacía";
            cardBack.textContent = "No hay palabras en esta sección.";
        }
    }

    card.addEventListener('click', () => {
        card.classList.toggle('is-flipped');
    });

    prevButton.addEventListener('click', () => {
        if (currentCategoryData.length > 0) {
            currentCardIndex = (currentCardIndex - 1 + currentCategoryData.length) % currentCategoryData.length;
            updateCard();
            if (card.classList.contains('is-flipped')) { // Mantener la tarjeta en la cara frontal al navegar
                card.classList.remove('is-flipped');
            }
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentCategoryData.length > 0) {
            currentCardIndex = (currentCardIndex + 1) % currentCategoryData.length;
            updateCard();
            if (card.classList.contains('is-flipped')) { // Mantener la tarjeta en la cara frontal al navegar
                card.classList.remove('is-flipped');
            }
        }
    });

    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const category = link.getAttribute('data-category');
            loadCategory(category);
        });
    });

    // Cargar la primera categoría por defecto al inicio
    loadCategory("A_AN");
});