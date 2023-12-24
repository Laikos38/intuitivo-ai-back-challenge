import getConfig from 'next/config';

import { fetchWrapper } from '../utils/fetchWrapper';

const { publicRuntimeConfig } = getConfig();

const baseUrl = `${publicRuntimeConfig.apiUrl}/annotations`;

export const annotationService = {
	getAnnotations,
  createAnnotation,
};

function getAnnotations() {
  return fetchWrapper.get(`${baseUrl}/`);
}

function createAnnotation(imageId, coordinates, text) {
	return fetchWrapper.post(`${baseUrl}/`, { image_id: imageId, coordinates_xy: coordinates, text: text });
}
