import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";
import { connect } from "react-redux";
import "../styles/codeeditor.css";
import refreshButton1x from "../images/refresh-button/refresh.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import plus from "../images/plus.svg";
import { Container, Row, Col } from "react-bootstrap";

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.codeString = props.code;
    this.tabState = { id: null, state: "title" };
    this.state = {
      activeTab: 0,
      tabTitle: "",
    };
  }

  editorDidMount = (editor, monaco) => {
    editor.focus();
  };

  onChange = (newValue, e) => {
    this.codeString = newValue;
  };

  changeTabName = (e, tabId) => {
    if (e.key === "Enter") {
      this.props.dispatch({
        type: "changeTabName",
        payload: { id: tabId, name: this.state.tabTitle },
      });

      this.tabState = { id: null, state: "title" };
    }
  };

  // handler for tab name input box when the focus
  handleFocusOut = (e, tabId) => {
    this.tabState = {
      id: tabId,
      state: "title",
    };
  };

  // handler for change the tab state, if the tab will render input box or title
  handleTabName = (tabId) => {
    this.tabState = {
      id: tabId,
      state: "input",
    };
  };

  // returns the markup whether to send input box or p element.
  tabTitle = (tabName, tabId) => {
    if (this.tabState.state === "input" && this.tabState.id === tabId) {
      return (
        <input
          className="tabTitle inputBox"
          onKeyDown={(e) => this.changeTabName(e, tabId)}
          onChange={(e) => this.setState({ tabTitle: e.target.value })}
          onBlur={(e) => this.handleFocusOut(e, tabId)}
        />
      );
    }

    return (
      <p
        className="tabTitle"
        style={{ paddingRight: "3px" }}
        onDoubleClick={() => this.handleTabName(tabId)}
      >
        {tabName}
      </p>
    );
  };

  saveCodeChanges = async () => {
    let tabId = this.state.activeTab;

    if (+tabId === 0) {
      // save the code of default tab to the state.
      this.props.saveCode(this.codeString);
    } else {
      // save the code of other tabs to the redux store.
      this.props.dispatch({
        type: "changeTabCode",
        payload: { code: this.codeString, id: tabId },
      });
    }
  };

  addTab = async () => {
    this.props.dispatch({ type: "addTab" });
  };

  closeTab = async (e) => {
    this.props.dispatch({ type: "removeTab", payload: { id: e.target.id } });
  };

  handleTabSelect = async (tabId, e) => {
    await this.setState({ activeTab: tabId });
  };

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
      renderLineHighlight: "none",
    };
    let tabs = [],
      tabsNames = [],
      totalTabs = this.props.tabs;
    totalTabs.map((tab) => {
      tabs.push(
        <TabPanel key={tab.id}>
          <MonacoEditor
            width="450"
            height="581"
            language="javascript"
            theme="vs-dark"
            value={tab.code}
            options={options}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
            id={tab.id}
          />
        </TabPanel>
      );
      tabsNames.push(
        <Tab
          className="tabTitleBox"
          key={tab.id}
          onClick={(e) => this.handleTabSelect(tab.id, e)}
        >
          {this.tabTitle(tab.name, tab.id)}
          <button className="closeBtn" onClick={this.closeTab} id={tab.id}>
            x
          </button>
        </Tab>
      );
    });
    return (
      <div className="code-editor">
        <div className="monacoEditor">
          <Tabs>
            <Container fluid className="removePadding">
              <Row>
                <Col sm={8}>
                  <TabList className="tabList ml-3">
                    <Tab
                      className="tabTitleBox"
                      onClick={(e) => this.handleTabSelect("0", e)}
                      id={"0"}
                    >
                      <p className="tabTitle">script.js</p>
                    </Tab>
                    {tabsNames}
                    <button onClick={this.addTab} className="plusBtn">
                      <img src={plus} alt="plusButton" />
                    </button>
                  </TabList>
                </Col>
                <Col sm={2}>
                  <button
                    className="saveChangesBtn"
                    onClick={this.saveCodeChanges}
                    style={{ backgroundColor: "#1f1f1f" }}
                  >
                    <img
                      src={refreshButton1x}
                      className="refresh"
                      alt="refreshButton"
                    />
                    <div className="btnText">Apply Changes</div>
                  </button>
                </Col>
              </Row>
            </Container>
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

const mapStateToProps = (state) => ({
  tabs: state.tabs,
});

export default connect(mapStateToProps)(CodeEditor);
