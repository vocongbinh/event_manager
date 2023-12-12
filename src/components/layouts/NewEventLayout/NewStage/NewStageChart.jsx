import React, { useEffect, useState } from 'react';
import { SeatsioDesigner } from '@seatsio/seatsio-react';
import { useCreateNewDraft, useValidateChart } from '../../../../lib/react-query/useQueryAndMutation';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import style from './NewStageChart.module.scss';
import classNames from 'classnames/bind';
import {
    NewEventFormProvider,
    useNewEventFormContext,
    useNewEventStepContext,
} from '../../../../utils/newEventContext';
const NewStageChart = () => {
    const cx = classNames.bind(style);
    const { mutateAsync: createNewDraftChart } = useCreateNewDraft();
    const eventFormContext = useNewEventFormContext();
    const [onClick, setOnClick] = useState(false);
    console.log(eventFormContext.chart);
    const eventStepContext = useNewEventStepContext();
    const { data, refetch } = useValidateChart(eventFormContext.chart);
    useEffect(() => {
        console.log('submit chart' + data?.errors?.length);
        if (data && data.status == 200 && data.errors?.length == 0) {
            console.log('success');
            eventStepContext.handleGoStep(3);
            eventFormContext.setIsChartCreated(true);
        }
    }, [data, onClick]);
    const handleClickNext = () => {
        if (!eventFormContext.chart) return;
        if (eventFormContext.isChartCreated == false) {
            createNewDraftChart(eventFormContext.chart);
        }
        refetch();
        setOnClick((onClick) => !onClick);
    };
    const handleClickPrev = () => {
        eventStepContext.handleGoStep(1);
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
                <Button
                    type="primary"
                    onClick={() => {
                        handleClickNext();
                    }}
                    className={cx('button')}
                    size="max"
                    background="blue"
                >
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default NewStageChart;
