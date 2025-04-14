# Proposta di Consegna

## Descrizione

GameZone è una piattaforma web che permette agli utenti di essere sempre aggiornati sulle ultime uscite dei videogiochi. L'app permette di cercare giochi per nome, filtrarli per genere e visualizzarne i dettagli. Una volta registrato e loggato, l’utente può:

- Salvare i propri giochi preferiti

- Partecipare a una chat live con altri utenti autenticati

- Personalizzare il proprio profilo tramite la sezione Settings

L’interfaccia supporta la modalità scura (dark mode) e si adatta a tutti i dispositivi grazie a un layout completamente responsive.


## API

API usata:
* RAWG API (https://rawg.io/apidocs)

BaaS usato:
* Supabase (https://supabase.com/)


## Stile

Material UI (MUI)

## Pagine

* Pagine visitabili:

1. Pagina 1 - Homepage con card dei videogiochi
2. Pagina 2 - Pagina filtro per genere tramite sidebar
3. pagina 3 - Pagina filtro per nome tramire searchbar
2. Pagina 4 - Pagina dettaglio del videogioco
3. Pagina 5 - Pagina registrazione utente
4. Pagina 6 - Pagina login utente
5. Pagina 7 - Pagina profilo utente con lista dei preferiti
6. Pagina 8 - Pagina settings profilo utente per modificare avatar, username, nome e cognome


## User Interactions

* Lista di interazioni che utenti autenticati e non posso fare nell'applicazione.

Utente non autenticato:

1. Può scrollare sui giochi in piattaforma
2. Può filtrare per nome del gioco
3. Può filtrare per genenere del gioco tramite sidebar
4. Può leggere le chat live tra utenti registrati presenti nelle pagine di dettaglio dei videogiochi
5. Può registrarsi con email e password in piattaforma

Utente autenticato:

1. Può creare una lista di giochi favoriti,accessibile tramite la pagina Profile
2. Può modificare il proprio profilo tramite la pagina Settings
3. Può chattare con gli altri utenti autenticati

## Context

* Sessione utente
* Preferiti
* Tema

## Deployment

* https://game-zone-silvia-ercolino.vercel.app/