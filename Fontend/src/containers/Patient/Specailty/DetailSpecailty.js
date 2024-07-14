import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import "./DetailSpecailty.scss";
import ProfileDoctor from "../Doctor/ProfileDoctor";
class DetailSpecailty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [7, 8, 9],
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prveState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  render() {
    let { arrDoctorId } = this.state;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty"></div>
          <div>
            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div className="each-doctor" key={index}>
                    <div className="doctor-left">
                      <div className="profile-doctor">
                        <ProfileDoctor
                          doctorId={item}
                          isShowDescriptionDoctor={true}
                          // dataTime={dataTime}
                        />
                      </div>
                    </div>
                    <div className="doctor-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule currentDoctorId={item} />
                      </div>
                      <div className="doctor-extra-infor">
                        <DoctorExtraInfor currentDoctorId={item} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecailty);
