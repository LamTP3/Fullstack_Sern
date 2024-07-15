import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/Header/HomeHeader";
import Specialty from "./Section/Section";
import About from "./Section/About";
import HomeFooter from "./Footer/HomeFooter";
import "./HomePage.scss";
import * as action from "../../store/actions";
import { injectIntl } from "react-intl";
import {
  getSpecialtySercie,
  getAllClinicSercie,
} from "../../services/userService";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
      arrSpecialty: [],
      arrClinic: [],
    };
  }

  // data4 = [
  //   { id: 1, name: "Cẩm Nang 1" },
  //   { id: 2, name: "Cẩm Nang 2" },
  //   { id: 3, name: "Cẩm Nang 3" },
  //   { id: 4, name: "Cẩm Nang 4" },
  //   { id: 5, name: "Cẩm Nang 5" },
  //   { id: 6, name: "Cẩm Nang 6" },
  // ];

  async componentDidMount() {
    this.props.loadTopDoctor();
    let resSpecialty = await getSpecialtySercie();
    if (resSpecialty && resSpecialty.errCode === 0) {
      this.setState({
        arrSpecialty: resSpecialty.data,
      });
    }
    let resClinic = await getAllClinicSercie();
    if (resClinic && resClinic.errCode === 0) {
      this.setState({
        arrClinic: resClinic.data,
      });
    }
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
          title={intl.formatMessage({
            id: "homepage.specialty-popular",
          })}
          bg_Color="#eee"
          urlNavigate="detail-specialty"
          data={this.state.arrSpecialty}
        />
        <Specialty
          title={intl.formatMessage({
            id: "homepage.outstanding-clinic",
          })}
          bg_Color="#eee"
          data={this.state.arrClinic}
          urlNavigate="detail-clinic"
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
        {/* <Specialty title="Cẩm Nang" bg_Color="#eee" data={this.data4} /> */}
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
