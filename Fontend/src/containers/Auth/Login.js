import React, { Component } from "react";
import { connect } from "react-redux";
// import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
// import { FormattedMessage } from "react-intl";
import { handleLogin } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
    this.timer = null;
  }

  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  showHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await handleLogin(
        this.state.username,
        this.state.password
      );

      if (response && response.errCode !== 0) {
        this.setState({
          errMessage: response.message,
        });
      } else {
        this.props.userLoginSuccess(response.user);
      }
    } catch (e) {
      this.setState({
        errMessage: e.response?.data?.message || "An error occurred",
      });
    }
  };

  componentDidMount() {
    // create a timer to reset error message
    this.timer = setInterval(() => {
      this.setState({
        errMessage: "",
      });
      // console.log("Reset error message");
    }, 20000);
  }

  componentWillUnmount() {
    // clear the timer when the component is about to unmount
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <form className="login-content row" onSubmit={this.handleLogin}>
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group">
              <label>Username: </label>
              <input
                value={this.state.username}
                onChange={this.handleOnChangeUsername}
                type="text"
                className="form-control login-input"
                placeholder="Enter your username"
                autoComplete="on"
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password: </label>
              <div className="custom-input-password">
                <input
                  onChange={this.handleOnChangePassword}
                  value={this.state.password}
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control mt-2"
                  placeholder="Enter your password"
                  autoComplete="on"
                />
                <span onClick={this.showHidePassword}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye-slash"
                        : "far fa-eye"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button type="submit" className="btn-login">
                Login
              </button>
            </div>
            <div className="col-12 forgot-password">
              <span>Forgot your password</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login"> Or Login With: </span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </form>
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
  return {
    // navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
