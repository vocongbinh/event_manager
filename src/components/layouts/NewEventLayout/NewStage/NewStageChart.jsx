import React, { useState } from 'react';
import { SeatsioDesigner } from '@seatsio/seatsio-react';
import Button from '../../components/Button';
import style from './NewStageChart.module.scss';
import classNames from 'classnames/bind';
import {
    NewEventFormProvider,
    useNewEventFormContext,
    useNewEventStepContext,
} from '../../../../utils/newEventContext';
import { createNewDraftChart, getChartValidateStatus } from '../../../../apiServices/chartService';
import { Spinner } from 'react-bootstrap';
const NewStageChart = () => {
    const cx = classNames.bind(style);
    const eventFormContext = useNewEventFormContext();
    const eventStepContext = useNewEventStepContext();
    const [isValidating, setIsValidating] = useState(false);
    const handleClickNext = async () => {
        if (!eventFormContext.chart) return;
        setIsValidating(true);
        console.log(eventFormContext.chart);
        if (eventFormContext.isChartCreated == false) {
            await createNewDraftChart(eventFormContext.chart);
        }
        const validateChart = await getChartValidateStatus(eventFormContext.chart);
        if (validateChart && validateChart?.errors?.length == 0) {
            eventFormContext.setIsChartCreated(true);
            eventStepContext.handleGoStep(3);
        }
        setIsValidating(false);
    };
    const handleClickPrev = () => {
        eventStepContext.handleGoBack(1);
    };
    return (
        <div id="container" className={cx('container')}>
            <div id="chart"></div>
            <SeatsioDesigner
                divId="chart"
                chartKey={eventFormContext.chart}
                secretKey="03ead987-6752-49ab-8cf9-a97064b40388"
                region="oc"
                onChartCreated={(key) => {
                    eventFormContext.setChart(key);
                }}
                onChartPublished={() => {
                    console.log('chart public');
                }}
                onDesignerRenderingFailed={(a) => {
                    console.log('render fail');
                }}
                onExitRequested={() => {
                    console.log('exist requested');
                }}
                onChartUpdated={(key) => {
                    console.log('chart update' + key);
                }}
                onDesignerRendered={(designer) => {
                    console.log('on designer render' + designer);
                }}
                onRenderStarted={(chart) => {
                    console.log('on render start');
                }}
            />
            <div className={cx('action')}>
                <Button
                    type="primary"
                    onClick={() => {
                        handleClickPrev();
                    }}
                    className={cx('button')}
                    size="max"
                    background="blue"
                >
                    Go back
                </Button>
                {!isValidating ? (
                    <Button
                        type="primary"
                        onClick={handleClickNext}
                        className={cx('button')}
                        size="max"
                        background="blue"
                    >
                        Continue
                    </Button>
                ) : (
                    <Button type="primary" className={cx('button')} size="max" background="blue">
                        <Spinner />
                    </Button>
                )}{' '}
            </div>
        </div>
    );
};

export default NewStageChart;
