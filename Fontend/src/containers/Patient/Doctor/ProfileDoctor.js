import React, { Component } from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
import { getProfileDoctorService } from "../../../services/userService";
import "./ProfileDoctor.scss";
import { LANGUAGE } from "../../../utils/constant";
import NumberFormat from "react-number-format";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let id = this.props.doctorId;
    let data = await this.getInforDoctor(id);
    this.setState({
      dataProfile: data,
    });
  }

  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorService(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  async componentDidUpdate(prevProps, prveState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  render() {
    let { dataProfile } = this.state;
    let { language } = this.props;
    let nameVi = "";
    let nameEN = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData?.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
      nameEN = `${dataProfile.positionData?.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <>
        {" "}
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: dataProfile ? `url(${dataProfile.image})` : "",
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGE.EN ? nameEN : nameVi}
            </div>
            <div className="down">
              {dataProfile?.Markdown?.description && (
                <span>{dataProfile?.Markdown?.description}</span>
              )}
            </div>
          </div>
        </div>
        <div className="price">
          Giá khám:{" "}
          {dataProfile &&
          dataProfile.Doctor_Infor &&
          language === LANGUAGE.VI ? (
            <NumberFormat
              value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
              displayType={`text`}
              thousandSeparator={true}
              suffix={` VND`}
            />
          ) : (
            ""
          )}
          {dataProfile &&
          dataProfile.Doctor_Infor &&
          language === LANGUAGE.EN ? (
            <NumberFormat
              value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
              displayType={`text`}
              thousandSeparator={true}
              suffix={` USD`}
            />
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
