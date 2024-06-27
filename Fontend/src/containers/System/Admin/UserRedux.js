import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGE } from "../../../utils/constant";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
    };
  }

  async componentDidMount() {
    try {
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
        this.setState({
          genderArr: res.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let gender = this?.state?.genderArr;
    let language = this.props.language;
    return (
      <div className="user-redux-container">
        <div className="title ">User Redux Page</div>
        <div className="user-redux-body">
          <div className="container">
            <form>
              <div className="row mt-3">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">
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
                  <label htmlFor="inputPassword4">
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
                  <label htmlFor="inputEmail4">
                    <FormattedMessage id="manage-user.firstName" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">
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
                  <label htmlFor="inputPhone">
                    <FormattedMessage id="manage-user.phone" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                  />
                </div>
                <div className="form-group col-md-6 ">
                  <label htmlFor="inputAddress">
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
                  <label htmlFor="inputState">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select className="form-control" defaultValue={"Choose..."}>
                    <option>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-group col-md-6 ">
                  <label htmlFor="inputState">
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
                  <label htmlFor="inputState">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select className="form-control" defaultValue={"Choose..."}>
                    <option>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label>
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Image"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                <FormattedMessage id="manage-user.save" />
              </button>
            </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
