import React, { useContext } from 'react';
import { clientContext } from "../contexts/ClientContext"

const Pagination = () => {

    const { itemsPerPage, totalItems, changePage } = useContext(clientContext)
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <div>
            <ul style={{
                display: "flex",
                justifyContent: "center",
                paddingInlineStart: "0px"
            }}>
                {
                    pageNumber.map(item => (
                        <li
                            onClick={() => {
                                changePage(item)
                                window.scrollTo(0, 0)
                            }}
                            key={item}
                            style={{
                                listStyleType: "none",
                                margin: "0 10px",
                                cursor: "pointer"
                            }}
                        >
                            {item}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pagination;