# 📚 BookWorm – Full-Stack React Native App 🚀  

## 🎯 What You’ll Build
This is a **true full-stack project** — not just a pretty UI.

- ✅ Works on real devices & simulators (Android / iOS)
- ✅ Complete build in ~7 hours

## 🧑‍🍳 App Features
- 🔐 **Authentication** — Signup & login with JWT, error handling for invalid credentials  
- 🏠 **Home Feed** — Newest-first posts with infinite scrolling  
- ➕ **Create Post** — Title, rating, cover image & caption (all required)  
- 👤 **Profile Screen** — User info and their posts  
- 🗑️ **Delete Post** — Confirmation alert before removal  
- 🎨 **4 Instant Themes** — Swap themes by changing one color object  
- 🌐 **Web Support** — Run on `localhost` in the browser  
- 🚪 **Logout**

## 🧠 What You’ll Learn
- ⚙️ Build a REST API with **Node.js, Express & MongoDB**
- 🔑 Implement stateless authentication using **JSON Web Tokens (JWT)**
- 🔄 Add performant infinite loading with **cursor-based pagination**
- 🖼️ Handle image uploads the easy way (**Base64 → Cloudinary**)
- 🛫 Deploy the backend for free (**Render / Railway**)
- 🌍 Ship a cross-platform app with **React Native + Expo Router**
- 🧭 Animate navigation & shared element transitions
- 🧪 Debug on a physical device — **no Android Studio or Xcode required**

## 📁 Environment Variables

### ⚙️ Backend (`/backend/.env`)
```env
PORT=3000
MONGO_URI=<YOUR_MONGO_DB_URI>
JWT_SECRET=<YOUR_VERY_HARD_TO_FIND_SECRET>

CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>

API_URL=<YOUR_DEPLOYED_API_URL>
###⚙️ Run the Backend
cd backend
npm install
npm run dev

###📱 Run the Mobile App
cd mobile
npm install
npx expo
