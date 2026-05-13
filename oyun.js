// 1. HTML elementlerini seçme
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
    velocityX: 0, //Yatay hızı
    velocityY: 0, //Dikey hızı
    gravity: 0.5, //Karaktere yer çekimini kazandırır
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
const npc = { // Oyun başında çıkan yan karakter için
    x: 550,
    y: 130,
    width: 50,
    height: 50
};
const npcHikaye = {
    // Oyuncunun 'ENTER'a bastığında gelen yan karakterli hikaye
    x: 100,
    y: 200,
    width: 200,
    height: 400
};
const itilenKutu = {
    //1. odada hareket eden nesne
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
    //Oda1' deki kapı
    x: 900,
    y: 100,
    width: 100,
    height: 160
};
const kapi2 = {
    //Oda2 ve oda3'teki kapılar
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
    //Oda1 harita görselinin nesnesi
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
    //Kutu nesnesi
    x: 450,
    y: 250,
    width: 50,
    height: 50
};
const envanterKutuAlt = {
    //Kutunun durduğu yer
    x: 400,
    y: 300,
    width: 150,
    height: 20
};
const oda2yer = {
    //Oda2' de karakter değdiğinde oyunun sonlanmasını sağlayan nesne
    x: 600,
    y: 500,
    width: 90,
    height: 25
};
const oda2engel = {
    //Oda 2'deki itilen nesne
    x: 200,
    y: 430,
    width: 50,
    height: 80
};
const oda3yer = {
    //Oda3'de karakter yerde durur
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
const anahtar = {
    //Oyuncunun E tuşunu kullanarak alabildiği nesne
    x: 150,
    y: 120,
    width: 100,
    height: 80
};

let oyunDurumu = 'baslangic';// Bu değişken oyunun o an hangi ekranda olduğunu takip eder
let zaman = 60; // Oyun süresi 60 saniyedir
let envanter = []; // Oyuncunun odalarda E tuşuyla topladığı nesnelerin tutulduğu dizi

let ekranKarartma = 0;// 0' da saydam, 1'de tamamen siyah
let kararmaYonu = 0;// Değişkenin sonucu 1' se kararır, -1'se açılıyor ve 0'sa geçiş olmuyor
let sonrakiDurum = '';// Ekran karardıktan sonra hangi ekrana geçileceği

let uyariMesajiGoster = false;
let uyariMesajiSuresi = 0;

let kutuHareketEdiyorMu = false; // Sesin şalteri

// Oyunun baslat butonuna basılmasından bitiş durumuna gelmesine kadar çalan fon müziği
const oyunFonMuzigi = new Audio('oyunMuzigi.mp3');
oyunFonMuzigi.loop = true;
oyunFonMuzigi.volume = 0.4;

// Oyunun bitiş durumuna gelindiğinde çalan fon müziği
const bitisMuzigi = new Audio('oyunbitisBasari.mp3');
bitisMuzigi.loop = false;
bitisMuzigi.volume = 0.6;

const itmeSesi = new Audio('kutuitmesesi.mp3');
itmeSesi.loop = true; // Kutu uzun süre itilirse ses bitmesin, başa sarsın
itmeSesi.volume = 0.5; //0 ile 1 arasında ses şiddeti

const envanterMuzigi = new Audio('envanterSes.mp3');
envanterMuzigi.loop = false;
envanterMuzigi.volume = 0.6;

const uyariMuzigi = new Audio('uyari.mp3');
uyariMuzigi.loop = false; 
uyariMuzigi.volume = 0.6;

const yanici = new Audio('yakiciSivi.mp3');
yanici.loop = false; 
yanici.volume = 0.5;

//Oyunda kullanılan resimler
const arkaplanResmi = new Image();
arkaplanResmi.src = 'girisResmi.jpeg';

const koridor = new Image();
koridor.src = 'koridorSon.png';

const oda1arkaplan = new Image();
oda1arkaplan.src = 'oda1arkaplan.jpeg';

const oda2arkaplan = new Image();
oda2arkaplan.src = 'oda2arkaplan.jpeg';

const oda3arkaplan = new Image();
oda3arkaplan.src = 'oda3arkaplan.png';

//Karakterin arkadan,sağdan ve soldan görünümü
const karakter = new Image();
karakter.src = 'karakter_arkadan.jpeg';

const karakter1 = new Image();
karakter1.src = 'karakter_sag.jpeg';

const karakter2 = new Image();
karakter2.src = 'karakter_sol.jpeg';

//Yan karakterin görseli
const npcc = new Image();
npcc.src = 'profesor.jpeg';

//Oda 'in resimleri
const engell = new Image(); //itilen kutunun resmi
engell.src = 'engel.jpeg';

const engell2 = new Image();
engell2.src = 'engel2.jpeg';

const engell3 = new Image();
engell3.src = 'engel3.jpeg';

const engell4 = new Image();
engell4.src = 'engel4.png';

const ipucu = new Image();
ipucu.src = 'ipucu.png';

//Oda 2'nin resimleri
const oda2ust = new Image();
oda2ust.src = 'oda2ust.png';

const envanterResmi = new Image(); //Oda 2'deki çanta görseli
envanterResmi.src = 'envanter.png';

//Oda 3'teeki resimler
const oda3engell = new Image();
oda3engell.src = 'oda3engel.jpeg';

const anahtarResmi = new Image();
anahtarResmi.src = 'anahtar.png';

//Oda2 ve oda3't yerde duran engelin resmi
const odayerr = new Image();
odayerr.src = 'odayer.png';


function oyunuSifirla() {
    //Zamanı ve envanteri her bu fonksiyon çağrıldığında sıfırlıyoruz.
    zaman = 60;
    envanter = [];

    //Karakteri giriş ekranı için hazırlıyoruz
    //Oyna butonuna basılınca x:475 y:500 oluyor zaten
    player.velocityY = 0;
    player.havadaMi = false;

    /*Etkileşime giren nesnelerin yerlerini tekrar eski yerine koyuyoruz*/

    //Oda 1'deki harita ipucunu yerine koymak için
    ipucu1.x = 600;
    ipucu1.y = 130;
    
    //1.Odadaki kutu yerine koyuluyor
    itilenKutu.x = 200;
    itilenKutu.y = 450;

    //2.Odadaki itilen kutuyu yerine koymak için
    oda2engel.x = 200;
    oda2engel.y = 430;

    //Oda 2' de çantayı yerine koymak için
    oda2envanterKutu.x = 450;
    oda2envanterKutu.y = 250;

    //Oda 3' teki anahtarı geri yerine koymak için
    anahtar.x = 150;
    anahtar.y = 120;
}

//Tuşa basıldığında yapılması gerekenler
window.addEventListener('keydown', function (e) {
    if (e.key === 'd' || e.key === 'D')
        tuslar.sag = true;
    if (e.key === 'a' || e.key === 'A')
        tuslar.sol = true;
    if (e.key === 'w' || e.key === 'W')
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
        // Karakteri 1. oda için başlangıç noktasına ışınlar
        player.x = 50;
        player.y = 450;
        player.velocityY = 0; //Eğer karakter düşüyorsa hızını sıfırlar
        ekranGecisiYap('oyun');
        
    } if (e.key === 'Enter' && oyunDurumu === 'bitis') {
        if (bitisMuzigi) {
            bitisMuzigi.pause();
            bitisMuzigi.currentTime = 0;
        }
        oyunFonMuzigi.pause(); // Tedbir amaçlı ilk önce oyunun temel fon müziğini durduruyoruz
        oyunFonMuzigi.currentTime = 0;
        ekranGecisiYap('baslangic');
        girisEkrani.style.display = 'flex';//baslangic ekranı görünür olur

        oyunuSifirla();
    }
});

//Tuş bırakıldığında yapılması gerekenler
window.addEventListener('keyup', function (e) {
    if (e.key === 'd' || e.key === 'D') tuslar.sag = false;
    if (e.key === 'a' || e.key === 'A') tuslar.sol = false;
    if (e.key === 'w' || e.key === 'W') tuslar.yukari = false;
    if (e.key === 's' || e.key === 'S') tuslar.asagi = false;
    if (e.key === ' ') tuslar.zipla = false;
    if (e.key === 'Shift') tuslar.kos = false;
    if (e.key === 'h' || e.key === 'H') tuslar.konus = false;
    if (e.key === 'e' || e.key === 'E') tuslar.nesneAl = false;
});

//Nesneleri itebilmek için fare kullanımı
window.addEventListener('mousedown', function (e) {
    // e.button === 0 demek farenin sol tuşu demektir.
    if (e.button === 0) tuslar.itme = true;
});

window.addEventListener('mouseup', function (e) {
    if (e.button === 0) tuslar.itme = false;
});

function ekranGecisiYap(hedefDurum) {
    kararmaYonu = 1; // draw() fonksiyonu içindeki kararma mantığını harekete geçirir
    sonrakiDurum = hedefDurum; //Oyun tamamen karardığında oyunun hangi ekrana geçeceğini hafızada tutmak için
}

// Çizim fonksiyonu
function draw() {
    // Her kareden önce ekranı temizler
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (oyunDurumu === 'baslangic') {
        //Eğer başlangıçtaysa arka plan resmini çizdirir
        ctx.drawImage(arkaplanResmi, 0, 0, canvas.width, canvas.height);
    }
    else if (oyunDurumu === 'giris') {
        // Oyna butonuna basıldıktan sonra ilk ekrana çizilen yer
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
    else if (oyunDurumu === 'hikaye') {
        //Arka plan tamamen siyah yapıldı
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(npcc, npcHikaye.x, npcHikaye.y, npcHikaye.width, npcHikaye.height);

        //Npc nin konuşma balonu
        ctx.fillStyle = "white";
        ctx.fillRect(350, 150, 550, 200);

        //Hikaye metni
        ctx.fillStyle = "black";
        ctx.font = "bold 24px Arial";
        ctx.fillText("Gözlerini açtın... Dünya bildiğin gibi değil.", 380, 200);

        ctx.font = "20px Arial";
        ctx.fillText("Görevimiz karanlıkta kalan odalardaki", 380, 240);
        ctx.fillText("nesneleri toplamak ve sistemi açmak.", 380, 270);
        ctx.fillText("Dikkatli ol, engeller seni yavaşlatabilir...", 380, 300);

        //Hikayeden nasıl çıkılacağı gösterir
        ctx.fillStyle = "gray";
        ctx.font = "italic 18px Arial";
        ctx.fillText("[Hikayeyi geçmek için ENTER tuşuna bas]", 380, 330);
    }
    else if (oyunDurumu === 'oyun') {
        //Eğer butona basılmış ve oyun ageçilmişse oda1 i çizdirir
        ctx.drawImage(oda1arkaplan, 0, 0, canvas.width, canvas.height);

        //Karakterin bastığı tuşa göre ne tarafa yöneleceğini ve hangi karakter resminin görüneceğini buradan ayarlıyoruz
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

        //Oyuncuya tuşların ne için kullanıldığını gösterir
        ctx.fillStyle = 'white';
        ctx.font = 'italic 20px Arial';
        ctx.fillText("A: Sol", 20, 100);
        ctx.fillText("D: Sağ", 20, 130);
        ctx.fillText("Space: Zıpla", 20, 160);
        ctx.fillText("Shift: Koş", 20, 190);
        ctx.fillText("Sol tık: Nesne İtme", 20, 220);
        ctx.fillText("E: Nesne Al", 20, 250);


    } else if (oyunDurumu === 'oda2') {
        // 2. odanın arka planını çizdiriyoruz
        ctx.drawImage(oda2arkaplan, 0, 0, canvas.width, canvas.height);

        ctx.drawImage(engell4, oda2giris.x, oda2giris.y, oda2giris.width, oda2giris.height);
        ctx.drawImage(envanterResmi, oda2envanterKutu.x, oda2envanterKutu.y, oda2envanterKutu.width, oda2envanterKutu.height);
        ctx.drawImage(odayerr, oda2yer.x, oda2yer.y, oda2yer.width, oda2yer.height);
        ctx.drawImage(engell, oda2engel.x, oda2engel.y, oda2engel.width, oda2engel.height);
        ctx.drawImage(oda2ust, envanterKutuAlt.x, envanterKutuAlt.y, envanterKutuAlt.width, envanterKutuAlt.height);

        spotIsik();

        //Oyuncuya bilgi veriyoruz
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText("İpucu:Nesne Bul", 300, 100);

        ctx.fillStyle = "white";
        ctx.font = "italic 20px Arial";
        ctx.fillText("E:Nesne Al", 20, 80);

        //2. oda için karakteri çizer
        if (player.bakisYonu === 'sag') {
            ctx.drawImage(karakter1, player.x, player.y, player.width, player.height);
        } else if (player.bakisYonu === 'sol') {
            ctx.drawImage(karakter2, player.x, player.y, player.width, player.height);
        }
    }
    else if (oyunDurumu === 'oda3') {
        // 3. odanın arka planını çizdirir
        ctx.drawImage(oda3arkaplan, 0, 0, canvas.width, canvas.height);

        //3. oda için karakteri çizer
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

        //Oyuncuya ipucu veriliyor
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText("İpucu:Anahtar Bul", 300, 100);

        ctx.fillStyle = "white";
        ctx.font = "italic 20px Arial";
        ctx.fillText("E:Nesne Al", 20, 80);

        // Çanta tam değilse mesaj için
        if (uyariMesajiGoster && uyariMesajiSuresi > 0) {
            // Mesaj için siyah yarı saydam bir arka plan kutusu eklendi(okunması kolay olsun diye)
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(200, 200, 500, 60);

            // Kırmızı renkli yazı
            ctx.fillStyle = "red";
            ctx.font = "bold 30px Arial";
            ctx.fillText("Çantan tam değil!", 330, 240);

            //Uyarının ekranda durma süresinin ayarlandığı yer
            uyariMesajiSuresi--;
        } else if (uyariMesajiSuresi <= 0) {
            uyariMesajiGoster = false; // Süre dolduğunda mesajı kapat
        }
    }
    else if (oyunDurumu === 'bitis') {
        //Arka plan tamamen siyah yapıldı
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(npcc, npcHikaye.x, npcHikaye.y, npcHikaye.width, npcHikaye.height);

        //Npc nin konuşma balonu
        ctx.fillStyle = "white";
        ctx.fillRect(350, 150, 550, 200);

        //Bitis metni
        ctx.fillStyle = "black";
        ctx.font = "bold 24px Arial";
        ctx.fillText("Görev başarıyla tamamlandı.", 380, 200);

        ctx.font = "20px Arial";
        ctx.fillText("Tebrikler artık özgürsün", 500, 240);

        //Oyunu tamamen bitirmek için
        ctx.fillStyle = "gray";
        ctx.font = "italic 18px Arial";
        ctx.fillText("[Oyunu tamamen sonlandırmak için ENTER' a basın]", 380, 330);
    } 

    //Süre ve envanter gösterimi
    //Sadece oyun içinde ise (başlangıç ekranı değilse) üstte görünür şekilde ayarlandı
    if (oyunDurumu !== 'baslangic' && oyunDurumu !== 'hikaye' && oyunDurumu !== 'giris' && oyunDurumu !== 'bitis') {

        //Üstteki siyah şeffaf şerit
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, 50);

        //Zaman sayacı yazısı
        ctx.fillStyle = "white";
        ctx.font = "bold 24px Arial";
        ctx.fillText("ZAMAN: " + zaman, 20, 35);

        if (envanter.length > 0) {
            //Envanterde en az 1 nesne varsa bu if bloğu çalışacaktır
            ctx.fillText("ÇANTA: ", 250, 35); // Çanta yazısının görüneceği koordinatlar
            for (let i = 0; i < envanter.length; i++) {
                ctx.fillText(envanter[i], 350 + (i * 200), 35);
            }
        } else {
            ctx.fillText("ÇANTA: Boş", 250, 35);
        }
    }

    // Ekranı sinematik karartma yapmak için(yavaşça kararır)
    if (kararmaYonu !== 0) {
        ekranKarartma += (0.05 * kararmaYonu); // Ekran karartmanın hızını ayarlamak için

        // Ekran tamamen siyah olduysa
        if (ekranKarartma >= 1) {
            ekranKarartma = 1;
            oyunDurumu = sonrakiDurum; // Arka planda odayı/durumu değiştir
            kararmaYonu = -1; // Ekranı yavaşça açmaya başlar
        }
        // Ekran tamamen aydınlandıysa
        else if (ekranKarartma <= 0) {
            ekranKarartma = 0;
            kararmaYonu = 0; // Geçiş işlemi bitti, normal haline döndürüyoruz
        }

        // Bütün ekranın üzerine şeffaf bir siyah perde çizer
        // ${} kullanımı değişkeninin o anki sayısal değerini doğrudan metnin içine yerleştirir
        ctx.fillStyle = `rgba(0, 0, 0, ${ekranKarartma})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function spotIsik() {
    //Karakterin etrafını aydınlatma fonksiyonu
    //Karakterin orta noktası bulunuyor
    let merkezX = player.x + (player.width / 2);
    let merkezY = player.y + (player.height / 2);

    //Işığın yarıçapı, ne kadar uzağı aydınlatacağını tutar
    let isikGucu = 250;

    //İçeriden dışarıya doğru yayılan boya ışığın sınırları
    let karanlik = ctx.createRadialGradient(merkezX, merkezY, 20, merkezX, merkezY, isikGucu);

    //Oluşturulan dairesel ışık efektinin merkezinden dışarı doğru rengin nasıl değişeceğini belirler.
    //Dairenin tam merkezini temsil eder, karakterin etrafı şeffaf olur
    karanlik.addColorStop(0, "rgba(0, 0, 0, 0)");

    // Kenarlar %95 oranında siyah. Işık merkezden uzaklaştıkça karanlık artar ve ekran neredeyse tamamen siyah olur
    karanlik.addColorStop(1, "rgba(0, 0, 0, 0.95)");

    //Bütün ekranı boya sıkar gibi kaplar
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
    // Ekran geçişi varsa fizikleri ve hareketi dondurur
    if (kararmaYonu !== 0) return;
    kutuHareketEdiyorMu = false;

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

        // Koşma Mantığı
        // Eğer Shift basılıysa hızı 3 katına çıkar, değilse normal hızı kullandır
        let anlikHiz = tuslar.kos ? player.speed * 3 : player.speed;

        // Hareketler
        if (tuslar.sag) {
            //D tuşu kontrolü
            player.x += anlikHiz;
            player.bakisYonu = 'sag';
        }
        if (tuslar.sol) {
            //A tuşu kontrolü
            player.x -= anlikHiz;
            player.bakisYonu = 'sol';
        }

        if (player.x < 0 && oyunDurumu === 'oyun') {
            //Karakterin oyun ekranının sol tarafından çıkmamasını sağlar
            player.x = 0;
        }
        /*Buradaki 2 else-if yapısı sayesinde önceki odalarda bir envanter
        alınmayı unutulduysa geri dönülüp alınabilir*/
        else if (player.x < 0 && oyunDurumu === 'oda2') {
            //Burada player.x < 0 koşulu ekranın solundan geçişi engellemek için kullanılmamıştır, buradaki amaç oda2'den oda1'e geçişi sağlar
            ekranGecisiYap('oyun');
            player.x = 800;
            player.y = 195;
        }
        else if (player.x < 0 && oyunDurumu === 'oda3') {
            //Burada da player.x < 0 oda3'ten oda2'ye geçişi sağlar.
            ekranGecisiYap('oda2');
            player.x = 850;
            player.y = 450;
        }
        if (player.x + player.width > canvas.width) {
            //Karakterin oyun ekranının sağ tarafından çıkmamasını sağlar
            player.x = canvas.width - player.width;
        }
        if (player.y < 0) {
            //Karakterin dikeyde oyun ekranından çıkmasını engeller
            player.y = 0;
            player.velocityY = 0;
        }

        //Yerçekimi etkisi
        player.velocityY += player.gravity;
        player.y += player.velocityY;

        //Zeminde olma kontrolü (510, zeminin y koordinatıdır)
        if (player.y + player.height > 510) {
            player.y = 510 - player.height;
            player.velocityY = 0;
            player.havadaMi = false;
        }
        /*Burada E tuşuyla alınan envanterlerin her biri oyun ekranının dışında
        farklı koorinatlara gönderiliyor. Aynı koordinat olsaydı bunlar birbiriyle çakışırdı*/
        if (oyunDurumu === 'oyun') {

            if (ikiKutuCarpisiyorMu(player, ipucu1) && tuslar.nesneAl) {
                if (!envanter.includes("Harita")) {
                    // E tuşun basılıp harita alındıysa haritayı oyun ekranının dışına atıyoruz, bu sayede artık oyun ekranında gözükmüyor
                    envanter.push("Harita");
                    ipucu1.x = -2000;
                    ipucu1.y = -2000;
                    envanterMuzigi.currentTime = 0; // Ses bitmeden art arda alınırsa diye başa sar
                    envanterMuzigi.play();
                }
            }
            //Oyun içinde çarpışma kontrolleri yapılıyor
            objeCarpismaKontrolu(itilenKutu, true, anlikHiz);
            objeCarpismaKontrolu(engel2, false, anlikHiz);
            objeCarpismaKontrolu(engel22, false, anlikHiz);
            objeCarpismaKontrolu(engel3, false, anlikHiz);
            objeCarpismaKontrolu(engel4, false, anlikHiz);

        }
        else if (oyunDurumu === 'oda2') {
            if (ikiKutuCarpisiyorMu(player, oda2envanterKutu) && tuslar.nesneAl) {
                // E tuşun basılıp oda2envanterKutu alındıysa bunu oyun ekranının dışına atıyoruz, bu sayede artık oyun ekranında gözükmüyor
                if (!envanter.includes("Enerji Kesici")) {
                    envanter.push("Enerji Kesici");
                    oda2envanterKutu.x = -1000;
                    oda2envanterKutu.y = -1000;
                    envanterMuzigi.currentTime = 0; // Ses bitmeden art arda alınırsa diye başa sar
                    envanterMuzigi.play();
                }
            }
            objeCarpismaKontrolu(oda2giris, false, anlikHiz);
            objeCarpismaKontrolu(oda2engel, true, anlikHiz);
            
            if (ikiKutuCarpisiyorMu(player, oda2yer)) {
                //Burada karakter oda2yer'e değdiğinde oyun bitiyor o yüzden müziği durduruyoruz
                oyunFonMuzigi.pause(); //müziği durdurmak için
                yanici.currentTime = 0; // Ses bitmeden art arda ölünürse diye başa sar
                yanici.play(); 

                // 2. Oyun müziğini durdurmuyoruz! Sadece baştan başlasın istersen şu satırı bırak:
                oyunFonMuzigi.currentTime = 0;

                ekranGecisiYap('baslangic');
                girisEkrani.style.display = 'flex'; //baslangic ekranı görünür olur
                oyunuSifirla();
            }
            objeCarpismaKontrolu(envanterKutuAlt, false, anlikHiz);
        }
        else if (oyunDurumu === 'oda3') {
            if (ikiKutuCarpisiyorMu(player, anahtar) && tuslar.nesneAl) {
                if (!envanter.includes("Anahtar")) {
                    // E tuşuna basıldığında anahtar alındıysa bunu oyun ekranının dışına atıyoruz, bu sayede artık oyun ekranında gözükmüyor
                    envanter.push("Anahtar");
                    anahtar.x = -3000;
                    anahtar.y = -3000;
                    envanterMuzigi.currentTime = 0; // Ses bitmeden art arda alınırsa diye başa sar
                    envanterMuzigi.play();
                }
            }
            objeCarpismaKontrolu(oda3engel1, false, anlikHiz);
            objeCarpismaKontrolu(oda3engel2, false, anlikHiz);
            objeCarpismaKontrolu(oda3engel3, false, anlikHiz);

            if (ikiKutuCarpisiyorMu(player, oda3yer)) {
                //Burada karakter oda3yer'e değdiğinde oyun bitiyor o yüzden müziği durduruyoru
                oyunFonMuzigi.pause(); //müziği durdurmak için
                yanici.currentTime = 0; 
                yanici.play(); 

                // 2. Oyun müziği devam etsin
                oyunFonMuzigi.currentTime = 0;

                ekranGecisiYap('baslangic');
                girisEkrani.style.display = 'flex'; //baslangic ekranı görünür olur
                oyunuSifirla();
            }
        }
        if (tuslar.zipla && player.havadaMi === false) {
            player.velocityY = player.ziplamaGucu;
            player.havadaMi = true; // Bu sayede karakter havada iken tekrar zıplama komutu verilmesi engellenir
        }
        kapiCarpismaKontrolu();
    }
    // --- KUTU İTME SESİ KONTROLÜ ---
    if (kutuHareketEdiyorMu === true) {
        // Eğer şalter açıksa ve ses DURUYORSA başlat (Saniyede 60 kere başlatmasın diye)
        if (itmeSesi.paused) {
            itmeSesi.play();
        }
    } else {
        // Kutu itilmiyorsa sesi durdur ve başa sar
        itmeSesi.pause();
        itmeSesi.currentTime = 0; 
    }
}

function objeCarpismaKontrolu(hedefKutu, itilebilirMi, anlikHiz) {
    // Çarpışma var mı?
    if (player.x < hedefKutu.x + hedefKutu.width &&
        player.x + player.width > hedefKutu.x &&
        player.y < hedefKutu.y + hedefKutu.height &&
        player.y + player.height > hedefKutu.y) {


        // Fizik hesaplaması yapıldı. Karakter bir önceki karede neredeydi?
        // Bu sayede üstten mi, alttan mı yoksa yandan mı çarptığını anlıyoruz.
        let oyuncuEskiAltKisim = player.y - player.velocityY + player.height;
        let oyuncuEskiUstKisim = player.y - player.velocityY;

        // DURUM 1: Üstten çarpma durumu (kutunun tepesine inme)
        if (oyuncuEskiAltKisim <= hedefKutu.y) {
            player.y = hedefKutu.y - player.height; // Karakteri kutunun tepesine oturt
            player.velocityY = 0;                   // Düşüşü durdur
            player.havadaMi = false;                // Yere değdiği için tekrar zıplayabilsin
        }

        // DURUM 2: Alttan çarpma durumu (Zıplayıp kafayı kutunun altına vurma)
        else if (oyuncuEskiUstKisim >= hedefKutu.y + hedefKutu.height) {
            player.y = hedefKutu.y + hedefKutu.height; // Kafayı vurunca dur
            player.velocityY = 0;                      // Hızı sıfırla ki hemen aşağı düşmeye başlasın
        }
        else {
            // DURUM A: Eğer bu nesne itilebilen bir şeyse ve sol tıka basılıyorsa if yapısı çalışır
            if (itilebilirMi === true && tuslar.itme === true) {
                if (player.x < hedefKutu.x && tuslar.sag) {
                    hedefKutu.x += anlikHiz; // Sağa it
                    kutuHareketEdiyorMu = true;
                    let duvaraCarptiMi = false;

                    // Kutunun sağ kenarı tuvalden dışarı çıkıyor mu kontrolü
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

                }
                else if (player.x > hedefKutu.x && tuslar.sol) {
                    hedefKutu.x -= anlikHiz; // Sola it
                    kutuHareketEdiyorMu = true;
                    // Hangi odadaysak o odanın duvarlarını kontrol et
                    let duvaraCarptiMi = false;

                    // Kutunun sol kenarı sıfırın altına iniyor mu
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
            // DURUM B: İtilemez bir duvarsa veya sol tıka basılmıyorsa (içinden geçme)
            else {
                if (player.x < hedefKutu.x && player.x + player.width > hedefKutu.x) {
                    player.x = hedefKutu.x - player.width; // Soldan çarpınca durdurma işlemi
                } else if (player.x > hedefKutu.x) {
                    player.x = hedefKutu.x + hedefKutu.width; // Sağdan çarpınca durdurma işlemi
                }
            }
        }
    }

}

//Kutu çarpışma kontrolü
function ikiKutuCarpisiyorMu(kutu1, kutu2) {
    //Burada true dönerse bir çarpışma gerçekleşmiştir, false ise nesneler arasında boşuk vardır.
    return (kutu1.x < kutu2.x + kutu2.width &&
        kutu1.x + kutu1.width > kutu2.x &&
        kutu1.y < kutu2.y + kutu2.height &&
        kutu1.y + kutu1.height > kutu2.y);
}

function kapiCarpismaKontrolu() {
    // -- 1. Oda Kontrolleri --
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

    // -- 2. Oda Kontrolleri --
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

    // -- 3. Oda Kontrolleri --
    else if (oyunDurumu === 'oda3') {
        if (player.x < kapi2.x + kapi2.width &&
            player.x + player.width > kapi2.x &&
            player.y < kapi2.y + kapi2.height &&
            player.y + player.height > kapi2.y) {

            if (envanter.includes("Anahtar") && envanter.includes("Enerji Kesici") && envanter.includes("Harita")) {
                //Burada envanter tamsa bitis ekranı gözükür
                oyunFonMuzigi.pause();
                oyunFonMuzigi.currentTime = 0;

                bitisMuzigi.play();
                oyunDurumu = 'bitis'; // Başlangıç ekranına geç

            } else {
                uyariMuzigi.currentTime = 0; // Ses bitmeden art arda mesaj alınırsa diye başa sar
                uyariMuzigi.play();
                uyariMesajiGoster = true;
                uyariMesajiSuresi = 120;
                player.x -= 20;
            }

        }
    }
}

// Saniyede 1 kez çalışan zamanlayıcı
setInterval(function () {

    let oyundaMiyiz = (oyunDurumu === 'oyun' || oyunDurumu === 'oda2' || oyunDurumu === 'oda3');
    // Sadece oyun içindeyken (başlangıç ekranında değilken) zaman aksın
    if (oyundaMiyiz && zaman > 0) {
        zaman--;
    }
        // Süre biterse baslangıca dön
    else if (oyundaMiyiz && zaman === 0) {
        //Müziği sıfırlama
        oyunFonMuzigi.pause();
        oyunFonMuzigi.currentTime = 0;

        ekranGecisiYap('baslangic'); // Ekranı karartarak geçiş yap

        //Başlangıç ekranındaki HTML butonunu/yazısını tekrar görünür yap
        girisEkrani.style.display = 'flex';
        oyunuSifirla();
    }
}, 1000);
//Buradaki 1000 milisaniye bu kod içindeki işlemlerin her saniye tekrardan kontrol edilmesini sağlar

//Resim tamamen yüklenmeden döngüyü başlatmıyoruz. Oyun her şey hazır olduğunda başlar
arkaplanResmi.onload = function () {
    gameLoop();
};

//Oyna butonuna tıklanma olayı
baslat.addEventListener('click', function () {
    girisEkrani.style.display = 'none';
    player.x = 475;
    player.y = 500;

    // Oyuna tekrar başlandığında lav sesini kes
    yanici.pause();
    yanici.currentTime = 0;
    envanterMuzigi.pause();
    envanterMuzigi.currentTime = 0;

    uyariMuzigi.pause();
    uyariMuzigi.currentTime = 0;
    oyunFonMuzigi.play();
    ekranGecisiYap('giris');// Ekranı karartarak hikaye ekranına geçiş yap
 });
