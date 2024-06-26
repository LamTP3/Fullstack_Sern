import React, { Component } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Section.scss";

class Specialty extends Component {
  render() {
    const { bg_Color, title, data, image, img_width, img_height, img_radius } =
      this.props;

    let settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };

    return (
      <>
        <div className="section-section" style={{ background: bg_Color }}>
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">{title}</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...settings}>
                {data?.map((item) => (
                  <div key={item.id} className="section-customie">
                    <div className="outer_bg">
                      <div
                        className="bg-image"
                        style={{
                          backgroundImage: image ? `url(${image})` : "",
                          width: img_width,
                          height: img_height,
                          borderRadius: img_radius,
                        }}
                      />
                    </div>
                    <div className="position text-center">
                      <div>{item.name}</div>
                      <div>{item.specialty}</div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
