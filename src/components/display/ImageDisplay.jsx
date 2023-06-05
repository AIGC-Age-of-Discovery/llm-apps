import { Carousel } from 'antd';


const ImageDisplay = ({imageArray}) => (
  <Carousel effect="fade">
    <div>
      <h3 className="w-full h-auto object-cover rounded-xl">
        <img src="https://www.homevet.com.hk/wp-content/uploads/shutterstock_118058197.jpg" alt="图片" className=" w-full h-auto object-cover rounded-xl" />
          
      </h3>
    </div>
    <div>
      <h3 className="w-full h-auto object-cover rounded-xl">
        <img src="https://www.homevet.com.hk/wp-content/uploads/shutterstock_118058197.jpg" alt="图片" className=" w-full h-auto object-cover rounded-xl" />
          
      </h3>
    </div>
    <div>
      <h3 className="w-full h-auto object-cover rounded-xl">
        <img src="https://www.homevet.com.hk/wp-content/uploads/shutterstock_118058197.jpg" alt="图片" className=" w-full h-auto object-cover rounded-xl" />
          
      </h3>
    </div>
    
  </Carousel>
);
export default ImageDisplay;