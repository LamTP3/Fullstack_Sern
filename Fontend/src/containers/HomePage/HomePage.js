import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/Header/HomeHeader";
import Specialty from "./Section/Section";
import About from "./Section/About";
import HomeFooter from "./Footer/HomeFooter";
import IMG1 from "../../assets/specialty/img1.png";
import IMG2 from "../../assets/medical-facility/img2.jpg";
import IMG3 from "../../assets/doctor/avatar.png";
import IMG4 from "../../assets/handbook/img4.jpeg";
import "./HomePage.scss";
import * as action from "../../store/actions";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }

  data1 = [
    { id: 1, name: "Cơ xương khớp 1" },
    { id: 2, name: "Cơ xương khớp 2" },
    { id: 3, name: "Cơ xương khớp 3" },
    { id: 4, name: "Cơ xương khớp 4" },
    { id: 5, name: "Cơ xương khớp 5" },
    { id: 6, name: "Cơ xương khớp 6" },
  ];
  data2 = [
    { id: 1, name: "Bệnh viện Thu Cúc 1" },
    { id: 2, name: "Bệnh viện Thu Cúc 2" },
    { id: 3, name: "Bệnh viện Thu Cúc 3" },
    { id: 4, name: "Bệnh viện Thu Cúc 4" },
    { id: 5, name: "Bệnh viện Thu Cúc 5" },
    { id: 6, name: "Bệnh viện Thu Cúc 6" },
  ];
  data3 = [
    { id: 1, name: "Bác sĩ Trang 1", specialty: "Cơ Xương Khớp 1" },
    { id: 2, name: "Bác sĩ Trang 2", specialty: "Cơ Xương Khớp 2" },
    { id: 3, name: "Bác sĩ Trang 3", specialty: "Cơ Xương Khớp 3" },
    { id: 4, name: "Bác sĩ Trang 4", specialty: "Cơ Xương Khớp 4" },
    { id: 5, name: "Bác sĩ Trang 5", specialty: "Cơ Xương Khớp 5" },
    { id: 6, name: "Bác sĩ Trang 6", specialty: "Cơ Xương Khớp 6" },
  ];
  data4 = [
    { id: 1, name: "Cẩm Nang 1" },
    { id: 2, name: "Cẩm Nang 2" },
    { id: 3, name: "Cẩm Nang 3" },
    { id: 4, name: "Cẩm Nang 4" },
    { id: 5, name: "Cẩm Nang 5" },
    { id: 6, name: "Cẩm Nang 6" },
  ];

  componentDidMount() {
    this.props.loadTopDoctor();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctor !== this.props.topDoctor) {
      this.setState({
        arrDoctor: this.props.topDoctor,
      });
    }
  }
  render() {
    let test = this?.state?.arrDoctor;
    test = test.concat(test).concat(test);
    return (
      <>
        <HomeHeader />
        <Specialty
          title="Chuyên khoa phổ biến"
          bg_Color="#eee"
          image={IMG1}
          data={this.data1}
        />
        <Specialty
          title="Cơ sở y tế nổi bật"
          bg_Color="#eee"
          image={IMG2}
          data={this.data2}
        />
        <Specialty
          title="Bác sĩ nổi bật tuần qua"
          bg_Color="#eee"
          // bg_Color="#f5f5f5"
          image={IMG3}
          data={test}
          img_width="120px"
          img_height="120px"
          img_radius="50%"
          doctor={true}
        />
        <Specialty
          title="Cẩm Nang"
          bg_Color="#eee"
          // bg_Color="#f5f5f5"
          image={IMG4}
          data={this.data4}
        />
        <About />
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctor: state.admin.topDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(action.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
