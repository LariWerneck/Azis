# Azis — Gamification Platform for Workplace Productivity
 
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![AWS](https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)

This repository is available in Portuguese (PT), English (EN), and French (FR).

Esse projeto está disponível em Português, Inglês e Francês.

Ce projet est documenté en portugais, anglais et français afin d’assurer l’accessibilité à un public plus large.
 
**Azis** is an open source web platform designed to boost workplace productivity through gamification mechanics — turning everyday tasks into engagement-driven experiences with points, goals, and progress tracking.
 
Originally developed as an academic project (formerly Arrow) and rebuilt from the ground up with a focus on containerized, cloud-ready infrastructure.

 
---
 
## ✨ Features
 
- 🎮 Gamification engine — points, levels, and task completion rewards
- 📊 Dashboard with productivity metrics per user/team
- 🔐 User authentication and role management
- 🐳 Fully containerized with Docker — works identically on any machine
- ☁️ Deployed on AWS EC2 (Ubuntu Linux)
---
 
## 🏗️ Architecture
 
```
azis/
├── frontend/        # React + Vite SPA
├── backend/         # Node.js REST API
├── database/        # PostgreSQL
└── docker-compose.yml
```
 
### Infrastructure Overview
 
```
[ User ] → [ AWS EC2 (Ubuntu Linux) ]
                    │
          [ Docker Compose ]
         ┌──────────┴──────────┐
    [ Frontend ]          [ Backend ]
    React + Vite          Node.js API
                               │
                         [ Database ]
```
 
The entire stack runs inside Docker containers orchestrated with Docker Compose, deployed on an AWS EC2 instance running Ubuntu Linux. This setup ensures environment parity between local development and production.
 
---
 
## 🛠️ Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Node.js |
| Containerization | Docker, Docker Compose |
| Cloud | AWS EC2 |
| OS | Ubuntu Linux |
 
---
 
## 🚀 Getting Started
 
### Prerequisites
 
- [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine
- Git
### Running locally
 
```bash
# 1. Clone the repository
git clone https://github.com/LariWerneck/azis.git
 
# 2. Navigate to the project folder
cd azis
 
# 3. Start all containers
docker compose up --build
 
# 4. Access the app
open http://localhost:8080
```
 
### Stopping the environment
 
```bash
docker compose down
```
 
---

## 📄 License
 
This project is licensed under the Apache License 2.0 — see the [LICENSE](LICENSE) file for details.
 
---

## 👩‍💻 About me
**Larissa Werneck** — Information Systems student, DevOps enthusiast.  
Focused on Linux, Docker, Terraform, and AWS.
 
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/larissa-werneck-a33447264/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LariWerneck)

# Azis — Plateforme de Gamification pour la Productivité au Travail

**Azis** est une plateforme web open source conçue pour améliorer la productivité en entreprise grâce à des mécaniques de gamification — transformant les tâches quotidiennes en expériences engageantes avec des points, des objectifs et un suivi de progression.

Initialement développée comme projet académique (anciennement Arrow) et entièrement reconstruite avec un focus sur une infrastructure conteneurisée et prête pour le cloud.

---

## ✨ Fonctionnalités

- 🎮 Moteur de gamification — points, niveaux et récompenses pour les tâches accomplies
- 📊 Tableau de bord avec métriques de productivité par utilisateur/équipe
- 🔐 Authentification des utilisateurs et gestion des rôles
- 🐳 Entièrement conteneurisé avec Docker — fonctionne de manière identique sur n'importe quelle machine
- ☁️ Déployé sur AWS EC2 (Ubuntu Linux)

---

## 🏗️ Architecture

```
azis/
├── frontend/        # SPA React + Vite
├── backend/         # API REST Node.js
├── database/        # PostgreSQL
└── docker-compose.yml
```

### Vue d'ensemble de l'infrastructure

```
[ Utilisateur ] → [ AWS EC2 (Ubuntu Linux) ]
                            │
                  [ Docker Compose ]
                 ┌──────────┴──────────┐
            [ Frontend ]          [ Backend ]
            React + Vite          API Node.js
                                       │
                                 [ Base de données ]
```

L'ensemble de la stack tourne dans des conteneurs Docker orchestrés avec Docker Compose, déployés sur une instance EC2 AWS sous Ubuntu Linux. Cette configuration garantit la parité d'environnement entre le développement local et la production.

---

## 🛠️ Stack Technique

| Couche | Technologie |
|---|---|
| Frontend | React, Vite |
| Backend | Node.js |
| Conteneurisation | Docker, Docker Compose |
| Cloud | AWS EC2 |
| Système d'exploitation | Ubuntu Linux |

---

## 🚀 Démarrage rapide

### Prérequis

- [Docker](https://www.docker.com/products/docker-desktop/) installé sur votre machine
- Git

### Lancer en local

```bash
# 1. Cloner le dépôt
git clone https://github.com/LariWerneck/azis.git

# 2. Aller dans le dossier du projet
cd azis

# 3. Démarrer les conteneurs
docker compose up --build

# 4. Accéder à l'application
http://localhost:8080
```

### Arrêter l'environnement

```bash
docker compose down
```

---

## 📄 Licence

Ce projet est sous licence Apache 2.0 — voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👩‍💻 À propos

**Larissa Werneck** — Étudiante en Systèmes d'Information, passionnée de DevOps.
Spécialisée en Linux, Docker, Terraform et AWS.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/seu-perfil)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LariWerneck)

# Azis — Plataforma de Gamificação para Produtividade no Trabalho
 
**Azis** é uma plataforma web open source desenvolvida para aumentar a produtividade no ambiente de trabalho por meio de mecânicas de gamificação — transformando tarefas do dia a dia em experiências engajantes com pontos, metas e acompanhamento de progresso.
 
Originalmente desenvolvida como projeto acadêmico (anteriormente chamada Arrow) e reconstruída do zero com foco em infraestrutura containerizada e pronta para a nuvem.
 
---
 
## ✨ Funcionalidades
 
- 🎮 Motor de gamificação — pontos, níveis e recompensas por conclusão de tarefas
- 📊 Dashboard com métricas de produtividade por usuário/equipe
- 🔐 Autenticação de usuários e gerenciamento de papéis
- 🐳 Totalmente containerizado com Docker — funciona de forma idêntica em qualquer máquina
- ☁️ Deploy na AWS EC2 (Ubuntu Linux)
---
 
## 🏗️ Arquitetura
 
```
azis/
├── frontend/        # SPA React + Vite
├── backend/         # API REST Node.js
├── database/        # PostgreSQL
└── docker-compose.yml
```
 
### Visão Geral da Infraestrutura
 
```
[ Usuário ] → [ AWS EC2 (Ubuntu Linux) ]
                        │
              [ Docker Compose ]
             ┌──────────┴──────────┐
        [ Frontend ]          [ Backend ]
        React + Vite          API Node.js
                                   │
                             [ Database ]
```
 
Todo o stack roda dentro de containers Docker orquestrados com Docker Compose, com deploy em uma instância EC2 da AWS rodando Ubuntu Linux. Essa configuração garante paridade de ambiente entre desenvolvimento local e produção.
 
---
 
## 🛠️ Stack de Tecnologias
 
| Camada | Tecnologia |
|---|---|
| Frontend | React, Vite |
| Backend | Node.js |
| Containerização | Docker, Docker Compose |
| Nuvem | AWS EC2 |
| Sistema Operacional | Ubuntu Linux |
 
---
 
## 🚀 Como Rodar
 
### Pré-requisitos
 
- [Docker](https://www.docker.com/products/docker-desktop/) instalado na sua máquina
- Git
### Rodando localmente
 
```bash
# 1. Clonar o repositório
git clone https://github.com/LariWerneck/azis.git
 
# 2. Entrar na pasta do projeto
cd azis
 
# 3. Subir os containers
docker compose up --build
 
# 4. Acessar a aplicação
http://localhost:8080
```
 
### Parar o ambiente
 
```bash
docker compose down
```
 
---
 
## 📄 Licença
 
Este projeto está licenciado sob a Apache License 2.0 — veja o arquivo [LICENSE](LICENSE) para mais detalhes.
 
---
 
## 👩‍💻 Sobre mim
 
**Larissa Werneck** — Estudante de Sistemas de Informação, entusiasta de DevOps.
Focada em Linux, Docker, Terraform e AWS.
 
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/seu-perfil)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LariWerneck)


