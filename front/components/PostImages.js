import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img src={images[0]/*.src.replace(/original\//, 'thumb/')*/} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <img src={images[0]/*.src.replace(/original\//, 'thumb/')*/} width="50%" onClick={onZoom} />
          <img src={images[0]/*.src.replace(/original\//, 'thumb/')*/} width="50%" onClick={onZoom} />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <img src={images[0]/*.src.replace(/original\//, 'thumb/')*/} width="50%" onClick={onZoom} />
        <div
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <Icon type="plus" />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;


//이 부분에 위 주석처리된 부분은 s3 버킷에 담겨진 포스트된 이미지를 lambda를 통해 이미지를 압축하고
//thumb라는 경로로 보냈다. 하지만, 둘 다 사용해본 결과 이미지압축을 통하여 렌더링 속도를 최적화 할 수 있었지만,
//ORIGINAL에서는 GIF파일이 업로드되는 반면 압축기술 사용시 GIF파일이 불가능하여 ORIGINAL을 그냥 사용하였다.