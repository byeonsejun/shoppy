import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { get, getDatabase, ref, remove, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const database = getDatabase(app);

export function login(main) {
  if (main === 'google') {
    signInWithRedirect(auth, googleProvider).catch(console.error);
  } else if (main === 'facebook') {
    signInWithRedirect(auth, facebookProvider).catch(console.error);
  }
}

/** 앱 로드 시 리다이렉트 로그인 결과 처리 (콘솔 COOP 경고 방지용) */
export function handleRedirectResult() {
  return getRedirectResult(auth).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    addUserId(user);
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, 'admins'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        if (Array.isArray(admins) && admins.includes(user.uid)) {
          return { ...user, isAdmin: true };
        }
      }
      return { ...user, isAdmin: false };
    })
    .catch((err) => {
      console.warn('Firebase admins read failed:', err?.message || err);
      return { ...user, isAdmin: false };
    });
}

export async function addNewProduct(product, image) {
  const id = uuid();
  return set(ref(database, `shop/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(','),
  });
}

export async function getProducts() {
  return get(ref(database, 'shop'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        return val && typeof val === 'object' ? [...Object.values(val)] : [];
      }
      return [];
    })
    .catch((err) => {
      console.warn('Firebase getProducts failed:', err?.message || err);
      return [];
    });
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`))
    .then((snapshot) => {
      const val = snapshot.val();
      const items = val && typeof val === 'object' ? val : {};
      return Object.values(items);
    })
    .catch((err) => {
      console.warn('Firebase getCart failed:', err?.message || err);
      return [];
    });
}
export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}
export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}

export async function getAccount(userId) {
  return get(ref(database, `account/${userId}`))
    .then((snapshot) => {
      const val = snapshot.val();
      const items = val && typeof val === 'object' ? val : {};
      return Object.values(items);
    })
    .catch((err) => {
      console.warn('Firebase getAccount failed:', err?.message || err);
      return [];
    });
}
export async function addOrUpdateToAccount(userId, account) {
  return set(ref(database, `account/${userId}`), account);
}

const addUserId = (userId) => {
  if (!userId) return;
  get(ref(database, 'users'))
    .then((snapshot) => {
      const val = snapshot.val();
      const users = val && typeof val === 'object' ? Object.values(val) : [];
      const currentUser = userId.uid;
      const hasFirstUser = users.some((u) => u && u.uid === currentUser);
      if (!hasFirstUser) {
        return set(ref(database, `users/${currentUser}`), {
          uid: currentUser,
          name: userId.displayName || '',
        });
      }
    })
    .catch((err) => {
      console.warn('Firebase users read failed:', err?.message || err);
    });
};
