import getConfig from 'next/config';

import { fetchWrapper } from '../utils/fetchWrapper';

const { publicRuntimeConfig } = getConfig();

const baseUrl = `${publicRuntimeConfig.apiUrl}/images`;

export const imageService = {
  getImages,
};

function getImages(page) {
  return fetchWrapper.get(`${baseUrl}/?page=${page}`);
}