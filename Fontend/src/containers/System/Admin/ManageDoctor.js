import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkDown: "",
      contentHTML: "",
      selectedDoctor: null,
      description: "",
      listDoctors: [],
    };
  }

  async componentDidMount() {
    this.props.loadAllDoctor();
  }

  buildDataInput = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.forEach((item) => {
        let object = {};
        object.label = `${item.firstName} ${item.lastName}`;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInput(this.props.allDoctor);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkDown: text,
    });
  };

  handleSaveContentMarkdown = () => {
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkDown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
    });
  };

  findDoctor = (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };
  handleChangeDescription = (event) => {
    this.setState({ description: event.target.value }, () => {
      console.log("Description:", this.state.description);
    });
  };
  render() {
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Manage Doctor</div>
        <div className="more-infor">
          <div className="content-left">
            <label>Chọn bác sĩ</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.findDoctor}
              options={this.state.listDoctors}
            />
          </div>
          <div className="content-right">
            <label>Thông tin giới thiệu</label>
            <textarea
              className="text-area form-control"
              cols="30"
              rows="5"
              onChange={(event) => this.handleChangeDescription(event)}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "375px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
          <button
            className="btn-content-doctor"
            onClick={() => this.handleSaveContentMarkdown()}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctor: state.admin.allDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
