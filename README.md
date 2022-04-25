# FoodShare

FoodShare er en applikasjon som lar brukere finne og opprette matoppskrifter som kan deles med andre brukere.

Tjenesten tillater registrering av brukerkonti som oppskrifter vil bli tilknyttet.

### Utviklet av: 

- Sindri Tomasson <sindrimt@stud.ntnu.no>

- Erik Wahlstrøm <erikswah@stud.ntnu.no>
 
- Boye G. Sjo <boyegs@stud.ntnu.com>

- Benjamin Krogh <benjask@stud.ntnu.no>

- Hedda Skåre <heddsk@stud.ntnu.no>

- Mattias L. Dahlin <mattiald@stud.ntnu.no>

- Ingri Nygaardsmoen <ingrhn@stud.ntnu.no>

## Start server

### Krav

- Python 3.10 eller nyere installert
  - Nødvendige Python-pakker (`pip install -r requirements.txt`)
- Node.js installert

### 1.

Naviger til foodshare-mappen med terminal:

I terminal: `python manage.py runserver` for å starte Django-serveren.

### 2.

Naviger til frontend-mappen med terminal:

I terminal: `npm install`

Deretter, i terminal: `npm run build`

### 3.

Åpne en nettleser med localhost-IP. Den kan finnes i terminalmeldingen som blir returnert etter trinn 1. Standard er `localhost:8000`.
