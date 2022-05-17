# UniGraph by FreanZ 📖

**_Hamarosan megjelenik a hivatalos weboldalunk is_**

**Frontend github link: https://github.com/KurotamaTakauji/Unigraph_Frontend**

## 📙 Tartalomjegyzék

- [Leírás](#%EF%B8%8F-le%C3%ADr%C3%A1s)
- [Dokumentáció](#-dokument%C3%A1ci%C3%B3)
  - [Funkcionális követelmények](#funkcion%C3%A1lis-k%C3%B6vetelm%C3%A9nyek)
  - [Nem funkcionális követelmények](#nem-funkcion%C3%A1lis-k%C3%B6vetelm%C3%A9nyek)
  - [Use-case diagram](#use-case-diagram)
- [Használt technológiák](#-haszn%C3%A1lt-technol%C3%B3gi%C3%A1k)
- [Használt eszközök](#-haszn%C3%A1lt-eszk%C3%B6z%C3%B6k)

## 🖊️ Leírás

Sokan már valószínűleg ismeritek a [tárgygráf](https://targygraf.hu/)-ot. Ez egy olyan oldal, ahol néhány egyetem minden karán minden szaknak

a mintatervét meg tudjátok tekinteni, elmenteni éppen hogy áltok a félévvel, számolja a kreditet is, stb.

A mi projektünk célja egy hasonló weboldal létrehozása lenne, ami kiküszöböli a tárgygráf hátrányait. Például nem responsive, a legtöbb tanterv elavult sajnos,

mert _ahogy mi azt észrevettük_ hardcoded az egész json mögötte.

Az UniGraph egy rugalmas, modern rendszer, ahol a közösség erejét használva lennének a tantervek naprakészek, valamint rengeteg tovább hasznos funkciót tervezünk

implementálni az oldalon ( _tantárgyak értékelése három fontos szempont szerint, naptár beiktatása az oldalon, telefonos applikáció, stb_ )

## Futtatás

Ahhoz hogy a projektet futtatni tudd, több lépést kell végrehajtani. 

Első sorban egy mongoDB-nek kell futnia a háttérben, ennek adatai [ebben](https://github.com/tothadam19/freanz/blob/main/src/datasources/mongo-db.datasource.ts) a file-ban lehet szerkeszteni. Egyik lehetőség, hogy dockerben fut az adatbázis, ehhez megtalálható a megfelelő yml, csak az alábbi parancsot kell kiadni.
```bash
  docker compose up -d
```
Ez elindítja az adatbázist, illetve, ha szükséges telepíti a mongoDB image-et. Megjegyzés: régebbi docker esetén `docker-compose` használatos, a `-d` flag használata akkor szükséges, ha szeretnéd, hogy háttérben fusson. Később ha végeztél a következő paranccsal lehet leállítani: `docker compose down`

Ha egyszer fut az adatbázis, akkor már csak a node projectet kell elindítani, amihez első sorban szükséges annak a telepítése, és utána futtatható is.
```bash
  npm install
  npm start
```
Ha egyszer elindult a project, akkor [localhost:3000](localhost:3000) lesz elérhető, böngészőből megtekinthető a Loopback keretrendszerbe beépített swagger UI.

## 📄 Dokumentáció

### Funkcionális követelmények:

- Felhasználói profil létrehozása, beléptetése és kiléptetése
- Keresési lehetőség egyetemekre, karokra, szakokra
- Felhasználói adatok megtekintése, módosítása
- Sablonok kilistázása, szerkesztése, létrehozása, frissítése, mentése, értékelése

### Nem funkcionális követelmények:

- A weboldal ne sértse meg az etikai kódexet (web scraping)
- Felhasználók jelszavainak titkosítása (jwt)
- A felhasználói felület könnyen átlátható legyen
- Ne fagyjon le a weboldal

### Use-case diagram:

<p align="center">
  <img src="https://github.com/TheBugsTeam/cloudified/blob/main/Documentation/images/cloudified-use-case.png" width="700">
</p>

## 🔧 Használt technológiák:

|   Mire    |                                                                                Mit                                                                                 |                 Link                 |
| :-------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------: |
| Database  | <a href="https://www.mongodb.com/"><img width=100px src="https://raw.githubusercontent.com/tothadam19/freanz/main/resources/mongodb.png"></a> | [mongoDB](https://www.mongodb.com/)  |
| Back-end  |  <a href="https://loopback.io/doc/en/lb4/"><img width=50px src="https://raw.githubusercontent.com/tothadam19/freanz/main/resources/loopback4.png"></a>   | [LoopBack 4](https://nodejs.org/en/)|
| Front-end |    <a href="https://angular.io/"><img width=50px src="https://raw.githubusercontent.com/tothadam19/freanz/main/resources/angular.svg"></a>     |   [Angular](https://reactjs.org/)   |

**_További használt csomagok/dependeciák a [`package.json`](https://github.com/TheBugsTeam/cloudified/blob/main/package.json) fájlban találhatók meg_**

## 🔨 Használt eszközök:

|       Mire       |                                                                                           Mit                                                                                           |                         Link                         |
| :--------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------: |
|     Kódolás      | <a href="https://code.visualstudio.com/"><img width=50px src="https://github.com/tothadam19/freanz/blob/main/resources/vsc.png"></a> | [Visual Studio Code](https://code.visualstudio.com/) |
| Testing requests |              <a href="https://www.postman.com/"><img width=90px src="https://raw.githubusercontent.com/tothadam19/freanz/main/resources/Swagger.png"></a>               |         [LoopBack4 Swagger UI](https://loopback.io/doc/en/lb4/Preparing-the-API-for-consumption.html)|
