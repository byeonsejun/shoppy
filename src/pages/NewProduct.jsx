import React, { useState } from 'react';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';
import useProducts from '../hooks/useProducts';

import styles from './css/NewProduct.module.css';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const [categorys] = useState(['OUTER', 'DENIM', 'SHOES']);

  const { addProduct } = useProducts();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess('성공적으로 제품이 추가되었습니다.');
              setProduct({});
              e.target.reset();
              setTimeout(() => setSuccess(null), 4000);
            },
          }
        );
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <section className={styles.newProductSection}>
      <h2>새로운 제품 등록</h2>
      {success && <p className={styles.success}>✅ {success}</p>}
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="file" accept="image/*" name="file" required onChange={handleChange} />
        <input
          type="text"
          name="title"
          value={product.title ?? ''}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ''}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <select
          className={styles.category}
          name="category"
          // value={product.category ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        >
          <option value="">카테고리 선택</option>
          {categorys.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="description"
          value={product.description ?? ''}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ''}
          placeholder="옵션들(콤마(,)로 구분)"
          required
          onChange={handleChange}
        />
        <Button text={isUploading ? '업로드중...' : '제품 등록하기'} disabled={isUploading} />
      </form>
    </section>
  );
}
