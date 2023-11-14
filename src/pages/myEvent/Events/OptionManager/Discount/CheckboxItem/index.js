import { useRef, useState } from 'react';

function CheckboxItem({ data, checkAllRef, setCheckedAll, countCheck, setCountCheck }) {
    const [quantity, setQuantity] = useState(data.quantity);
    const [checked, setChecked] = useState(false);
    const ref = useRef();
    // if (!checkedAll) {
    //     ref.current.checked = false;
    // }
    return (
        <div className="container p-0">
            <div className="d-flex align-items-center">
                <input
                    ref={ref}
                    checked={checkAllRef || checked}
                    onChange={(e) => {
                        setChecked(e.target.checked);
                        e.target.checked === true
                            ? setCountCheck((prev) => prev + 1)
                            : setCountCheck((prev) => prev - 1);
                    }}
                    className="box-type"
                    type="checkbox"
                />
                <label style={{ marginLeft: 4 }}>{data.ticketName}</label>
            </div>
            {checked && !checkAllRef && (
                <div>
                    <span style={{ marginRight: 8 }}>Quantity</span>
                    <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
            )}
        </div>
    );
}

export default CheckboxItem;
