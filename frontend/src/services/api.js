import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const servicesAPI = {
    getCategories: () => api.get('/service-categories/'),
    getAll: () => api.get('/services/'),
    getDetail: (slug) => api.get(`/services/${slug}/`),
};

export const industriesAPI = {
    getAll: () => api.get('/industries/'),
    getDetail: (slug) => api.get(`/industries/${slug}/`),
};

export const portfolioAPI = {
    getAll: () => api.get('/case-studies/'),
    getFeatured: () => api.get('/case-studies/featured/'),
};

export const blogAPI = {
    getAll: () => api.get('/blog/'),
    getDetail: (slug) => api.get(`/blog/${slug}/`),
};

export const contactAPI = {
    submitForm: (data) => api.post('/contact/', data),
    getLocations: () => api.get('/locations/'),
};

export const homeAPI = {
    getSlides: () => api.get('/hero-slides/'),
};

export default api;
