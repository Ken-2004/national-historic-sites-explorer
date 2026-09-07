import jwt from 'jsonwebtoken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function setToken(token) {
  localStorage.setItem('access_token', token);
}

export function getToken() {
  return localStorage.getItem('access_token');
}

export function removeToken() {
  localStorage.removeItem('access_token');
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwt.decode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  const decoded = readToken();
  if (!decoded) return false;
  const currentTime = Date.now() / 1000;
  return decoded.exp ? decoded.exp > currentTime : true;
}

export async function authenticateUser(user) {
  const res = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  if (res.ok) {
    setToken(data.token);
    return data.token;
  } else {
    throw new Error(data.message);
  }
}

export async function registerUser(user) {
  const res = await fetch(`${API_URL}/user/register`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  if (res.ok) {
    return data.message;
  } else {
    throw new Error(data.message);
  }
}
