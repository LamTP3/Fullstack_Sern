import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
// import Select from "react-select";
import { LANGUAGE } from "../../../utils/constant";
import moment from "moment";
// mặc định thư viện moment luôn dùng tiếng anh
// tuy nhiên ta khai báo localization để
// thư viện hiểu file này dùng tiếng việt
import "moment/locale/vi";
import { getScheduleDoctorByDateService } from "../../../services/userService";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
    };
  }
  async componentDidMount() {
    let { lang } = this.props;
    this.setArrDays(lang);
  }

  setArrDays = async (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGE.VI) {
        let firstLetter = moment(new Date())
          .add(i, "days")
          .format("dddd - DD/MM")
          .charAt(0)
          .toUpperCase();
        object.label =
          firstLetter +
          moment(new Date()).add(i, "days").format("dddd - DD/MM").slice(1);
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale(`en`)
          .format("ddd - DD/MM");
      }
      // dùng startOf để lấy date là (2024-07-09 00:00:00)
      // ta không lấy thới gian  00:00:00 vì database ta không lưu
      object.value = moment(new Date()).add(i, "days").startOf(`day`).valueOf();
      arrDate.push(object);
    }

    this.setState({
      allDays: arrDate,
    });
  };

  handleOnChangeSelect = async (event) => {
    let id = this.props?.detailDoctor?.id;
    let date = event.target.value;
    let res = await getScheduleDoctorByDateService(id, date);
    console.log(`Check: `, res.data);
    if (res && res.errCode === 0) {
      this.setState({
        allAvailableTime: res?.data ? res?.data : [],
      });
    }
  };

  componentDidUpdate(prevProps, prveState, snapshot) {
    if (this.props.lang !== prevProps.lang) {
      this.setArrDays(this.props.lang);
    }
  }
  render() {
    let { allDays, allAvailableTime } = this.state;
    let { lang } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-clendar">
              <i className="fas fa-calendar-alt">
                <span> Lịch khám </span>
              </i>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                allAvailableTime.map((item, index) => {
                  let timeDisplay =
                    lang === LANGUAGE.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn;

                  return <button key={index}>{timeDisplay}</button>;
                })
              ) : (
                <div>Không có lịch hẹn trong khoảng thời gian này</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
