import { request } from '../utils/request';

export async function getChartValidateStatus(chartKey) {
    try {
        if (chartKey == '') throw Error('chart key empty');
        const validateChart = await request.post(`api/chart/validate`, {
            chartKey,
        });
        console.log(JSON.stringify(validateChart));
        return { status: validateChart?.status, error: validateChart?.errors };
    } catch (error) {
        console.log(JSON.stringify(error));
        return { status: error?.status, error: error?.errors };
    }
}
export async function createNewDraftChart(chartKey) {
    return new Promise(async (resolve, reject) => {
        try {
            const newChart = await request
                .post(`api/chart/newDraft`, {
                    chartKey,
                })
                .catch((error) => {
                    throw Error(error);
                });
            console.log(JSON.stringify(newChart));

            resolve({ ...newChart, status: 'ok' });
        } catch (error) {
            console.log(JSON.stringify(error));
            resolve({ ...error, status: 'error' });
        }
    });
}
