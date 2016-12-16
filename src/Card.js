import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem, Button, OverlayTrigger, Tooltip, Modal, FormControl } from 'react-bootstrap';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lstTasks: [],
      key: 0,
      smShow: false,
      value: '',
      title: '',
      isEditable: false,
      index: 0
    };
    //Binding methods
    this.addASingleTask = this.addASingleTask.bind(this);
    this.createSingleItem = this.createSingleItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.validateData = this.validateData.bind(this);
  };

  /*
  * Adds an element
  */
  addASingleTask() {
    var pos = this.state.key;
    this.setState({ key: pos++ });
    this.setState({ smShow: true });
    this.setState({ title: '' });
    this.setState({ value: '' });
  }

  /*
  * Handler for the title of the task
  */
  handleChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  /*
  * Handler for the descripction of the task
  */
  handleChangeDesc(e) {
    this.setState({ value: e.target.value });
  }

  /*
  * Edits the content of the task
  */
  editItem(item) {
    this.setState({ title: item.header });
    this.setState({ value: item.description });
    this.setState({ index: item.index });
    this.setState({ isEditable: true });
    this.setState({ smShow: true });
  }

  /*
  * Avoid empty elements
  */
  validateData(data) {
    return (null !== data && '' !== data.trim() && 0 !== data.trim().length);
  }

  /*
  * Generates an element
  * @item contains the information of the task
  */
  createSingleItem(item) {
    return (<ListGroupItem key={item.key} header={item.header} onClick={this.editItem.bind(this, item)}>{item.description}</ListGroupItem>);
  }

  /*
  * Dismiss the modal window
  */
  closeModal() {
    var key = this.state.key, index = this.state.index, item;
    if (!this.validateData(this.state.title) && !this.validateData(this.state.value)) {
      this.setState({ smShow: false });
      return;
    } else if (!this.state.isEditable) {
      key++;
      item = {
         "key":key,
         "index": index,
         "header": this.state.title,
         "description":this.state.value
      };
      this.state.lstTasks.push(this.createSingleItem(item));
      index++;
      this.setState({ key: key });
      this.setState({ index: index });
    } else {
      key++;
      var removedItem = this.state.lstTasks.splice(index, 1);
      item = {
         "key":key,
         "index": index,
         "header": this.state.title,
         "description":this.state.value
      };
      removedItem[0] = this.createSingleItem(item);
      this.state.lstTasks.splice(index, 0, removedItem[0]);

      index++;
      this.setState({ key: key });
      this.setState({ index: index });
      this.setState({ isEditable: false });
    }
    this.setState({ smShow: false });
  }

  /*
  * Creates a tooltip for every single column
  */
  tooltip = (<Tooltip id="tooltip"><strong>{this.props.tooltip}</strong></Tooltip>);


  /*
  * Renders the element
  */
  render () {
    return (
      <Panel collapsible defaultExpanded header={this.props.title} bsStyle={this.props.lookandfeel}>
        <ListGroup fill>
          {this.state.lstTasks}
        </ListGroup>
        <OverlayTrigger placement="right" overlay={this.tooltip}>
          <Button bsStyle="success" bsSize="small" onClick={this.addASingleTask}>Add Item</Button>
        </OverlayTrigger>
        <Modal bsSize="large" aria-labelledby="contained-modal-title-lg"
               show={this.state.smShow} onHide={this.closeModal}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <form>
              <FormControl type="text" value={this.state.title} maxLength="25"
                           placeholder="Enter title" onChange={this.handleChangeTitle}/>
              <br />
              <FormControl type="text" value={this.state.value} maxLength="50"
                           placeholder="Enter description" onChange={this.handleChangeDesc}/>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={this.closeModal}>OK</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    )
  }
}

//A module can only have one default export, but as many named exports as you like
export default Card;
