import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
    const { course } = useContext(Context)
    const pagesCount = Math.ceil(course.totalCount / course.limit)
    const pages = []

    for (let i = 0; i < pagesCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-5">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={course.page === page}
                    onClick={() => course.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;