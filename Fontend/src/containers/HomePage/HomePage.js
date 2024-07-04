import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/Header/HomeHeader";
import Specialty from "./Section/Section";
import About from "./Section/About";
import HomeFooter from "./Footer/HomeFooter";
import "./HomePage.scss";
import * as action from "../../store/actions";
import { injectIntl } from "react-intl";
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
    const { intl } = this.props;
    return (
      <>
        <HomeHeader showBanner={true} />
        <Specialty
          title="Chuyên khoa phổ biến"
          bg_Color="#eee"
          data={this.data1}
        />
        <Specialty
          title="Cơ sở y tế nổi bật"
          bg_Color="#eee"
          data={this.data2}
        />
        <Specialty
          title={intl.formatMessage({
            id: "homepage.outstanding-doctor",
          })}
          bg_Color="#eee"
          data={this.state.arrDoctor}
          doctor={true}
          urlNavigate="detail-doctor"
        />
        <Specialty title="Cẩm Nang" bg_Color="#eee" data={this.data4} />
        <About />
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    topDoctor: state.admin.topDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(action.fetchTopDoctor()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(HomePage));
