# 06 — GitHub Actions CI/CD Pipeline

> **Module 6 of 6** | Prerequisites: Modules 01–05 done, Docker Hub account ready, GitHub repo ready.

---

## What You Are Building

A pipeline that runs automatically every time you push code to GitHub:

```
git push
   ↓
GitHub Actions (built into GitHub — no extra server needed)
   ↓
npm install + run tests
   ↓
docker build → docker push → Docker Hub
   ↓
kubectl deploy → Kubernetes
```

> **GitHub Actions vs Jenkins:** Jenkins requires you to run and maintain a separate server (and expose it via ngrok). GitHub Actions runs entirely inside GitHub — nothing to install, no tunnel needed.

---

## Windows Setup — Two Terminals

Open these two terminals and keep them open throughout:

| Terminal | Used for |
|---|---|
| **WSL** (`wsl` in PowerShell) | All `docker` and `kubectl` commands |
| **CMD** (regular Command Prompt) | `git add`, `git commit`, `git push` |

> All commands below marked **[WSL]** go in WSL. Commands marked **[CMD]** go in CMD.

---

## Step 1 — Create the App

**[CMD]** — in your project folder:
```cmd
mkdir hello-actions
cd hello-actions
git init
git remote add origin https://github.com/YOUR_USERNAME/hello-actions.git
```

> Create the repo on GitHub first (github.com/new → name: `hello-actions` → public → no README).

Create these four files:

**`app.js`**
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello from GitHub Actions CI/CD!'));

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log('Running on port 3000'));
}
```

**`app.test.js`**
```js
const request = require('supertest');
const app = require('./app');

test('GET / returns greeting', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
  expect(res.text).toContain('Hello from GitHub Actions CI/CD!');
});
```

**`package.json`**
```json
{
  "name": "hello-actions",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "jest --ci"
  },
  "dependencies": { "express": "4.18.2" },
  "devDependencies": {
    "jest": "29.7.0",
    "supertest": "6.3.4"
  }
}
```

**`.gitignore`**
```
node_modules/
*.log
```

Install dependencies and push:

**[CMD]**
```cmd
npm install
git add .
git commit -m "initial commit"
git push -u origin main
```

---

## Step 2 — Add a Dockerfile

Create **`Dockerfile`** in the same folder:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY app.js .
EXPOSE 3000
CMD ["node", "app.js"]
```

**[CMD]**
```cmd
git add Dockerfile
git commit -m "Add Dockerfile"
git push
```

---

## Step 3 — Add Docker Hub Credentials to GitHub

GitHub Actions needs your Docker Hub password to push images.

Go to your repo on GitHub → **Settings → Secrets and variables → Actions → New repository secret** — add these two secrets:

| Name | Value |
|---|---|
| `DOCKERHUB_USERNAME` | your Docker Hub username |
| `DOCKERHUB_TOKEN` | your Docker Hub password or access token |

> To create an access token: Docker Hub → Account Settings → Security → New Access Token.

---

## Step 4 — Add the Workflow File

Create the folder and file **`.github/workflows/ci.yml`**:

**[CMD]**
```cmd
mkdir .github
mkdir .github\workflows
```

**`.github/workflows/ci.yml`**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

env:
  IMAGE_NAME: ${{ secrets.DOCKERHUB_USERNAME }}/hello-actions

jobs:

  test:
    name: Install & Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

  build-and-push:
    name: Build & Push Docker Image
    runs-on: ubuntu-latest
    needs: test               # only runs if test job passes
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: |
            ${{ env.IMAGE_NAME }}:${{ github.run_number }}
            ${{ env.IMAGE_NAME }}:latest

  deploy:
    name: Deploy to Kubernetes
    runs-on: ubuntu-latest
    needs: build-and-push     # only runs if build job passes
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Set up kubectl
        uses: azure/setup-kubectl@v4

      - name: Write kubeconfig
        run: |
          mkdir -p ~/.kube
          echo "${{ secrets.KUBECONFIG }}" > ~/.kube/config

      - name: Deploy
        run: |
          kubectl set image deployment/hello-actions \
            hello-actions=${{ env.IMAGE_NAME }}:${{ github.run_number }}
          kubectl rollout status deployment/hello-actions --timeout=120s

      - name: Rollback on failure
        if: failure()
        run: kubectl rollout undo deployment/hello-actions
```

**[CMD]**
```cmd
git add .github
git commit -m "Add GitHub Actions workflow"
git push
```

GitHub Actions starts running immediately — go to your repo → **Actions** tab to watch it.

---

## Step 5 — Set Up Kubernetes (run once)

Create the initial Kubernetes deployment:

**[WSL]**
```bash
kubectl create deployment hello-actions \
  --image=YOUR_DOCKERHUB_USERNAME/hello-actions:latest \
  --replicas=2

kubectl expose deployment hello-actions \
  --type=NodePort --port=80 --target-port=3000 \
  --name=hello-actions-svc
```

### Add kubeconfig as a GitHub secret

The workflow needs your kubeconfig to reach your cluster. Export it and add it as a secret:

**[WSL]**
```bash
cat ~/.kube/config
```

Copy the entire output. Go to GitHub → **Settings → Secrets and variables → Actions → New repository secret**:

| Name | Value |
|---|---|
| `KUBECONFIG` | the full contents of `~/.kube/config` |

---

## Step 6 — Test the Full Pipeline

Make any change and push:

**[CMD]**
```cmd
git commit --allow-empty -m "trigger test"
git push
```

Go to your repo → **Actions** tab. You will see three jobs run in sequence:

```
✓ Install & Test
      ↓
✓ Build & Push Docker Image
      ↓
✓ Deploy to Kubernetes
```

If any job fails, click it to see the full log. The deploy job automatically rolls back if it fails.

---

## Quick Reference

### Daily workflow

```
1. Edit code
2. git add . && git commit -m "..." && git push
3. Browser → github.com/YOUR_USERNAME/hello-actions/actions
```

No servers to start. No ngrok. Just push and watch.

### Useful commands

```bash
# [WSL] Check Kubernetes pods
kubectl get pods

# [WSL] See what image is deployed
kubectl get deployment hello-actions -o wide

# [WSL] Manual rollback
kubectl rollout undo deployment/hello-actions
```

### GitHub Actions URLs

| URL | Purpose |
|---|---|
| `github.com/YOU/hello-actions/actions` | All workflow runs |
| `github.com/YOU/hello-actions/settings/secrets/actions` | Stored secrets |

---

## How It All Fits Together

```
Module 01 — Git & GitHub   → source of truth, triggers the pipeline
Module 02 — Docker         → packages the app, pushes to Docker Hub
Module 03 — YAML           → config language for Kubernetes AND the workflow file
Module 04 — Kubernetes     → runs the app, does rolling updates
Module 05 — Ansible        → provisions the servers
Module 06 — GitHub Actions → automates all of the above on every git push
```

## The Complete Flow

```
Developer (Windows 11)
        │
        │  git push
        ▼
    ┌────────┐
    │ GitHub │  source code + Actions runner — all in one place
    └────────┘
        │
        ├─── Job 1: Install & Test ───────────────── npm ci + npm test (Jest)
        │                                            ✗ tests fail → pipeline stops
        │                                            ✓ tests pass → continue
        │
        ├─── Job 2: Build & Push Docker Image ──────  docker build
        │                                            packages app + dependencies
        │              ┌──────────────┐             into a portable image
        │              │  Docker Hub  │
        │              │  (registry)  │             docker push → stored in cloud
        │              └──────────────┘
        │                     │
        │                     │  docker pull (automatic)
        │                     ▼
        └─── Job 3: Deploy ──────────────────────── kubectl set image
                                                    old container stopped
                                                    new container started
                                                    ✗ fails → auto rollback
                                                    ✓ success → app is live
                                                         │
                                                         ▼
                                               http://localhost:3000
                                               app is live ✓
```

---

## What Changed From the Jenkins Version

| Jenkins | GitHub Actions |
|---|---|
| Separate Jenkins server (Docker container) | No server — runs inside GitHub |
| ngrok tunnel to receive webhooks | Not needed — GitHub triggers itself |
| `Jenkinsfile` (Groovy DSL) | `.github/workflows/ci.yml` (YAML) |
| Jenkins credentials store | GitHub repository secrets |
| Manual plugin installs (NodeJS, Docker Pipeline) | Pre-built actions (`setup-node`, `build-push-action`) |
| Blue Ocean UI | Actions tab in GitHub |
| Daily startup: `docker start jenkins` + ngrok | Nothing — always on |
