import * as yup from 'yup';

export const ticketsSchema = yup.object().shape({
    ticketTypes: yup.array().of(
        yup.object().shape({
            isFree: yup.boolean().required(),
            ticketTypeName: yup.string().required('Vui lòng nhập tên loại vé'),
            ticketTypePrice: yup.number().min(0, 'Giá vé không hợp lệ').required('Vui lòng nhập giá vé'),
            ticketImage: yup.string().required('Vui lòng chọn ảnh vé'),
            ticketColor: yup.string().required('Vui lòng chọn màu loại vé'),
            minPerOrder: yup
                .number()
                .positive('Số vé tối thiểu không hợp lệ')
                .required('Vui lòng nhập số vé tối thiểu')
                .test('min-max-validation', 'Số vé tối thiểu phải nhỏ hơn hoặc bằng số vé tối đa', function (value) {
                    const maxPerOrder = this.parent.maxPerOrder;
                    return value <= maxPerOrder;
                }),
            maxPerOrder: yup.number().positive('Số vé tối đa không hợp lệ').required('Vui lòng nhập số vé tối đa'),
            ticketInfomation: yup.string().nullable(),
        }),
    ),
});
export const showtimesSchema = yup.object().shape({
    showtimes: yup.array().of(
        yup.object().shape({
            startAt: yup
                .date()
                .min(new Date(), 'Ngày bắt đầu không được sớm hơn hôm nay')
                .required('Vui lòng nhập chọn ngày bắt đầu'),

            endAt: yup
                .date()
                .min(new Date())
                .required('Vui lòng nhập chọn ngày kết thúc')
                .test('min-max-validation', 'Ngày kết thúc phải trễ hơn ngày bắt đầu', function (value) {
                    const showTimeEndTime = this.parent.startAt;
                    return value >= showTimeEndTime;
                }),

            startSaleTicketDate: yup.date().min(new Date()).required('Vui lòng nhập ngày mở bán vé'),
            endSaleTicketDate: yup.date().min(new Date()).required('Vui lòng nhập ngày kết thúc bán vé'),
        }),
    ),
});
