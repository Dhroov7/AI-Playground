import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";
import "../styles/codeeditor.css";
import refreshButton1x from "../images/refresh-button/refresh.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import plus from '../images/plus.svg';

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.codeString = "";
    this.state = {
      refreshButton: {
        backgroundColor: "#1f1f1f",
      },
      noOfTabs: 1
    };
  }

  editorDidMount = (editor, monaco) => {
    editor.focus();
  };
  onChange = async (newValue, e) => {
    this.codeString = newValue;
    if (e.versionId === 2) {
      await this.setState({ refreshButton: { backgroundColor: "#66d68d" } });
    }
  };
  saveCodeChanges = async () => {
    this.props.saveCode(this.codeString);
    await this.setState({ refreshButton: { backgroundColor: "#1f1f1f" } });
  };
  addTab = async () => {
    let currentNumOfTabs = this.state.noOfTabs;
    await this.setState({ noOfTabs: currentNumOfTabs + 1 });
  };
  closeTab = async () => {
    let currentNumOfTabs = this.state.noOfTabs;
    await this.setState({ noOfTabs: currentNumOfTabs - 1 });
  }

  render() {
    const code = this.props.code;
    const options = {
      scrollbar: {
        useShadows: false,
        verticalScrollbarSize: 0,
        vertical: "hidden",
        horizontal: "hidden",
      },
      minimap: {
        enabled: false,
      },
      parameterHints: {
        enabled: true,
      },
      scrollBeyondLastLine: false,
      renderLineHighlight: "none"
    };
    let tabs = [];
    let tabsNames = [];
    let totalTabs = this.state.noOfTabs;
    for (let i = 2; i <= totalTabs; i++) {
      let value = "/* This is an empty tab.*/"
      tabs.push(
        <TabPanel key={i}>
          <MonacoEditor
            width="450"
            height="581"
            language="javascript"
            theme="vs-dark"
            value= {value}
            options={options}
          />
        </TabPanel>
      );
      tabsNames.push(
        <Tab className="tabTitleBox" key={i}>
          <p className="tabTitle title" style={{paddingRight: '3px'}}>tab.js</p>
          <button className="close" onClick={this.closeTab}>x</button>
        </Tab>
      );
    }
    return (
      <div className="code-editor">
        <button
          className="saveChangesBtn"
          onClick={this.saveCodeChanges}
          style={this.state.refreshButton}
        >
          <img src={refreshButton1x} className="refresh" alt="refreshButton" />
          <div className="btnText">Apply Changes</div>
        </button>
        <div className="monacoEditor">
          <Tabs style={{ marginLeft: "30px" }}>
            <TabList className="tabList">
              <Tab className="tabTitleBox">
                <p className="tabTitle">script.js</p>
              </Tab>
              {tabsNames}
              <button onClick={this.addTab} className="plusBtn">
                <img src={plus} alt="plusButton"/>
              </button>
            </TabList>
            <hr className="hl" />
            <TabPanel>
              <MonacoEditor
                width="450"
                height="581"
                language="javascript"
                theme="vs-dark"
                value={code}
                options={options}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount}
              />
            </TabPanel>
            {tabs};
          </Tabs>
        </div>
      </div>
    );
  }
}

export default CodeEditor;
