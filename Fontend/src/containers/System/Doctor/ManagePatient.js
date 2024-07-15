import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "../../../components/Input/DatePicker";
import "./ManagePatient.scss";
import { getListPatientForDoctor } from "../../../services/userService";
import moment from "moment";
// import { toast } from "react-toastify";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf(`day`).valueOf(),
      dataPatient: {},
    };
  }
  async componentDidMount() {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatDate = new Date(currentDate).getTime();
    this.getDataPatient(user, formatDate);
  }

  getDataPatient = async (user, formatDate) => {
    let res = await getListPatientForDoctor({
      doctorId: user.id,
      date: formatDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prveState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatDate);
      }
    );
  };

  handleBtnConfirm = () => {};
  handleBtnRemedy = () => {};
  render() {
    let { dataPatient } = this.state;
    return (
      <>
        <div className="manage-patient-container">
          <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
          <div className="manage-patient-body">
            <div className="row">
              <div className="col-6 form-group">
                <label>Chọn ngày khám</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                {dataPatient && dataPatient.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Thời gian</th>
                        <th>Tên Người Đặt Lịch</th>
                        <th>Địa Chỉ</th>
                        <th>Số Điện Thoại</th>
                        <th>Giới Tính</th>
                        <th>Đặt Cho Ai</th>
                        <th>Triệu Chứng</th>
                        <th>Hành Động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataPatient.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.timeTypeDataPatient.valueVi}</td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.address}</td>
                            <td>{item.patientData.phonenumber}</td>
                            <td>{item.patientData.genderData.valueVi}</td>
                            <td>{item.patientData.patient}</td>
                            <td>{item.patientData.reason}</td>
                            <td>
                              <button
                                className="mp-btn-confirm"
                                onClick={() => this.handleBtnConfirm()}
                              >
                                Xác nhận
                              </button>
                              <button
                                className="mp-btn-remedy"
                                onClick={() => this.handleBtnRemedy()}
                              >
                                Gửi hóa đơn
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="not-found">
                    <div className="not-found-text">No Booking Found</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
