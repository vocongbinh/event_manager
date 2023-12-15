import Dashboard from '../indexes/Dashboard';
import Events from '../indexes/Events';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
function Sidebar({ options, selected, setSelected }) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            {options.map((option, index) => (
                <div
                    onClick={() => setSelected(option.index)}
                    className={cx('item', {
                        active: selected === option.index,
                    })}
                    key={index}
                >
                    {option.title}
                </div>
            ))}
        </div>
    );
}

export default Sidebar;
