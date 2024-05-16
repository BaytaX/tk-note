import React, { Component } from "react";

// eslint-disable-next-line no-unused-vars
import * as MathType from "@wiris/mathtype-generic";
import ContentEditable from "react-contenteditable";
import PropTypes from "prop-types";
import styled from "styled-components";

const HiddenEquationWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

class WirisEquationEditor extends Component {
  constructor(props) {
    super(props);
    this.toolbarRef = props.toolbarRef;
    this.onEquationChange = props.onEquationInput;
    this.equationEditorRef = React.createRef();
    this.toolbarRef = React.createRef();
  }

  componentDidMount() {
    const genericIntegrationProperties = {};
    genericIntegrationProperties.target = this.equationEditorRef.current;
    genericIntegrationProperties.toolbar = this.toolbarRef.current;

    const genericIntegrationInstance =
      new window.WirisPlugin.GenericIntegration(genericIntegrationProperties);

    genericIntegrationInstance.init();
    genericIntegrationInstance.listeners.fire("onTargetReady", {});
  }

  render() {
    const { value } = this.props;
    return (
      <HiddenEquationWrapper>
        <div
          ref={this.toolbarRef}
          className="flex gap-4 items-center justify-center "
        />
        <div
          style={{ padding: 30 }}
          className="border border-gray-300 flex items-center justify-center"
        >
          <ContentEditable
            innerRef={this.equationEditorRef}
            onChange={this.onEquationChange}
            html={value}
          />
        </div>
      </HiddenEquationWrapper>
    );
  }
}

WirisEquationEditor.propTypes = {
  onEquationInput: PropTypes.func,
  value: PropTypes.node,
  toolbarRef: PropTypes.instanceOf(Element).isRequired,
};

WirisEquationEditor.defaultProps = {
  onEquationInput: () => {},
  value: null,
};

export default WirisEquationEditor;
