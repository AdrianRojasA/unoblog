import Image from "next/image";

import styles from "./SinglePage.module.css";
import { getSinglePost } from "lib/data";
import Menu from "~/components/menu/Menu";
import { Suspense } from "react";
import Loading from "~/loading";

interface SinglePageProps {
  params: {
    slug: string;
  };
}

const SinglePage = async ({ params: { slug } }: SinglePageProps) => {
  const post = await getSinglePost(slug);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
        <Suspense fallback={<Loading />}>
          <h1 className={styles.title}>{post?.title}</h1>
          <div className={styles.user}>
            {post?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={post?.user?.image} alt="" fill className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{post?.user?.name}</span>
              <span className={styles.date}>
                {post?.createdAt && new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </Suspense>
        </div>
        {post?.img && (
          <div className={styles.imageContainer}>
            <Image src={post.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: post?.desc ?? '' }}
          />
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
