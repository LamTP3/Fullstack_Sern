import React, { Component } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Section.scss";
import { LANGUAGE } from "../../../utils/constant";
import { FormattedMessage } from "react-intl";

class Section extends Component {
  render() {
    const { bg_Color, title, data, img_width, img_height, img_radius } =
      this.props;

    let settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    let { language } = this.props;
    return (
      <>
        <div className="section-section" style={{ background: bg_Color }}>
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">{title}</span>
              <button className="btn-section">
                <FormattedMessage id={"homepage.more"} />
              </button>
            </div>
            <div className="section-body">
              <Slider {...settings}>
                {data?.map((item) => {
                  let nameVi = `${item.positionData?.valueVi}, ${item.firstName} ${item.lastName}`;
                  let nameEN = `${item.positionData?.valueEn}, ${item.firstName} ${item.lastName}`;
                  let imageBase64;
                  if (item.image) {
                    imageBase64 = Buffer.from(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div key={item.id} className="section-customie">
                      <div className="outer_bg">
                        <div
                          className="bg-image"
                          style={{
                            backgroundImage: imageBase64
                              ? `url(${imageBase64})`
                              : "",
                            width: img_width,
                            height: img_height,
                            borderRadius: img_radius,
                          }}
                        />
                      </div>
                      <div className="position text-center">
                        {/* {this.props.doctor && (
                          <div>
                            {language === LANGUAGE.VI ? nameVi : nameEN}
                          </div>
                        )                    
                        } */}
                        {this.props.doctor ? (
                          <div>
                            {language === LANGUAGE.VI ? nameVi : nameEN}
                          </div>
                        ) : (
                          <>
                            <div>{item.name}</div>
                            <div>{item.specialty}</div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
