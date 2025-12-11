import axios from 'axios';
import type {
    ProfileInfo,
    ProjectListResponse,
    SkillsGrouped,
    Experience,
    Certificate,
    PortfolioStats,
    ContactFormData,
    ContactSubmitResponse,
} from '@/types';

// Use environment variable for production, or proxy for development
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL.endsWith('/api/v1') ? API_BASE_URL : `${API_BASE_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const portfolioApi = {
    getProfile: async (): Promise<ProfileInfo> => {
        const { data } = await apiClient.get<ProfileInfo>('/portfolio/profile');
        return data;
    },

    getProjects: async (category?: string, featuredOnly?: boolean): Promise<ProjectListResponse> => {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (featuredOnly) params.append('featured_only', 'true');

        const { data } = await apiClient.get<ProjectListResponse>(`/portfolio/projects?${params}`);
        return data;
    },

    getFeaturedProjects: async () => {
        const { data } = await apiClient.get('/portfolio/projects/featured');
        return data;
    },

    getSkills: async (): Promise<SkillsGrouped> => {
        const { data } = await apiClient.get<SkillsGrouped>('/portfolio/skills');
        return data;
    },

    getExperience: async (): Promise<Experience[]> => {
        const { data } = await apiClient.get<Experience[]>('/portfolio/experience');
        return data;
    },

    getCertificates: async (): Promise<Certificate[]> => {
        const { data } = await apiClient.get<Certificate[]>('/portfolio/certificates');
        return data;
    },

    getStats: async (): Promise<PortfolioStats> => {
        const { data } = await apiClient.get<PortfolioStats>('/portfolio/stats');
        return data;
    },

    submitContact: async (formData: ContactFormData): Promise<ContactSubmitResponse> => {
        const { data } = await apiClient.post<ContactSubmitResponse>('/contact/submit', formData);
        return data;
    },
};
