# Démonstration de laod balancing avec Node.js et HAProxy

## Vue d'ensemble
Ce projet démontre l'équilibrage de charge HTTP avec HAProxy et deux serveurs Node.js de démonstration. Toute l'automatisation est gérée par `setup_and_test.sh`.

- Deux instances de `demo_server.js` sont lancées sur les ports 4001 et 4002.
- HAProxy écoute sur le port 8080 et répartit les requêtes entre les deux serveurs.
- Les endpoints `/info` et `/health` fournissent des détails sur le serveur et son état de santé.
- La page de statistiques HAProxy est disponible pour la supervision.

## Démarrage rapide

1. **Lancer l'installation automatisée :**
   ```bash
   bash setup_and_test.sh
   ```
   Cela va :
   - Installer Node.js, npm et HAProxy
   - Démarrer deux serveurs de démonstration (ports 4001 & 4002)
   - Configurer et redémarrer HAProxy
   - Exécuter un test d'équilibrage de charge
   - Afficher le lien vers la page de statistiques HAProxy

2. **Démarrage manuel des serveurs (optionnel) :**
   ```bash
   PORT=4001 SERVER_NAME=Demo1 node demo_server.js &
   PORT=4002 SERVER_NAME=Demo2 node demo_server.js &
   ```

3. **Accéder aux endpoints :**
   - Endpoint équilibré : [http://localhost:8080/info](http://localhost:8080/info)
   - Vérification de santé : [http://localhost:8080/health](http://localhost:8080/health)
   - Statistiques HAProxy : [http://localhost:8081/stats](http://localhost:8081/stats)

## Arrêter les serveurs
```bash
pkill -f demo_server.js
```

## Fichiers
- `demo_server.js` : Serveur Node.js avec les endpoints `/info` et `/health`
- `setup_and_test.sh` : Script d'installation et de test automatisé

## Prérequis
- Ubuntu (testé)
- Node.js & npm
- HAProxy

---

N'hésitez pas à modifier `demo_server.js` pour des démonstrations plus avancées !
