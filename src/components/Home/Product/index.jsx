import { inject, observer } from "mobx-react";
import Basic from "../../Demo/Basic";
import ProducDetailPopup from "./ProducDetailPopup/ProductDetaiCreate";
import { Button, Input, Icon } from "antd";
import Highlighter from "react-highlight-words";
@inject("rootStore")
@observer
class Product extends Basic {
  constructor(props) {
    super(props.rootStore.productStore, props);
    this.columns = [
      {
        title: "Id",
        dataIndex: "id",
        sorter: (a, b) => a.id - b.id,
        editable: true,
      },
      {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0),
        ...this.getColumnSearchProps("name"),
        editable: true,
      },
      {
        title: "Cost",
        dataIndex: "cost",
        sorter: (a, b) => a.cost - b.cost,
        editable: true,
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        sorter: (a, b) => a.quantity - b.quantity,
        editable: true,
      },
    ];
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  renderDetaiCreate() {
    return <ProducDetailPopup currentStore={this.currentStore} />;
  }

  renderDetaiEdit() {
    return <ProducDetailPopup currentStore={this.currentStore} />;
  }

  render() {
    return super.render();
  }
}

export default Product;
