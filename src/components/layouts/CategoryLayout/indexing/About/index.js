import styles from './About.module.scss';
import classNames from 'classnames/bind';
function About({ data }) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <div dangerouslySetInnerHTML={{ __html: data }}></div>
        </div>
    );
}

export default About;
