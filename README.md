# Playwright Test Automation Practice

This repository contains **practice test automation scripts** built with [Playwright](https://playwright.dev/) using **JavaScript**.  
Each feature or sample application is tested in a **separate spec file** under the `tests` folder.

---

## 📂 Project Structure

project-root
│── node_modules/          # Dependencies
│── playwright-report/     # HTML reports
│── test-results/          # Debug results & traces
│── tests/                 # All test specs
│   ├── dragDrop.spec.js
│   ├── dynamicPagination.spec.js
│   ├── dynamicTable.spec.js
│   ├── locator.spec.js
│   ├── login.spec.js
│   ├── radioButton.spec.js
│   └── webinput.spec.js
│── .gitignore
│── package.json           # Dependencies & scripts
│── playwright.config.ts   # Playwright configuration



---

## 🚀 Getting Started

### Prerequisites
- Install [Node.js](https://nodejs.org/) (LTS version recommended)
- Install Git

### Install dependencies:
- npm install
- npx playwright install

## Execution commands
- npx playwright test
- npx playwright test tests/login.spec.js

## Reports
- npx playwright show-report







