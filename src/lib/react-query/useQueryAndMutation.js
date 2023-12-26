import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    addCategories,
    createNewDraftChart,
    getCategories,
    getChartValidateStatus,
} from '../../apiServices/chartService';
import { GET_CATEGORIES, GET_CHART_VALIDATE_STATUS, HOLD_TOKEN, POST_DRAFT_CHART } from './queryKey';
import { createHoldTickets, createHoldToken, createNewBooking } from '../../apiServices/bookingService';
import eventService from '../../apiServices/eventService';
import { getDistricts, getProvinces, getWards } from '../../apiServices/addressService';
import showtimeService from '../../apiServices/showtimeService';
import { getOrganizerProfile, updateOrganizer } from '../../apiServices/organizerService';
import { getDiscountOfEvent } from '../../apiServices/discountService';
// export const useValidateChart = (chartKey) => {
//     return useQuery({
//         queryKey: [GET_CHART_VALIDATE_STATUS],
//         queryFn: () => getChartValidateStatus(chartKey),
//     });
// };
export const useCreateNewDraft = () => {
    const queryClient = useQueryClient();
    return useMutation({
        // mutationKey: [POST_DRAFT_CHART, chartKey],
        mutationFn: (chartKey) => createNewDraftChart(chartKey),
        onSuccess: (data) => {
            console.log('invalid' + JSON.stringify(data));
            queryClient.invalidateQueries({
                queryKey: [GET_CHART_VALIDATE_STATUS],
            });
            queryClient.invalidateQueries({
                queryKey: [GET_CATEGORIES],
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
        mutationFn: ({ bookings, discounts, eventKey, holdToken, receiverInformation }) =>
            createNewBooking({ bookings, discounts, eventKey, holdToken, receiverInformation }),
    });
};

export const useHoldToken = () => {
    return useQuery({
        queryKey: [HOLD_TOKEN],
        queryFn: createHoldToken,
        enabled: false,
    });
};

export const useGetCategories = (chartKey) => {
    return useQuery({
        queryKey: [GET_CATEGORIES],
        queryFn: () => getCategories(chartKey),
    });
};
export const useGetProvince = () => {
    return useQuery({
        queryKey: ['provinces'],
        queryFn: () => getProvinces(),
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
};
export const useGetDistrict = (province) => {
    return useQuery({
        queryKey: ['districts'],
        queryFn: () => getDistricts(province),
        enabled: false,
    });
};

export const useGetWard = (district) => {
    return useQuery({
        queryKey: ['wards'],
        queryFn: () => getWards(district),
        enabled: false,
    });
};
export const useCreateEvent = () => {
    return useMutation({
        mutationFn: (data) => eventService.addNewEvent(data),
    });
};

export const useEditEvent = () => {
    return useMutation({
        mutationFn: (data) => eventService.editEvent(data),
    });
};

export const useGetShowtime = (showtimeId) => {
    return useQuery({
        queryKey: ['showtime', showtimeId],
        queryFn: () => showtimeService.getShowtime(showtimeId),
    });
};

export const useCreateNewBooking = () => {
    return useMutation({
        mutationFn: ({ tickets, discounts, eventKey, holdToken, receiverInformation }) =>
            createNewBooking({ tickets, discounts, eventKey, holdToken, receiverInformation }),
    });
};

export const useCreateOrganizer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (values) => updateOrganizer(values),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['organizer'],
            });
        },
    });
};

export const useGetOrganizer = () => {
    return useQuery({
        queryKey: ['organizer'],
        queryFn: getOrganizerProfile(),
    });
};

export const useGetDiscountOfEvent = (eventId) => {
    return useQuery({
        queryKey: ['DiscountOfEvent'],
        queryFn: () => getDiscountOfEvent(eventId),
    });
};
