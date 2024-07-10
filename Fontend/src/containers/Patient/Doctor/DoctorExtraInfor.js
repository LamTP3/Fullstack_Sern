import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowInfor: true,
    };
  }
  async componentDidMount() {}
  hanleShow = () => {
    this.setState({
      isShowInfor: !this.state.isShowInfor,
    });
  };
  async componentDidUpdate(prevProps, prveState, snapshot) {}
  render() {
    let { isShowInfor } = this.state;
    return (
      <>
        <div className="doctor-extra-infor-container">
          <div className="content-up">
            <div className="text-address">Địa Chỉ Khám</div>
            <div className="name-clinic">
              Phòng khám Hello Doctor cơ sở TP.HCM
            </div>
            <div className="detail-address">
              152/6 Thành Thái, phường 12, quận 10, TP.HCM
            </div>
          </div>
          <div className="content-down">
            {isShowInfor ? (
              <>
                <div className="title-price">GIÁ KHÁM: </div>
                <div className="detail-infor">
                  <div className="price">
                    <span className="left">Giá khám </span>
                    <span className="right">250.000 đ</span>
                  </div>
                  <div className="note">
                    Giá khám áp dụng cho bệnh nhân là người nước ngoài: 30 USD
                  </div>
                </div>
                <div className="payment">
                  Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt
                  và quẹt thẻ
                </div>
                <div className="hide-price">
                  <span onClick={() => this.hanleShow()}>Ẩn bảng giá</span>
                </div>
              </>
            ) : (
              <div onClick={() => this.hanleShow()} className="show-price">
                GIÁ KHÁM: 300.000đ <span>Xem chi tiết</span>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
