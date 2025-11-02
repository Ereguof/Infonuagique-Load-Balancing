#!/bin/bash
# Setup de Node.js + HAProxy 

set -e
sudo apt update
sudo apt install -y nodejs npm haproxy curl

# On lance 2 instances de demo_server.js sur des ports différents
PORT=4001 SERVER_NAME=Demo1 nohup node demo_server.js > demo1.log 2>&1 &
PORT=4002 SERVER_NAME=Demo2 nohup node demo_server.js > demo2.log 2>&1 &
sleep 2

# Configuration de HAProxy, on utilise ici une stratégie de round-robin pour le load balancing sur le port 8080
echo "global
    daemon
    maxconn 256

defaults
    mode http
    timeout connect 5000ms
    timeout client 50000ms
    timeout server 50000ms

frontend http_front
    bind *:8080
    default_backend http_back

backend http_back
    balance roundrobin
    server demo1 127.0.0.1:4001 check
    server demo2 127.0.0.1:4002 check

listen stats
    bind *:8081
    stats enable
    stats uri /stats
    stats refresh 10s
" | sudo tee /etc/haproxy/haproxy.cfg

# Redémarrage de HAProxy pour prendre en compte la nouvelle configuration + attente pour s'assurer qu'il est bien lancé
sudo systemctl restart haproxy
sleep 2

# On envoie 10 requêtes pour vérifier que le load balancing fonctionne

for i in {1..10}; do
  curl -s http://localhost:8080/
done

# On met le lien des stats HAProxy à la fin
echo "Accédez aux statistiques de HAProxy à l'adresse : http://localhost:8081/stats"