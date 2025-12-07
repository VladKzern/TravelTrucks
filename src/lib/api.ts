import axios from 'axios';
import { FetchCampersParams } from './types';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchCampers = async (params: FetchCampersParams) => {
  const res = await api.get('/campers', { params });
  return res.data;
};

export const fetchCamperById = async (id: string) => {
  const res = await api.get(`/campers/${id}`);
  return res.data;
};
