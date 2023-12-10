import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createNewDraftChart, getChartValidateStatus } from '../../apiServices/chartService';
import { GET_CHART_VALIDATE_STATUS, HOLD_TOKEN, POST_DRAFT_CHART } from './queryKey';
import { createHoldTickets, createHoldToken, createPayTickets } from '../../apiServices/bookingService';
import { createPath } from 'react-router-dom';
export const useValidateChart = (chartKey) => {
    return useQuery({
        queryKey: [GET_CHART_VALIDATE_STATUS, chartKey],
        queryFn: () => getChartValidateStatus(chartKey),
    });
};
export const useCreateNewDraft = () => {
    const queryClient = useQueryClient();
    return useMutation({
        // mutationKey: [POST_DRAFT_CHART, chartKey],
        mutationFn: (chartKey) => createNewDraftChart(chartKey),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [GET_CHART_VALIDATE_STATUS],
            });
        },
    });
};
export const useHoldTickets = () => {
    return useMutation({
        mutationFn: ({ bookings, eventKey, holdToken }) =>
            createHoldTickets({ tickets: bookings, eventKey, holdToken }),
    });
};

export const usePayTickets = () => {
    return useMutation({
        mutationFn: ({ bookings, discounts, eventKey, holdToken }) =>
            createPayTickets({ bookings, discounts, eventKey, holdToken }),
    });
};

export const useHoldToken = () => {
    return useQuery({
        queryKey: [HOLD_TOKEN],
        queryFn: createHoldToken,
    });
};
