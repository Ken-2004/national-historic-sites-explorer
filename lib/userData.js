import { getToken } from './authenticate';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function addToFavourites(id) {
  const token = getToken();
  const res = await fetch(`${API_URL}/user/favourites/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

export async function removeFromFavourites(id) {
  const token = getToken();
  const res = await fetch(`${API_URL}/user/favourites/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

export async function getFavourites() {
  const token = getToken();
  const res = await fetch(`${API_URL}/user/favourites`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}