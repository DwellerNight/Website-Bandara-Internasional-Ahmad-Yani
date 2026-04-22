// ===============================
// WEBSITE BANDARA AHMAD YANI
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Bandara Ahmad Yani siap digunakan");

    // ===============================
    // ELEMENT UMUM
    // ===============================
    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll(".section");
    const footerLinks = document.querySelectorAll(".footer-menu a");
    const formPesan = document.getElementById("formPesan");

    // ===============================
    // FUNGSI GANTI SECTION DENGAN ANIMASI
    // ===============================
    function gantiSection(id) {
        sections.forEach(section => {
            section.classList.remove("aktif");
            const animatedElements = section.querySelectorAll('.animate');
            animatedElements.forEach(el => {
                el.classList.remove('animate-in');
            });
        });

        const target = document.getElementById(id);
        if (target) {
            target.classList.add("aktif");
            setTimeout(() => {
                const animatedElements = target.querySelectorAll('.animate');
                animatedElements.forEach((el, index) => {
                    el.style.transitionDelay = `${index * 0.1}s`;
                    el.classList.add('animate-in');
                });
            }, 50);
        }

        menuItems.forEach(item => {
            item.classList.remove("aktif");
            if (item.getAttribute("href") === `#${id}`) {
                item.classList.add("aktif");
            }
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // ===============================
    // NAVIGASI HEADER
    // ===============================
    menuItems.forEach(item => {
        item.addEventListener("click", e => {
            const href = item.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                const id = href.replace("#", "");
                gantiSection(id);
            }
        });
    });

    // ===============================
    // NAVIGASI FOOTER
    // ===============================
    footerLinks.forEach(link => {
        link.addEventListener("click", e => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                const id = href.replace("#", "");
                gantiSection(id);
            }
        });
    });

    // ================= FASILITAS SIDEBAR & TAB =================
    const sidebarItems = document.querySelectorAll(".sidebar-item");
    const tabs = document.querySelectorAll(".tab");
    const sidebarToggle = document.getElementById("sidebarToggle");

    sidebarItems.forEach(item => {
        item.addEventListener("click", () => {
            sidebarItems.forEach(i => i.classList.remove("aktif"));
            tabs.forEach(t => t.classList.remove("aktif"));
            item.classList.add("aktif");
            document.getElementById(item.dataset.tab).classList.add("aktif");
        });
    });

    if (sidebarToggle) {
        const sidebar = document.querySelector(".sidebar-kiri");
        sidebar.classList.add("collapsed");
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
        });
    }

    // ===============================
    // FORM KONTAK
    // ===============================
    if (formPesan) {
        const successMessage = document.getElementById("successMessage");

        formPesan.addEventListener("submit", e => {
            e.preventDefault();
            const nama = document.getElementById("nama").value.trim();
            const email = document.getElementById("email").value.trim();
            const pesan = document.getElementById("pesan").value.trim();

            if (!nama || !email || !pesan) {
                alert("Harap isi semua field!");
                return;
            }

            if (!email.includes("@") || !email.includes(".")) {
                alert("Email tidak valid!");
                return;
            }

            // Tampilkan pesan sukses
            if (successMessage) {
                successMessage.classList.add("show");
                // Reset form
                formPesan.reset();
                // Auto hide setelah 5 detik
                setTimeout(() => {
                    successMessage.classList.remove("show");
                }, 5000);
            }
        });
    }

    // ===============================
    // CEK HASH URL
    // ===============================
    const hash = window.location.hash.replace("#", "");
    if (hash && document.getElementById(hash)) {
        gantiSection(hash);
    } else {
        gantiSection("home");
    }

    // ===============================
    // GALERI ATAS - MANUAL SLIDE WITH INFINITE LOOP
    // ===============================
    const galeriTrack = document.querySelector(".galeri-track");
    const panahKananAtas = document.querySelector(".panah-kanan-atas");

    if (galeriTrack && panahKananAtas) {
        const items = galeriTrack.children;
        const itemWidth = items[0].offsetWidth + 18;
        let currentIndex = 0;

        function updateTrack() {
            galeriTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        }

        panahKananAtas.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % items.length;
            updateTrack();
        });
    }

    // ===============================
    // GALERI UTAMA - NAVIGASI GAMBAR
    // ===============================
    const gambarUtamaImg = document.getElementById("gambar-utama-img");
    const panahKiriGaleri = document.querySelector(".galeri-utama .panah-kiri");
    const panahKananGaleri = document.querySelector(".galeri-utama .panah-kanan");

    if (gambarUtamaImg && panahKiriGaleri && panahKananGaleri) {
        const gambarGaleri = ["asset/home.jpeg", "asset/home1.jpg", "asset/home2.jpg", "asset/home3.jpg", "asset/home4.jpg", "asset/profil.jpg", "asset/kontak.jpg"];
        let indexGambar = 0;

        function updateGambar() {
            gambarUtamaImg.src = gambarGaleri[indexGambar];
            gambarUtamaImg.alt = `Gambar Galeri ${indexGambar + 1}`;
        }

        panahKiriGaleri.addEventListener("click", () => {
            indexGambar = (indexGambar - 1 + gambarGaleri.length) % gambarGaleri.length;
            updateGambar();
        });

        panahKananGaleri.addEventListener("click", () => {
            indexGambar = (indexGambar + 1) % gambarGaleri.length;
            updateGambar();
        });

        updateGambar();
    }

    // ===============================
    // ACCORDION - DAFTAR PANDUAN
    // ===============================
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(function(accordion) {
        const header = accordion.querySelector(".accordion-header");
        const content = accordion.querySelector(".accordion-content");

        content.style.maxHeight = "0";
        content.style.overflow = "hidden";

        header.addEventListener("click", function() {
            accordions.forEach(function(item) {
                if (item !== accordion) {
                    item.classList.remove("active");
                    item.querySelector(".accordion-content").style.maxHeight = "0";
                }
            });

            accordion.classList.toggle("active");
            if (accordion.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0";
            }
        });
    });
});

