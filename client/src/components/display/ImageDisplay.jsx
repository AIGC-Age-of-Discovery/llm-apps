import { Carousel } from 'antd';
import {useEffect, useState} from 'react'
import {awkward_1,awkward_2,awkward_3,
    coquetry_1,
    coquetry_2,
    dislike_1,
    dislike_2,
    happy_1,
    happy_2,
    happy_3,
    like_1,
    like_2,
    like_3,
    mad_1,
    mad_2,
    mad_3,
    sad_1,
    sad_2,
    sad_3,
    threaten_1,switchEffect} from '../../assets'

// 动态渲染数量
const petData={
    "Happy":[happy_1,
        happy_2,
        happy_3,],
    "Threaten":[threaten_1], 
    "Sad": [sad_1,
        sad_2,
        sad_3,],
     "Dislike":[dislike_1,
        dislike_2,],
    "Coquetry":[ coquetry_1,
        coquetry_2,], 
    "Mad":[ mad_1,
        mad_2,
        mad_3,],
    "Awkward":[awkward_1,awkward_2,awkward_3],
    "Like":[like_1,
        like_2,
        like_3,]
};
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
  }


const ImageDisplay = ({emoType}) => {
    const [loading, setLoading] = useState(true);
    const [showB, setShowB] = useState(true); 
    useEffect(()=>(
        clearTimeout(tempTimer)
        
    ),[])
    const tempTimer=setTimeout(() => {
        setLoading(false);
    }, 800) 
    return (
  <Carousel effect="fade">
    <div>
      <h3 className="w-full h-auto object-cover rounded-xl">
        {/* <img src={awkward_1} alt="图片" className=" w-full h-auto object-cover rounded-xl" /> */}
           当前状态: {emoType}
          
          {/* 遍历出所有的表情 */}
        {/* {petData[emoType]?.map((item)=>(
            <img key='1' src={item} alt="图片" className=" w-full h-auto object-cover rounded-xl" />
        ))} */}

            
            
            
            {/* 随机显示出一种表情 */}
            {loading ? <img key='2' src={switchEffect} alt="图片" className=" w-full h-auto object-cover rounded-xl" /> :
            <img key='1' src={petData[emoType][getRandomIntInclusive(0,petData[emoType].length-1)]} alt="图片" className=" w-full h-auto object-cover rounded-xl" />
            }
             
             
      </h3>
    </div>
    {/* <div>
      <h3 className="w-full h-auto object-cover rounded-xl">
        <img src={awkward_2} alt="图片" className=" w-full h-auto object-cover rounded-xl" />
          
      </h3>
    </div>
    <div>
      <h3 className="w-full h-auto object-cover rounded-xl">
        <img src={awkward_3} alt="图片" className=" w-full h-auto object-cover rounded-xl" />
          
      </h3>
    </div> */}
    
    </Carousel>
    )
};
export default ImageDisplay;
