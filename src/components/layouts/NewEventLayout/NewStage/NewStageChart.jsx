import React, { useEffect, useState } from 'react';
import { SeatsioDesigner } from '@seatsio/seatsio-react';
import { useCreateNewDraft, useValidateChart } from '../../../../lib/react-query/useQueryAndMutation';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import style from './NewStageChart.module.scss';
import classNames from 'classnames/bind';
import { NewEventFormProvider } from '../../../../utils/newEventContext';

const NewStageChart = () => {
    const cx = classNames.bind(style);
    const [chartKey, setChartKey] = useState('');
    const navigate = useNavigate();
    const { mutateAsync: createNewDraftChart } = useCreateNewDraft();
    const { data } = useValidateChart(chartKey);
    const handleClick = () => {
        if (!chartKey) return;
        console.log(JSON.stringify(data));
        if (data?.status == 200) {
            toast.success('Thêm sân khấu thành công!');
            navigate('/newEvent');
        } else {
            toast.error('Thêm sân khấu không thành công!');
        }
    };
    return (
        <div className={cx('container')}>
            <SeatsioDesigner
                secretKey="03ead987-6752-49ab-8cf9-a97064b40388"
                region="oc"
                onChartCreated={(key) => {
                    setChartKey(key);

                    console.log('chart created' + key);
                }}
                onChartPublished={() => {
                    console.log('chart public');
                }}
            />
            <div className={cx('action')}>
                <Button
                    type="primary"
                    onClick={() => {
                        createNewDraftChart(chartKey);
                        handleClick();
                    }}
                    className={cx('button')}
                    size="max"
                    background="blue"
                >
                    Hoàn thành
                </Button>
            </div>
        </div>
    );
};

export default NewStageChart;
