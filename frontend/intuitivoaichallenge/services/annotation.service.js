import getConfig from 'next/config';

import { fetchWrapper } from '../utils/fetchWrapper';

const { publicRuntimeConfig } = getConfig();

const baseUrl = `${publicRuntimeConfig.apiUrl}/annotations`;

export const annotationService = {
  getAnnotations,
  createAnnotation,
  deleteAnnotation,
  editAnnotation,
};

function getAnnotations() {
  return fetchWrapper.get(`${baseUrl}/`);
}

function createAnnotation(imageId, coordinates, text) {
	return fetchWrapper.post(`${baseUrl}/`, { image_id: imageId, coordinates_xy: coordinates, text: text });
}

function deleteAnnotation(annotationId) {
	return fetchWrapper.delete(`${baseUrl}/${annotationId}/`);
}

function editAnnotation(annotationId, imageId, coordinates, text) {
	return fetchWrapper.put(`${baseUrl}/${annotationId}/`, { image_id: imageId, coordinates_xy: coordinates, text: text });
}
