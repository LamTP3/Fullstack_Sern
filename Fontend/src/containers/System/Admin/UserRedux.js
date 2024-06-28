import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
// import { getAllCodeService } from "../../../services/userService";
import { LANGUAGE } from "../../../utils/constant";
import * as action from "../../../store/actions";
import "./UserRedux.scss";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      previewImgURL: "",
      isOpen: false,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
    this.props.getPositionStart();
    // try {
    //   let res = await getAllCodeService("gender");
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.genderRedux !== this.props.genderRedux) {
  //     this.setState({
  //       genderArr: this.props.genderRedux,
  //     });
  //   }
  // }
  handleOnChangeImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      let obeject = URL.createObjectURL(file);
      this.setState({
        previewImgURL: obeject,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  render() {
    // let gender = this?.state?.genderArr;
    let language = this.props.language;
    let gender = this?.props?.genderRedux;
    // let { isLoadingGender } = this.props;
    // console.log(this.props.isLoadingGender);
    const { roleRedux, positionRedux } = this.props;
    // console.log(`check role: ${roleRedux} and position: ${positionRedux}`);

    return (
      <div className="user-redux-container">
        <div className="title ">User Redux Page</div>
        {/* <div>{isLoadingGender ? "" : "Loading..."} </div> */}
        <div className="user-redux-body">
          <div className="container">
            <form>
              <div className="row mt-3">
                <div className="form-group col-md-6">
                  <label>
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    autoComplete="new-email"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-6">
                  <label>
                    <FormattedMessage id="manage-user.firstName" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>
                    <FormattedMessage id="manage-user.lastName" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-6 ">
                  <label>
                    <FormattedMessage id="manage-user.phone" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                  />
                </div>
                <div className="form-group col-md-6 ">
                  <label>
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-6 ">
                  <label>
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select className="form-control" defaultValue={"Choose..."}>
                    {positionRedux &&
                      positionRedux.length > 0 &&
                      positionRedux.map((item) => {
                        return (
                          <option key={item.key} value={item.keyMap}>
                            {language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group col-md-6 ">
                  <label>
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select className="form-control" defaultValue={"Choose..."}>
                    {gender &&
                      gender.length > 0 &&
                      gender.map((item) => {
                        return (
                          <option key={item.key} value={item.keyMap}>
                            {language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-6 ">
                  <label>
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select className="form-control" defaultValue={"Choose..."}>
                    {roleRedux &&
                      roleRedux.length > 0 &&
                      roleRedux.map((item) => {
                        return (
                          <option key={item.key} value={item.keyMap}>
                            {language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group col-md-6 ">
                  <label>
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div className="preview-image-container">
                    <input
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(e) => this.handleOnChangeImage(e)}
                    />
                    <label htmlFor="previewImg" className="label-upload">
                      Tải ảnh lên <i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      style={{
                        backgroundImage: `url(${this.state.previewImgURL})`,
                      }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
                  </div>
                  {/* <input type="file" className="form-control" /> */}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                <FormattedMessage id="manage-user.save" />
              </button>
            </form>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            // nextSrc={images[(photoIndex + 1) % images.length]}
            // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            // onMovePrevRequest={() =>
            //   this.setState({
            //     photoIndex: (photoIndex + images.length - 1) % images.length,
            //   })
            // }
            // onMoveNextRequest={() =>
            //   this.setState({
            //     photoIndex: (photoIndex + 1) % images.length,
            //   })
            // }
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.gender,
    roleRedux: state.admin.role,
    positionRedux: state.admin.position,
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(action.fetchGenderStart()),
    getRoleStart: () => dispatch(action.fetchRoleStart()),
    getPositionStart: () => dispatch(action.fetchPositionStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
