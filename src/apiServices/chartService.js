import { request } from '../utils/request';

export async function getChartValidateStatus(chartKey) {
    try {
        console.log(chartKey);
        if (chartKey == '') return { status: 400 };
        const validateChart = await request.post(`api/chart/validate`, {
            chartKey,
        });
        const res = {
            status: 200,
            ...validateChart.data,
        };
        console.log(JSON.stringify(res));
        return res;
    } catch (error) {
        console.log(error);
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

            resolve({ ...newChart.data });
        } catch (error) {
            console.log(JSON.stringify(error));
            resolve({ ...error, status: 'error' });
        }
    });
}
export async function getCategories(chartKey) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(chartKey);
            const { data } = await request
                .post(`api/chart/categories`, {
                    chartKey,
                })
                .catch((error) => {
                    console.log(error);
                    throw Error(error);
                });
            console.log(JSON.stringify(data));

            resolve(data);
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    });
}
