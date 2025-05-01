import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({ images }) => {
  const settings = {
    arrows: images.length > 1,
    dots: images.length > 1,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  return (
    <div className="w-full mb-4">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="aspect-w-16 aspect-h-9">
            <img
              src={typeof image === 'string' ? image : URL.createObjectURL(image)}
              alt={`Image ${index + 1}`}
              className="object-cover w-full h-64 rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;