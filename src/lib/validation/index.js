import * as yup from 'yup';

export const ticketsSchema = yup.object().shape({
    ticketTypes: yup.array().of(
        yup.object().shape({
            isFree: yup.boolean().default(false),
            ticketTypeName: yup.string().required('Vui lòng nhập tên loại vé'),
            ticketTypePrice: yup.number().min(0, 'Invalid ticket price').required('Please input ticket price'),
            ticketImage: yup.string().required('Please select ticket image'),
            ticketColor: yup.string().required('Please select ticket color'),
            minPerOrder: yup
                .number()
                .positive('Invalid minimum ticket number')
                .required('Invalid minimum ticket number')
                .test(
                    'min-max-validation',
                    'Minimun number of ticket can not greater than maximum number ticket',
                    function (value) {
                        const maxPerOrder = this.parent.maxPerOrder;
                        return value <= maxPerOrder;
                    },
                ),
            maxPerOrder: yup
                .number()
                .positive('Invalid maximum ticket number')
                .required('Invalid maximum ticket number'),
            ticketInfomation: yup.string().nullable(),
        }),
    ),
});
export const showtimesSchema = yup.object().shape({
    showtimes: yup
        .array()
        .of(
            yup.object().shape({
                startAt: yup.date().min(new Date(), 'Invalid start date').required('Please select start date'),

                endAt: yup
                    .date()
                    .min(new Date())
                    .required('Please select end date')
                    .test('min-max-validation', 'End date must be later than start date', function (value) {
                        const showTimeEndTime = this.parent.startAt;
                        return value >= showTimeEndTime;
                    }),

                startSaleTicketDate: yup.date().min(new Date()).required('Please select start sale ticket date'),
                endSaleTicketDate: yup
                    .date()
                    .required('Please select end sale ticket date')
                    .test('min-max-validation', 'End sale ticket date must be later than start date', function (value) {
                        const ticketSaleEndTime = this.parent.startSaleTicketDate;
                        return value >= ticketSaleEndTime;
                    }),
            }),
        )
        .min(1, 'At least one showtime exists'),
});
export const editShowtimesSchema = yup.object().shape({
    showtimes: yup.array().of(
        yup.object().shape({
            startAt: yup.date().min(new Date(), 'Invalid start date').required('Please select start date'),

            endAt: yup
                .date()
                .min(new Date())
                .required('Please select end date')
                .test('min-max-validation', 'End date must be later than start date', function (value) {
                    const showTimeEndTime = this.parent.startAt;
                    return value >= showTimeEndTime;
                }),

            startSaleTicketDate: yup.date().required('Please select start sale ticket date'),
            endSaleTicketDate: yup
                .date()
                .required('Please select end sale ticket date')
                .test('min-max-validation', 'End sale ticket date must be later than start date', function (value) {
                    const ticketSaleEndTime = this.parent.startSaleTicketDate;
                    return value >= ticketSaleEndTime;
                }),
        }),
    ),
});

export const organizerSchema = yup.object().shape({
    email: yup.string().email().required('Please input organizer email'),
    organizerName: yup.string().required('Please input organizer name'),
    businessType: yup.string().required('Please select business type'),
    taxCode: yup.string().required('Please select tax code'),
    logoImage: yup.string().required('Please pick organizer image'),
    phoneNumber: yup.number().required('Please input organizer phone number'),
    provinceCode: yup.number().required(),
    districtCode: yup.number().required(),
    wardCode: yup.number().required(),
    province: yup.string().required('Please select organizer province'),
    district: yup.string().required('Plase select organizer district'),
    ward: yup.string().required('Please select organizer ward'),
    displacePlace: yup.string().required('Please input organizer location'),
    description: yup.string().required('Please input organizer description'),
});
