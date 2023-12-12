import classNames from 'classnames/bind';
import styles from './SearchLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import eventService from '../../../../apiServices/eventService';
import Tippy from '@tippyjs/react/headless';
import SearchItem from './SearchItem';
import { useDebounce } from '../../../../hooks';
function SearchLayout({ className }) {
    const cx = classNames.bind(styles);
    const [results, setResults] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
    const debounceValue = useDebounce(valueSearch, 500);
    useEffect(() => {
        console.log(debounceValue);
        if (!debounceValue.trim()) {
            setResults([]);
            return;
        }
        const fetchApi = async () => {
            const data = await eventService.searchEvent(debounceValue);
            console.log(data);
            setResults(data);
        };
        fetchApi();
    }, [debounceValue]);
    return (
        <Tippy
            visible={valueSearch.length > 0}
            onClickOutside={(ins) => ins.hide()}
            interactive
            render={(attrs) => (
                <div className={cx('tippy-wrapper')} tab {...attrs}>
                    {results.length > 0 && (
                        <div>
                            {results.map((result) => (
                                <SearchItem data={result} />
                            ))}
                            <Link className={cx('see-all-btn')} to={`/events/typeEvent?query=${valueSearch}`}>
                                See all results...
                            </Link>
                        </div>
                    )}
                </div>
            )}
        >
            <div
                className={cx('search', {
                    [className]: className,
                })}
            >
                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                <input
                    placeholder="Search"
                    value={valueSearch}
                    onChange={(e) => {
                        if (!e.target.value.startsWith(' ')) {
                            setValueSearch(e.target.value);
                        }
                    }}
                    className={cx('search-field')}
                />
                {valueSearch.length > 0 && (
                    <FontAwesomeIcon onClick={() => setValueSearch('')} icon={faClose} className={cx('close-icon')} />
                )}
            </div>
        </Tippy>
    );
}

export default SearchLayout;
