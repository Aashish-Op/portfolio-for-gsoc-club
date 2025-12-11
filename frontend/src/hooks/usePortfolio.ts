import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioApi } from '@/services/api';
import type { ContactFormData } from '@/types';

export function useProfile() {
    return useQuery({
        queryKey: ['profile'],
        queryFn: portfolioApi.getProfile,
        staleTime: 1000 * 60 * 10,
    });
}

export function useProjects(category?: string, featuredOnly?: boolean) {
    return useQuery({
        queryKey: ['projects', category, featuredOnly],
        queryFn: () => portfolioApi.getProjects(category, featuredOnly),
        staleTime: 1000 * 60 * 5,
    });
}

export function useSkills() {
    return useQuery({
        queryKey: ['skills'],
        queryFn: portfolioApi.getSkills,
        staleTime: 1000 * 60 * 10,
    });
}

export function useExperience() {
    return useQuery({
        queryKey: ['experience'],
        queryFn: portfolioApi.getExperience,
        staleTime: 1000 * 60 * 10,
    });
}

export function useCertificates() {
    return useQuery({
        queryKey: ['certificates'],
        queryFn: portfolioApi.getCertificates,
        staleTime: 1000 * 60 * 10,
    });
}

export function useStats() {
    return useQuery({
        queryKey: ['stats'],
        queryFn: portfolioApi.getStats,
        staleTime: 1000 * 60 * 5,
    });
}

export function useContactSubmit() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData: ContactFormData) => portfolioApi.submitContact(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contact'] });
        },
    });
}
