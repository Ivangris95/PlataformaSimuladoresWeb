document.addEventListener("DOMContentLoaded", function () {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeButton = document.querySelector(".close-lightbox");
    const carouselImages = document.querySelectorAll(".carousel-slide img");
    const prevButton = document.getElementById("prev-btn");
    const nextButton = document.getElementById("next-btn");

    let currentImageIndex = 0;

    console.log("Imagenes del carrusel", carouselImages);

    // Función para mostrar la imagen actual en el lightbox
    function showImage(index) {
        // Asegurarse de que el índice esté dentro de los límites
        if (index < 0) {
            currentImageIndex = carouselImages.length - 1;
        } else if (index >= carouselImages.length) {
            currentImageIndex = 0;
        } else {
            currentImageIndex = index;
        }

        // Mostrar la imagen actual
        lightboxImg.src = carouselImages[currentImageIndex].src;
        lightboxImg.classList.add("fade-in");

        // Quitar la animación después de que termine
        setTimeout(() => {
            lightboxImg.classList.remove("fade-in");
        }, 500);
    }

    // Añadir evento de clic a cada imagen del carrusel
    carouselImages.forEach(function (img, index) {
        img.addEventListener("click", function () {
            lightbox.style.display = "block";
            currentImageIndex = index;
            showImage(currentImageIndex);
        });
    });

    // Botón anterior
    prevButton.addEventListener("click", function (e) {
        e.stopPropagation(); // Evitar que el clic cierre el lightbox
        showImage(currentImageIndex - 1);
    });

    // Botón siguiente
    nextButton.addEventListener("click", function (e) {
        e.stopPropagation(); // Evitar que el clic cierre el lightbox
        showImage(currentImageIndex + 1);
    });

    // Cerrar el lightbox al hacer clic en X
    closeButton.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    // Cerrar el lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    // Navegar por el lightbox con las teclas de flecha
    document.addEventListener("keydown", function (e) {
        if (lightbox.style.display === "block") {
            if (e.key === "Escape") {
                lightbox.style.display = "none";
            } else if (e.key === "ArrowLeft") {
                showImage(currentImageIndex - 1);
            } else if (e.key === "ArrowRight") {
                showImage(currentImageIndex + 1);
            }
        }
    });
});
