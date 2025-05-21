# ReactApp + Container Hausaufgabe

Small React-Quiz-App i did build as a Homework for learning Docker & Kubernetes 

## Kubernetes-Intro

Siehe /kubernetes/k8s-intro-reflection.md für Kubernetes-Intro-Abgabe/-Lernziele

## Datenbank-Schema

Siehe sql-recap.md im Wurzelverzeichnis

## Reflexion I

### **Was wird genau im Image gespeichert – Quellcode oder Build-Ergebnis?**

Build-Ergebnis, welches wir aus dem dist-Verzeichnis ins Image kopieren


### **Welche Rolle spielt nginx in diesem Kontext?**

Dient hier als Webserver, der einen statischen Inhalt ausliefert


### **Warum wird der Entwicklungsmodus (npm run dev) nicht für den Produktivbetrieb genutzt?**

Der Entwicklungsmodus ist für schnelle Entwicklung und Iteration ausgelegt und bietet somit aufgrund von bspw. höherem Ressourcenverbrauch, potenzieller Sicherheitsrisiken, vieler zusätzlicher Funktionen, schlechterem Caching eine schlechter Performance, Sicherheit und Stabilität, als der Produktionsmodus


### **Was ist der Vorteil eines Containers gegenüber einem „lokalen Build“?**

Der Container bietet eine portable und reproduzierbare Umgebung, die unabhängig von der lokalen Umgebung immer mit den gleichen Abhängigkeiten und Konfigurationen ausgeführt werden kann, während für einen lokalen Build bspw. meist erst Abhnängikeiten installiert und Konfigurationen vorgenommen werden müssen


## Laufende Anwendung mit funktionierendem CRUD

![CRUD-Anwendung](/screenshots/CRUD-Anwendung.png)

![CRUD-Anwendung](/screenshots/CRUD-AnwendungII.png)


## docker stack services

![docker-stack-services](/screenshots/docker_stack_services.png)