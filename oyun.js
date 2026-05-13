

// 1. HTML Elementlerini Seçme
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const baslat = document.getElementById('baslat');
const girisEkrani = document.getElementById('girisEkrani');

const player = {
    //Karaketin niteliklerini kapsayan nesne
    x: 50,
    y: 400,
    width: 40,
    height: 60,
    speed: 2,
    velocityX: 0,
    velocityY: 0,
    gravity: 0.5,
    ziplamaGucu: -12,
    havadaMi: false,
    bakisYonu: 'sag' // 'sag' veya 'sol'

};
const tuslar = {
    sag: false,
    sol: false,
    yukari: false,
    asagi: false,
    zipla: false,
    kos: false,
    itme: false,
    konus: false,
    nesneAl: false
};
const itilenKutu = {
    x: 200,
    y: 450,
    width: 40,
    height: 60
};
const engel2 = {
    x: 600,
    y: 360,
    width: 100,
    height: 150
};
const engel22 = {
    x: 500,
    y: 360,
    width: 100,
    height: 150
};
const engel3 = {
    x: 700,
    y: 340,
    width: 100,
    height: 170
};
const engel4 = {
    x: 800,
    y: 260,
    width: 200,
    height: 250
};
const kapi = {
    x: 900,
    y: 100,
    width: 100,
    height: 160
};


const kapi2 = {
    x: 925,
    y: 300,
    width: 100,
    height: 160
};
const kontrolTusları = {
    x: 0,
    y: 0,
    width: 200,
    height: 200
};
const ipucu1 = {
    x: 600,
    y: 130,
    width: 80,
    height: 80
};
const oda2giris = {
    x: 0,
    y: 300,
    width: 100,
    height: 210
};
const oda2envanterKutu = {
    x: 450,
    y: 250,
    width: 50,
    height: 50
};
const envanterKutuAlt = {
    x: 400,
    y: 300,
    width: 150,
    height: 20
};
const oda2yer = {
    x: 600,
    y: 500,
    width: 90,
    height: 25
};
const oda2engel = {
    x: 200,
    y: 430,
    width: 50,
    height: 80
};
const npc = {
    x: 550,
    y: 130,
    width: 50,
    height: 50
};

const npcHikaye = {
    x: 100,
    y: 200,
    width: 200,
    height: 400

};

const girisKapi = {// kullanmıyoru bir yerde
    x: 450,
    y: 0,
    width: 100,
    height: 10
};

const kapi3 = {
    x: 900,
    y: 350,
    width: 100,
    height: 160
};

const oda3yer = {
    x: 180,
    y: 500,
    width: 90,
    height: 25,

};
const oda3engel1 = {
    x: 500,
    y: 410,
    width: 200,
    height: 100,
    color: "#195cd0"
};
const anahtar = {
    x: 150,
    y: 120,
    width: 100,
    height: 80
};
const oda3engel2 = {
    x: 150,
    y: 180,
    width: 100,
    height: 20
};
const oda3engel3 = {
    x: 300,
    y: 290,
    width: 150,
    height: 20
};


// Bu değişken oyunun o an hangi ekranda olduğunu takip eder
let oyunDurumu = 'baslangic';
let zaman = 60; // Oyuna 60 saniye veriyoruz
let envanter = []; // Oyuncunun topladığı nesneleri tutacak dizi

let ekranKarartma = 0;// 0 = Saydam, 1 = Tamamen Siyah
let kararmaYonu = 0;// 1 = Kararıyor, -1 = Açılıyor, 0 = Geçiş Yok
let sonrakiDurum = '';// Ekran karardıktan sonra hangi ekrana geçeceğiz?

let uyariMesajiGoster = false;
let uyariMesajiSuresi = 0;

//Oyunda kullanılan sesler
const oyunFonMuzigi = new Audio('oyunMuzigi.mp3');
oyunFonMuzigi.loop = true;
oyunFonMuzigi.volume = 0.4;

const bitisMuzigi = new Audio('oyunBitisBasari.mp3');
bitisMuzigi.loop = false;
bitisMuzigi.volume = 0.6;

//Oyunda kullanılan resimler
const arkaplanResmi = new Image();
arkaplanResmi.src = 'girisResmi.jpeg'; 

const oda1arkaplan = new Image();
oda1arkaplan.src = 'oda1arkaplan.jpeg';

const oda2arkaplan = new Image();
oda2arkaplan.src = 'oda2arkaplan.jpeg';

const oda3arkaplan = new Image();
oda3arkaplan.src = 'oda3arkaplan.png';

const engell4 = new Image();
engell4.src = 'engel4.png';

const engell3 = new Image();
engell3.src = 'engel3.jpeg';

const engell2 = new Image();
engell2.src = 'engel2.jpeg';

const oda3engell = new Image();
oda3engell.src = 'oda3engel.jpeg';

const engell = new Image();
engell.src = 'engel.jpeg';

const ipucu = new Image();
ipucu.src = 'ipucu.png';

const oda2ust = new Image();
oda2ust.src = 'oda2ust.png';

const odayerr = new Image();
odayerr.src = 'odayer.png';

const envanterResmi = new Image();
envanterResmi.src = 'envanter.png';

const koridor = new Image();
koridor.src = 'koridorSon.png';

const anahtarResmi = new Image();
anahtarResmi.src = 'anahtar.png';

const karakter = new Image();
karakter.src = 'karakter_arkadan.jpeg';

const karakter1 = new Image();
karakter1.src = 'karakter_sag.jpeg';

const karakter2 = new Image();
karakter2.src = 'karakter_sol.jpeg';

const npcc = new Image();
npcc.src = 'profesor.jpeg';


function oyunuSifirla() {
    
    zaman = 60;
    envanter = [];

    
    player.velocityY = 0;
    player.havadaMi = false;

    // 1. Oda Kutularını İlk Yerlerine Koy
    itilenKutu.x = 200;
    itilenKutu.y = 450;

    // 2. Oda Kutularını İlk Yerlerine Koy
    oda2engel.x = 200;
    oda2engel.y = 430;


    oda2envanterKutu.x = 450;
    oda2envanterKutu.y = 250;

    anahtar.x = 150;
    anahtar.y = 120;

    ipucu1.x = 600;
    ipucu1.y = 130;

    // (Eğer ileride hareket eden başka kutular eklersen onları da buraya yazacaksın)
}

window.addEventListener('keydown', function (e) {
    if (e.key === 'd' || e.key === 'D')
        tuslar.sag = true;
    if (e.key === 'a' || e.key === 'A' || e.key === 'q' || e.key === 'Q')
        tuslar.sol = true;
    if (e.key === 'w' || e.key === 'W' || e.key === 'z' || e.key === 'Z')
        tuslar.yukari = true;
    if (e.key === 's' || e.key === 'S')
        tuslar.asagi = true;
    if (e.key === ' ')
        tuslar.zipla = true;
    if (e.key === 'Shift')
        tuslar.kos = true;
    if (e.key === 'h' || e.key === 'H')
        tuslar.konus = true;
    if (e.key === 'e' || e.key === 'E')
        tuslar.nesneAl = true;
    if (e.key === 'Enter' && oyunDurumu === 'hikaye') {
        // Karakteri 1. oda için başlangıç noktasına getirir
        player.x = 50;
        player.y = 450;
        player.velocityY = 0;

        ekranGecisiYap('oyun');
    } if (e.key === 'Enter' && oyunDurumu === 'bitis') {
        if (bitisMuzigi) {
            bitisMuzigi.pause();
            bitisMuzigi.currentTime = 0;
        }
        oyunFonMuzigi.pause(); // Tedbir amaçlı önce durdur
        oyunFonMuzigi.currentTime = 0;
        ekranGecisiYap('baslangic');
        girisEkrani.style.display = 'flex';//baslangic ekranı görünür olur


        oyunuSifirla();
    }
    if (e.key === 'Q' || e.key === 'q' && oyunDurumu === 'hikaye') {

        ekranGecisiYap('giris');
    }
});

window.addEventListener('keyup', function (e) {
    if (e.key === 'd' || e.key === 'D') tuslar.sag = false;
    if (e.key === 'a' || e.key === 'A' || e.key === 'q' || e.key === 'Q') tuslar.sol = false;
    if (e.key === 'w' || e.key === 'W' || e.key === 'z' || e.key === 'Z') tuslar.yukari = false;
    if (e.key === 's' || e.key === 'S') tuslar.asagi = false;
    if (e.key === ' ') tuslar.zipla = false;
    if (e.key === 'Shift') tuslar.kos = false;
    if (e.key === 'h' || e.key === 'H') tuslar.konus = false;
    if (e.key === 'e' || e.key === 'E') tuslar.nesneAl = false;
});
// 3. FARE SOL TIK (Nesne İtme İçin)
window.addEventListener('mousedown', function (e) {
    // e.button === 0 demek, farenin sol tuşu demektir.
    if (e.button === 0) tuslar.itme = true;
});

window.addEventListener('mouseup', function (e) {
    if (e.button === 0) tuslar.itme = false;
});

function ekranGecisiYap(hedefDurum) {
    kararmaYonu = 1;
    sonrakiDurum = hedefDurum;
}

//  Çizim Fonksiyonu
function draw() {
    // Her kareden önce ekranı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (oyunDurumu === 'baslangic') {

        ctx.drawImage(arkaplanResmi, 0, 0, canvas.width, canvas.height);

    } else if (oyunDurumu === 'oyun') {

        ctx.drawImage(oda1arkaplan, 0, 0, canvas.width, canvas.height);

        if (player.bakisYonu === 'sag') {
            ctx.drawImage(karakter1, player.x, player.y, player.width, player.height);
        } else if (player.bakisYonu === 'sol') {
            ctx.drawImage(karakter2, player.x, player.y, player.width, player.height);
        }
        ctx.drawImage(engell, itilenKutu.x, itilenKutu.y, itilenKutu.width, itilenKutu.height);
        ctx.drawImage(engell2, engel2.x, engel2.y, engel2.width, engel2.height);
        ctx.drawImage(engell2, engel22.x, engel22.y, engel22.width, engel22.height);
        ctx.drawImage(engell3, engel3.x, engel3.y, engel3.width, engel3.height);
        ctx.drawImage(engell4, engel4.x, engel4.y, engel4.width, engel4.height);
        ctx.drawImage(ipucu, ipucu1.x, ipucu1.y, ipucu1.width, ipucu1.height);

        spotIsik();

        ctx.fillStyle = 'white';
        ctx.font = 'italic 20px Arial';
        ctx.fillText("A: Sol", 20, 100);
        ctx.fillText("D: Sağ", 20, 130);
        ctx.fillText("Space: Zıpla", 20, 160);
        ctx.fillText("Shift: Koş", 20, 190);
        ctx.fillText("Sol tık: Nesne İtme", 20, 220);
        ctx.fillText("E: Nesne Al", 20, 250);


    } else if (oyunDurumu === 'oda2') {
        ctx.drawImage(oda2arkaplan, 0, 0, canvas.width, canvas.height);

        ctx.drawImage(engell4, oda2giris.x, oda2giris.y, oda2giris.width, oda2giris.height);
        ctx.drawImage(envanterResmi, oda2envanterKutu.x, oda2envanterKutu.y, oda2envanterKutu.width, oda2envanterKutu.height);
        ctx.drawImage(odayerr, oda2yer.x, oda2yer.y, oda2yer.width, oda2yer.height);
        ctx.drawImage(engell, oda2engel.x, oda2engel.y, oda2engel.width, oda2engel.height);
        ctx.drawImage(oda2ust, envanterKutuAlt.x, envanterKutuAlt.y, envanterKutuAlt.width, envanterKutuAlt.height);

        spotIsik();

        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText("İpucu:Nesne Bul", 300, 100);

        ctx.fillStyle = "white";
        ctx.font = "italic 20px Arial";
        ctx.fillText("E:Nesne Al", 20, 80);


        if (player.bakisYonu === 'sag') {
            ctx.drawImage(karakter1, player.x, player.y, player.width, player.height);
        } else if (player.bakisYonu === 'sol') {
            ctx.drawImage(karakter2, player.x, player.y, player.width, player.height);
        }


    } else if (oyunDurumu === 'oda3') {
        ctx.drawImage(oda3arkaplan, 0, 0, canvas.width, canvas.height);

        if (player.bakisYonu === 'sag') {
            ctx.drawImage(karakter1, player.x, player.y, player.width, player.height);
        } else if (player.bakisYonu === 'sol') {
            ctx.drawImage(karakter2, player.x, player.y, player.width, player.height);
        }


        ctx.drawImage(oda2ust, oda3engel2.x, oda3engel2.y, oda3engel2.width, oda3engel2.height);
        ctx.drawImage(oda2ust, oda3engel3.x, oda3engel3.y, oda3engel3.width, oda3engel3.height);

        ctx.drawImage(odayerr, oda3yer.x, oda3yer.y, oda3yer.width, oda3yer.height);

        ctx.drawImage(oda3engell, oda3engel1.x, oda3engel1.y, oda3engel1.width, oda3engel1.height);

        ctx.drawImage(anahtarResmi, anahtar.x, anahtar.y, anahtar.width, anahtar.height);

        spotIsik();

        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText("İpucu:Anahtar Bul", 300, 100);

        ctx.fillStyle = "white";
        ctx.font = "italic 20px Arial";
        ctx.fillText("E:Nesne Al", 20, 80);


       
        // Çanta tam değilse mesaj verir
        if (uyariMesajiGoster && uyariMesajiSuresi > 0) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(200, 200, 500, 60);

            ctx.fillStyle = "red";
            ctx.font = "bold 30px Arial";
            ctx.fillText("Çantan tam değil!", 330, 240);

            // Süreyi yavaşça azalt
            uyariMesajiSuresi--;
        } else if (uyariMesajiSuresi <= 0) {
            uyariMesajiGoster = false; // Süre dolduğunda mesajı kapat
        }



    } else if (oyunDurumu === 'hikaye') {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(npcc, npcHikaye.x, npcHikaye.y, npcHikaye.width, npcHikaye.height);

        ctx.fillStyle = "white";
        ctx.fillRect(350, 150, 550, 200);

        ctx.fillStyle = "black";
        ctx.font = "bold 24px Arial";
        ctx.fillText("Gözlerini açtın... Dünya bildiğin gibi değil.", 380, 200);

        ctx.font = "20px Arial";
        ctx.fillText("Görevimiz karanlıkta kalan odalardaki enerji", 380, 240);
        ctx.fillText("çekirdeklerini toplamak ve sistemi açmak.", 380, 270);
        ctx.fillText("Dikkatli ol, engeller seni yavaşlatabilir...", 380, 300);

        ctx.fillStyle = "gray";
        ctx.font = "italic 18px Arial";
        ctx.fillText("[Hikayeyi geçmek için ENTER tuşuna bas]", 380, 330);
        ctx.fillText("[Geri dönmek için Q tuşuna bas]", 380, 350);


    } else if (oyunDurumu === 'bitis') {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(npcc, npcHikaye.x, npcHikaye.y, npcHikaye.width, npcHikaye.height);

        ctx.fillStyle = "white";
        ctx.fillRect(350, 150, 550, 200);

        ctx.fillStyle = "black";
        ctx.font = "bold 24px Arial";
        ctx.fillText("Gözlerini açtın... Dünya bildiğin gibi değil.", 380, 200);

        ctx.font = "20px Arial";
        ctx.fillText("Görevimiz karanlıkta kalan odalardaki enerji", 380, 240);
        ctx.fillText("çekirdeklerini toplamak ve sistemi açmak.", 380, 270);
        ctx.fillText("Dikkatli ol, engeller seni yavaşlatabilir...", 380, 300);

        ctx.fillStyle = "gray";
        ctx.font = "italic 18px Arial";
        ctx.fillText("[Hikayeyi geçmek için ENTER tuşuna bas]", 380, 330);
        ctx.fillText("[Geri dönmek için Q tuşuna bas]", 380, 350);


    } else if (oyunDurumu === 'giris') {

        ctx.drawImage(koridor, 0, 0, canvas.width, canvas.height);

        ctx.drawImage(npcc, npc.x, npc.y, npc.width, npc.height);

        ctx.drawImage(karakter, player.x, player.y, player.width, player.height);

        spotIsik();

        ctx.fillStyle = "white";
        ctx.font = "italic 15px Arial";
        ctx.fillText("W: İleri", 50, 50);
        ctx.fillText("A: Sola", 50, 70);
        ctx.fillText("D: Sağa", 50, 90);
        ctx.fillText("S: Geri", 50, 110);
        ctx.fillText("Shift: Koş", 50, 130);
        ctx.fillText("H:Konuş", 50, 150);
        ctx.fillText("(Konuşmak için bilim ", 50, 170);
        ctx.fillText("insanının üstüne gidin.)", 50, 190);
    }



    // --- HUD (SAYAÇ VE ÇANTA GÖSTERGESİ) ---
    // Sadece oyun içindeysek (başlangıç ekranı değilse) üstte görünsün
    if (oyunDurumu !== 'baslangic' && oyunDurumu !== 'hikaye' && oyunDurumu !== 'giris' && oyunDurumu !== 'bitis') {

        // 1. HUD Arka Planı (Üstteki siyah şeffaf şerit)
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, 50);

        // 2. Zaman Sayacı Yazısı
        ctx.fillStyle = "white";
        ctx.font = "bold 24px Arial";
        ctx.fillText("ZAMAN: " + zaman, 20, 35);

        if (envanter.length > 0) {
            // 3. Envanter Yazısı (Şimdilik statik)
            ctx.fillText("ÇANTA: ", 250, 35);
            for (let i = 0; i < envanter.length; i++) {
                ctx.fillText(envanter[i], 350 + (i * 200), 35);
            }
        } else {
            ctx.fillText("ÇANTA: Boş", 250, 35);
        }
    }

    // --- SİNETMATİK GEÇİŞ EFEKTİ (FADE İN / FADE OUT) ---
    if (kararmaYonu !== 0) {
        ekranKarartma += (0.05 * kararmaYonu); // Hızı buradan ayarlayabilirsin

        // Ekran tamamen siyah olduysa
        if (ekranKarartma >= 1) {
            ekranKarartma = 1;
            oyunDurumu = sonrakiDurum; // Arka planda odayı/durumu değiştir
            kararmaYonu = -1; // Ekranı yavaşça açmaya başla
        }
        // Ekran tamamen aydınlandıysa
        else if (ekranKarartma <= 0) {
            ekranKarartma = 0;
            kararmaYonu = 0; // Geçiş işlemi bitti, normale dön
        }

        // Bütün ekranın üzerine şeffaf bir siyah perde çiz (Alfa değeri ile)
        ctx.fillStyle = `rgba(0, 0, 0, ${ekranKarartma})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

}

function spotIsik() {

    //Karakterin etrafını aydınlatma kısmı
    // 1. Karakterin tam orta noktasını (göğsünü) bul
    let merkezX = player.x + (player.width / 2);
    let merkezY = player.y + (player.height / 2);

    // 2. Işığın yarıçapı (Ne kadar uzağı aydınlatacak)
    // Eğer 150 az gelirse bunu 200 veya 250 yapabilirsin
    let isikGucu = 250;

    // 3. Fırçayı oluştur (İçeriden dışarıya doğru yayılan boya)
    let karanlik = ctx.createRadialGradient(merkezX, merkezY, 20, merkezX, merkezY, isikGucu);

    // 4. Renk duraklarını ekle:
    // Merkez (0): "rgba(0,0,0,0)" demek tamamen şeffaf demektir. Altındaki her şeyi gösterir.
    karanlik.addColorStop(0, "rgba(0, 0, 0, 0)");

    // Kenarlar (1): %95 oranında siyah. Işık menzili bitince bu renge ulaşır.
    karanlik.addColorStop(1, "rgba(0, 0, 0, 0.95)");

    // 5. Bütün ekranı bu "ortası delik" fırçayla boya!
    ctx.fillStyle = karanlik;
    ctx.fillRect(0, 0, canvas.width, canvas.height);



}
//  Oyun Döngüsü
function gameLoop() {
    update();
    draw(); // Çizimleri yap
    requestAnimationFrame(gameLoop); // Döngüyü tekrarla
}
function update() {
    // Ekran geçişi varsa fizikleri ve hareketi dondur
    if (kararmaYonu !== 0) return;


    if (oyunDurumu === 'giris') {

        let anlikHiz = tuslar.kos ? player.speed * 3 : player.speed;
        if (tuslar.sag) player.x += anlikHiz;
        if (tuslar.sol) player.x -= anlikHiz;
        if (tuslar.yukari) player.y -= anlikHiz; // W tuşu yukarı yürütür
        if (tuslar.asagi) player.y += anlikHiz;  // S tuşu aşağı yürütür

        // Ekran sınırlarından çıkmayı engelle
        if (player.x < 350) player.x = 350; // Sol siyah duvara çarpma
        if (player.x + player.width > 650) player.x = 650 - player.width; // Sağ siyah duvara çarpma
        if (player.y < 100) player.y = 100;
        if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

        // NPC ile konuşma (H Tuşu)
        if (ikiKutuCarpisiyorMu(player, npc) && tuslar.konus) {
            ekranGecisiYap('hikaye');
        }
    } else if (oyunDurumu === 'oyun' || oyunDurumu === 'oda2' || oyunDurumu === 'oda3') {

        let anlikHiz = tuslar.kos ? player.speed * 3 : player.speed;

        if (tuslar.sag) {
            player.x += anlikHiz;
            player.bakisYonu = 'sag';
        }
        if (tuslar.sol) {
            player.x -= anlikHiz;
            player.bakisYonu = 'sol';
        }

        if (player.x < 0 && oyunDurumu === 'oyun') {
            player.x = 0;
        } else if (player.x < 0 && oyunDurumu === 'oda2') {
            ekranGecisiYap('oyun');
            player.x = 800;
            player.y = 195;
        } else if (player.x < 0 && oyunDurumu === 'oda3') {
            ekranGecisiYap('oda2');
            player.x = 850;
            player.y = 450;
        }
        if (player.x + player.width > canvas.width) {
            player.x = canvas.width - player.width;
        }
        if (player.y < 0) {
            player.y = 0;
            player.velocityY = 0;

        }

        //Yerçekimi etkisi
        player.velocityY += player.gravity;
        player.y += player.velocityY;

        //zeminde olma kontrolü (510, zeminin y koordinatıdır)
        if (player.y + player.height > 510) {
            player.y = 510 - player.height;
            player.velocityY = 0;
            player.havadaMi = false;
        }
        if (oyunDurumu === 'oyun') {

            if (ikiKutuCarpisiyorMu(player, ipucu1) && tuslar.nesneAl) {
                if (!envanter.includes("Harita")) {
                    envanter.push("Harita");
                    ipucu1.x = -2000;
                    ipucu1.y = -2000;
                }
            }
            objeCarpismaKontrolu(itilenKutu, true, anlikHiz);
            objeCarpismaKontrolu(engel2, false, anlikHiz);
            objeCarpismaKontrolu(engel22, false, anlikHiz);
            objeCarpismaKontrolu(engel3, false, anlikHiz);
            objeCarpismaKontrolu(engel4, false, anlikHiz);

        } else if (oyunDurumu === 'oda2') {
            if (ikiKutuCarpisiyorMu(player, oda2envanterKutu) && tuslar.nesneAl) {
                if (!envanter.includes("Enerji Kesici")) {
                    envanter.push("Enerji Kesici");
                    oda2envanterKutu.x = -1000;
                    oda2envanterKutu.y = -1000;
                }
            }
            objeCarpismaKontrolu(oda2giris, false, anlikHiz);
            objeCarpismaKontrolu(oda2engel, true, anlikHiz);
            //objeCarpismaKontrolu(oda2envanterKutu, false, anlikHiz);
            //objeCarpismaKontrolu(oda2yer, false, anlikHiz);
            if (ikiKutuCarpisiyorMu(player, oda2yer)) {
                oyunFonMuzigi.pause(); //müziği durdurmak için
                oyunFonMuzigi.currentTime = 0; //Müziği başa sarmak için

                ekranGecisiYap('baslangic');
                girisEkrani.style.display = 'flex';//baslangic ekranı görünür olur
                oyunuSifirla();
            }
            objeCarpismaKontrolu(envanterKutuAlt, false, anlikHiz);



        }
        else if (oyunDurumu === 'oda3') {
            if (ikiKutuCarpisiyorMu(player, anahtar) && tuslar.nesneAl) {
                if (!envanter.includes("Anahtar")) {
                    envanter.push("Anahtar");
                    anahtar.x = -3000;
                    anahtar.y = -3000;
                }
            }
            objeCarpismaKontrolu(oda3engel1, false, anlikHiz);
            objeCarpismaKontrolu(oda3engel2, false, anlikHiz);
            objeCarpismaKontrolu(oda3engel3, false, anlikHiz);

            if (ikiKutuCarpisiyorMu(player, oda3yer)) {

                oyunFonMuzigi.pause(); //müziği durdurmak için
                oyunFonMuzigi.currentTime = 0; //Müziği başa sarmak için

                ekranGecisiYap('baslangic');
                girisEkrani.style.display = 'flex';//baslangic ekranı görünür olur
                oyunuSifirla();
            }
        }
        if (tuslar.zipla && player.havadaMi === false) {
            player.velocityY = player.ziplamaGucu;
            player.havadaMi = true;
        }
        kapiCarpismaKontrolu();
    }
}
function objeCarpismaKontrolu(hedefKutu, itilebilirMi, anlikHiz) {
    // Çarpışma var mı?
    if (player.x < hedefKutu.x + hedefKutu.width &&
        player.x + player.width > hedefKutu.x &&
        player.y < hedefKutu.y + hedefKutu.height &&
        player.y + player.height > hedefKutu.y) {


        // FİZİK HESAPLAMASI: Karakter bir önceki karede neredeydi?
        // Bu sayede üstten mi, alttan mı yoksa yandan mı çarptığını anlıyoruz.
        let oyuncuEskiAltKisim = player.y - player.velocityY + player.height;
        let oyuncuEskiUstKisim = player.y - player.velocityY;

        // --- DURUM 1: ÜSTTEN ÇARPMA (Kutunun tepesine inme) ---
        if (oyuncuEskiAltKisim <= hedefKutu.y) {
            player.y = hedefKutu.y - player.height; // Karakteri kutunun tepesine oturt
            player.velocityY = 0;                   // Düşüşü durdur
            player.havadaMi = false;                // Yere değdiği için tekrar zıplayabilsin
        }

        // --- DURUM 2: ALTTAN ÇARPMA (Zıplayıp kafayı kutunun altına vurma) ---
        else if (oyuncuEskiUstKisim >= hedefKutu.y + hedefKutu.height) {
            player.y = hedefKutu.y + hedefKutu.height; // Kafayı vurunca dur
            player.velocityY = 0;                      // Hızı sıfırla ki hemen aşağı düşmeye başlasın
        } else {

            // DURUM A: Eğer bu nesne itilebilen bir şeyse VE sol tıka basılıyorsa
            if (itilebilirMi === true && tuslar.itme === true) {
                if (player.x < hedefKutu.x && tuslar.sag) {
                    hedefKutu.x += anlikHiz; // Sağa it

                    let duvaraCarptiMi = false;

                    // YENİ: Kutunun sağ kenarı tuvalden dışarı çıkıyor mu?
                    if (hedefKutu.x + hedefKutu.width > canvas.width) duvaraCarptiMi = true;
                    if (oyunDurumu === 'oyun') {
                        if (ikiKutuCarpisiyorMu(hedefKutu, engel2) ||
                            ikiKutuCarpisiyorMu(hedefKutu, engel3) ||
                            ikiKutuCarpisiyorMu(hedefKutu, engel22) ||
                            ikiKutuCarpisiyorMu(hedefKutu, engel4)) {
                            duvaraCarptiMi = true;
                        }
                    } else if (oyunDurumu === 'oda2') {
                        if (ikiKutuCarpisiyorMu(hedefKutu, oda2giris) || ikiKutuCarpisiyorMu(hedefKutu, oda2yer) || ikiKutuCarpisiyorMu(hedefKutu, envanterKutuAlt)) duvaraCarptiMi = true;
                    }

                    if (duvaraCarptiMi) {
                        hedefKutu.x -= anlikHiz; // Çarptıysa kutunun hareketini geri al
                        player.x -= anlikHiz;    // Oyuncunun da hareketini geri al ki kutunun içine girmesin
                    }

                } else if (player.x > hedefKutu.x && tuslar.sol) {
                    hedefKutu.x -= anlikHiz; // Sola it

                    // Hangi odadaysak o odanın duvarlarını kontrol et!
                    let duvaraCarptiMi = false;

                    // YENİ: Kutunun sol kenarı sıfırın (0) altına iniyor mu?
                    if (hedefKutu.x < 0) duvaraCarptiMi = true;
                    if (oyunDurumu === 'oyun') {
                        if (ikiKutuCarpisiyorMu(hedefKutu, engel2) || ikiKutuCarpisiyorMu(hedefKutu, engel3)) duvaraCarptiMi = true;
                    } else if (oyunDurumu === 'oda2') {
                        if (ikiKutuCarpisiyorMu(hedefKutu, oda2giris) || ikiKutuCarpisiyorMu(hedefKutu, oda2yer) || ikiKutuCarpisiyorMu(hedefKutu, envanterKutuAlt)) duvaraCarptiMi = true;
                    }

                    if (duvaraCarptiMi) {
                        hedefKutu.x += anlikHiz; // Çarptıysa kutunun hareketini geri al
                        player.x += anlikHiz;    // Oyuncunun da hareketini geri al
                    }
                }
            }
            // DURUM B: İtilemez bir duvarsa VEYA sol tıka basılmıyorsa (İçinden geçme)
            else {
                if (player.x < hedefKutu.x && player.x + player.width > hedefKutu.x) {
                    player.x = hedefKutu.x - player.width; // Soldan çarpınca durdur
                } else if (player.x > hedefKutu.x) {
                    player.x = hedefKutu.x + hedefKutu.width; // Sağdan çarpınca durdur
                }
            }
        }
    }

}
function ikiKutuCarpisiyorMu(kutu1, kutu2) {
    return (kutu1.x < kutu2.x + kutu2.width &&
        kutu1.x + kutu1.width > kutu2.x &&
        kutu1.y < kutu2.y + kutu2.height &&
        kutu1.y + kutu1.height > kutu2.y);
}
function kapiCarpismaKontrolu() {
    // --- 1. ODA KONTROLLERİ ---
    if (oyunDurumu === 'oyun') {
        // Karakter 1. odadaki kapıya değdi mi?
        if (player.x < kapi.x + kapi.width &&
            player.x + player.width > kapi.x &&
            player.y < kapi.y + kapi.height &&
            player.y + player.height > kapi.y) {

            oyunDurumu = 'oda2'; // 2. odaya geç
            player.x = 0;
            player.y = 240;
        }
    }

    // --- 2. ODA KONTROLLERİ ---
    else if (oyunDurumu === 'oda2') {
        // Karakter 2. odadaki kapi2'ye değdi mi?
        if (player.x < kapi2.x + kapi2.width &&
            player.x + player.width > kapi2.x &&
            player.y < kapi2.y + kapi2.height &&
            player.y + player.height > kapi2.y) {

            oyunDurumu = 'oda3'; // 3. odaya geç
            player.x = 0;
            player.y = 450;
        }
    }

    // --- 3. ODA KONTROLLERİ (İleride kapi3 eklersen buraya yazacaksın) ---
    else if (oyunDurumu === 'oda3') {
        // 3. oda için çarpışma kontrolleri buraya gelecek...
        if (player.x < kapi2.x + kapi2.width &&
            player.x + player.width > kapi2.x &&
            player.y < kapi2.y + kapi2.height &&
            player.y + player.height > kapi2.y) {

            if (envanter.includes("Anahtar") && envanter.includes("Enerji Kesici") && envanter.includes("Harita")) {

                oyunFonMuzigi.pause();
                oyunFonMuzigi.currentTime = 0;

                bitisMuzigi.play();
                oyunDurumu = 'bitis'; // Başlangıç ekranına geç

            } else {
                uyariMesajiGoster = true;
                uyariMesajiSuresi = 120;
                player.x -= 20;
            }


        }
    }
}

// Saniyede 1 kez çalışan zamanlayıcı
setInterval(function () {

    let oyundaMiyiz = (oyunDurumu === 'oyun' || oyunDurumu === 'oda2' || oyunDurumu === 'oda3' || oyunDurumu === 'oda4');
    // Sadece oyun içindeyken (başlangıç ekranında değilken) zaman aksın
    if (oyundaMiyiz && zaman > 0) {
        zaman--;
    }// Süre biterse baslangıc a dön
    else if (oyundaMiyiz && zaman === 0) {

        ekranGecisiYap('baslangic'); 
        girisEkrani.style.display = 'flex';
        oyunuSifirla();
    }
}, 1000);

arkaplanResmi.onload = function () {
    gameLoop();
};


// Oyna butonu
baslat.addEventListener('click', function () {
    girisEkrani.style.display = 'none';
    player.x = 475;
    player.y = 500;

    oyunFonMuzigi.play();
    ekranGecisiYap('giris');
 })