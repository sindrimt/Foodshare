# FoodShare

FoodShare er en applikasjon som lar brukere finne og opprette matoppskrifter som kan deles med andre brukere. <br>
Tjenesten tillater registrering av brukerkonti som oppskrifter vil bli tilknyttet.

Tjenesten er planlagt å få flere oppgraderinger i nær fremtid:
- Mulighet for en bruker å gi vurderinger og kommentarer på oppskrifter
- Mulighet for å redigere brukerprofil
- Filtrering etter kategorier på oppskrifter
- Utbedret design


## Start server

**0.1**

Ha PostgreSQL installert

- Mac: `brew install postgresql`
- Windows: Last ned «installer» fra https://www.postgresql.org/
- Linux: Følg detaljer fra https://www.postgresql.org/

**0.2**

Ha Python 3.8 eller nyere installert <br>
Ha Node.js installert <br>

**0.3**

Installer nødvendige Python-pakker.
I terminal: `pip install -r requirements.txt`


**1.** <br>
Naviger til foodshare-mappen med terminal: <br>
I terminal: `python manage.py runserver` for å starte Django-serveren.<br>

**2.** <br>
Naviger til frontend-mappen med terminal: <br>
I terminal: `npm install` <br>
Deretter, i terminal: `npm run dev` <br>

**3.** <br>
Åpne en nettleser med localhost-IP. Den kan finnes i terminalmeldingen som blir returnert etter trinn **1.**. Standard er `localhost:8000`<br>
