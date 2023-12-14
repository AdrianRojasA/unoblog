
import React from 'react'
import Card from '../card/Card'
import Pagination from '../pagination/Pagination'

import styles from './CardList.module.css'
import { getPosts } from 'lib/data';

interface CardListProps {
    cat: string;
    page: number;
    limit: number;
}

const CardList = async ({ page, cat, limit }: CardListProps) => {
    const res = await getPosts({ page, cat, limit })
    if(!res) return null;
    const {
        posts,
        pagination: {
            currentPage,
            hasPrev,
            hasNext
        }
    } = res;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Recent Posts</h1>
            <div className={styles.posts}>
                {posts.map((post) => (
                    <Card post={post} key={post.id} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                hasPrev={hasPrev}
                hasNext={hasNext}
            />
        </div>
    );
}

export default CardList