# 🧪 The Frontend Migration Survival Guide

A hands-on example repository from the **DevFestDC** talk — exploring how **React** and **Web Components** can work together.

## 🎯 Purpose

This repo demonstrates real-world patterns for exposing  **React Components** as **Custom Elements**, showcasing:

- 📦 Importing and rendering custom elements
- 🔁 Data binding
- ⚡  Event communication between React and Web Components
- 🔄 Dynamic loading
- 🧩 Micro frontends using Web Components

## 🚀 Quick Start

1. **Clone the repo:**
   ```bash
   git clone https://github.com/hadarge/the-frontend-migration-survival-guide.git
   cd the-frontend-migration-survival-guide
   ```

2. **Install dependencies:**
   ```bash
   cd packages
   cd reactApp
   npm i
   
   cd ..
   cd ..
  
   cd angularjs-by-example
   npm i
   ```

3. **Start the React app as a server:**
   ```bash
   cd packages
   cd reactApp
   npm i
   npm run start 
   ```

4. **Start the AngularJS app:**
   ```bash
   cd packages
   cd angularjs-by-example
   npm run start
   ```

5. **Open in browser:**
- Navigate to [The Angular App](http://localhost:8282)
---

## 📁 Structure

```
/packages/react-app         → React host application & WC components exposer module
/packages/angularjs-by-example        → AngularJS host application
```

---

## 🧠 Topics Covered

- ✅ Defining and registering custom elements
- 🔗 Passing props and attributes to React
- 🔗 Passing props and attributes from AngularJS
- 📡 Listening to events
- 📥 Dynamic import and lazy loading Web Components

---

## 💡 Why Web Components?

Web Components offer framework-agnostic, encapsulated UI building blocks.
When combined with React, they unlock powerful micro frontend possibilities and long-term maintainability across diverse codebases.

---

## 🎤 Talk Info

**DevFestDC – October 2025**  
_Speaker: Hadar Geva_  
Topic: **"The Frontend Migration Survival Guide"**

---

## 🛠️ Tech Stack

- Node 22 & Node 11
- React 19
- AngularJS 19
- Vite
- Gulp
- Vanilla Web Components (no framework-specific WC library)
- TypeScript

---

## 🤝 Contributing

Feel free to fork, explore, and share your experiments!  
Pull requests are welcome if you’d like to extend this further.

---

## 📄 License

MIT – use freely, build boldly.