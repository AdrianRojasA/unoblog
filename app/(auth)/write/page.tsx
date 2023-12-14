/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";
import { type Category } from "@prisma/client";

import styles from "./writePage.module.css";
import "react-quill/dist/quill.bubble.css";
import { ExtendedPost, getCategories, uploadToCloudinary } from "lib/data";

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>();

  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const [file, setFile] = useState<File | null | undefined>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [catSlug, setCatSlug] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    getCategories().then(setCategoryList).catch(console.error);
  }, []);


  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: imagePreviewUrl,
        slug: slugify(title),
        catSlug: catSlug || "style", //If not selected, choose the general category
      }),
    });

    if (res.status === 200) {
      const data = await res.json() as ExtendedPost;
      router.push(`/posts/${data.slug}`);
    }
  };

  useEffect(() => {
    let isActive = true;

    const uploadFile = async () => {
      if (file) {
        try {
          const url = await uploadToCloudinary(file);
          if (url) {
            setImagePreviewUrl(url);
          }
          if (isActive) {
            setFile(null);
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };

    void uploadFile();

    return () => {
      isActive = false;
    };
  }, [file]);

  const uploadFile = () => {
    ref.current?.click();
  }

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <input
          type="text"
          placeholder="Title"
          className={styles.input}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className={styles.options}>
          <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)} >
            <option value="">Category</option>
            {categoryList.map((item) => (
              <option value={item.slug} key={item.id}>{item.title}</option>
            ))}
          </select>

          <button className={styles.publish} onClick={handleSubmit}>
            Publish
          </button>
        </div>
      </div>

      <div className={styles.uploadImageContainer}>
        <input
          ref={ref}
          id="image"
          type="file"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files ? e.target.files[0] : null;
            setFile(file);
          }}
          style={{ display: "none" }}
        />
        {imagePreviewUrl ? (
          <Image
            src={imagePreviewUrl}
            alt="Uploaded Image"
            width={1200}
            height={700}
            onClick={uploadFile}
            className={styles.imagePreview}
          />
        ) : (
          <Image
            src="/upload.svg"
            alt="Upload Image"
            width={1200}
            height={700}
            onClick={uploadFile}
            className={styles.uploadImageSvg}
          />
        )}
      </div>

      <div className={styles.editor}>
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Write here..."
        />
      </div>
    </div>
  );
};

export default WritePage;
