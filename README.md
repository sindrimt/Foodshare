# FoodShare

FoodShare er en applikasjon som lar brukere finne og opprette matoppskrifter som kan deles med andre brukere. <br>
Tjenesten tillater opprettelse av bruker, som oppskrifter vil bli tilknyttet.

Tjenesten er planlagt å få flere oppgraderinger i nær fremtid:
- Mulighet for en bruker å gi vurderinger på oppskrifter
- Mulighet for å redigere bruker profil
- Kategorier for oppskrifter
- Utbedret design


## Start server

**0.1** (Valgfritt -- unødvendig i development)

Ha postgresql installert

- Mac: `brew install postgresql`
- Windows: Last ned 'installer' fra https://www.postgresql.org/
- Linux: Følg detaljer fra https://www.postgresql.org/

**0.2**

Ha python 3 installert <br>
Ha node js installert <br>

**0.3**

Installer python requirements.
I terminal: `pip install -r requirements.txt`

**1.** <br>
Naviger til foodshare mappen med terminal: <br>
I terminal: `python3 manage.py runserver` for å starte djangoserveren.<br>
For Windows: I terminal: `python manage.py runserver` for å starte djangoserveren.<br>

Naviger til frontend mappen med terminal: <br>
I terminal: `npm install` <br>
Deretter, i terminal: `npm run dev` <br>

Åpne en nettleser med Local host ip, den kan finnes i terminalmeldingen som blir returnert ved trinn **1.** <br>
