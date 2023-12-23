import getConfig from 'next/config';

import { userService } from '../services/user.service';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url),
        mode: "cors"
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body),
        mode: "cors"
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body),
        mode: "cors"
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url),
        mode: "cors"
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function authHeader(url) {
    const user = userService.userValue;
    const isLoggedIn = user && user.access;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.access}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then(response_data => {
        const data = response_data && JSON.parse(response_data);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status_code) && userService.userValue) {
                userService.logout();
            }
            
            return Promise.reject(data);
        }

        return data.data;
    });
}