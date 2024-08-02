import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import style from './imageSlider.module.css';
import { BsArrowBarLeft, BsArrowBarRight, BsArrowLeftCircleFill, BsArrowRightCircleFill, BsCCircleFill, BsCircleFill } from 'react-icons/bs';

export default function ImageSlider() {
  const router = useRouter();
  const { url, limit } = router.query;

  const [images, setImg] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImage(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=1&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImg(data);
        setLoading(false);
      }
    } catch (e: any) {
      setErrorMsg(e.message);
      setLoading(false);
    }
  }

  function buttonClick(index){
    setCurrentSlide(index)
  }

  function leftClick() {
    if (currentSlide === 0) {

    } else {
        setCurrentSlide(currentSlide-1)
    }
  }

  function rightClick() {
    if (currentSlide === images.length-1){

    } else {
        setCurrentSlide(currentSlide+1)
    }
  }



  useEffect(() => {
    if (url) {
      fetchImage(url);
    }
  }, [url]);

  console.log(images);

  if (loading) {
    return <div>Loading Data, Please wait!</div>;
  }

  if (errorMsg) {
    return <div>Error occurred! {errorMsg}</div>;
  }

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Image slider</h1>
      <div id={style.background}>
      <div id={style.directImage}>
        <BsArrowLeftCircleFill onClick={()=>leftClick()} style={{width:"25px", height:"25px", marginTop:"auto", marginBottom:"auto"}}/>
        {images && images.length
          ? images.map((imageItem, index) => (
              index == currentSlide ? 
              
              <img
                key={imageItem.id}
                alt={imageItem.download_url}
                src={imageItem.download_url}
                id={style.imageItem}
              />
              
              : null

            ))
          : null}
        <BsArrowRightCircleFill onClick={()=>rightClick()} style={{width:"25px", height:"25px", marginTop:"auto", marginBottom:"auto"}}/>
        </div>
        <div id={style.clickables}>
        {images && images.length
          ? images.map((imageItem, index) => (
                index === currentSlide ? 
                <BsCircleFill
                onClick={()=>{
                    buttonClick(index)
                }}
                style={{width:"25px", height:"25px", color:"blue"}}
                />
                :
                <BsCircleFill
                onClick={()=>{
                    buttonClick(index)
                }}
                style={{width:"25px", height:"25px"}}
                />
            ))
          :
          null
        }
        </div>
      </div>
    </div>
  );
}
