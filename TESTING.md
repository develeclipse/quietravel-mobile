# QuieTravel - React Native Mobile App

## Testare l'App su Device (gratis)

### Opzione 1: Expo Go (più veloce)

1. Installa **Expo Go** sul tuo telefono:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Sul tuo computer:
```bash
cd quietravel-mobile
npm start
```

3. Scansiona il QR code con Expo Go

---

### Opzione 2: EAS Build (APK per Android)

#### 1. Crea account Expo
```bash
npx expo login
# Registrati su https://expo.dev se non hai account
```

#### 2. Configura EAS
```bash
npx eas build:configure
```

#### 3. Build APK (circa 5-10 minuti)
```bash
npm run build:android
```

#### 4. Scarica l'APK
Dopo la build, avrai un link per scaricare l'APK.

#### 5. Installa
- Trascina l'APK sul telefono
- Oppure usa Google Drive/email
- Installa (potresti dover abilitare "Installa da fonti sconosciute")

---

### Opzione 3: TestFlight per iOS (serve Mac o account)

```bash
npm run build:ios
# Richiede Apple Developer Account ($99/anno)
```

---

## Comandi Utili

```bash
# Avvia server locale
npm start

# Android
npm run android

# iOS (serve Mac)
npm run ios

# Web
npm run web

# Build APK
npm run build:android

# Build IPA
npm run build:ios
```

---

## Link Utili

- **Repo:** https://github.com/develeclipse/quietravel-mobile
- **Expo Dashboard:** https://expo.dev/accounts/develeclipse/projects/quietravel
- **EAS Build:** https://expo.dev/builds

---

## Note

- EAS Build gratuito per testing interno
- Per pubblicare su store serve account (iOS $99/anno, Android $25 una tantum)
- Non serve Mac per build Android
