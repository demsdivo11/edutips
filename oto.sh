#!/bin/bash

# Membuat folder
mkdir -p src/components
mkdir node_modules

# Membuat file di root
touch package-lock.json eslint.config.js index.html 
touch package.json postcss.config.js tsconfig.app.json
touch tailwind.config.js vite.config.ts tsconfig.json tsconfig.node.json

# Membuat file di dalam src/
touch src/App.tsx src/index.css src/main.tsx src/vite-env.d.ts

# Membuat file di dalam src/components/
touch src/components/About.tsx src/components/AdminLogin.tsx 
touch src/components/ContentList.tsx src/components/Header.tsx 
touch src/components/AddContentForm.tsx src/components/Contact.tsx 
touch src/components/Footer.tsx