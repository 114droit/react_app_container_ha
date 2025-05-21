# Reflexion Kubernetes-Intro

### Welche Methode hast du zum Aufsetzen deines lokalen Kubernetes Clusters gewählt (Docker Desktop, Minikube, Kind) und warum?

Der lokale Cluster wurde zunächst über Docker Desktop aufgesetzt. Dies ist einfacher und ressourcenschonender als Minikube/Kind und Docker Desktop war bereits installiert. Für den Produktionsbetrieb sollte man jedoch zu komplexeren Tools, wie Minikube/Kind wechseln.

### Beschreibe in eigenen Worten, was die Control Plane eines Kubernetes Clusters ist und welche Kernrolle sie hat (ohne spezifische Komponenten wie etcd, Scheduler etc. im Detail zu nennen).

Die Control Plane (Kontrollebene) ist ein Satz von Komponenten, die den Kubernetes-Cluster steuern und verwalten (quasi das Gehirn des Clusters). Sie umfasst den API-Server, den etcd-Datenspeicher, den Scheduler und den Controller Manager.

### Was ist die Rolle eines Worker Node in einem Kubernetes Cluster?

Ein Worker Node in einem Kubernetes Cluster dient als physischer oder virtueller Server, auf dem Container-Workloads (Pods) ausgeführt werden. Der Master-Node (vergleichbar mit Manager-Node in Docker Swarm) verwaltet und orchestriert die Worker Nodes und sorgt dafür, dass die Pods auf den richtigen Nodes laufen.

### Der Befehl *kubectl* ist das Kommandozeilen-Tool zur Interaktion mit Kubernetes. Mit welchem zentralen Bestandteil der Kubernetes Architektur spricht *kubectl* direkt, wenn du einen Befehl absetzt?

Der Befehl *kubectl* spricht mit dem API-Server von Kubernetes.

### Wie hast du praktisch überprüft, dass kubectl erfolgreich eine Verbindung zu deinem lokalen Cluster herstellen konnte? Welche Befehle hast du dafür genutzt, und was hast du als erfolgreiche Ausgabe erwartet?

Mit *kubectl cluster-info* kann man sich grundlegende Informationen zu dem Cluster anzeigen lassen. Mit *kubectl config current-context* kann man überprüfen, ob der Cluster im richtigen Kontext korrekt verbunden ist. Erwartete Ausgabe bei Nutzung von Docker Desktop wäre *docker-desktop*.

### Basierend auf dem Theorieteil: Erkläre kurz die Kernidee der deklarativen Philosophie von Kubernetes.

Deklarativ beschreibend bedeutet, dass man den gewünschten Endzustand (Desired State) beschreibt, den das System erreichen soll. Der Fokus hierbei liegt auf dem **WAS** erreicht werden soll, wohingegen imperativ beschreibend Methoden und Wege beschreibt, wie man den gewünschten Zustand erreichen soll. Hierbei liegt der Fokus darauf, **WIE** man ertwas erreicht.


## kubectl output

![kubectl_output](/screenshots/kubectl_output.png)



